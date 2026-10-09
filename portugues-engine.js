/* ════════════════════════════════════════════════════════════
   PORTUGUÊS — Fonologia, divisão silábica e acentuação
   Gera questões a partir de um banco de palavras com a separação
   silábica e a posição da sílaba tônica. As regras de acentuação
   são calculadas por código (needsAccent) e os testes conferem que
   batem com a grafia de cada palavra do banco.
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
  const uniq = a => [...new Set(a)];
  function mkOptions(correct, distractors) {
    const all = shuffle([correct, ...distractors]);
    return { options: all, answer: all.indexOf(correct) };
  }
  const sec = (title, body, cls = "") =>
    `<div class="ex-sec ${cls}"><div class="ex-title">${title}</div>${body}</div>`;
  const big = w => `<div class="sentence" style="text-align:center;font-size:26px">${w}</div>`;

  /* ── Letras ──────────────────────────────────────────────── */
  const ACUTE = { a: "á", e: "é", i: "í", o: "ó", u: "ú" };
  const CIRC  = { a: "â", e: "ê", o: "ô" };
  const STRIP = { á: "a", é: "e", í: "i", ó: "o", ú: "u", â: "a", ê: "e", ô: "o", à: "a" };
  const VOWELS = "aeiouáéíóúâêôãõà";
  const isVowel = c => VOWELS.includes(c);
  const strip = w => [...w].map(c => STRIP[c] || c).join("");
  const accentIdx = w => [...w].findIndex(c => STRIP[c]);

  /* ════════════════════════════════════════════════════════════
     BANCO DE PALAVRAS
     "sí-la-bas t nível [tags]"
     t = posição da tônica contando do fim (1 = última, 2 = penúltima, 3 = antepenúltima)
     nível 1 = fácil, 2 = médio, 3 = difícil
     tags: dit  = ditongo aberto acentuado (éi, éu, ói)
           hia  = hiato acentuado (i/u tônico)
           dcr  = paroxítona terminada em ditongo crescente (história, água)
           abN  = ditongo aberto em paroxítona, sem acento pelo Acordo (ideia)
           dupN = "oo"/"eem" sem acento pelo Acordo (voo, leem)
           difN = acento diferencial abolido (para, pelo)
           hiaN = hiato que NÃO leva acento (rainha, juiz)
           nosplit = separação polêmica, fora das questões de divisão
  ════════════════════════════════════════════════════════════ */
  const RAW = `
ca-sa 2 1|me-sa 2 1|ja-ne-la 2 1|bo-ni-to 2 1|pe-que-no 2 1|li-vro 2 1|ca-dei-ra 2 1|car-ro 2 1|gar-fo 2 1
cho-co-la-te 2 1|ma-ca-co 2 1|chu-va 2 1|fi-lho 2 1|ni-nho 2 1|por-ta 2 1|pa-la-vra 2 1|blo-co 2 1|cla-ro 2 1
ca-fé 1 1|so-fá 1 1|vo-cê 1 1|a-vô 1 1|a-vó 1 1|ma-ra-cu-já 1 1|ja-ca-ré 1 1|pa-le-tó 1 1|ji-ló 1 1
tam-bém 1 1|al-guém 1 1|pa-ra-béns 1 1|ar-ma-zém 1 1|in-glês 1 1|por-tu-guês 1 1|ma-çã 1 1
ca-ju 1 1|ta-tu 1 1|a-mor 1 1|pa-pel 1 1|a-zul 1 1|fe-liz 1 1|a-ba-ca-xi 1 1|u-ru-bu 1 1|co-li-bri 1 1
pai-xão 1 1|fei-jão 1 1|cai-xa 2 1|co-e-lho 2 1|po-e-ta 2 1|lu-a 2 1|di-a 2 1
lâm-pa-da 3 1|mé-di-co 3 1|pás-sa-ro 3 1|ár-vo-re 3 1|mú-si-ca 3 1|ú-ni-co 3 1|xí-ca-ra 3 1|sí-la-ba 3 1
fá-cil 2 1|lá-pis 2 1|tê-nis 2 1|ál-bum 2 1|a-çú-car 2 1
pé 1 1|pá 1 1|pó 1 1|já 1 1|só 1 1|nós 1 1|três 1 1|mês 1 1|mar 1 1|sol 1 1|flor 1 1|luz 1 1|mel 1 1
ca-rá-ter 2 2|tó-rax 2 2|bí-ceps 2 2|ór-fã 2 2|ór-gão 2 2|jú-ri 2 2|ví-rus 2 2|pô-nei 2 2|hí-fen 2 2
pó-len 2 2|a-má-vel 2 2|im-pos-sí-vel 2 2|re-pór-ter 2 2|bô-nus 2 2|fó-rum 2 2|í-mã 2 2|vô-lei 2 2|jó-quei 2 2
i-tem 2 2|hi-fens 2 2|jo-vem 2 2|ho-mem 2 2|nu-vem 2 2
câ-me-ra 3 2|ma-te-má-ti-ca 3 2|re-lâm-pa-go 3 2|prá-ti-co 3 2|ló-gi-ca 3 2|gra-má-ti-ca 3 2|ô-ni-bus 3 2
pú-bli-co 3 2|rá-pi-do 3 2|cé-re-bro 3 2|fô-le-go 3 2|â-ni-mo 3 2|quí-mi-ca 3 2|há-bi-to 3 2|téc-ni-co 3 2
sa-í-da 2 2 hia|sa-ú-de 2 2 hia|ba-ú 1 2 hia|pa-ís 1 2 hia|vi-ú-va 2 2 hia|con-te-ú-do 2 2 hia
he-rói 1 2 dit|cha-péu 1 2 dit|pa-péis 1 2 dit|a-néis 1 2 dit|tro-féu 1 2 dit|céu 1 2 dit|réu 1 2 dit|dói 1 2 dit
fu-nil 1 2|ra-paz 1 2|ja-bu-ti 1 2|sa-ci 1 2|i-guais 1 2|sa-guão 1 2|op-ção 1 2|ri-o 2 2
gui-tar-ra 2 2|ca-chor-ro 2 2|que-ri-do 2 2|guer-ra 2 2|a-tle-ta 2 2|nas-cer 1 2|des-ça 2 2|ad-vo-ga-do 2 2
rit-mo 2 2|ap-to 2 2|ob-je-to 2 2
his-tó-ria 2 2 dcr nosplit|sé-rie 2 2 dcr nosplit|á-gua 2 2 dcr nosplit|ré-gua 2 2 dcr nosplit
gló-ria 2 2 dcr nosplit|ma-té-ria 2 2 dcr nosplit|tê-nue 2 2 dcr nosplit|có-pia 2 2 dcr nosplit
e-xér-ci-to 3 3|psi-có-lo-go 3 3|pê-sa-mes 3 3
i-dei-a 2 3 abN|he-roi-co 2 3 abN|as-sem-blei-a 2 3 abN|joi-a 2 3 abN nosplit|ji-boi-a 2 3 abN nosplit
vo-o 2 3 dupN|en-jo-o 2 3 dupN|le-em 2 3 dupN|cre-em 2 3 dupN|de-em 2 3 dupN|ve-em 2 3 dupN
pa-ra 2 3 difN|pe-lo 2 3 difN|po-lo 2 3 difN|pe-ra 2 3 difN
fei-u-ra 2 3 hiaN|ra-i-nha 2 3 hiaN|ju-iz 1 3 hiaN|ra-iz 1 3 hiaN|ca-ir 1 3 hiaN|ru-im 1 3 hiaN
ra-í-zes 2 3 hia|ju-í-zes 2 3 hia|e-go-ís-ta 2 3 hia|fa-ís-ca 2 3 hia|he-ro-í-na 2 3 hia|gra-ú-do 2 3 hia`;

  const WORDS = RAW.trim().split(/[|\n]/).map(s => s.trim()).filter(Boolean).map(s => {
    const [sy, t, lvl, ...tags] = s.split(/\s+/);
    const syl = sy.split("-");
    return { syl, word: syl.join(""), t: +t, lvl: +lvl, tags: new Set(tags) };
  });

  // forma antiga (antes do Acordo de 2009) — usada como distrator
  const OLD = {
    ideia: "idéia", heroico: "heróico", assembleia: "assembléia", joia: "jóia", jiboia: "jibóia",
    voo: "vôo", enjoo: "enjôo", leem: "lêem", creem: "crêem", deem: "dêem", veem: "vêem",
    feiura: "feiúra", para: "pára", pelo: "pêlo", polo: "pólo", pera: "pêra",
  };
  const HIA_N_NOTE = {
    feiura: "o <b>u</b> tônico vem depois de ditongo (fei-u-ra) numa paroxítona: pelo Acordo, não leva mais acento.",
    rainha: "o <b>i</b> tônico é seguido de <b>nh</b>: nesse caso o hiato não é acentuado.",
    juiz: "o <b>i</b> tônico divide a sílaba com o <b>z</b> (ju-iz), não está sozinho: sem acento. Compare: ju-í-zes.",
    raiz: "o <b>i</b> tônico divide a sílaba com o <b>z</b> (ra-iz): sem acento. Compare: ra-í-zes.",
    cair: "o <b>i</b> tônico divide a sílaba com o <b>r</b> (ca-ir): sem acento. Compare: ca-í-da.",
    ruim: "o <b>i</b> tônico divide a sílaba com o <b>m</b> (ru-im): sem acento.",
  };
  const TAG_NOTE = {
    abN: "Pelo <b>Novo Acordo Ortográfico</b>, os ditongos abertos <b>éi</b> e <b>ói</b> não são mais acentuados nas <b>paroxítonas</b> (ideia, heroico, assembleia, joia). Nas oxítonas e monossílabos continuam: papéis, herói, dói.",
    dupN: "O <b>Novo Acordo</b> aboliu o acento em <b>oo</b> (voo, enjoo) e em <b>eem</b> (leem, creem, deem, veem).",
    difN: "O <b>Novo Acordo</b> aboliu o acento diferencial de para (verbo), pelo, polo e pera. Continuam: <b>pôde</b> (passado) × pode e <b>pôr</b> (verbo) × por.",
  };

  /* ── Regras de acentuação ────────────────────────────────── */
  const RULES = {
    proparo: "Proparoxítona — todas são acentuadas",
    oxi:     "Oxítona terminada em a(s), e(s), o(s), em, ens",
    paro:    "Paroxítona terminada em l, n, r, x, ps, i(s), us, um, ã(s), ão(s), ei(s), on(s)",
    mono:    "Monossílabo tônico terminado em a(s), e(s), o(s)",
    hia:     "Hiato: i ou u tônico sozinho na sílaba (ou com s)",
    dit:     "Ditongo aberto éi, éu, ói em oxítona ou monossílabo",
    dcr:     "Paroxítona terminada em ditongo crescente (ia, ie, io, ua…)",
  };
  const RULE_EX = {
    proparo: "lâmpada, médico, pássaro", oxi: "café, você, também, parabéns", paro: "fácil, açúcar, lápis, vírus, órfã",
    mono: "pé, pá, só, três", hia: "saída, saúde, baú, país", dit: "papéis, chapéu, herói, céu", dcr: "história, série, água",
  };
  const OXI_END = /(?<![ãõ])(a|e|o)s?$|em$|ens$/;   // "ão", "ãe" não contam: ali o o/e é semivogal
  const PARO_END = /(l|n|r|x|ps|ã|ãs|ão|ãos|i|is|us|um|uns|on|ons|ei|eis)$/;
  const MONO_END = /(?<![ãõ])(a|e|o)s?$/;

  // devolve o id da regra que exige acento, ou null se a palavra não leva acento
  function accentRule(w) {
    const s = strip(w.word), n = w.syl.length;
    if (w.tags.has("hia")) return "hia";
    if (w.tags.has("dit")) return "dit";
    if (n === 1) return MONO_END.test(s) ? "mono" : null;
    if (w.t === 3) return "proparo";
    if (w.t === 1) return OXI_END.test(s) ? "oxi" : null;
    if (w.tags.has("dcr")) return "dcr";
    return PARO_END.test(s) ? "paro" : null;
  }
  const CLASS = { 1: "Oxítona", 2: "Paroxítona", 3: "Proparoxítona" };
  const tonicIdx = w => w.syl.length - w.t;
  const isMono = w => w.syl.length === 1;
  const hyph = (w, boldTonic) => w.syl.map((s, i) => (boldTonic && i === tonicIdx(w) ? `<b><u>${s}</u></b>` : s)).join("-");

  function whyNoAccent(w) {
    for (const t of ["abN", "dupN", "difN"]) if (w.tags.has(t)) return TAG_NOTE[t];
    if (w.tags.has("hiaN")) return "Hiato sem acento: " + HIA_N_NOTE[w.word];
    if (isMono(w)) return "Monossílabo tônico só leva acento se terminar em <b>a, e, o</b> (seguidos ou não de s).";
    if (w.t === 1) return "Oxítona só é acentuada se terminar em <b>a(s), e(s), o(s), em, ens</b>. Esta termina de outro jeito, então fica sem acento.";
    return "Paroxítona terminada em <b>a, e, o, em, ens</b> (o caso mais comum da língua) <b>não</b> é acentuada.";
  }
  function accentExplain(w) {
    const r = accentRule(w);
    const cls = isMono(w) ? "Monossílabo tônico" : CLASS[w.t];
    return sec("Passo a passo",
      `<p>1) Separe e ache a tônica: <b>${hyph(w, true)}</b> → ${cls.toLowerCase()}.</p>
       <p>2) Veja a terminação: <b>${strip(w.word)}</b>.</p>
       <p>3) ${r ? `Leva acento pela regra:` : `Não leva acento:`}</p>
       <p class="ex-rule">${r ? `<b>${RULES[r]}</b>. Ex.: ${RULE_EX[r]}.` : whyNoAccent(w)}</p>`);
  }

  /* ── Seleção de palavras por dificuldade ─────────────────── */
  const MAXLVL = { easy: 1, medium: 2, hard: 3 };
  function pool(d, filter) {
    const all = WORDS.filter(w => w.lvl <= MAXLVL[d] && filter(w));
    if (d === "hard") { // no difícil, privilegia as palavras mais traiçoeiras
      const hardOnes = all.filter(w => w.lvl >= 2);
      if (hardOnes.length && chance(0.7)) return hardOnes;
    }
    return all;
  }
  const canSplit = w => w.syl.length > 1 && !w.tags.has("nosplit");

  /* ════════════════════════════════════════════════════════════
     1. FONEMAS E LETRAS
  ════════════════════════════════════════════════════════════ */
  const PHON = [
    ["chave", 5, 4, "<b>ch</b> é dígrafo: duas letras para um único som."],
    ["chuva", 5, 4, "<b>ch</b> é dígrafo: duas letras, um fonema."],
    ["hora", 4, 3, "O <b>h</b> inicial não representa som nenhum."],
    ["hoje", 4, 3, "O <b>h</b> inicial não representa som nenhum."],
    ["hospital", 8, 7, "O <b>h</b> inicial não tem som."],
    ["táxi", 4, 5, "O <b>x</b> aqui representa dois sons: /ks/."],
    ["fixo", 4, 5, "O <b>x</b> representa dois sons: /ks/."],
    ["tóxico", 6, 7, "O <b>x</b> representa dois sons: /ks/."],
    ["carro", 5, 4, "<b>rr</b> é dígrafo: um só som."],
    ["passo", 5, 4, "<b>ss</b> é dígrafo: um só som."],
    ["assado", 6, 5, "<b>ss</b> é dígrafo: um só som."],
    ["ninho", 5, 4, "<b>nh</b> é dígrafo: um só som."],
    ["manhã", 5, 4, "<b>nh</b> é dígrafo; o <b>ã</b> é uma vogal nasal (um fonema)."],
    ["filho", 5, 4, "<b>lh</b> é dígrafo: um só som."],
    ["molho", 5, 4, "<b>lh</b> é dígrafo: um só som."],
    ["guerra", 6, 4, "Dois dígrafos: <b>gu</b> (o u não soa) e <b>rr</b>."],
    ["queijo", 6, 5, "<b>qu</b> é dígrafo: o u não é pronunciado."],
    ["aquilo", 6, 5, "<b>qu</b> é dígrafo: o u não é pronunciado."],
    ["nascer", 6, 5, "<b>sc</b> é dígrafo: soa como um único /s/."],
    ["campo", 5, 4, "<b>am</b> é dígrafo nasal: representa uma vogal nasal /ã/."],
    ["tinta", 5, 4, "<b>in</b> é dígrafo nasal: representa uma vogal nasal /ĩ/."],
    ["gato", 4, 4, "Cada letra representa um fonema."],
    ["bola", 4, 4, "Cada letra representa um fonema."],
    ["mesa", 4, 4, "Cada letra representa um fonema (o s tem som de /z/, mas é um só)."],
    ["livro", 5, 5, "<b>vr</b> é encontro consonantal: as duas consoantes são pronunciadas."],
    ["prato", 5, 5, "<b>pr</b> é encontro consonantal: os dois sons aparecem."],
  ];
  function genPhonemes() {
    const [w, L, F, note] = pick(PHON);
    const fmt = (l, f) => `${l} letras e ${f} fonemas`;
    const cands = uniq([[L, L], [L, F - 1], [L, F + 1], [L - 1, F], [L + 1, F], [F, L]]
      .filter(([l, f]) => f >= 1 && !(l === L && f === F)).map(([l, f]) => fmt(l, f)));
    const { options, answer } = mkOptions(fmt(L, F), sample(cands, 3));
    return {
      kind: "Letras × fonemas",
      prompt: `Quantas letras e quantos fonemas tem a palavra:${big(w)}`,
      options, answer, label: `Letras e fonemas: ${w}`,
      explain: () => sec("Como resolver",
        `<p><b>Letras</b>: ${[...w].join(" · ")} = <b>${L}</b>.</p><p class="ex-rule">${note}</p><p>Fonemas: <b>${F}</b>.</p>`) +
        sec("Lembre", `<p class="ex-rule"><b>Letra</b> é o sinal escrito; <b>fonema</b> é o som. Dígrafos (ch, lh, nh, rr, ss, qu, gu, sc, am, en…) têm 2 letras e 1 fonema; o <b>h</b> inicial não tem som; o <b>x</b> pode valer 2 fonemas (/ks/).</p>`),
    };
  }

  const DIG_YES = [
    ["chuva", "<b>ch</b>"], ["carro", "<b>rr</b>"], ["passo", "<b>ss</b>"], ["nascer", "<b>sc</b>"], ["ninho", "<b>nh</b>"],
    ["filho", "<b>lh</b>"], ["guerra", "<b>gu</b> e <b>rr</b>"], ["queijo", "<b>qu</b>"], ["campo", "<b>am</b> (nasal)"],
    ["tinta", "<b>in</b> (nasal)"], ["desça", "<b>sç</b>"], ["aquilo", "<b>qu</b>"], ["manhã", "<b>nh</b>"],
  ];
  const DIG_NO = [
    ["prato", "<b>pr</b> é encontro consonantal: as duas letras soam."],
    ["blusa", "<b>bl</b> é encontro consonantal, não dígrafo."],
    ["livro", "<b>vr</b> é encontro consonantal, não dígrafo."],
    ["flor", "<b>fl</b> é encontro consonantal, não dígrafo."],
    ["quatro", "em <b>qua</b> o u é pronunciado (/kw/): não é dígrafo."],
    ["água", "em <b>gua</b> o u é pronunciado: não é dígrafo."],
    ["caixa", "<b>ai</b> é ditongo (dois sons), não dígrafo."],
    ["pai", "<b>ai</b> é ditongo: cada letra tem seu som."],
    ["cama", "o <b>m</b> está antes de vogal: é consoante, não forma dígrafo nasal."],
    ["tatu", "cada letra representa um som."],
    ["escola", "<b>sc</b> antes de <b>o</b> não é dígrafo: s e c soam separados (es-co-la)."],
  ];
  function genDigraph() {
    const askNo = chance(0.35);
    const [good, bad] = askNo ? [DIG_NO, DIG_YES] : [DIG_YES, DIG_NO];
    const correct = pick(good), dis = sample(bad, 3);
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Dígrafos",
      prompt: askNo ? "Em qual palavra <b>NÃO</b> há dígrafo?" : "Em qual palavra há <b>dígrafo</b>?",
      options: options.map(o => o[0]), answer, label: askNo ? "Qual não tem dígrafo?" : "Qual tem dígrafo?",
      explain: () => sec("Conceito", `<p class="ex-rule"><b>Dígrafo</b> = duas letras representando <u>um único som</u>: ch, lh, nh, rr, ss, sc, sç, xc, qu, gu (com u mudo) e as vogais nasais am, an, em, en, im, in, om, on, um, un.</p>`) +
        sec("Analisando cada opção", options.map(o => {
          const yes = DIG_YES.includes(o);
          return `<p>${yes ? "✅" : "❌"} <b>${o[0]}</b> — ${yes ? `dígrafo ${o[1]}` : o[1]}</p>`;
        }).join("")),
    };
  }

  /* ════════════════════════════════════════════════════════════
     2. ENCONTROS VOCÁLICOS
  ════════════════════════════════════════════════════════════ */
  const ENC = [
    ["p[ai]", "dit"], ["c[éu]", "dit"], ["her[ói]", "dit"], ["m[ãe]", "dit"], ["cad[ei]ra", "dit"], ["n[oi]te", "dit"],
    ["p[ão]", "dit"], ["l[ei]te", "dit"], ["t[ou]ro", "dit"], ["ág[ua]", "dit"],
    ["Parag[uai]", "tri"], ["ig[uai]s", "tri"], ["sag[uão]", "tri"], ["q[uai]squer", "tri"], ["Urug[uai]", "tri"],
    ["s[aú]de", "hia"], ["p[oe]ta", "hia"], ["l[ua]", "hia"], ["d[ia]", "hia"], ["c[oe]lho", "hia"], ["p[aí]s", "hia"],
    ["v[oo]", "hia"], ["j[uí]za", "hia"], ["b[aú]", "hia"], ["r[io]", "hia"],
  ];
  const ENC_NAME = { dit: "Ditongo", tri: "Tritongo", hia: "Hiato" };
  const ENC_RULE = {
    dit: "<b>Ditongo</b>: vogal + semivogal (ou o contrário) na <u>mesma sílaba</u>. Ex.: pai, cai-xa, á-gua.",
    tri: "<b>Tritongo</b>: semivogal + vogal + semivogal na <u>mesma sílaba</u>. Ex.: Pa-ra-guai, i-guais, sa-guão.",
    hia: "<b>Hiato</b>: duas vogais juntas em <u>sílabas diferentes</u>. Ex.: sa-ú-de, po-e-ta, lu-a.",
  };
  const encHTML = s => s.replace("[", `<span class="hl-letters">`).replace("]", "</span>");
  const encPlain = s => s.replace(/[[\]]/g, "");

  function genEncounter() {
    if (chance(0.55)) {
      const [w, type] = pick(ENC);
      const order = ["dit", "tri", "hia"];
      return {
        kind: "Encontros vocálicos",
        prompt: `Como se classifica o encontro vocálico destacado?${big(encHTML(w))}`,
        options: order.map(k => ENC_NAME[k]), answer: order.indexOf(type), label: `Encontro em: ${encPlain(w)}`,
        explain: () => sec("Como resolver", `<p class="ex-rule">${ENC_RULE[type]}</p>`) +
          sec("Dica", `<p>Separe as sílabas: se as vogais ficam <b>juntas</b>, é ditongo (2) ou tritongo (3); se ficam <b>separadas</b>, é hiato.</p>`),
      };
    }
    const type = pick(["dit", "tri", "hia"]);
    const correct = pick(ENC.filter(e => e[1] === type));
    const dis = sample(ENC.filter(e => e[1] !== type), 3);
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Encontros vocálicos",
      prompt: `Em qual palavra há <b>${ENC_NAME[type].toLowerCase()}</b>?`,
      options: options.map(o => encPlain(o[0])), answer, label: `Qual tem ${ENC_NAME[type].toLowerCase()}?`,
      explain: () => sec("Regra", `<p class="ex-rule">${ENC_RULE[type]}</p>`) +
        sec("Analisando cada opção", options.map(o => `<p>${o[1] === type ? "✅" : "❌"} ${encHTML(o[0])} — ${ENC_NAME[o[1]].toLowerCase()}</p>`).join("")),
    };
  }

  /* ════════════════════════════════════════════════════════════
     3. DIVISÃO SILÁBICA
  ════════════════════════════════════════════════════════════ */
  const CLUSTER = /^[bcdfgptv][lr]/;
  function splitNotes(w) {
    const notes = [];
    const add = n => { if (!notes.includes(n)) notes.push(n); };
    w.syl.forEach((s, i) => {
      if (/ch|lh|nh/.test(s)) add("<b>ch, lh, nh</b> são dígrafos que <u>não</u> se separam (chu-va, fi-lho, ni-nho).");
      if (/(qu|gu)[aeioáéíóâêô]/.test(s)) add("<b>qu</b> e <b>gu</b> ficam juntos com a vogal seguinte (que-ri-do, guer-ra).");
      if (CLUSTER.test(s)) add("Encontros consonantais com <b>l</b> ou <b>r</b> (pr, bl, tr, cl…) ficam na mesma sílaba (pa-la-<b>vra</b>, <b>blo</b>-co).");
      if (/^ps/.test(s)) add("Encontro consonantal no início da palavra fica junto (<b>psi</b>-có-lo-go).");
      const core = s.replace(/^(qu|gu)/, "");
      if ([...core].some((c, k) => isVowel(c) && isVowel(core[k + 1] || ""))) add("<b>Ditongos e tritongos</b> não se separam (<b>cai</b>-xa, i-<b>guais</b>, pai-<b>xão</b>).");
      if (i === w.syl.length - 1) return;
      const a = s[s.length - 1], b = w.syl[i + 1][0], pair = a + b;
      if (pair === "rr" || pair === "ss") add("<b>rr</b> e <b>ss</b> se separam (car-ro, pás-sa-ro).");
      else if (pair === "sc" || pair === "sç" || pair === "xc") add("<b>sc, sç, xc</b> se separam (nas-cer, des-ça).");
      else if (isVowel(a) && isVowel(b)) add("<b>Hiatos</b> se separam: vogais em sílabas diferentes (sa-ú-de, po-e-ta).");
      else if (!isVowel(a) && !isVowel(b)) add(`Consoantes que pertencem a sílabas diferentes se separam (<b>${a}-${b}</b>: ad-vo-ga-do, rit-mo).`);
      else if (isVowel(a)) add("Consoante entre vogais vai para a sílaba da vogal seguinte (ca-<b>sa</b>, ja-<b>ne</b>-la).");
    });
    return notes;
  }
  const gapsOf = w => { const g = []; let p = 0; w.syl.slice(0, -1).forEach(s => { p += s.length; g.push(p); }); return g; };
  const splitExplain = w => sec("Separação correta", big(hyph(w))) +
    sec("Regras que aparecem nesta palavra", splitNotes(w).map(n => `<p class="ex-rule">${n}</p>`).join(""));

  function genSplitTap(d) {
    const w = pick(pool(d, canSplit));
    const gaps = gapsOf(w), letters = [...w.word];
    const withGaps = g => letters.map((c, i) => (g.includes(i) ? "-" : "") + c).join("");
    return {
      type: "split", kind: "Separe as sílabas",
      prompt: "Separe as sílabas da palavra tocando nos espaços entre as letras:",
      letters, gaps,
      check: v => v.length === gaps.length && v.every((x, i) => x === gaps[i]),
      answerText: hyph(w),
      describe: v => (v.length ? withGaps(v) : "(nenhuma separação)"),
      label: `Separar: ${w.word}`,
      explain: () => splitExplain(w),
    };
  }

  function wrongSplits(w) {
    const out = new Set(), word = w.word, g = gapsOf(w);
    const build = gs => { let s = "", last = 0; gs.forEach(x => { s += word.slice(last, x) + "-"; last = x; }); return s + word.slice(last); };
    g.forEach((x, k) => {
      [x - 1, x + 1].forEach(y => {
        const ng = g.slice(); ng[k] = y;
        const ok = ng.every((v, i) => v > (i ? ng[i - 1] : 0) && v < word.length);
        if (ok) out.add(build(ng));
      });
      out.add(build(g.filter((_, i) => i !== k)));          // juntou duas sílabas
    });
    for (let x = 1; x < word.length; x++) if (!g.includes(x)) out.add(build([...g, x].sort((a, b) => a - b))); // separou demais
    out.delete(build(g));
    return [...out];
  }
  function genSplitMC(d) {
    const w = pick(pool(d, x => canSplit(x) && x.syl.length >= 2));
    const wrong = wrongSplits(w);
    const preferred = wrong.filter(s => /(c-h|l-h|n-h|q-u|g-u|^.-?r-r|a-rr|-rr|-ss)/.test(s));
    const dis = uniq([...shuffle(preferred), ...shuffle(wrong)]).slice(0, 3);
    const { options, answer } = mkOptions(hyph(w), dis);
    return {
      kind: "Divisão silábica",
      prompt: `Qual é a separação silábica <b>correta</b> de “${w.word}”?`,
      options, answer, label: `Separação de ${w.word}`,
      explain: () => splitExplain(w),
    };
  }

  const NSYL = ["Monossílaba", "Dissílaba", "Trissílaba", "Polissílaba"];
  function genSyllableCount(d) {
    const w = pick(pool(d, x => !x.tags.has("nosplit")));
    const k = Math.min(w.syl.length, 4) - 1;
    return {
      kind: "Número de sílabas",
      prompt: `Quanto ao número de sílabas, a palavra abaixo é:${big(w.word)}`,
      options: NSYL, answer: k, label: `Nº de sílabas: ${w.word}`,
      explain: () => sec("Como resolver", `<p>Separe: <b>${hyph(w)}</b> → ${w.syl.length} sílaba${w.syl.length > 1 ? "s" : ""} → <b>${NSYL[k].toLowerCase()}</b>.</p>`) +
        sec("Lembre", `<p class="ex-rule">1 sílaba = monossílaba · 2 = dissílaba · 3 = trissílaba · 4 ou mais = polissílaba.</p>`),
    };
  }

  /* ════════════════════════════════════════════════════════════
     4. SÍLABA TÔNICA
  ════════════════════════════════════════════════════════════ */
  const tonicExplain = w => sec("Como encontrar a tônica",
    `<p>${big(hyph(w, true))}</p>
     <p>A sílaba pronunciada com mais força é <b>${w.syl[tonicIdx(w)]}</b>.</p>
     <p class="ex-rule">Dica: fale a palavra como se estivesse chamando alguém de longe — a sílaba que “estica” é a tônica.${STRIP[[...w.word][accentIdx(w.word)]] ? " E quando há acento gráfico, ele sempre está na tônica!" : ""}</p>`);

  function genTonicTap(d) {
    const w = pick(pool(d, x => canSplit(x) && x.syl.length >= 2));
    return {
      layout: "chips", kind: "Sílaba tônica",
      prompt: `Toque na <b>sílaba tônica</b> da palavra “${w.word}”:`,
      options: w.syl, answer: tonicIdx(w), label: `Tônica de ${w.word}`,
      answerText: w.syl[tonicIdx(w)],
      describe: v => w.syl[v],
      explain: () => tonicExplain(w),
    };
  }

  function genTonicMatch(d) {
    let words = [];
    for (let t = 0; t < 50 && words.length < 4; t++) {
      const w = pick(pool(d, x => canSplit(x) && x.syl.length >= 2));
      const ton = w.syl[tonicIdx(w)];
      if (!words.some(o => o.word === w.word || o.syl[tonicIdx(o)] === ton)) words.push(w);
    }
    return {
      type: "match", kind: "Ligue à sílaba tônica",
      prompt: "Ligue cada palavra à sua <b>sílaba tônica</b>:",
      pairs: words.map(w => [w.word, w.syl[tonicIdx(w)]]),
      check: v => v === 0,
      answerText: words.map(w => `${w.word} → ${w.syl[tonicIdx(w)]}`).join(" · "),
      describe: v => (v === 0 ? "todos os pares certos" : `${v} tentativa${v > 1 ? "s" : ""} errada${v > 1 ? "s" : ""} ao ligar`),
      label: "Ligar tônicas: " + words.map(w => w.word).join(", "),
      explain: () => sec("Pares corretos", words.map(w => `<p>${hyph(w, true)} → <b>${w.syl[tonicIdx(w)]}</b></p>`).join("")) +
        sec("Dica", `<p class="ex-rule">Fale a palavra em voz alta, “chamando” alguém: a sílaba mais forte é a tônica.</p>`),
    };
  }

  /* ════════════════════════════════════════════════════════════
     5. OXÍTONAS, PAROXÍTONAS, PROPAROXÍTONAS
  ════════════════════════════════════════════════════════════ */
  const classifiable = w => w.syl.length >= 2 && !w.tags.has("nosplit") && !w.tags.has("dcr");
  const classExplain = w => sec("Como resolver",
    `<p>${big(hyph(w, true))}</p>
     <p>A tônica é a <b>${["última", "penúltima", "antepenúltima"][w.t - 1]}</b> sílaba → <b>${CLASS[w.t].toLowerCase()}</b>.</p>`) +
    sec("Lembre", `<p class="ex-rule">Conte de trás para frente: <b>última</b> = oxítona · <b>penúltima</b> = paroxítona · <b>antepenúltima</b> = proparoxítona.</p>`);

  function genClassify(d) {
    const t = pick([1, 2, 3]);
    const w = pick(pool(d, x => classifiable(x) && x.t === t));
    return {
      kind: "Classificação pela tônica",
      prompt: `Quanto à posição da sílaba tônica, a palavra abaixo é:${big(w.word)}`,
      options: ["Oxítona", "Paroxítona", "Proparoxítona"], answer: w.t - 1, label: `Classificar: ${w.word}`,
      explain: () => classExplain(w),
    };
  }

  function genFindClass(d) {
    const t = pick([1, 2, 3]);
    const correct = pick(pool(d, x => classifiable(x) && x.t === t));
    const dis = sample(pool(d, x => classifiable(x) && x.t !== t), 3);
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: "Classificação pela tônica",
      prompt: `Qual destas palavras é <b>${CLASS[t].toLowerCase()}</b>?`,
      options: options.map(w => w.word), answer, label: `Qual é ${CLASS[t].toLowerCase()}?`,
      explain: () => sec("Analisando cada opção", options.map(w =>
        `<p>${w.t === t ? "✅" : "❌"} ${hyph(w, true)} — ${CLASS[w.t].toLowerCase()}</p>`).join("")) +
        sec("Lembre", `<p class="ex-rule">Última = oxítona · penúltima = paroxítona · antepenúltima = proparoxítona.</p>`),
    };
  }

  function genClassMatch(d) {
    const words = [1, 2, 3].map(t => pick(pool(d, x => classifiable(x) && x.t === t)));
    return {
      type: "match", kind: "Ligue à classificação",
      prompt: "Ligue cada palavra à sua classificação:",
      pairs: words.map(w => [w.word, CLASS[w.t]]),
      check: v => v === 0,
      answerText: words.map(w => `${w.word} → ${CLASS[w.t].toLowerCase()}`).join(" · "),
      describe: v => (v === 0 ? "todos os pares certos" : `${v} tentativa${v > 1 ? "s" : ""} errada${v > 1 ? "s" : ""} ao ligar`),
      label: "Ligar: " + words.map(w => w.word).join(", "),
      explain: () => sec("Pares corretos", words.map(w => `<p>${hyph(w, true)} → <b>${CLASS[w.t].toLowerCase()}</b></p>`).join("")) +
        sec("Lembre", `<p class="ex-rule">Última = oxítona · penúltima = paroxítona · antepenúltima = proparoxítona.</p>`),
    };
  }

  /* ════════════════════════════════════════════════════════════
     6. REGRAS DE ACENTUAÇÃO
  ════════════════════════════════════════════════════════════ */
  const ALL = () => true;
  // índice (na palavra) da vogal principal de uma sílaba
  function nucleusIdx(w, si) {
    const start = w.syl.slice(0, si).join("").length;
    let s = w.syl[si], off = 0;
    if (/^(qu|gu)[aeiou]/.test(s)) off = 2;
    for (let k = off; k < s.length; k++) {
      const c = strip(s[k]);
      if (!isVowel(c)) continue;
      if ("iu".includes(c) && isVowel(s[k + 1] || "") && !STRIP[s[k]]) continue; // semivogal antes de vogal
      return start + k;
    }
    return -1;
  }
  function withAccent(plain, idx, map) {
    const ch = [...plain];
    if (idx < 0 || !map[ch[idx]]) return null;
    ch[idx] = map[ch[idx]];
    return ch.join("");
  }
  function misspellings(w) {
    const plain = strip(w.word), out = new Set();
    if (OLD[w.word]) out.add(OLD[w.word]);
    const ai = accentIdx(w.word);
    if (ai >= 0) {
      out.add(plain);
      const c = [...w.word][ai], base = STRIP[c];
      out.add(withAccent(plain, ai, "áíú".includes(c) || c === CIRC[base] ? ACUTE : CIRC));
    } else {
      const ti = nucleusIdx(w, tonicIdx(w));
      out.add(withAccent(plain, ti, ACUTE));
      out.add(withAccent(plain, ti, CIRC));
    }
    w.syl.forEach((_, si) => { if (si !== tonicIdx(w)) out.add(withAccent(plain, nucleusIdx(w, si), ACUTE)); });
    out.delete(null); out.delete(w.word);
    return [...out];
  }

  function genWhereAccent(d, filter = ALL) {
    const w = pick(pool(d, filter));
    const plain = [...strip(w.word)];
    const ai = accentIdx(w.word);
    const options = [...plain.map(c => c.toUpperCase()), "Sem acento"];
    const none = options.length - 1;
    return {
      layout: "tiles", kind: "Onde vai o acento?",
      prompt: "Em qual letra vai o <b>acento gráfico</b>? (ou a palavra não tem acento?)",
      options, disabled: plain.map((c, i) => (isVowel(c) && !"ãõ".includes(c) ? -1 : i)).filter(i => i >= 0),
      answer: ai >= 0 ? ai : none,
      answerText: w.word,
      describe: v => (v === none ? "sem acento" : plain.map((c, i) => (i === v ? `<u>${c.toUpperCase()}</u>` : c)).join("")),
      label: `Acentuar: ${strip(w.word)}`,
      explain: () => accentExplain(w),
    };
  }
  function genSpelling(d, filter = ALL) {
    let w, wrong;
    for (let t = 0; t < 30; t++) {
      w = pick(pool(d, x => filter(x)));
      wrong = misspellings(w);
      if (wrong.length >= 3) break;
    }
    const dis = uniq([...(OLD[w.word] ? [OLD[w.word]] : []), ...shuffle(wrong)]).slice(0, 3);
    const { options, answer } = mkOptions(w.word, dis);
    return {
      kind: "Grafia correta",
      prompt: "Qual é a grafia <b>correta</b>?",
      options, answer, label: `Grafia de ${w.word}`,
      explain: () => accentExplain(w),
    };
  }

  function genWhyAccent(d) {
    const w = pick(pool(d, x => accentRule(x) !== null));
    const r = accentRule(w);
    const others = sample(Object.keys(RULES).filter(k => k !== r), 3);
    const { options, answer } = mkOptions(r, others);
    return {
      kind: "Por que leva acento?",
      prompt: `Por que a palavra abaixo é acentuada?${big(w.word)}`,
      options: options.map(k => RULES[k]), answer, label: `Por que acentuar ${w.word}?`,
      explain: () => accentExplain(w),
    };
  }

  /* ════════════════════════════════════════════════════════════
     7. NOVO ACORDO E PEGADINHAS
  ════════════════════════════════════════════════════════════ */
  const isTrap = w => ["abN", "dupN", "difN", "hiaN", "hia", "dit"].some(t => w.tags.has(t));
  function genAcordo(d) {
    const askWrong = chance(0.45);
    const traps = WORDS.filter(w => OLD[w.word]);
    if (askWrong) {
      const bad = pick(traps);
      const good = sample(WORDS.filter(w => w !== bad && w.lvl >= 2 && w.syl.length > 1), 3);
      const { options, answer } = mkOptions(OLD[bad.word], good.map(w => w.word));
      return {
        kind: "Novo Acordo Ortográfico",
        prompt: "Segundo o <b>Novo Acordo Ortográfico</b>, qual palavra está grafada <b>INCORRETAMENTE</b>?",
        options, answer, label: `Acordo: ${OLD[bad.word]} → ${bad.word}`,
        answerText: `${OLD[bad.word]} (o correto é “${bad.word}”)`,
        explain: () => accentExplain(bad) + sec("As outras estão corretas",
          good.map(w => `<p>✅ <b>${w.word}</b> — ${accentRule(w) ? RULES[accentRule(w)].toLowerCase() : "sem acento"}</p>`).join("")),
      };
    }
    const good = pick(traps);
    const dis = sample(traps.filter(w => w !== good), 3).map(w => OLD[w.word]);
    const { options, answer } = mkOptions(good.word, dis);
    return {
      kind: "Novo Acordo Ortográfico",
      prompt: "Segundo o <b>Novo Acordo Ortográfico</b>, qual palavra está grafada <b>corretamente</b>?",
      options, answer, label: `Acordo: ${good.word}`,
      explain: () => accentExplain(good) + sec("As outras usam a grafia antiga",
        options.filter(o => o !== good.word).map(o => {
          const w = traps.find(x => OLD[x.word] === o);
          return `<p>❌ ${o} → hoje se escreve <b>${w.word}</b></p>`;
        }).join("")),
    };
  }
  const genTrapSpelling = d => genSpelling(d === "easy" ? "medium" : d, isTrap);
  const genTrapWhere = d => genWhereAccent(d === "easy" ? "medium" : d, isTrap);

  /* ════════════════════════════════════════════════════════════
     TÓPICOS (trilha)
  ════════════════════════════════════════════════════════════ */
  const W = (e, m, h) => ({ easy: e, medium: m, hard: h });
  const TOPICS = [
    { id: "fon", label: "Fonemas e letras", icon: "🔤", color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE",
      desc: "Diferença entre letra e fonema; dígrafos e encontros consonantais",
      gens: [[genPhonemes, W(1, 1, 1)], [genDigraph, W(1, 1, 1)]] },
    { id: "enc", label: "Encontros vocálicos", icon: "🎵", color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE",
      desc: "Ditongo, tritongo e hiato",
      gens: [[genEncounter, W(1, 1, 1)]] },
    { id: "sil", label: "Divisão silábica", icon: "✂️", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0",
      desc: "Separe as sílabas: dígrafos, hiatos, ditongos e encontros consonantais",
      gens: [[genSplitTap, W(1.5, 1.5, 1.5)], [genSplitMC, W(1, 1, 1)], [genSyllableCount, W(0.6, 0.5, 0.4)]] },
    { id: "ton", label: "Sílaba tônica", icon: "🎯", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A",
      desc: "Encontre a sílaba pronunciada com mais força",
      gens: [[genTonicTap, W(2, 2, 2)], [genTonicMatch, W(1, 1, 1)]] },
    { id: "cls", label: "Oxítona, paroxítona…", icon: "📏", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA",
      desc: "Oxítonas, paroxítonas e proparoxítonas",
      gens: [[genClassify, W(1.5, 1.5, 1.5)], [genFindClass, W(1, 1, 1)], [genClassMatch, W(1, 1, 1)]] },
    { id: "ace", label: "Acentuação", icon: "✍️", color: "#06B6D4", bg: "#ECFEFF", border: "#A5F3FC",
      desc: "Regras de acentuação gráfica",
      gens: [[genWhereAccent, W(1.5, 1.5, 1.5)], [genSpelling, W(1, 1, 1)], [genWhyAccent, W(1, 1, 1)]] },
    { id: "aco", label: "Novo Acordo", icon: "📜", color: "#EC4899", bg: "#FDF2F8", border: "#FBCFE8",
      desc: "Pegadinhas: ideia, voo, leem, para, hiatos e ditongos abertos",
      gens: [[genAcordo, W(1.5, 1.5, 1.5)], [genTrapSpelling, W(1, 1, 1)], [genTrapWhere, W(1, 1, 1)]] },
  ];

  function generate(topicId, diff) {
    const t = TOPICS.find(x => x.id === topicId);
    const total = t.gens.reduce((s, g) => s + g[1][diff], 0);
    let r = Math.random() * total, fn = t.gens[0][0];
    for (const [g, w] of t.gens) { if ((r -= w[diff]) <= 0) { fn = g; break; } }
    const q = fn(diff);
    q.topic = topicId;
    return q;
  }

  /* ── Teoria ──────────────────────────────────────────────── */
  const THEORY = {
    fon: sec("Letra × fonema", `<p><b>Letra</b> é a representação escrita; <b>fonema</b> é o som. Nem sempre os números batem:</p>
        <p class="ex-rule">chave: 5 letras, 4 fonemas (ch = 1 som)<br>hora: 4 letras, 3 fonemas (h não soa)<br>táxi: 4 letras, 5 fonemas (x = /ks/)</p>`) +
      sec("Dígrafos (2 letras, 1 som)", `<p>ch, lh, nh, rr, ss, sc, sç, xc, qu, gu (com u mudo) e as nasais am, an, em, en, im, in, om, on, um, un.</p>`) +
      sec("Encontro consonantal", `<p>Duas consoantes em que as <b>duas soam</b>: pr, bl, tr, cl, fl… (prato, blusa). Não é dígrafo!</p>`),
    enc: sec("Encontros vocálicos", `<p class="ex-rule">${ENC_RULE.dit}</p><p class="ex-rule">${ENC_RULE.tri}</p><p class="ex-rule">${ENC_RULE.hia}</p>`) +
      sec("Dica", `<p>Separe as sílabas. Vogais juntas na mesma sílaba → ditongo/tritongo. Em sílabas diferentes → hiato.</p>`),
    sil: sec("Não se separam", `<p class="ex-rule">Ditongos e tritongos: cai-xa, i-guais</p>
        <p class="ex-rule">Dígrafos ch, lh, nh, qu, gu: chu-va, fi-lho, que-ri-do</p>
        <p class="ex-rule">Encontros consonantais com l ou r: pa-la-vra, blo-co, a-tle-ta</p>`) +
      sec("Separam-se", `<p class="ex-rule">Hiatos: sa-ú-de, po-e-ta</p>
        <p class="ex-rule">rr, ss, sc, sç, xc: car-ro, pás-sa-ro, nas-cer, des-ça</p>
        <p class="ex-rule">Consoantes de sílabas diferentes: ad-vo-ga-do, rit-mo, op-ção</p>`) +
      sec("Número de sílabas", `<p>1 = monossílaba · 2 = dissílaba · 3 = trissílaba · 4+ = polissílaba</p>`),
    ton: sec("Sílaba tônica", `<p>É a sílaba pronunciada com <b>mais força</b>. Toda palavra com mais de uma sílaba tem uma.</p>
        <p class="ex-rule">Truque: fale como se chamasse alguém de longe — “ca-<b>FÉÉÉ</b>”, “<b>LÂÂÂM</b>-pa-da”.</p>
        <p class="ex-rule">O acento gráfico, quando existe, sempre marca a tônica. Mas muitas tônicas não têm acento: ca-<b>sa</b>? Não: <b>ca</b>-sa!</p>`),
    cls: sec("Classificação", `<p class="ex-rule"><b>Oxítona</b>: tônica na última (ca-<b>fé</b>, a-<b>mor</b>)</p>
        <p class="ex-rule"><b>Paroxítona</b>: tônica na penúltima (<b>me</b>-sa, <b>fá</b>-cil)</p>
        <p class="ex-rule"><b>Proparoxítona</b>: tônica na antepenúltima (<b>lâm</b>-pa-da)</p>`) +
      sec("Dica", `<p>Sempre conte as sílabas <b>de trás para frente</b>.</p>`),
    ace: sec("Regras de acentuação", Object.keys(RULES).map(k => `<p class="ex-rule"><b>${RULES[k]}</b><br><span class="muted">${RULE_EX[k]}</span></p>`).join("")) +
      sec("Não levam acento", `<p>Paroxítonas terminadas em a, e, o, em, ens (casa, item, jovem, hifens) e oxítonas terminadas em i, u, l, r, z (caju, amor, feliz).</p>`),
    aco: sec("O que mudou com o Novo Acordo (2009)", `<p class="ex-rule">${TAG_NOTE.abN}</p><p class="ex-rule">${TAG_NOTE.dupN}</p><p class="ex-rule">${TAG_NOTE.difN}</p>
        <p class="ex-rule">i/u tônicos depois de ditongo, em paroxítonas, perderam o acento: <b>feiura</b>, baiuca.</p>`) +
      sec("Hiatos sem acento", `<p>i/u tônico <b>não</b> é acentuado quando: vem antes de <b>nh</b> (rainha), forma sílaba com outra letra que não s (ju-iz, ca-ir, ru-im).</p>`),
  };

  global.PortuguesEngine = {
    TOPICS, THEORY, generate,
    _internal: { WORDS, accentRule, strip, accentIdx, misspellings, gapsOf, splitNotes, OLD, PHON },
  };
})(typeof window !== "undefined" ? window : globalThis);
