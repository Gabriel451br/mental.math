/* ════════════════════════════════════════════════════════════
   NÚCLEO JURÍDICO — motor comum dos jogos de Direito
   Recebe os bancos de questões (UNITS), os blocos de lei seca
   (LAW_BLOCKS), os tópicos e a teoria, e devolve o "engine" usado
   pelo duo.js: { TOPICS, THEORY, generate, LAW }.

   Formatos:
     mc:    [pergunta, correta, [erradas], explicação, nível 1-3]
     ce:    [afirmação, verdadeira?, explicação, nível 1-3]
     sets:  { ask(item), cats: { rótulo: [itens] }, why }   (classificação)
     pairs: { prompt, pairs: [[esquerda, direita]], why }      (ligar pares)
     lei seca: L(dispositivo, assunto, pergunta do flashcard, texto)
       com termos-chave marcados como [[correto|errado1|errado2]]
════════════════════════════════════════════════════════════ */
(function (global) {
  "use strict";

  /* ── Utilitários ─────────────────────────────────────────── */
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const chance = p => Math.random() < p;
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const sample = (a, n) => shuffle(a).slice(0, n);
  function mkOptions(correct, distractors) {
    const all = shuffle([correct, ...distractors]);
    return { options: all, answer: all.indexOf(correct) };
  }
  const sec = (title, body, cls = "") =>
    `<div class="ex-sec ${cls}"><div class="ex-title">${title}</div>${body}</div>`;
  const MAXLVL = { easy: 1, medium: 2, hard: 3 };
  function byLevel(list, d, lvlOf) {
    const ok = list.filter(x => lvlOf(x) <= MAXLVL[d]);
    if (d === "hard") {
      const hard = ok.filter(x => lvlOf(x) >= 2);
      if (hard.length && chance(0.7)) return hard;
    }
    return ok.length ? ok : list;
  }
  const CE = ["Certo", "Errado"];
  const list = items => `<ul style="margin-left:18px">${items.map(i => `<li>${i}</li>`).join("")}</ul>`;
  const L = (ref, tag, cue, text) => ({ ref, tag, cue, text });

  function build({ UNITS, LAW_BLOCKS, TOPICS, THEORY, lawName = "da lei" }) {
  /* ── Geradores da trilha ─────────────────────────────────── */
  const ceExplain = (s, v, why) => sec("Gabarito", `<p><b>${v ? "CERTO" : "ERRADO"}</b></p><p class="ex-rule">${why}</p>`);

  function genMC(u, d) {
    const [q, correct, wrong, why] = pick(byLevel(UNITS[u].mc, d, x => x[4]));
    const { options, answer } = mkOptions(correct, wrong);
    return { kind: "Múltipla escolha", prompt: q, options, answer, label: q,
      explain: () => sec("Explicação", `<p class="ex-rule">${why}</p>`) };
  }
  function genCE(u, d) {
    const [s, v, why] = pick(byLevel(UNITS[u].ce, d, x => x[3]));
    return { kind: "Certo ou errado", prompt: `Julgue o item:<div class="sentence">${s}</div>`, options: CE, answer: v ? 0 : 1,
      label: s, explain: () => ceExplain(s, v, why) };
  }
  function genSet(u) {
    const set = pick(UNITS[u].sets);
    const labels = Object.keys(set.cats);
    const cat = pick(labels), item = pick(set.cats[cat]);
    const options = labels.length <= 4 ? labels : [cat, ...sample(labels.filter(l => l !== cat), 3)];
    const ord = labels.length <= 4 ? options : shuffle(options);
    return { kind: "Classifique", prompt: set.ask(item), options: ord, answer: ord.indexOf(cat), label: set.ask(item),
      explain: () => sec("Explicação", `<p>Resposta: <b>${cat}</b>.</p><p class="ex-rule">${set.why}</p>`) };
  }
  function genMatch(u) {
    const U = UNITS[u];
    // pares explícitos ou montados a partir de classificações com 3+ categorias
    const sources = U.pairs.map(p => ({ prompt: p.prompt, pairs: p.pairs, why: p.why }))
      .concat(U.sets.filter(s => Object.keys(s.cats).length >= 3).map(s => {
        const labels = sample(Object.keys(s.cats), Math.min(4, Object.keys(s.cats).length));
        return { prompt: "Ligue cada item à sua classificação:", pairs: labels.map(l => [pick(s.cats[l]), l]), why: s.why };
      }));
    const src = pick(sources);
    const pairs = sample(src.pairs, Math.min(4, src.pairs.length));
    return {
      type: "match", kind: "Ligue os pares", prompt: src.prompt, pairs, check: v => v === 0,
      answerText: pairs.map(p => `${p[0]} → ${p[1]}`).join(" · "),
      describe: v => (v === 0 ? "todos os pares certos" : `${v} tentativa${v > 1 ? "s" : ""} errada${v > 1 ? "s" : ""} ao ligar`),
      label: src.prompt,
      explain: () => sec("Pares corretos", pairs.map(p => `<p>${p[0]} → <b>${p[1]}</b></p>`).join("")) + sec("Explicação", `<p class="ex-rule">${src.why}</p>`),
    };
  }
  const canMatch = u => UNITS[u].pairs.length > 0 || UNITS[u].sets.some(s => Object.keys(s.cats).length >= 3);

  /* ── Motor da lei seca ───────────────────────────────────── */
  const GROUP = /\[\[([^\]]+)\]\]/g;
  const groupsOf = text => [...text.matchAll(GROUP)].map(m => m[1].split("|"));
  // monta o texto: a lacuna "blankIdx" vira ____ ou é trocada por "swap"
  function render(text, { blankIdx = -1, swapIdx = -1, swap = "", bold = false } = {}) {
    let i = -1;
    return text.replace(GROUP, (_, g) => {
      i++;
      const correct = g.split("|")[0];
      if (i === blankIdx) return `<span class="blank">______</span>`;
      if (i === swapIdx) return swap;
      return bold ? `<b>${correct}</b>` : correct;
    });
  }
  const lawBox = (item, html) => `<div class="sentence law-text"><span class="law-cite">${item.ref}</span>${html}</div>`;
  const lawExplain = item => sec("Texto legal", lawBox(item, render(item.text, { bold: true })));

  function genCloze(block, d) {
    const items = block.items.filter(it => groupsOf(it.text).length);
    const it = pick(items), groups = groupsOf(it.text);
    const gi = Math.floor(Math.random() * groups.length);
    const [correct, ...wrong] = groups[gi];
    const { options, answer } = mkOptions(correct, wrong);
    return {
      kind: "Lei seca · complete a lacuna", prompt: `Complete com o texto literal ${lawName}:${lawBox(it, render(it.text, { blankIdx: gi }))}`,
      options, answer, label: `${it.ref} — ${it.tag}`,
      explain: () => lawExplain(it),
    };
  }
  function genLawCE(block) {
    const it = pick(block.items), groups = groupsOf(it.text);
    const truth = !groups.length || chance(0.45);
    let html, wrongInfo = "";
    if (truth) html = render(it.text);
    else {
      const gi = Math.floor(Math.random() * groups.length);
      const bad = pick(groups[gi].slice(1));
      html = render(it.text, { swapIdx: gi, swap: bad });
      wrongInfo = `<p class="ex-rule">O texto diz “<b>${groups[gi][0]}</b>”, e não “${bad}”.</p>`;
    }
    return {
      kind: "Lei seca · certo ou errado", prompt: `Julgue conforme o texto literal ${lawName}:${lawBox(it, html)}`,
      options: CE, answer: truth ? 0 : 1, label: `${it.ref} — ${it.tag}`,
      explain: () => sec("Gabarito", `<p><b>${truth ? "CERTO" : "ERRADO"}</b></p>${wrongInfo}`) + lawExplain(it),
    };
  }
  function genLawRef(block) {
    const items = sample(block.items, Math.min(4, block.items.length));
    return {
      type: "match", kind: "Lei seca · dispositivos", prompt: "Ligue cada assunto ao seu dispositivo:",
      pairs: items.map(it => [it.tag, it.ref]), check: v => v === 0,
      answerText: items.map(it => `${it.tag} → ${it.ref}`).join(" · "),
      describe: v => (v === 0 ? "todos os pares certos" : `${v} tentativa${v > 1 ? "s" : ""} errada${v > 1 ? "s" : ""} ao ligar`),
      label: `Dispositivos — ${block.label}`,
      explain: () => sec("Pares corretos", items.map(it => `<p>${it.tag} → <b>${it.ref}</b></p>`).join("")),
    };
  }

  const LAW = {
    blocks: LAW_BLOCKS.map(b => ({ id: b.id, label: b.label, ref: b.ref })),
    generate(blockId, d) {
      const b = LAW_BLOCKS.find(x => x.id === blockId);
      const r = Math.random();
      if (r < 0.45) return genCloze(b, d);
      if (r < 0.85 || b.items.length < 3) return genLawCE(b);
      return genLawRef(b);
    },
    cards(blockId) {
      const b = LAW_BLOCKS.find(x => x.id === blockId);
      return b.items.map((it, i) => ({
        id: `${blockId}-${i}`,
        front: `<span class="law-cite">${it.ref} · ${it.tag}</span><div class="fc-cue">${it.cue}</div>`,
        back: render(it.text, { bold: true }),
      }));
    },
  };

  function generate(topicId, d) {
    const choices = [[genMC, 2], [genCE, 1.5]];
    if (UNITS[topicId].sets.length) choices.push([genSet, 1.3]);
    if (canMatch(topicId)) choices.push([genMatch, 0.8]);
    const total = choices.reduce((s, c) => s + c[1], 0);
    let r = Math.random() * total, fn = choices[0][0];
    for (const [g, w] of choices) { if ((r -= w) <= 0) { fn = g; break; } }
    const q = fn(topicId, d);
    q.topic = topicId;
    return q;
  }

    return { TOPICS, THEORY, generate, LAW, _internal: { UNITS, LAW_BLOCKS, groupsOf, render } };
  }

  global.JuridicoCore = { build, sec, list, L };
})(typeof window !== "undefined" ? window : globalThis);
