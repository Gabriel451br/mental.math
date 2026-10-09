/* ════════════════════════════════════════════════════════════
   LÓGICA PROPOSICIONAL — motor de questões
   Gera questões aleatórias (com frases prontas que se combinam)
   e a explicação passo a passo de cada uma. Toda resposta "correta"
   é conferida por tabela-verdade, então os distratores nunca são
   equivalentes à resposta certa.
════════════════════════════════════════════════════════════ */
(function (global) {
  "use strict";

  /* ── Utilitários ─────────────────────────────────────────── */
  const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
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
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const quote = s => "“" + cap(s) + "”";
  const vf = b => (b ? "V" : "F");
  const tv = b => `<span class="tv ${b ? "tv-v" : "tv-f"}">${b ? "V" : "F"}</span>`;

  /* ── Árvore de fórmulas ──────────────────────────────────── */
  const SYM = { and: "∧", or: "∨", xor: "⊻", imp: "→", iff: "↔" };
  const OPNAME = {
    and: "Conjunção", or: "Disjunção", xor: "Disjunção exclusiva",
    imp: "Condicional", iff: "Bicondicional", not: "Negação",
  };
  const RULE = {
    and: "<b>Conjunção (∧, “e”)</b>: só é V quando <u>as duas</u> partes são V.",
    or:  "<b>Disjunção (∨, “ou”)</b>: só é F quando <u>as duas</u> partes são F.",
    xor: "<b>Disjunção exclusiva (⊻, “ou… ou…”)</b>: é V quando as partes têm valores <u>diferentes</u>.",
    imp: "<b>Condicional (→, “se… então…”)</b>: só é F no caso <u>V → F</u> (antecedente V e consequente F).",
    iff: "<b>Bicondicional (↔, “se e somente se”)</b>: é V quando as partes têm valores <u>iguais</u>.",
    not: "<b>Negação (~)</b>: inverte o valor lógico (V vira F e F vira V).",
  };

  const V = n => ({ t: "var", n });
  const N = a => ({ t: "not", a });
  const Bn = (t, a, b) => ({ t, a, b });
  const lit = (n, neg) => (neg ? N(V(n)) : V(n));
  const negF = f => (f.t === "not" ? f.a : N(f));
  const isBin = f => !!SYM[f.t];
  const isLit = f => f.t === "var" || (f.t === "not" && f.a.t === "var");

  function ev(f, e) {
    switch (f.t) {
      case "var": return e[f.n];
      case "not": return !ev(f.a, e);
      case "and": return ev(f.a, e) && ev(f.b, e);
      case "or":  return ev(f.a, e) || ev(f.b, e);
      case "xor": return ev(f.a, e) !== ev(f.b, e);
      case "imp": return !ev(f.a, e) || ev(f.b, e);
      case "iff": return ev(f.a, e) === ev(f.b, e);
    }
    throw new Error("fórmula inválida");
  }

  function collectVars(f, s) {
    if (f.t === "var") s.add(f.n);
    else if (f.t === "not") collectVars(f.a, s);
    else { collectVars(f.a, s); collectVars(f.b, s); }
    return s;
  }
  function varList(...fs) {
    const s = new Set();
    fs.forEach(f => collectVars(f, s));
    return [...s].sort();
  }
  function allEnvs(vs) {
    const n = vs.length, out = [];
    for (let i = 0; i < (1 << n); i++) {
      const e = {};
      vs.forEach((v, j) => (e[v] = !((i >> (n - 1 - j)) & 1)));
      out.push(e);
    }
    return out;
  }
  function equiv(f, g) {
    return allEnvs(varList(f, g)).every(e => ev(f, e) === ev(g, e));
  }
  function classify(f) {
    const vals = allEnvs(varList(f)).map(e => ev(f, e));
    if (vals.every(Boolean)) return "taut";
    if (!vals.some(Boolean)) return "contr";
    return "cont";
  }

  function sym(f, top = true) {
    if (f.t === "var") return f.n;
    if (f.t === "not") return "~" + sym(f.a, false);
    const s = sym(f.a, false) + " " + SYM[f.t] + " " + sym(f.b, false);
    return top ? s : "(" + s + ")";
  }
  const symHTML = f => `<span class="fx">${sym(f)}</span>`;

  // remove duplas negações
  function simp(f) {
    if (f.t === "var") return f;
    if (f.t === "not") return f.a.t === "not" ? simp(f.a.a) : N(simp(f.a));
    return Bn(f.t, simp(f.a), simp(f.b));
  }

  // subfórmulas em pós-ordem (sem repetição) — usadas nas tabelas-verdade
  function subs(f, out = [], seen = new Set()) {
    if (f.t === "not") subs(f.a, out, seen);
    else if (f.t !== "var") { subs(f.a, out, seen); subs(f.b, out, seen); }
    if (f.t !== "var") {
      const k = sym(f);
      if (!seen.has(k)) { seen.add(k); out.push(f); }
    }
    return out;
  }
  function opsUsed(f, s = new Set()) {
    if (f.t === "var") return s;
    s.add(f.t);
    if (f.t === "not") opsUsed(f.a, s);
    else { opsUsed(f.a, s); opsUsed(f.b, s); }
    return s;
  }

  // fórmula aleatória sem trivialidades (p ∧ p, p ∨ ~p…)
  function randFormula(vs, depth, ops, negP) {
    function build(dp) {
      if (dp <= 0) return lit(pick(vs), chance(negP));
      const a = build(dp - 1), b = build(chance(0.5) ? dp - 1 : 0);
      let f = chance(0.5) ? Bn(pick(ops), a, b) : Bn(pick(ops), b, a);
      if (dp < depth && chance(negP * 0.6)) f = N(f);
      return f;
    }
    function ok(f) {
      let good = true;
      (function chk(g) {
        if (g.t === "not") return chk(g.a);
        if (!isBin(g)) return;
        if (sym(g.a) === sym(g.b)) good = false;
        if (isLit(g.a) && isLit(g.b) && varList(g.a)[0] === varList(g.b)[0]) good = false;
        chk(g.a); chk(g.b);
      })(f);
      return good && isBin(f) && varList(f).length >= Math.min(2, vs.length);
    }
    for (let t = 0; t < 200; t++) {
      const f = build(depth);
      if (ok(f)) return f;
    }
    return Bn(pick(ops), lit(vs[0], false), lit(vs[1], chance(negP)));
  }

  // todas as mutações de um passo (para distratores "parecidos")
  function mutations(f) {
    const out = [];
    (function rec(g, rebuild) {
      out.push(rebuild(negF(g)));
      if (isBin(g)) {
        Object.keys(SYM).forEach(op => { if (op !== g.t) out.push(rebuild(Bn(op, g.a, g.b))); });
        if (g.t === "imp") out.push(rebuild(Bn("imp", g.b, g.a)));
        rec(g.a, x => rebuild(Bn(g.t, x, g.b)));
        rec(g.b, x => rebuild(Bn(g.t, g.a, x)));
      } else if (g.t === "not") {
        rec(g.a, x => rebuild(N(x)));
      }
    })(f, x => x);
    return out.map(simp);
  }

  // todas as combinações binárias de dois literais
  function allBin(A, B) {
    const out = [];
    [A, negF(A)].forEach(a => [B, negF(B)].forEach(b => {
      Object.keys(SYM).forEach(op => { out.push(Bn(op, a, b)); out.push(Bn(op, b, a)); });
    }));
    return out;
  }

  // escolhe n distratores NÃO equivalentes ao correto e sem textos repetidos
  function pickDistractors(correct, preferred, pool, n, key) {
    const res = [], seen = new Set([key(correct)]);
    for (const c of [...shuffle(preferred), ...shuffle(pool)]) {
      if (res.length >= n) break;
      if (equiv(c, correct)) continue;
      const k = key(c);
      if (seen.has(k)) continue;
      seen.add(k);
      res.push(c);
    }
    return res;
  }

  // embaralha as opções e devolve o índice da correta
  function mkOptions(correct, distractors, fixedLast) {
    const all = shuffle([correct, ...distractors]);
    if (fixedLast) all.push(fixedLast);
    return { options: all, answer: all.indexOf(correct) };
  }

  /* ── Linguagem natural ───────────────────────────────────── */
  const ATOMS = [
    ["Ana estuda", "Ana não estuda"],
    ["Bruno trabalha", "Bruno não trabalha"],
    ["está chovendo", "não está chovendo"],
    ["o céu está nublado", "o céu não está nublado"],
    ["Carlos é médico", "Carlos não é médico"],
    ["Daniela é advogada", "Daniela não é advogada"],
    ["eu vou à praia", "eu não vou à praia"],
    ["o banco abre", "o banco não abre"],
    ["a taxa de juros sobe", "a taxa de juros não sobe"],
    ["o cliente paga a fatura", "o cliente não paga a fatura"],
    ["Pedro passa no concurso", "Pedro não passa no concurso"],
    ["Júlia fica feliz", "Júlia não fica feliz"],
    ["o time vence", "o time não vence"],
    ["a inflação cai", "a inflação não cai"],
    ["Marcos viaja", "Marcos não viaja"],
    ["Luísa vai ao cinema", "Luísa não vai ao cinema"],
    ["o gerente aprova o crédito", "o gerente não aprova o crédito"],
    ["o sistema está online", "o sistema não está online"],
    ["Rafael é engenheiro", "Rafael não é engenheiro"],
    ["a loja está aberta", "a loja não está aberta"],
    ["Fernanda dorme cedo", "Fernanda não dorme cedo"],
    ["o trem atrasa", "o trem não atrasa"],
    ["Tiago estuda lógica", "Tiago não estuda lógica"],
    ["o dólar sobe", "o dólar não sobe"],
    ["a reunião acontece", "a reunião não acontece"],
    ["Beatriz canta", "Beatriz não canta"],
    ["o carro está na garagem", "o carro não está na garagem"],
    ["faz sol", "não faz sol"],
    ["Gustavo é bancário", "Gustavo não é bancário"],
    ["o pedido é entregue", "o pedido não é entregue"],
    ["Helena joga xadrez", "Helena não joga xadrez"],
    ["o ônibus chega no horário", "o ônibus não chega no horário"],
  ];
  function atoms(n) {
    const chosen = sample(ATOMS, n), M = {};
    ["p", "q", "r"].slice(0, n).forEach((v, i) => (M[v] = { pos: chosen[i][0], neg: chosen[i][1] }));
    return M;
  }
  function nl(f, M) {
    if (f.t === "var") return M[f.n].pos;
    if (f.t === "not") {
      if (f.a.t === "var") return M[f.a.n].neg;
      if (f.a.t === "not") return nl(f.a.a, M);
      return "não é verdade que " + nl(f.a, M);
    }
    const a = nl(f.a, M), b = nl(f.b, M);
    const nested = isBin(f.a) || isBin(f.b);
    switch (f.t) {
      case "and": return nested ? `${a}, e ${b}` : `${a} e ${b}`;
      case "or":  return `${a} ou ${b}`;
      case "xor": return `ou ${a} ou ${b}`;
      case "imp": return `se ${a}, então ${b}`;
      case "iff": return `${a} se, e somente se, ${b}`;
    }
  }
  const legend = (M, vs) =>
    `<div class="defs">${vs.map(v => `<div><b>${v}</b>: ${quote(M[v].pos)}</div>`).join("")}</div>`;
  const envText = (e, vs, M) =>
    vs.map(v => (M ? `${quote(M[v].pos)} é ${tv(e[v])}` : `${v} = ${tv(e[v])}`)).join(", ");

  // contraexemplo: mostra uma linha em que a opção escolhida difere da correta
  function counterEx(chosenF, refF, M, refName) {
    const vs = varList(chosenF, refF);
    const e = allEnvs(vs).find(x => ev(chosenF, x) !== ev(refF, x));
    if (!e) return "";
    return `<div class="ex-sec ex-wrong"><div class="ex-title">Por que sua opção está errada</div>
      <p>Teste o caso em que ${envText(e, vs, M)}: ${refName} fica ${tv(ev(refF, e))}, mas a sua opção fica ${tv(ev(chosenF, e))}.
      Como os valores não coincidem em todos os casos, não são a mesma proposição.</p></div>`;
  }

  const sec = (title, body, cls = "") =>
    `<div class="ex-sec ${cls}"><div class="ex-title">${title}</div>${body}</div>`;
  const rulesFor = ops => sec("Regras usadas", [...ops].map(o => `<p class="ex-rule">${RULE[o]}</p>`).join(""));

  /* ── Tabela-verdade em HTML ──────────────────────────────── */
  const td = (b, hl) => `<td class="${b ? "cv" : "cf"}${hl ? " hl" : ""}">${b ? "V" : "F"}</td>`;
  function ttHTML(vs, cols, mark) {
    let h = `<div class="tt-wrap"><table class="tt"><thead><tr>` +
      vs.map(v => `<th>${v}</th>`).join("") +
      cols.map(c => `<th class="${c.hl ? "hl" : ""}">${c.label}</th>`).join("") +
      `</tr></thead><tbody>`;
    allEnvs(vs).forEach(e => {
      h += `<tr class="${mark && mark(e) ? "mark" : ""}">` +
        vs.map(v => td(e[v])).join("") + cols.map(c => td(c.fn(e), c.hl)).join("") + `</tr>`;
    });
    return h + `</tbody></table></div>`;
  }
  function formulaTT(f) {
    const ss = subs(f);
    return ttHTML(varList(f), ss.map((g, i) => ({ label: sym(g), fn: e => ev(g, e), hl: i === ss.length - 1 })));
  }

  /* ── Dificuldade ─────────────────────────────────────────── */
  const DCFG = {
    easy:   { neg: 0,    ops: ["and", "or", "imp"] },
    medium: { neg: 0.35, ops: ["and", "or", "imp", "iff"] },
    hard:   { neg: 0.45, ops: ["and", "or", "imp", "iff", "xor"] },
  };

  /* ════════════════════════════════════════════════════════════
     1. PROPOSIÇÕES
  ════════════════════════════════════════════════════════════ */
  const PROPS = [
    ["Brasília é a capital do Brasil.", "Frase declarativa e verdadeira."],
    ["7 é um número par.", "Frase declarativa e falsa — ser falsa não impede de ser proposição."],
    ["O Brasil fica na América do Sul.", "Frase declarativa e verdadeira."],
    ["2 + 3 = 5.", "Sentença fechada (sem variável): é verdadeira."],
    ["10 é maior que 20.", "Sentença fechada: é falsa, mas tem valor lógico."],
    ["A Lua é feita de queijo.", "Declarativa e falsa."],
    ["Todo número primo é ímpar.", "Declarativa e falsa (2 é primo e par) — continua sendo proposição."],
    ["Existe vida em Marte.", "Declarativa: ainda não sabemos o valor, mas ela é V ou F."],
    ["O Banco do Brasil foi fundado em 1808.", "Declarativa com valor lógico definido (verdadeira)."],
    ["O Sol é uma estrela.", "Declarativa e verdadeira."],
    ["Machado de Assis escreveu Dom Casmurro.", "Declarativa e verdadeira."],
    ["Um triângulo tem quatro lados.", "Declarativa e falsa."],
  ];
  const NONPROPS = [
    ["Que horas são?", "Frase interrogativa: perguntas não são V nem F."],
    ["Quem chegou primeiro?", "Frase interrogativa."],
    ["Feche a porta!", "Frase imperativa (ordem): não tem valor lógico."],
    ["Estude para a prova.", "Frase imperativa (conselho/ordem)."],
    ["Que dia lindo!", "Frase exclamativa: expressa emoção, não é V nem F."],
    ["x + 3 = 7", "Sentença aberta: depende do valor de x."],
    ["x > 5", "Sentença aberta: o valor depende de x."],
    ["Ele é jogador de futebol.", "Sentença aberta: “ele” é indeterminado, não dá para julgar."],
    ["Esta frase é falsa.", "Paradoxo: se for V, é F; se for F, é V. Não tem valor lógico."],
    ["Tomara que chova amanhã.", "Frase optativa (desejo): não é V nem F."],
    ["Boa sorte na prova!", "Frase exclamativa/optativa."],
    ["Ela foi a melhor aluna da turma.", "Sentença aberta: “ela” não está identificada."],
  ];
  const PROP_CONCEPT = sec("Conceito",
    `<p><b>Proposição</b> é toda frase <u>declarativa</u> que pode ser julgada como <b>verdadeira (V)</b> ou <b>falsa (F)</b> — nunca as duas ao mesmo tempo.</p>
     <p class="ex-rule">Não são proposições: perguntas, ordens, exclamações, desejos, sentenças abertas (com x, “ele”, “ela”…) e paradoxos.</p>`);

  function genIsProp() {
    const askNot = chance(0.4);
    const [good, bad] = askNot ? [NONPROPS, PROPS] : [PROPS, NONPROPS];
    const correct = pick(good), dis = sample(bad, 3);
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: askNot ? "Qual não é proposição" : "Identificar proposição",
      prompt: askNot ? "Qual das frases abaixo <b>NÃO</b> é uma proposição?" : "Qual das frases abaixo <b>é</b> uma proposição?",
      options: options.map(o => o[0]),
      answer,
      label: askNot ? "Qual não é proposição?" : "Qual é proposição?",
      explain: () => PROP_CONCEPT + sec("Analisando cada opção",
        options.map(o => {
          const isP = PROPS.includes(o);
          return `<p>${isP ? "✅" : "❌"} <b>${o[0]}</b><br><span class="muted">${isP ? "É proposição" : "Não é proposição"}: ${o[1]}</span></p>`;
        }).join("")),
    };
  }

  function genSimpleComp(d) {
    const c = DCFG[d];
    if (chance(0.5)) {
      const M = atoms(2);
      const op = pick(c.ops.concat(d === "easy" ? [] : ["xor"]));
      const f = Bn(op, lit("p", chance(c.neg)), lit("q", chance(c.neg)));
      const text = cap(nl(f, M)) + ".";
      return {
        kind: "Simples ou composta",
        prompt: `A proposição abaixo é simples ou composta?<div class="sentence">${text}</div>`,
        options: ["Simples", "Composta"], answer: 1,
        label: text,
        explain: () => sec("Como resolver",
          `<p>Ela junta <b>duas</b> proposições simples por meio de um conectivo, então é <b>composta</b>:</p>
           ${legend(M, ["p", "q"])}
           <p>Conectivo: <b>${OPNAME[op]}</b> (${SYM[op]}). Forma simbólica: ${symHTML(f)}</p>`) +
          sec("Lembre", `<p class="ex-rule">Composta = duas ou mais proposições ligadas por conectivos (e, ou, ou…ou, se…então, se e somente se).</p>`),
      };
    }
    const text = chance(0.5) ? cap(pick(ATOMS)[0]) + "." : pick(PROPS)[0];
    return {
      kind: "Simples ou composta",
      prompt: `A proposição abaixo é simples ou composta?<div class="sentence">${text}</div>`,
      options: ["Simples", "Composta"], answer: 0,
      label: text,
      explain: () => sec("Como resolver",
        `<p>A frase faz <b>uma única afirmação</b> e não tem conectivo lógico ligando outras proposições. Por isso é <b>simples</b>.</p>`) +
        sec("Lembre", `<p class="ex-rule">Simples = uma só ideia. Composta = duas ou mais ligadas por conectivos (e, ou, se…então…).</p>`),
    };
  }

  /* ════════════════════════════════════════════════════════════
     2. CONECTIVOS E TRADUÇÃO
  ════════════════════════════════════════════════════════════ */
  const FORMS = {
    and: [
      { f: (a, b) => `${a} e ${b}`, note: "“e” indica conjunção." },
      { f: (a, b) => `${a}, mas ${b}`, note: "“mas” (assim como “porém”, “contudo”) tem valor lógico de <b>conjunção</b>: as duas coisas acontecem." },
    ],
    or: [
      { f: (a, b) => `${a} ou ${b}`, note: "“ou” simples indica disjunção inclusiva (pode acontecer uma, outra ou as duas)." },
    ],
    xor: [
      { f: (a, b) => `ou ${a} ou ${b}`, note: "“ou… ou…” indica disjunção exclusiva: acontece exatamente uma." },
      { f: (a, b) => `ou ${a} ou ${b}, mas não ambos`, note: "“mas não ambos” deixa claro que é disjunção exclusiva." },
    ],
    imp: [
      { f: (a, b) => `se ${a}, então ${b}`, note: "“se… então…” é a forma clássica da condicional: o que vem após o “se” é o antecedente." },
      { f: (a, b) => `quando ${a}, ${b}`, note: "“quando A, B” tem o mesmo sentido de “se A, então B”." },
      { f: (a, b) => `${b}, se ${a}`, note: "Cuidado com a ordem! Em “B, se A”, o <b>antecedente</b> é o que vem depois do “se” (A), mesmo aparecendo no fim: A → B." },
      { f: (a, b) => `${a} somente se ${b}`, note: "“A somente se B” equivale a “se A, então B”: o que vem depois de “somente se” é o <b>consequente</b>." },
      { f: (a, b) => `${quote(a)} é condição suficiente para ${quote(b)}`, note: "Condição <b>suficiente</b> = antecedente. “A é suficiente para B” ⇒ A → B." },
      { f: (a, b) => `${quote(b)} é condição necessária para ${quote(a)}`, note: "Condição <b>necessária</b> = consequente. “B é necessária para A” ⇒ A → B." },
    ],
    iff: [
      { f: (a, b) => `${a} se, e somente se, ${b}`, note: "“se, e somente se” indica bicondicional." },
      { f: (a, b) => `${quote(a)} é condição necessária e suficiente para ${quote(b)}`, note: "“Necessária e suficiente” = bicondicional (↔)." },
    ],
  };
  const CONN_LABEL = {
    and: "Conjunção (∧)", or: "Disjunção (∨)", xor: "Disjunção exclusiva (⊻)",
    imp: "Condicional (→)", iff: "Bicondicional (↔)",
  };
  const sentence = (s) => (s.startsWith("“") ? s : cap(s)) + ".";

  function genConnective(d) {
    const c = DCFG[d], M = atoms(2);
    const op = pick(Object.keys(FORMS));
    const form = d === "easy" ? FORMS[op][0] : pick(FORMS[op]);
    const A = lit("p", chance(c.neg)), B = lit("q", chance(c.neg));
    const text = sentence(form.f(nl(A, M), nl(B, M)));
    const others = sample(Object.keys(FORMS).filter(o => o !== op), 3);
    const { options, answer } = mkOptions(op, others);
    return {
      kind: "Identificar conectivo",
      prompt: `Qual é o conectivo lógico da proposição?<div class="sentence">${text}</div>`,
      options: options.map(o => CONN_LABEL[o]), answer,
      label: text,
      explain: () => sec("Como resolver", `<p>${form.note}</p><p>Forma simbólica: ${symHTML(Bn(op, A, B))}, com:</p>${legend(M, ["p", "q"])}`) +
        rulesFor([op]),
    };
  }

  function genTranslate(d) {
    const c = DCFG[d], M = atoms(2);
    const op = pick(d === "easy" ? ["and", "or", "imp", "iff"] : Object.keys(FORMS));
    const form = d === "easy" ? FORMS[op][0] : pick(FORMS[op]);
    const A = lit("p", chance(c.neg)), B = lit("q", chance(c.neg));
    const correct = Bn(op, A, B);
    const text = sentence(form.f(nl(A, M), nl(B, M)));
    const preferred = [Bn("imp", B, A), Bn("imp", negF(A), negF(B)), Bn(op, negF(A), B), Bn(op, A, negF(B)),
      ...Object.keys(SYM).filter(o => o !== op).map(o => Bn(o, A, B))];
    const dis = pickDistractors(correct, preferred, allBin(A, B), 3, f => sym(f));
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Linguagem → símbolos",
      context: legend(M, ["p", "q"]),
      prompt: `Qual é a forma simbólica da proposição?<div class="sentence">${text}</div>`,
      options: options.map(f => sym(f)), optionClass: "fx", answer,
      label: text,
      explain: ch => sec("Como resolver",
        `<p>1) Identifique as partes: ${isLit(A) && A.t === "not" ? `“${nl(A, M)}” = <b>~p</b>` : `“${nl(A, M)}” = <b>p</b>`};
         ${B.t === "not" ? `“${nl(B, M)}” = <b>~q</b>` : `“${nl(B, M)}” = <b>q</b>`}.</p>
         <p>2) Conectivo: ${form.note}</p>
         <p>3) Resultado: ${symHTML(correct)}</p>`) +
        (ch !== answer ? counterEx(options[ch], correct, M, "a frase do enunciado") : ""),
    };
  }

  /* ════════════════════════════════════════════════════════════
     3. VALOR LÓGICO / TABELA-VERDADE
  ════════════════════════════════════════════════════════════ */
  function evalSteps(f, e) {
    const lines = [], seen = new Set();
    (function go(g) {
      if (g.t === "var") return e[g.n];
      let line, r;
      if (g.t === "not") {
        const a = go(g.a); r = !a;
        line = `${sym(g)} = ~${vf(a)} = <b>${vf(r)}</b>`;
      } else {
        const a = go(g.a), b = go(g.b); r = ev(g, e);
        line = `${sym(g)} = ${vf(a)} ${SYM[g.t]} ${vf(b)} = <b>${vf(r)}</b>`;
      }
      if (!seen.has(line)) { seen.add(line); lines.push(line); }
      return r;
    })(f);
    return lines;
  }

  function genEvalSym(d) {
    const c = DCFG[d];
    const vs = d === "easy" ? ["p", "q"] : chance(0.5) ? ["p", "q"] : ["p", "q", "r"];
    const depth = d === "easy" ? 1 : d === "medium" ? 2 : pick([2, 3]);
    const f = randFormula(vs, depth, c.ops, d === "easy" ? 0.25 : c.neg);
    const used = varList(f), env = {};
    used.forEach(v => (env[v] = chance(0.5)));
    const val = ev(f, env);
    const given = used.map(v => `${v} = ${tv(env[v])}`).join(" &nbsp; ");
    return {
      kind: "Valor lógico",
      prompt: `Sabendo que ${given}, qual é o valor lógico de:<div class="sentence fx">${sym(f)}</div>`,
      options: ["Verdadeiro (V)", "Falso (F)"], answer: val ? 0 : 1,
      label: `${sym(f)} com ${used.map(v => v + "=" + vf(env[v])).join(", ")}`,
      explain: () => sec("Passo a passo (de dentro para fora)",
        `<p>Substitua os valores e resolva primeiro o que está mais “dentro” dos parênteses:</p>
         <ol class="steps">${evalSteps(f, env).map(l => `<li class="fx">${l}</li>`).join("")}</ol>
         <p>Resultado: ${tv(val)}</p>`) + rulesFor(opsUsed(f)),
    };
  }

  function genEvalNL(d) {
    const c = DCFG[d], M = atoms(2);
    const op = pick(d === "easy" ? c.ops : c.ops.concat("xor"));
    const A = lit("p", chance(c.neg)), B = lit("q", chance(c.neg));
    const f = Bn(op, A, B);
    const env = { p: chance(0.5), q: chance(0.5) };
    const val = ev(f, env);
    const given = ["p", "q"].map(v => `${quote(M[v].pos)} é <b>${env[v] ? "verdadeira" : "falsa"}</b>`).join(" e ");
    const part = (L) => `“${nl(L, M)}” = ${L.t === "not" ? `~${vf(env[L.a.n])} = ` : ""}${tv(ev(L, env))}`;
    return {
      kind: "Valor lógico",
      prompt: `Sabendo que ${given}, a proposição abaixo é:<div class="sentence">${sentence(nl(f, M))}</div>`,
      options: ["Verdadeira", "Falsa"], answer: val ? 0 : 1,
      label: sentence(nl(f, M)),
      explain: () => sec("Passo a passo",
        `<p>1) Valor de cada parte:</p><p>${part(A)}<br>${part(B)}</p>
         <p>2) Conectivo: <b>${OPNAME[op]}</b> → ${vf(ev(A, env))} ${SYM[op]} ${vf(ev(B, env))} = ${tv(val)}</p>`) +
        rulesFor([op]),
    };
  }

  function genRows(d) {
    const n = d === "easy" ? rand(2, 3) : rand(2, 5);
    const vs = ["p", "q", "r", "s", "t"].slice(0, n);
    // monta uma fórmula que usa exatamente n variáveis
    let f = lit(vs[0], chance(0.3));
    vs.slice(1).forEach(v => { f = chance(0.5) ? Bn(pick(Object.keys(SYM)), f, lit(v, chance(0.3))) : Bn(pick(Object.keys(SYM)), lit(v, chance(0.3)), f); });
    const right = 2 ** n;
    const cand = [...new Set([2 * n, n * n, 2 ** (n + 1), 2 ** (n - 1), n + 2, 3 * n].filter(x => x !== right && x > 1))];
    const dis = sample(cand, 3);
    const { options, answer } = mkOptions(right, dis);
    return {
      kind: "Linhas da tabela-verdade",
      prompt: `Quantas linhas tem a tabela-verdade da proposição abaixo?<div class="sentence fx">${sym(f)}</div>`,
      options: options.map(String), answer,
      label: `Linhas de ${sym(f)}`,
      explain: () => sec("Como resolver",
        `<p>Conte as proposições simples <b>diferentes</b>: ${vs.join(", ")} → <b>n = ${n}</b>.</p>
         <p>Número de linhas = 2<sup>n</sup> = 2<sup>${n}</sup> = <b>${right}</b>.</p>
         <p class="ex-rule">Cada proposição simples pode ser V ou F (2 possibilidades), então multiplicamos 2 × 2 × … (n vezes).</p>`),
    };
  }

  /* ════════════════════════════════════════════════════════════
     4. NEGAÇÃO
  ════════════════════════════════════════════════════════════ */
  const NEG_RULE = {
    and: { f: (A, B) => Bn("or", negF(A), negF(B)), txt: "~(A ∧ B) ≡ ~A ∨ ~B — nega as duas partes e troca “e” por “ou” (De Morgan)." },
    or:  { f: (A, B) => Bn("and", negF(A), negF(B)), txt: "~(A ∨ B) ≡ ~A ∧ ~B — nega as duas partes e troca “ou” por “e” (De Morgan)." },
    imp: { f: (A, B) => Bn("and", A, negF(B)), txt: "~(A → B) ≡ A ∧ ~B — <b>mantém</b> a primeira, <b>nega</b> a segunda e troca por “e” (regra do MA-NE)." },
    iff: { f: (A, B) => Bn("xor", A, B), txt: "~(A ↔ B) ≡ A ⊻ B — a negação do “se e somente se” é o “ou… ou…”." },
    xor: { f: (A, B) => Bn("iff", A, B), txt: "~(A ⊻ B) ≡ A ↔ B — a negação do “ou… ou…” é o “se e somente se”." },
  };
  const NEG_ERRORS = {
    and: (A, B) => [Bn("and", negF(A), negF(B)), Bn("or", A, B), Bn("imp", negF(A), negF(B)), Bn("or", negF(A), B), Bn("and", negF(A), B)],
    or:  (A, B) => [Bn("or", negF(A), negF(B)), Bn("and", A, B), Bn("and", negF(A), B), Bn("imp", negF(A), negF(B))],
    imp: (A, B) => [Bn("imp", negF(A), negF(B)), Bn("imp", A, negF(B)), Bn("and", negF(A), B), Bn("or", negF(A), negF(B)), Bn("imp", B, A), Bn("and", negF(A), negF(B))],
    iff: (A, B) => [Bn("iff", negF(A), negF(B)), Bn("and", A, negF(B)), Bn("imp", A, negF(B)), Bn("or", negF(A), negF(B))],
    xor: (A, B) => [Bn("xor", negF(A), negF(B)), Bn("and", negF(A), negF(B)), Bn("or", A, B), Bn("xor", A, B)],
  };

  function genNegNL(d) {
    const c = DCFG[d], M = atoms(2);
    const op = pick(d === "easy" ? ["and", "or", "imp"] : d === "medium" ? ["and", "or", "imp", "imp", "iff"] : ["and", "or", "imp", "imp", "iff", "xor"]);
    const A = lit("p", chance(c.neg)), B = lit("q", chance(c.neg));
    const orig = Bn(op, A, B);
    const correct = simp(NEG_RULE[op].f(A, B));
    if (!equiv(correct, N(orig))) throw new Error("negação incorreta");
    const key = f => nl(f, M);
    const dis = pickDistractors(correct, NEG_ERRORS[op](A, B).map(simp), allBin(A, B).map(simp), 3, key);
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Negação de composta",
      prompt: `Qual é a negação de:<div class="sentence">${sentence(nl(orig, M))}</div>`,
      options: options.map(f => sentence(nl(f, M))), answer,
      label: "Negar: " + sentence(nl(orig, M)),
      explain: ch => sec("Regra", `<p class="ex-rule">${NEG_RULE[op].txt}</p>`) +
        sec("Aplicando", `${legend(M, ["p", "q"])}
          <p>Original: ${symHTML(orig)}</p><p>Negação: ${symHTML(correct)}</p>
          <p>Em português: <b>${sentence(nl(correct, M))}</b></p>`) +
        (ch !== answer ? counterEx(options[ch], N(orig), M, "a negação da frase original") : ""),
    };
  }

  const QUANT_PAIRS = [
    ["médico", "rico"], ["aluno", "aprovado"], ["político", "honesto"], ["gato", "preto"],
    ["bancário", "organizado"], ["candidato", "aprovado"], ["livro", "caro"], ["carro", "veloz"],
    ["professor", "paciente"], ["atleta", "disciplinado"], ["cliente", "satisfeito"], ["músico", "famoso"],
  ];
  const QUANT_FORMS = {
    T: [(x, y) => `Todo ${x} é ${y}`],
    A: [(x, y) => `Algum ${x} é ${y}`, (x, y) => `Existe ${x} que é ${y}`, (x, y) => `Pelo menos um ${x} é ${y}`],
    E: [(x, y) => `Nenhum ${x} é ${y}`, (x, y) => `Não existe ${x} que seja ${y}`],
    O: [(x, y) => `Algum ${x} não é ${y}`, (x, y) => `Existe ${x} que não é ${y}`, (x, y) => `Pelo menos um ${x} não é ${y}`, (x, y) => `Nem todo ${x} é ${y}`],
  };
  const QUANT_NEG = { T: "O", O: "T", A: "E", E: "A" };
  const QUANT_RULE = {
    T: "Negação de <b>“Todo A é B”</b> → <b>“Algum A não é B”</b> (basta um contraexemplo).",
    O: "Negação de <b>“Algum A não é B”</b> → <b>“Todo A é B”</b>.",
    A: "Negação de <b>“Algum A é B”</b> → <b>“Nenhum A é B”</b>.",
    E: "Negação de <b>“Nenhum A é B”</b> → <b>“Algum A é B”</b>.",
  };

  function genNegQuant() {
    const [x, y] = pick(QUANT_PAIRS);
    const cls = pick(Object.keys(QUANT_FORMS));
    const negCls = QUANT_NEG[cls];
    const orig = QUANT_FORMS[cls][0](x, y) + ".";
    const correct = pick(QUANT_FORMS[negCls])(x, y) + ".";
    const dis = Object.keys(QUANT_FORMS).filter(k => k !== negCls).map(k => pick(QUANT_FORMS[k])(x, y) + ".");
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Negação com quantificadores",
      prompt: `Qual é a negação de:<div class="sentence">${orig}</div>`,
      options, answer,
      label: "Negar: " + orig,
      explain: ch => sec("Regra", `<p class="ex-rule">${QUANT_RULE[cls]}</p>`) +
        sec("Por quê?", cls === "T" || cls === "O"
          ? `<p>Para mostrar que “Todo ${x} é ${y}” é falsa, basta encontrar <b>um</b> ${x} que não seja ${y}. Não precisa que “nenhum” seja!</p>`
          : `<p>“Algum ${x} é ${y}” diz que existe pelo menos um. O contrário disso é <b>não existir nenhum</b>.</p>`) +
        sec("Tabela de negações", `<p>Todo A é B ⟷ Algum A não é B<br>Algum A é B ⟷ Nenhum A é B</p>
          <p class="muted">“Algum A não é B” = “Existe A que não é B” = “Pelo menos um A não é B” = “Nem todo A é B”.</p>`) +
        (ch !== answer ? sec("Sua opção", `<p>“${options[ch]}” não é a negação: a negação precisa ser verdadeira exatamente quando a original é falsa.</p>`, "ex-wrong") : ""),
    };
  }

  // empurra a negação para dentro, registrando as regras usadas
  function negPush(f, used) {
    switch (f.t) {
      case "var": return N(f);
      case "not": used.add("Dupla negação: ~~A ≡ A"); return f.a;
      case "and": used.add(NEG_RULE.and.txt); return Bn("or", negPush(f.a, used), negPush(f.b, used));
      case "or":  used.add(NEG_RULE.or.txt);  return Bn("and", negPush(f.a, used), negPush(f.b, used));
      case "imp": used.add(NEG_RULE.imp.txt); return Bn("and", f.a, negPush(f.b, used));
      case "iff": used.add(NEG_RULE.iff.txt); return Bn("xor", f.a, f.b);
      case "xor": used.add(NEG_RULE.xor.txt); return Bn("iff", f.a, f.b);
    }
  }
  function naiveNeg(f) { // erro comum: negar só as folhas
    if (f.t === "var") return N(f);
    if (f.t === "not") return f.a.t === "var" ? f.a : N(naiveNeg(f.a));
    return Bn(f.t, naiveNeg(f.a), naiveNeg(f.b));
  }

  function genNegSym(d) {
    const c = DCFG[d];
    const f = randFormula(["p", "q", "r"], d === "hard" ? 2 : pick([1, 2]), c.ops, c.neg);
    const used = new Set();
    const correct = simp(negPush(f, used));
    if (!equiv(correct, N(f))) throw new Error("negação simbólica incorreta");
    const dis = pickDistractors(correct, [simp(naiveNeg(f)), simp(f)], mutations(correct), 3, x => sym(x));
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Negação simbólica",
      prompt: `Qual proposição é equivalente à negação de:<div class="sentence fx">${sym(f)}</div>`,
      options: options.map(f => sym(f)), optionClass: "fx", answer,
      label: `~(${sym(f)})`,
      explain: ch => sec("Regras aplicadas (de fora para dentro)", [...used].map(r => `<p class="ex-rule">${r}</p>`).join("")) +
        sec("Resultado", `<p>~(${sym(f)})</p><p>≡ ${symHTML(correct)}</p>`) +
        (ch !== answer ? counterEx(options[ch], N(f), null, "a negação") : ""),
    };
  }

  /* ════════════════════════════════════════════════════════════
     5. EQUIVALÊNCIAS
  ════════════════════════════════════════════════════════════ */
  function equivRewrites(f) {
    const a = f.a, b = f.b;
    switch (f.t) {
      case "imp": return [
        { f: Bn("imp", negF(b), negF(a)), law: "<b>Contrapositiva</b>: A → B ≡ ~B → ~A (inverte a ordem e nega as duas)." },
        { f: Bn("or", negF(a), b), law: "<b>Condicional como disjunção</b>: A → B ≡ ~A ∨ B (nega a primeira, mantém a segunda, troca por “ou”)." },
        { f: N(Bn("and", a, negF(b))), law: "<b>Dupla negação da condicional</b>: A → B ≡ ~(A ∧ ~B)." },
      ];
      case "or": return [
        { f: Bn("imp", negF(a), b), law: "<b>Disjunção como condicional</b>: A ∨ B ≡ ~A → B." },
        { f: Bn("imp", negF(b), a), law: "<b>Disjunção como condicional</b>: A ∨ B ≡ ~B → A." },
        { f: N(Bn("and", negF(a), negF(b))), law: "<b>De Morgan</b>: A ∨ B ≡ ~(~A ∧ ~B)." },
      ];
      case "and": return [
        { f: N(Bn("or", negF(a), negF(b))), law: "<b>De Morgan</b>: A ∧ B ≡ ~(~A ∨ ~B)." },
        { f: N(Bn("imp", a, negF(b))), law: "<b>Negação da condicional</b>: A ∧ B ≡ ~(A → ~B)." },
        { f: Bn("and", b, a), law: "<b>Comutativa</b>: A ∧ B ≡ B ∧ A." },
      ];
      case "iff": return [
        { f: Bn("and", Bn("imp", a, b), Bn("imp", b, a)), law: "<b>Bicondicional</b>: A ↔ B ≡ (A → B) ∧ (B → A)." },
        { f: Bn("iff", negF(a), negF(b)), law: "<b>Bicondicional</b>: A ↔ B ≡ ~A ↔ ~B." },
        { f: N(Bn("xor", a, b)), law: "A ↔ B ≡ ~(A ⊻ B)." },
      ];
      case "xor": return [
        { f: N(Bn("iff", a, b)), law: "A ⊻ B ≡ ~(A ↔ B)." },
        { f: Bn("iff", a, negF(b)), law: "A ⊻ B ≡ A ↔ ~B." },
      ];
    }
  }
  const EQ_ERRORS = {
    imp: (A, B) => [Bn("imp", B, A), Bn("imp", negF(A), negF(B)), Bn("and", A, negF(B)), Bn("or", A, negF(B)), Bn("and", negF(A), B)],
    or:  (A, B) => [Bn("and", A, B), Bn("imp", A, B), Bn("or", negF(A), negF(B)), Bn("imp", negF(A), negF(B)), Bn("imp", A, negF(B))],
    and: (A, B) => [Bn("or", negF(A), negF(B)), Bn("and", negF(A), negF(B)), Bn("imp", A, B), N(Bn("or", A, B))],
    iff: (A, B) => [Bn("iff", A, negF(B)), Bn("xor", A, B), Bn("imp", A, B), Bn("and", A, B)],
    xor: (A, B) => [Bn("iff", A, B), Bn("or", A, B), Bn("and", A, negF(B)), Bn("xor", negF(A), B)],
  };
  const EQ_NAMES = {
    imp: (A, B) => [[Bn("imp", B, A), "recíproca (B → A), que <b>não</b> é equivalente"], [Bn("imp", negF(A), negF(B)), "inversa (~A → ~B), que <b>não</b> é equivalente"]],
  };

  function genEquivNL(d) {
    const c = DCFG[d], M = atoms(2);
    const op = pick(d === "easy" ? ["imp", "imp", "or"] : d === "medium" ? ["imp", "imp", "or", "and", "iff"] : ["imp", "imp", "or", "and", "iff", "xor"]);
    const A = lit("p", chance(c.neg)), B = lit("q", chance(c.neg));
    const orig = Bn(op, A, B);
    let rw = equivRewrites(orig).map(r => ({ f: simp(r.f), law: r.law }));
    if (d === "easy") rw = rw.filter(r => !(r.f.t === "not" || r.f.t === "and" && op === "iff"));
    const chosen = pick(rw);
    if (!equiv(chosen.f, orig)) throw new Error("equivalência incorreta");
    const key = f => nl(f, M);
    const dis = pickDistractors(chosen.f, EQ_ERRORS[op](A, B).map(simp), allBin(A, B).map(simp), 3, key);
    const { options, answer } = mkOptions(chosen.f, dis);
    return {
      kind: "Equivalência",
      prompt: `Qual proposição é <b>equivalente</b> a:<div class="sentence">${sentence(nl(orig, M))}</div>`,
      options: options.map(f => sentence(nl(f, M))), answer,
      label: "Equivalente a: " + sentence(nl(orig, M)),
      explain: ch => {
        let extra = "";
        if (ch !== answer && EQ_NAMES[op]) {
          const hit = EQ_NAMES[op](A, B).find(([g]) => sym(simp(g)) === sym(options[ch]));
          if (hit) extra = `<p class="ex-rule">Você marcou a ${hit[1]}. Pegadinha clássica de concurso!</p>`;
        }
        return sec("Lei usada", `<p class="ex-rule">${chosen.law}</p>`) +
          sec("Aplicando", `${legend(M, ["p", "q"])}<p>Original: ${symHTML(orig)}</p><p>Equivalente: ${symHTML(chosen.f)}</p>`) +
          (ch !== answer ? sec("Sua opção", extra, "ex-wrong") + counterEx(options[ch], orig, M, "a frase original") : "");
      },
    };
  }

  function genEquivSym(d) {
    const c = DCFG[d];
    const f = randFormula(["p", "q", "r"], d === "hard" ? pick([1, 2]) : 1, c.ops, c.neg);
    const rw = pick(equivRewrites(f));
    const correct = simp(rw.f);
    if (!equiv(correct, f)) throw new Error("equivalência simbólica incorreta");
    const errs = f.t === "imp" ? [Bn("imp", f.b, f.a), Bn("imp", negF(f.a), negF(f.b))].map(simp) : [];
    const dis = pickDistractors(correct, errs, mutations(correct).concat(mutations(f)), 3, x => sym(x));
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Equivalência simbólica",
      prompt: `Qual proposição é <b>equivalente</b> a:<div class="sentence fx">${sym(f)}</div>`,
      options: options.map(f => sym(f)), optionClass: "fx", answer,
      label: `≡ ${sym(f)}`,
      explain: ch => sec("Lei usada", `<p class="ex-rule">${rw.law}</p><p>Aqui, A = ${symHTML(f.a)} e B = ${symHTML(f.b)}.</p>`) +
        sec("Resultado", `<p>${symHTML(f)} ≡ ${symHTML(correct)}</p>`) +
        (ch !== answer ? counterEx(options[ch], f, null, "a proposição original") : ""),
    };
  }

  /* ════════════════════════════════════════════════════════════
     6. TAUTOLOGIA / CONTRADIÇÃO / CONTINGÊNCIA
  ════════════════════════════════════════════════════════════ */
  const p = V("p"), q = V("q"), np = N(p), nq = N(q);
  const TAUT = [
    Bn("or", p, np), Bn("imp", Bn("and", p, q), p), Bn("imp", p, Bn("or", p, q)),
    Bn("imp", Bn("and", Bn("imp", p, q), p), q), Bn("iff", Bn("imp", p, q), Bn("imp", nq, np)),
    Bn("or", Bn("imp", p, q), Bn("imp", q, p)), N(Bn("and", p, np)), Bn("imp", Bn("and", Bn("imp", p, q), nq), np),
    Bn("or", Bn("and", p, q), Bn("or", np, nq)), Bn("iff", N(Bn("and", p, q)), Bn("or", np, nq)),
  ];
  const CONTR = [
    Bn("and", p, np), N(Bn("imp", p, Bn("or", p, q))), Bn("and", Bn("and", p, q), np), Bn("iff", p, np),
    Bn("and", Bn("imp", p, q), Bn("and", p, nq)), Bn("and", Bn("or", p, q), Bn("and", np, nq)),
    Bn("and", Bn("iff", p, q), Bn("xor", p, q)), N(Bn("or", p, np)),
  ];
  const CLS_LABEL = { taut: "Tautologia", contr: "Contradição", cont: "Contingência" };
  function renameVars(f, map) {
    if (f.t === "var") return V(map[f.n] || f.n);
    if (f.t === "not") return N(renameVars(f.a, map));
    return Bn(f.t, renameVars(f.a, map), renameVars(f.b, map));
  }

  function genClassify(d) {
    const c = DCFG[d];
    const target = pick(["taut", "contr", "cont"]);
    let f;
    if (target === "taut") f = pick(TAUT);
    else if (target === "contr") f = pick(CONTR);
    else {
      do { f = randFormula(["p", "q"], d === "easy" ? 1 : 2, c.ops, c.neg); } while (classify(f) !== "cont");
    }
    if (chance(0.5)) f = renameVars(f, { p: "q", q: "p" });
    const cls = classify(f);
    const order = ["taut", "contr", "cont"];
    const vals = allEnvs(varList(f)).map(e => ev(f, e));
    return {
      kind: "Tautologia, contradição ou contingência",
      prompt: `Como se classifica a proposição abaixo?<div class="sentence fx">${sym(f)}</div>`,
      options: order.map(k => CLS_LABEL[k]), answer: order.indexOf(cls),
      label: sym(f),
      explain: () => sec("Monte a tabela-verdade", formulaTT(f) +
        `<p>Última coluna: ${vals.map(tv).join(" ")} → <b>${CLS_LABEL[cls]}</b>.</p>`) +
        sec("Definições", `<p class="ex-rule"><b>Tautologia</b>: sempre V. <b>Contradição</b>: sempre F. <b>Contingência</b>: às vezes V, às vezes F.</p>`),
    };
  }

  /* ════════════════════════════════════════════════════════════
     7. DEDUÇÃO / "EQUAÇÕES" LÓGICAS
  ════════════════════════════════════════════════════════════ */
  function rootHint(f, val) {
    if (f.t === "imp") return val ? "Condicional V: só não pode ocorrer V → F." : "Condicional F ⇒ antecedente <b>V</b> e consequente <b>F</b> (único caso).";
    if (f.t === "and") return val ? "Conjunção V ⇒ <b>todas</b> as partes são V." : "Conjunção F ⇒ pelo menos uma parte é F.";
    if (f.t === "or")  return val ? "Disjunção V ⇒ pelo menos uma parte é V." : "Disjunção F ⇒ <b>todas</b> as partes são F.";
    if (f.t === "iff") return val ? "Bicondicional V ⇒ as partes têm valores <b>iguais</b>." : "Bicondicional F ⇒ as partes têm valores <b>diferentes</b>.";
    if (f.t === "xor") return val ? "Disjunção exclusiva V ⇒ valores <b>diferentes</b>." : "Disjunção exclusiva F ⇒ valores <b>iguais</b>.";
    if (f.t === "not") return "Negação: o que está dentro tem o valor oposto.";
    return "";
  }
  const IND = "Não é possível determinar";

  function genDeduceNL(d) {
    const c = DCFG[d];
    for (let tries = 0; tries < 100; tries++) {
      const M = atoms(2);
      const op = pick(d === "easy" ? ["imp", "imp", "or", "and"] : c.ops.concat("imp"));
      const A = lit("p", chance(c.neg)), B = lit("q", chance(c.neg));
      const F = Bn(op, A, B);
      const val = ["and", "or", "imp"].includes(op) && chance(0.25) ? false : true;
      const envs = allEnvs(["p", "q"]).filter(e => ev(F, e) === val);
      const premText = val ? `${quote(nl(F, M))} é <b>verdadeira</b>.` : `${quote(nl(F, M))} é <b>falsa</b>.`;
      const table = (factVar, factVal) => ttHTML(["p", "q"], [{ label: sym(F), fn: e => ev(F, e), hl: true }],
        e => ev(F, e) === val && (factVar == null || e[factVar] === factVal));
      const statement = (v, b) => cap(b ? M[v].pos : M[v].neg) + ".";

      if (envs.length === 1) {
        const e0 = envs[0];
        const all = allEnvs(["p", "q"]);
        const txt = e => `${cap(M.p[e.p ? "pos" : "neg"])} e ${M.q[e.q ? "pos" : "neg"]}.`;
        const correct = all.find(e => e.p === e0.p && e.q === e0.q);
        const { options, answer } = mkOptions(correct, all.filter(e => e !== correct));
        return {
          kind: "Dedução",
          prompt: `Sabe-se que a proposição ${premText}<br>Logo, é correto concluir que:`,
          options: options.map(txt), answer,
          label: `${cap(nl(F, M))} é ${val ? "V" : "F"}`,
          explain: () => sec("Chave da questão", `<p class="ex-rule">${rootHint(F, val)}</p>`) +
            sec("Teste as possibilidades", `${legend(M, ["p", "q"])}${table()}
              <p>A linha destacada é a única em que a proposição é ${tv(val)}: ${envText(e0, ["p", "q"], M)}.</p>`),
        };
      }

      const fv = pick(["p", "q"]), fe = pick(envs), fval = fe[fv];
      const tvv = fv === "p" ? "q" : "p";
      const envs2 = envs.filter(e => e[fv] === fval);
      const vals = new Set(envs2.map(e => e[tvv]));
      const determined = vals.size === 1;
      if (!determined && chance(0.55)) continue;

      let pattern = "";
      if (val && op === "imp") {
        const litOn = fv === "p" ? A : B, lv = ev(litOn, { [fv]: fval });
        if (fv === "p") pattern = lv ? "<b>Modus Ponens</b>: se A → B é V e A é V, então B é V."
          : "<b>Falácia da negação do antecedente</b>: se A → B é V e A é F, nada se conclui sobre B (F → V e F → F são ambas V).";
        else pattern = lv ? "<b>Falácia da afirmação do consequente</b>: se A → B é V e B é V, nada se conclui sobre A."
          : "<b>Modus Tollens</b>: se A → B é V e B é F, então A é F (senão teríamos V → F).";
      } else if (val && op === "or") {
        const litOn = fv === "p" ? A : B, lv = ev(litOn, { [fv]: fval });
        pattern = lv ? "Se uma parte da disjunção já é V, a disjunção já está garantida e <b>nada</b> se conclui sobre a outra."
          : "<b>Silogismo disjuntivo</b>: se A ∨ B é V e uma das partes é F, a outra tem que ser V.";
      } else pattern = rootHint(F, val);

      const correct = determined ? statement(tvv, [...vals][0]) : IND;
      const opts = shuffle([statement(tvv, true), statement(tvv, false)]);
      opts.push(IND);
      return {
        kind: "Dedução",
        prompt: `Considere as informações:<ol class="prem"><li>${premText}</li><li>${quote((fval ? M[fv].pos : M[fv].neg))} é <b>verdadeira</b>.</li></ol>Logo:`,
        options: opts, answer: opts.indexOf(correct),
        label: `${cap(nl(F, M))} (${vf(val)}); ${cap(fval ? M[fv].pos : M[fv].neg)}`,
        explain: () => sec("Chave da questão", `<p class="ex-rule">${pattern}</p>`) +
          sec("Teste as possibilidades", `${legend(M, ["p", "q"])}
            <p>Ficamos com as linhas em que a premissa é ${tv(val)} <b>e</b> ${fv} = ${tv(fval)}:</p>${table(fv, fval)}
            <p>${determined ? `Em todas elas, ${tvv} = ${tv([...vals][0])}. Conclusão: <b>${correct}</b>.`
              : `Há linhas com ${tvv} = V e com ${tvv} = F, então <b>não é possível determinar</b>.`}</p>`),
      };
    }
    return genDeduceNL("easy");
  }

  function genDeduceSym(d) {
    const c = DCFG[d];
    const vs = d === "easy" ? ["p", "q"] : ["p", "q", "r"];
    const nPrem = d === "hard" ? 2 : 1;
    for (let tries = 0; tries < 300; tries++) {
      const prem = [];
      for (let i = 0; i < nPrem; i++) prem.push({ f: randFormula(vs, d === "easy" ? 1 : pick([1, 2]), c.ops, c.neg), val: chance(0.5) });
      const used = varList(...prem.map(x => x.f));
      const envs = allEnvs(used).filter(e => prem.every(x => ev(x.f, e) === x.val));
      if (!envs.length) continue;
      const det = used.filter(v => new Set(envs.map(e => e[v])).size === 1);
      const und = used.filter(v => !det.includes(v));
      const wantDet = chance(0.75);
      let target;
      if (wantDet && det.length) target = pick(det);
      else if (!wantDet && und.length) target = pick(und);
      else continue;
      const isDet = det.includes(target);
      const answer = isDet ? (envs[0][target] ? 0 : 1) : 2;
      const premHTML = prem.map(x => `<li><span class="fx">${sym(x.f)}</span> é <b>${x.val ? "verdadeira" : "falsa"}</b></li>`).join("");
      const table = ttHTML(used, prem.map((x, i) => ({ label: sym(x.f), fn: e => ev(x.f, e), hl: true })),
        e => prem.every(x => ev(x.f, e) === x.val));
      return {
        kind: "Equação lógica",
        prompt: `Sabendo que:<ol class="prem">${premHTML}</ol>Qual é o valor lógico de <b class="fx">${target}</b>?`,
        options: ["Verdadeiro (V)", "Falso (F)", IND], answer,
        label: prem.map(x => `${sym(x.f)} = ${vf(x.val)}`).join("; ") + ` → ${target}?`,
        explain: () => sec("Comece pelas premissas que “travam” valores",
          prem.map(x => `<p class="ex-rule"><span class="fx">${sym(x.f)}</span> = ${tv(x.val)}: ${rootHint(x.f, x.val)}</p>`).join("")) +
          sec("Tabela-verdade (linhas que satisfazem tudo em destaque)", table +
            `<p>${isDet ? `Em todas as linhas destacadas, ${target} = ${tv(envs[0][target])}.`
              : `Nas linhas destacadas, ${target} aparece como V e como F, então <b>não é possível determinar</b>.`}</p>`),
      };
    }
    return genDeduceSym("easy");
  }

  /* ════════════════════════════════════════════════════════════
     TÓPICOS (trilha)
  ════════════════════════════════════════════════════════════ */
  const W = (e, m, h) => ({ easy: e, medium: m, hard: h });
  const TOPICS = [
    { id: "prop", label: "Proposições", icon: "💬", color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE",
      desc: "O que é (e o que não é) proposição; simples × composta",
      gens: [[genIsProp, W(1, 1, 1)], [genSimpleComp, W(1, 1, 1)]] },
    { id: "conn", label: "Conectivos", icon: "🔗", color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE",
      desc: "e, ou, se…então, somente se, condição suficiente/necessária",
      gens: [[genConnective, W(1, 1, 1)], [genTranslate, W(1, 1.5, 1.5)]] },
    { id: "valor", label: "Valor lógico", icon: "✅", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0",
      desc: "Tabela-verdade dos conectivos e cálculo de valores",
      gens: [[genEvalNL, W(1.5, 1, 0.5)], [genEvalSym, W(1, 1.5, 2)], [genRows, W(0.4, 0.4, 0.4)]] },
    { id: "neg", label: "Negação", icon: "🚫", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA",
      desc: "De Morgan, negação da condicional e quantificadores",
      gens: [[genNegNL, W(2, 2, 1.5)], [genNegQuant, W(1, 1, 1)], [genNegSym, W(0, 0.7, 1.2)]] },
    { id: "eq", label: "Equivalências", icon: "🟰", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A",
      desc: "Contrapositiva, condicional ↔ disjunção e outras leis",
      gens: [[genEquivNL, W(2, 2, 1.5)], [genEquivSym, W(0, 0.8, 1.2)]] },
    { id: "taut", label: "Tautologia", icon: "♾️", color: "#06B6D4", bg: "#ECFEFF", border: "#A5F3FC",
      desc: "Tautologia, contradição ou contingência",
      gens: [[genClassify, W(1, 1, 1)]] },
    { id: "ded", label: "Dedução", icon: "🧩", color: "#EC4899", bg: "#FDF2F8", border: "#FBCFE8",
      desc: "Descubra valores: equações lógicas, Modus Ponens/Tollens",
      gens: [[genDeduceNL, W(2, 1.5, 1)], [genDeduceSym, W(0.7, 1, 1.5)]] },
  ];

  function generate(topicId, diff) {
    const t = TOPICS.find(x => x.id === topicId);
    const gens = t.gens.filter(g => g[1][diff] > 0);
    const total = gens.reduce((s, g) => s + g[1][diff], 0);
    let r = Math.random() * total, fn = gens[0][0];
    for (const [g, w] of gens) { if ((r -= w[diff]) <= 0) { fn = g; break; } }
    const q = fn(diff);
    q.topic = topicId;
    return q;
  }

  /* ── Teoria (resumos) ─────────────────────────────────────── */
  const TT_ALL = ttHTML(["p", "q"], Object.keys(SYM).map(op => ({ label: `p ${SYM[op]} q`, fn: e => ev(Bn(op, p, q), e) })));
  const THEORY = {
    prop: PROP_CONCEPT + sec("Simples × composta",
      `<p><b>Simples</b>: uma única afirmação. Ex.: “Ana estuda.”</p>
       <p><b>Composta</b>: duas ou mais ligadas por conectivos. Ex.: “Ana estuda <u>e</u> Bruno trabalha.”</p>`) +
      sec("Princípios", `<p class="ex-rule"><b>Identidade</b>: uma proposição V é V; F é F.<br><b>Não contradição</b>: não pode ser V e F ao mesmo tempo.<br><b>Terceiro excluído</b>: ou é V, ou é F — não há terceira opção.</p>`),
    conn: sec("Conectivos", Object.keys(SYM).map(o => `<p class="ex-rule">${RULE[o]}</p>`).join("")) +
      sec("Formas da condicional (A → B)", `<p>Se A, então B · Quando A, B · B, se A · A somente se B<br>
        A é condição <b>suficiente</b> para B · B é condição <b>necessária</b> para A</p>`) +
      sec("Dica", `<p class="ex-rule">“mas”, “porém”, “contudo” = conjunção (∧). “ou… ou…” = disjunção exclusiva (⊻).</p>`),
    valor: sec("Tabela-verdade dos conectivos", TT_ALL) +
      sec("Número de linhas", `<p>Com <b>n</b> proposições simples, a tabela tem <b>2<sup>n</sup></b> linhas (2, 4, 8, 16, 32…).</p>`) +
      sec("Como calcular", `<p class="ex-rule">Substitua os valores e resolva de <b>dentro para fora</b>: negações e parênteses primeiro.</p>`),
    neg: sec("Negação das compostas", Object.keys(NEG_RULE).map(o => `<p class="ex-rule">${NEG_RULE[o].txt}</p>`).join("")) +
      sec("Quantificadores", `<p>Todo A é B ⟷ Algum A não é B<br>Algum A é B ⟷ Nenhum A é B</p>`) +
      sec("Pegadinha", `<p class="ex-rule">A negação de “Se A, então B” <b>não</b> é “Se não A, então não B”. É “A <b>e</b> não B”.</p>`),
    eq: sec("Equivalências mais cobradas", `
      <p class="ex-rule">A → B ≡ ~B → ~A (contrapositiva)</p>
      <p class="ex-rule">A → B ≡ ~A ∨ B</p>
      <p class="ex-rule">A ∨ B ≡ ~A → B</p>
      <p class="ex-rule">A ↔ B ≡ (A → B) ∧ (B → A)</p>
      <p class="ex-rule">~(A ∧ B) ≡ ~A ∨ ~B · ~(A ∨ B) ≡ ~A ∧ ~B (De Morgan)</p>`) +
      sec("Não são equivalentes!", `<p class="ex-rule">Recíproca (B → A) e inversa (~A → ~B) <b>não</b> equivalem a A → B.</p>`),
    taut: sec("Definições", `<p class="ex-rule"><b>Tautologia</b>: V em todas as linhas. Ex.: p ∨ ~p</p>
      <p class="ex-rule"><b>Contradição</b>: F em todas as linhas. Ex.: p ∧ ~p</p>
      <p class="ex-rule"><b>Contingência</b>: tem linhas V e linhas F. Ex.: p → q</p>`) +
      sec("Exemplo: p ∨ ~p", formulaTT(Bn("or", p, np))),
    ded: sec("Regras de inferência", `
      <p class="ex-rule"><b>Modus Ponens</b>: A → B, A ⊢ B</p>
      <p class="ex-rule"><b>Modus Tollens</b>: A → B, ~B ⊢ ~A</p>
      <p class="ex-rule"><b>Silogismo disjuntivo</b>: A ∨ B, ~A ⊢ B</p>`) +
      sec("Falácias (não concluem nada!)", `<p class="ex-rule">Afirmar o consequente: A → B, B ⊢ A ✗<br>Negar o antecedente: A → B, ~A ⊢ ~B ✗</p>`) +
      sec("Equações lógicas", `<p>Comece pela premissa que só admite <b>um</b> caso:</p>
        <p class="ex-rule">Condicional F ⇒ V → F · Conjunção V ⇒ tudo V · Disjunção F ⇒ tudo F</p>
        <p>Depois substitua os valores descobertos nas outras premissas.</p>`),
  };

  global.LogicEngine = {
    TOPICS, THEORY, generate,
    // exportados para testes
    _internal: { ev, equiv, sym, simp, classify, allEnvs, varList, randFormula, negPush, DCFG },
  };
})(typeof window !== "undefined" ? window : globalThis);
