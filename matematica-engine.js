/* ════════════════════════════════════════════════════════════
   MATEMÁTICA MENTAL — trilha de técnicas
   Cada questão ensina um "atalho" de cálculo mental e mostra o
   passo a passo com os números da própria questão.
════════════════════════════════════════════════════════════ */
(function (global) {
  "use strict";

  /* ── Utilitários ─────────────────────────────────────────── */
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
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
  const fmt = n => (Number.isInteger(n) ? String(n) : String(+n.toFixed(4)).replace(".", ","));
  const sec = (title, body, cls = "") =>
    `<div class="ex-sec ${cls}"><div class="ex-title">${title}</div>${body}</div>`;
  const steps = arr => `<ol class="steps">${arr.map(s => `<li>${s}</li>`).join("")}</ol>`;
  const big = s => `<div class="sentence fx">${s}</div>`;
  const notMult10 = n => n % 10 !== 0;

  // questão de resposta digitada
  function calc({ d, kind, expr, answer, hint, lines, technique, prompt }) {
    return {
      type: "input", kind,
      context: d === "easy" && hint ? `<div class="defs">💡 ${hint}</div>` : "",
      prompt: (prompt || "Calcule de cabeça:") + big(expr),
      answer, label: `${expr} = ${fmt(answer)}`,
      explain: () => sec("Passo a passo", steps(lines)) + sec("Técnica", `<p class="ex-rule">${technique}</p>`),
    };
  }
  // questão "qual é o próximo passo?"
  function stepQ({ kind, prompt, correct, wrong, label, lines, technique }) {
    const { options, answer } = mkOptions(correct, wrong);
    return {
      kind, prompt, options, answer, label,
      explain: () => sec("Passo a passo", steps(lines)) + sec("Técnica", `<p class="ex-rule">${technique}</p>`),
    };
  }

  /* ════════════════════════════════════════════════════════════
     1. ADIÇÃO
  ════════════════════════════════════════════════════════════ */
  const T_DECOMP = "Some por partes: primeiro as centenas e dezenas do segundo número, depois as unidades. É mais fácil somar números “redondos”.";
  const T_ROUND_ADD = "Arredonde para cima o número que termina em 7, 8 ou 9, some o número redondo e depois <b>tire</b> o que você acrescentou.";

  function parts(n) { // 347 → [300, 40, 7]
    const out = [];
    let mult = 1;
    while (n > 0) { const r = (n % 10) * mult; if (r) out.unshift(r); n = Math.floor(n / 10); mult *= 10; }
    return out;
  }
  function genAddDecomp(d) {
    const a = d === "easy" ? rnd(21, 79) : d === "medium" ? rnd(35, 99) : rnd(120, 899);
    let b;
    do { b = d === "easy" ? rnd(12, 49) : d === "medium" ? rnd(26, 99) : rnd(126, 499); } while (!notMult10(b));
    const ps = parts(b), lines = [`Quebre o ${b} em partes: ${ps.join(" + ")}`];
    let acc = a;
    ps.forEach(p => { lines.push(`${acc} + ${p} = <b>${acc + p}</b>`); acc += p; });
    return calc({ d, kind: "Adição por partes", expr: `${a} + ${b}`, answer: a + b,
      hint: `Some primeiro ${ps.slice(0, -1).join(" + ")}, depois ${ps[ps.length - 1]}.`, lines, technique: T_DECOMP });
  }

  function roundPair(d) { // número que fica perto de um redondo: 38 = 40 − 2, 197 = 200 − 3
    const k = rnd(1, 3);
    const R = d === "hard" ? rnd(2, 9) * 100 : rnd(2, 9) * 10;
    return { b: R - k, R, k };
  }
  function genAddRound(d) {
    const { b, R, k } = roundPair(d);
    const a = d === "hard" ? rnd(120, 799) : rnd(15, 89);
    const lines = [`${b} está perto de ${R}: ${b} = ${R} − ${k}`, `${a} + ${R} = ${a + R}`, `Somei ${k} a mais, então tiro: ${a + R} − ${k} = <b>${a + b}</b>`];
    if (chance(0.45)) {
      return stepQ({
        kind: "Arredondar e compensar",
        prompt: `Para calcular <b>${a} + ${b}</b>, faço ${a} + ${R} = ${a + R}. E depois?`,
        correct: `Subtraio ${k}`, wrong: [`Somo ${k}`, `Subtraio ${b % 10}`, `Somo ${b % 10}`],
        label: `${a} + ${b} (arredondando)`, lines, technique: T_ROUND_ADD,
      });
    }
    return calc({ d, kind: "Arredondar e compensar", expr: `${a} + ${b}`, answer: a + b,
      hint: `${b} = ${R} − ${k}. Some ${R} e tire ${k}.`, lines, technique: T_ROUND_ADD });
  }

  /* ════════════════════════════════════════════════════════════
     2. SUBTRAÇÃO
  ════════════════════════════════════════════════════════════ */
  const T_ROUND_SUB = "Arredonde para cima o número que você está tirando. Como você tirou <b>a mais</b>, devolva a diferença <b>somando</b>.";
  const T_UP = "“Complete” do menor até o maior, pulando para números redondos (como quem conta o troco). A distância total é a resposta.";

  function genSubRound(d) {
    const { b, R, k } = roundPair(d);
    const a = d === "hard" ? rnd(R + 50, R + 700) : rnd(R + 5, R + 70);
    const lines = [`${b} = ${R} − ${k}`, `${a} − ${R} = ${a - R}`, `Tirei ${k} a mais, então devolvo: ${a - R} + ${k} = <b>${a - b}</b>`];
    if (chance(0.45)) {
      return stepQ({
        kind: "Arredondar e compensar",
        prompt: `Para calcular <b>${a} − ${b}</b>, faço ${a} − ${R} = ${a - R}. E depois?`,
        correct: `Somo ${k}`, wrong: [`Subtraio ${k}`, `Somo ${b % 10}`, `Subtraio ${b % 10}`],
        label: `${a} − ${b} (arredondando)`, lines, technique: T_ROUND_SUB,
      });
    }
    return calc({ d, kind: "Arredondar e compensar", expr: `${a} − ${b}`, answer: a - b,
      hint: `Tire ${R} e devolva ${k}.`, lines, technique: T_ROUND_SUB });
  }

  function genSubUp(d) {
    let a, b;
    if (d === "hard" && chance(0.5)) { a = pick([100, 1000, 500]); b = rnd(Math.floor(a / 10) + 1, a - 11); if (!notMult10(b)) b++; }
    else if (d === "easy") { a = rnd(42, 99); b = rnd(13, a - 12); }
    else { a = rnd(110, 999); b = rnd(40, a - 30); }
    if (!notMult10(b)) b += 3;
    const jumps = [];
    let cur = b;
    for (const step of [10, 100, 1000]) {
      const nxt = Math.ceil(cur / step) * step;
      if (nxt > cur && nxt <= a) { jumps.push([cur, nxt]); cur = nxt; }
    }
    if (cur < a) jumps.push([cur, a]);
    const lines = jumps.map(([x, y]) => `${x} → ${y}: <b>+${y - x}</b>`);
    lines.push(`Some os pulos: ${jumps.map(([x, y]) => y - x).join(" + ")} = <b>${a - b}</b>`);
    return calc({ d, kind: "Completar (contar para cima)", expr: `${a} − ${b}`, answer: a - b,
      hint: `Vá de ${b} até ${a} pulando para números redondos e some os pulos.`, lines, technique: T_UP });
  }

  /* ════════════════════════════════════════════════════════════
     3. MULTIPLICAÇÃO
  ════════════════════════════════════════════════════════════ */
  function genMul5(d) {
    const kind = d === "easy" ? 5 : d === "medium" ? pick([5, 50]) : pick([5, 50, 25]);
    const n = d === "easy" ? rnd(12, 68) : d === "medium" ? rnd(14, 98) : rnd(16, 248);
    const big10 = kind === 5 ? 10 : 100, div = kind === 25 ? 4 : 2;
    const lines = [`${kind} = ${big10} ÷ ${div}`, `${n} × ${big10} = ${n * big10}`, `${n * big10} ÷ ${div} = <b>${fmt((n * big10) / div)}</b>`];
    return calc({ d, kind: `Multiplicar por ${kind}`, expr: `${n} × ${kind}`, answer: n * kind,
      hint: `× ${kind} é o mesmo que × ${big10} e depois ÷ ${div}.`, lines,
      technique: `<b>× 5</b> = × 10 e metade · <b>× 50</b> = × 100 e metade · <b>× 25</b> = × 100 e divide por 4.` });
  }

  function genMul9(d) {
    const k = d === "hard" ? pick([9, 99, 19]) : d === "medium" ? pick([9, 99]) : 9;
    const n = d === "easy" ? rnd(12, 49) : rnd(13, 99);
    const R = k + 1;
    const lines = [`${k} = ${R} − 1`, `${n} × ${R} = ${n * R}`, `${n * R} − ${n} = <b>${n * k}</b>`];
    return calc({ d, kind: `Multiplicar por ${k}`, expr: `${n} × ${k}`, answer: n * k,
      hint: `Faça × ${R} e tire ${n} uma vez.`, lines,
      technique: `Multiplique pelo número redondo e tire uma vez: <b>n × 9 = n × 10 − n</b>, <b>n × 99 = n × 100 − n</b>.` });
  }

  function genMul11(d) {
    let n;
    do { n = rnd(12, 98); } while (!notMult10(n) || (d === "easy" && Math.floor(n / 10) + (n % 10) > 9));
    const a = Math.floor(n / 10), b = n % 10, s = a + b;
    const lines = [`Separe os algarismos: ${a} _ ${b}`, `Some: ${a} + ${b} = ${s}`];
    if (s < 10) lines.push(`Coloque no meio: <b>${a}${s}${b}</b>`);
    else lines.push(`${s} tem dois algarismos: coloque o ${s % 10} no meio e “vai 1” para o ${a}: <b>${a + 1}${s % 10}${b}</b>`);
    return calc({ d, kind: "Multiplicar por 11", expr: `${n} × 11`, answer: n * 11,
      hint: `Separe ${a} e ${b} e coloque a soma deles no meio.`, lines,
      technique: "Para <b>× 11</b> com dois algarismos: separe os algarismos e coloque a soma deles no meio (se passar de 9, vai 1)." });
  }

  function genMulSplit(d) {
    let a, b;
    if (d === "easy") { a = rnd(12, 49); b = rnd(3, 9); }
    else if (d === "medium") { a = rnd(23, 98); b = rnd(4, 9); }
    else { a = rnd(21, 49); b = rnd(12, 19); }
    if (!notMult10(a)) a++;
    let lines;
    if (b < 10) {
      const t = a - (a % 10), u = a % 10;
      lines = [`${a} = ${t} + ${u}`, `${t} × ${b} = ${t * b}`, `${u} × ${b} = ${u * b}`, `${t * b} + ${u * b} = <b>${a * b}</b>`];
    } else {
      const u = b - 10;
      lines = [`${b} = 10 + ${u}`, `${a} × 10 = ${a * 10}`, `${a} × ${u} = ${a * u}`, `${a * 10} + ${a * u} = <b>${a * b}</b>`];
    }
    return calc({ d, kind: "Multiplicar por partes", expr: `${a} × ${b}`, answer: a * b,
      hint: "Quebre um dos números em dezenas + unidades, multiplique cada parte e some.", lines,
      technique: "Propriedade distributiva: <b>24 × 7 = 20 × 7 + 4 × 7</b>. Multiplicar números redondos é fácil!" });
  }

  function genMulHalf(d) {
    const b = d === "easy" ? pick([5, 15, 25]) : d === "medium" ? pick([15, 25, 35, 45]) : pick([25, 35, 45, 125]);
    const need = b === 125 ? 8 : b === 25 ? 4 : 2;
    const a = need * rnd(d === "easy" ? 3 : 4, d === "hard" ? 24 : 12);
    let x = a, y = b;
    const lines = [];
    // continua enquanto o segundo não for redondo, ou enquanto dobrar ainda leva a um múltiplo de 100 (50 → 100)
    while (x % 2 === 0 && (y % 10 !== 0 || (y % 100 !== 0 && (y * 2) % 100 === 0))) {
      lines.push(`metade de ${x} e dobro de ${y}: ${x / 2} × ${y * 2}`);
      x /= 2; y *= 2;
    }
    lines.push(`${x} × ${y} = <b>${x * y}</b>`);
    return calc({ d, kind: "Dobro e metade", expr: `${a} × ${b}`, answer: a * b,
      hint: `Divida ${a} por 2 e dobre ${b} até virar um número redondo.`, lines,
      technique: "Se um número cai pela metade e o outro dobra, o produto não muda: <b>16 × 25 = 8 × 50 = 4 × 100</b>." });
  }

  /* ════════════════════════════════════════════════════════════
     4. DIVISÃO
  ════════════════════════════════════════════════════════════ */
  function genDiv5(d) {
    const k = d === "hard" ? pick([5, 25, 50]) : d === "medium" ? pick([5, 25]) : 5;
    const n = k * rnd(d === "easy" ? 4 : 6, d === "easy" ? 40 : 80);
    const mult = k === 25 ? 4 : 2, big10 = k === 5 ? 10 : 100;
    const lines = [`÷ ${k} é o mesmo que × ${mult} e ÷ ${big10}`, `${n} × ${mult} = ${n * mult}`, `${n * mult} ÷ ${big10} = <b>${n / k}</b>`];
    return calc({ d, kind: `Dividir por ${k}`, expr: `${n} ÷ ${k}`, answer: n / k,
      hint: `Multiplique por ${mult} e divida por ${big10}.`, lines,
      technique: "<b>÷ 5</b> = dobro e ÷ 10 · <b>÷ 50</b> = dobro e ÷ 100 · <b>÷ 25</b> = × 4 e ÷ 100." });
  }

  function genDivHalf(d) {
    const k = d === "hard" ? pick([4, 8]) : 4;
    const n = k * rnd(d === "easy" ? 11 : 15, d === "easy" ? 49 : 125);
    const lines = [];
    let x = n;
    for (let s = k; s > 1; s /= 2) { lines.push(`metade de ${x} = ${x / 2}`); x /= 2; }
    lines[lines.length - 1] = lines[lines.length - 1].replace(/= (\d+)$/, "= <b>$1</b>");
    return calc({ d, kind: `Dividir por ${k}`, expr: `${n} ÷ ${k}`, answer: n / k,
      hint: `Tire a metade ${k === 4 ? "duas" : "três"} vezes.`, lines,
      technique: "<b>÷ 4</b> = metade da metade · <b>÷ 8</b> = metade três vezes." });
  }

  function genDivSplit(d) {
    const k = d === "easy" ? rnd(3, 9) : rnd(6, 15);
    const tens = d === "easy" ? 1 : rnd(1, 3), units = rnd(1, 9);
    const q = tens * 10 + units, n = k * q;
    const p1 = k * tens * 10, p2 = k * units;
    const lines = [`Quebre ${n} em partes fáceis de dividir por ${k}: ${p1} + ${p2}`, `${p1} ÷ ${k} = ${tens * 10}`, `${p2} ÷ ${k} = ${units}`, `${tens * 10} + ${units} = <b>${q}</b>`];
    return calc({ d, kind: "Dividir por partes", expr: `${n} ÷ ${k}`, answer: q,
      hint: `Separe ${n} em ${p1} + ${p2} e divida cada parte.`, lines,
      technique: "Quebre o dividendo em partes que você já sabe dividir: <b>156 ÷ 12 = 120 ÷ 12 + 36 ÷ 12 = 10 + 3</b>." });
  }

  /* ════════════════════════════════════════════════════════════
     5. PORCENTAGEM
  ════════════════════════════════════════════════════════════ */
  const PCT = {
    10: { m: 10, f: n => [`10% = dividir por 10: ${n} ÷ 10 = <b>${fmt(n / 10)}</b>`] },
    1:  { m: 100, f: n => [`1% = dividir por 100: ${n} ÷ 100 = <b>${fmt(n / 100)}</b>`] },
    50: { m: 2, f: n => [`50% = metade: ${n} ÷ 2 = <b>${fmt(n / 2)}</b>`] },
    25: { m: 4, f: n => [`25% = um quarto = metade da metade`, `${n} ÷ 2 = ${n / 2}`, `${n / 2} ÷ 2 = <b>${fmt(n / 4)}</b>`] },
    20: { m: 10, f: n => [`10% de ${n} = ${n / 10}`, `20% = 2 × 10% = <b>${fmt(n / 5)}</b>`] },
    30: { m: 10, f: n => [`10% de ${n} = ${n / 10}`, `30% = 3 × 10% = <b>${fmt((3 * n) / 10)}</b>`] },
    5:  { m: 20, f: n => [`10% de ${n} = ${n / 10}`, `5% = metade de 10% = <b>${fmt(n / 20)}</b>`] },
    15: { m: 20, f: n => [`10% de ${n} = ${n / 10}`, `5% = metade disso = ${n / 20}`, `15% = 10% + 5% = <b>${fmt((3 * n) / 20)}</b>`] },
    2:  { m: 100, f: n => [`1% de ${n} = ${n / 100}`, `2% = 2 × 1% = <b>${fmt(n / 50)}</b>`] },
    75: { m: 4, f: n => [`50% de ${n} = ${n / 2}`, `25% = ${n / 4}`, `75% = 50% + 25% = <b>${fmt((3 * n) / 4)}</b>`] },
    35: { m: 20, f: n => [`10% de ${n} = ${n / 10}`, `30% = ${(3 * n) / 10}`, `5% = ${n / 20}`, `35% = 30% + 5% = <b>${fmt((7 * n) / 20)}</b>`] },
    45: { m: 20, f: n => [`50% de ${n} = ${n / 2}`, `5% = ${n / 20}`, `45% = 50% − 5% = <b>${fmt((9 * n) / 20)}</b>`] },
  };
  function genPct(d) {
    const p = pick(d === "easy" ? [10, 50, 25, 20, 1] : d === "medium" ? [5, 15, 30, 75, 2, 20] : [15, 35, 45, 75, 5, 2]);
    const n = PCT[p].m * rnd(d === "easy" ? 2 : 3, d === "hard" ? 60 : 30);
    return calc({ d, kind: `${p}% de um número`, expr: `${p}% de ${n}`, answer: (p * n) / 100,
      hint: "Comece pelos 10% (divida por 10) ou pelos 50% (metade) e monte o resto.", lines: PCT[p].f(n),
      technique: "Monte qualquer porcentagem com peças fáceis: <b>10%</b> (÷ 10), <b>1%</b> (÷ 100), <b>50%</b> (metade), <b>25%</b> (metade da metade), <b>5%</b> (metade de 10%)." });
  }

  function genPctSwap(d) {
    const y = pick([25, 50, 20, 10]);
    const step = { 25: 4, 50: 2, 20: 5, 10: 10 }[y];
    let x;
    do { x = step * rnd(2, d === "hard" ? 40 : 20); } while ([10, 20, 25, 50].includes(x));
    const ans = (x * y) / 100;
    return calc({ d, kind: "Inverter a porcentagem", expr: `${x}% de ${y}`, answer: ans,
      hint: `${x}% de ${y} é igual a ${y}% de ${x}, que é bem mais fácil!`,
      lines: [`x% de y = y% de x (os dois são x × y ÷ 100)`, `${x}% de ${y} = ${y}% de ${x}`, `${y}% de ${x} = <b>${fmt(ans)}</b>`],
      technique: "A ordem não importa: <b>8% de 25 = 25% de 8 = 2</b>. Troque quando o outro lado for mais fácil." });
  }

  /* ════════════════════════════════════════════════════════════
     6. POTÊNCIAS E RAÍZES
  ════════════════════════════════════════════════════════════ */
  function genSq5(d) {
    const a = d === "easy" ? rnd(1, 6) : d === "medium" ? rnd(3, 9) : rnd(9, 12);
    const n = a * 10 + 5;
    return calc({ d, kind: "Quadrado terminado em 5", expr: `${n}²`, answer: n * n,
      hint: `Faça ${a} × ${a + 1} e coloque 25 no final.`,
      lines: [`Pegue o que vem antes do 5: ${a}`, `${a} × ${a + 1} (ele vezes o seguinte) = ${a * (a + 1)}`, `Coloque 25 no final: <b>${n * n}</b>`],
      technique: "Para números terminados em 5: <b>multiplique a dezena pelo número seguinte e coloque 25 no final</b>. 35² → 3 × 4 = 12 → 1225." });
  }

  function genSquare(d) {
    if (d === "easy") {
      const n = rnd(11, 19), u = n - 10;
      return calc({ d, kind: "Quadrados de 11 a 19", expr: `${n}²`, answer: n * n,
        hint: `(10 + ${u})² = 100 + 2 × 10 × ${u} + ${u}²`,
        lines: [`${n} = 10 + ${u}`, `10² = 100`, `2 × 10 × ${u} = ${20 * u}`, `${u}² = ${u * u}`, `100 + ${20 * u} + ${u * u} = <b>${n * n}</b>`],
        technique: "Quadrado da soma: <b>(a + b)² = a² + 2ab + b²</b>. Use a = número redondo." });
    }
    if (d === "medium") { // vizinho de um redondo
      const R = rnd(2, 9) * 10, up = chance(0.5), n = up ? R + 1 : R - 1;
      const lines = up
        ? [`${n} = ${R} + 1`, `${R}² = ${R * R}`, `${n}² = ${R}² + ${R} + ${n} = ${R * R} + ${R} + ${n} = <b>${n * n}</b>`]
        : [`${n} = ${R} − 1`, `${R}² = ${R * R}`, `${n}² = ${R}² − ${R} − ${n} = ${R * R} − ${R} − ${n} = <b>${n * n}</b>`];
      return calc({ d, kind: "Quadrado de vizinhos", expr: `${n}²`, answer: n * n,
        hint: up ? `${n}² = ${R}² + ${R} + ${n}` : `${n}² = ${R}² − ${R} − ${n}`, lines,
        technique: "Vizinho de um número redondo: <b>(R + 1)² = R² + R + (R + 1)</b> e <b>(R − 1)² = R² − R − (R − 1)</b>." });
    }
    const k = rnd(1, 9), up = chance(0.5), n = up ? 50 + k : 50 - k;
    return calc({ d, kind: "Quadrados perto de 50", expr: `${n}²`, answer: n * n,
      hint: `${n} = 50 ${up ? "+" : "−"} ${k}`,
      lines: [`${n} = 50 ${up ? "+" : "−"} ${k}`, `50² = 2500`, `2 × 50 × ${k} = ${100 * k}`, `${k}² = ${k * k}`,
        `2500 ${up ? "+" : "−"} ${100 * k} + ${k * k} = <b>${n * n}</b>`],
      technique: "<b>(50 ± k)² = 2500 ± 100k + k²</b>: perto de 50 o quadrado sai quase de graça." });
  }

  const LAST = { 0: [0], 1: [1, 9], 4: [2, 8], 5: [5], 6: [4, 6], 9: [3, 7] };
  function genRoot(d) {
    const r = d === "easy" ? rnd(11, 20) : d === "medium" ? rnd(21, 60) : rnd(31, 99);
    const N = r * r;
    if (d === "easy") {
      return calc({ d, kind: "Raiz quadrada", expr: `√${N}`, answer: r,
        hint: "Os quadrados de 11 a 20 valem a pena decorar: 121, 144, 169, 196, 225, 256, 289, 324, 361, 400.",
        lines: [`Procure o número que, multiplicado por ele mesmo, dá ${N}`, `${r} × ${r} = ${N}`, `√${N} = <b>${r}</b>`],
        technique: "Decore os quadrados de 11 a 20: 121, 144, 169, 196, 225, 256, 289, 324, 361, 400." });
    }
    const last = N % 10, cands = LAST[last], P = Math.floor(N / 100);
    let t = 0;
    while ((t + 1) * (t + 1) <= P) t++;
    const opts = cands.map(c => t * 10 + c);
    const lines = [`Termina em ${last} → a raiz termina em ${cands.join(" ou ")}`,
      `Tire os dois últimos algarismos: sobra ${P}. O maior quadrado que cabe é ${t}² = ${t * t} → a raiz começa com ${t}`];
    if (opts.length > 1) {
      const mid = t * 10 + 5;
      lines.push(`Candidatos: ${opts.join(" ou ")}. Compare com ${mid}² = ${mid * mid}: ${N} é ${N > mid * mid ? "maior" : "menor"}, então fica o ${N > mid * mid ? "maior" : "menor"}`);
    }
    lines.push(`√${N} = <b>${r}</b>`);
    return calc({ d, kind: "Raiz quadrada exata", expr: `√${N}`, answer: r,
      hint: "Olhe o último algarismo e o começo do número.", lines,
      technique: "Final do quadrado → final da raiz: 1→1/9 · 4→2/8 · 5→5 · 6→4/6 · 9→3/7 · 0→0. O começo da raiz vem do maior quadrado que cabe no número sem os dois últimos algarismos." });
  }

  /* ════════════════════════════════════════════════════════════
     7. DIVISIBILIDADE
  ════════════════════════════════════════════════════════════ */
  const digitSum = n => String(n).split("").reduce((s, c) => s + +c, 0);
  const DIV_RULE = {
    2: "termina em algarismo par (0, 2, 4, 6, 8)",
    3: "a soma dos algarismos é divisível por 3",
    4: "os dois últimos algarismos formam um número divisível por 4",
    5: "termina em 0 ou 5",
    6: "é divisível por 2 <b>e</b> por 3 ao mesmo tempo",
    9: "a soma dos algarismos é divisível por 9",
    10: "termina em 0",
  };
  function divWhy(n, k) {
    const s = String(n), ok = n % k === 0;
    const mark = ok ? "✅" : "❌";
    if (k === 3 || k === 9) return `${mark} ${n}: soma ${s.split("").join(" + ")} = ${digitSum(n)}`;
    if (k === 4) return `${mark} ${n}: dois últimos = ${n % 100}`;
    if (k === 6) return `${mark} ${n}: ${n % 2 ? "ímpar" : "par"}, soma dos algarismos = ${digitSum(n)}`;
    return `${mark} ${n}: termina em ${n % 10}`;
  }
  function genDivis(d) {
    const k = pick(d === "easy" ? [2, 5, 10, 3] : d === "medium" ? [3, 4, 6, 9] : [3, 4, 6, 9]);
    const lo = d === "easy" ? 100 : 1000, hi = d === "easy" ? 999 : 9999;
    let correct;
    do { correct = k * rnd(Math.ceil(lo / k), Math.floor(hi / k)); } while (k !== 10 && k !== 5 && correct % 10 === 0);
    const dis = [];
    while (dis.length < 3) {
      // distratores "quase": mesma paridade/terminação quando possível, para obrigar a usar a regra
      let x = k === 6 || k === 4 ? 2 * rnd(lo / 2, hi / 2) : rnd(lo, hi);
      if (x % k !== 0 && !dis.includes(x)) dis.push(x);
    }
    const { options, answer } = mkOptions(correct, dis);
    return {
      kind: `Divisível por ${k}`,
      prompt: `Qual destes números é divisível por <b>${k}</b>?`,
      options: options.map(String), answer, label: `Divisível por ${k}?`,
      explain: () => sec("Regra", `<p class="ex-rule">Um número é divisível por <b>${k}</b> quando ${DIV_RULE[k]}.</p>`) +
        sec("Testando cada opção", options.map(n => `<p>${divWhy(n, k)}</p>`).join("")),
    };
  }

  /* ════════════════════════════════════════════════════════════
     TÓPICOS (trilha)
  ════════════════════════════════════════════════════════════ */
  const W = (e, m, h) => ({ easy: e, medium: m, hard: h });
  const TOPICS = [
    { id: "add", label: "Adição", icon: "➕", color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE",
      desc: "Somar por partes e arredondar-e-compensar",
      gens: [[genAddDecomp, W(1.2, 1, 1)], [genAddRound, W(1, 1, 1)]] },
    { id: "sub", label: "Subtração", icon: "➖", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA",
      desc: "Arredondar e devolver; completar como quem conta troco",
      gens: [[genSubRound, W(1, 1, 1)], [genSubUp, W(1, 1, 1)]] },
    { id: "mul", label: "Multiplicação", icon: "✖️", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0",
      desc: "Por partes, × 5, × 9, × 11, dobro e metade",
      gens: [[genMulSplit, W(1.2, 1, 1)], [genMul5, W(1, 1, 1)], [genMul9, W(1, 1, 1)], [genMul11, W(0.8, 1, 1)], [genMulHalf, W(0.6, 1, 1)]] },
    { id: "div", label: "Divisão", icon: "➗", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A",
      desc: "÷ 5, ÷ 25, metade da metade e dividir por partes",
      gens: [[genDiv5, W(1, 1, 1)], [genDivHalf, W(1, 1, 1)], [genDivSplit, W(1, 1, 1.2)]] },
    { id: "pct", label: "Porcentagem", icon: "💯", color: "#EC4899", bg: "#FDF2F8", border: "#FBCFE8",
      desc: "Monte qualquer % com 10%, 5%, 1%, 50% e 25%",
      gens: [[genPct, W(1.5, 1.5, 1.5)], [genPctSwap, W(0.4, 1, 1)]] },
    { id: "pot", label: "Potências e raízes", icon: "📐", color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE",
      desc: "Quadrados rápidos e raízes exatas sem conta",
      gens: [[genSquare, W(1, 1, 1)], [genSq5, W(1, 1, 1)], [genRoot, W(1, 1, 1)]] },
    { id: "divis", label: "Divisibilidade", icon: "🔍", color: "#06B6D4", bg: "#ECFEFF", border: "#A5F3FC",
      desc: "Critérios de divisibilidade por 2, 3, 4, 5, 6, 9 e 10",
      gens: [[genDivis, W(1, 1, 1)]] },
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

  /* ── Teoria ──────────────────────────────────────────────── */
  const ex = (title, lines) => `<p><b>${title}</b></p>${steps(lines)}`;
  const THEORY = {
    add: sec("Somar por partes", `<p class="ex-rule">${T_DECOMP}</p>` + ex("47 + 38", ["38 = 30 + 8", "47 + 30 = 77", "77 + 8 = 85"])) +
      sec("Arredondar e compensar", `<p class="ex-rule">${T_ROUND_ADD}</p>` + ex("56 + 39", ["39 = 40 − 1", "56 + 40 = 96", "96 − 1 = 95"])),
    sub: sec("Arredondar e devolver", `<p class="ex-rule">${T_ROUND_SUB}</p>` + ex("83 − 48", ["48 = 50 − 2", "83 − 50 = 33", "Tirei 2 a mais: 33 + 2 = 35"])) +
      sec("Completar (troco)", `<p class="ex-rule">${T_UP}</p>` + ex("100 − 37", ["37 → 40: +3", "40 → 100: +60", "3 + 60 = 63"])),
    mul: sec("Por partes", ex("24 × 7", ["20 × 7 = 140", "4 × 7 = 28", "140 + 28 = 168"])) +
      sec("× 5, × 50, × 25", ex("48 × 5", ["48 × 10 = 480", "480 ÷ 2 = 240"])) +
      sec("× 9 e × 99", ex("37 × 9", ["37 × 10 = 370", "370 − 37 = 333"])) +
      sec("× 11", ex("53 × 11", ["5 _ 3", "5 + 3 = 8", "583"])) +
      sec("Dobro e metade", ex("16 × 25", ["8 × 50", "4 × 100 = 400"])),
    div: sec("÷ 5, ÷ 50, ÷ 25", ex("340 ÷ 5", ["340 × 2 = 680", "680 ÷ 10 = 68"])) +
      sec("÷ 4 e ÷ 8", ex("252 ÷ 4", ["metade de 252 = 126", "metade de 126 = 63"])) +
      sec("Por partes", ex("156 ÷ 12", ["156 = 120 + 36", "120 ÷ 12 = 10", "36 ÷ 12 = 3", "10 + 3 = 13"])),
    pct: sec("Peças básicas", `<p class="ex-rule">10% = ÷ 10 · 1% = ÷ 100 · 50% = metade · 25% = metade da metade · 5% = metade de 10%</p>`) +
      sec("Montando", ex("15% de 80", ["10% = 8", "5% = 4", "15% = 8 + 4 = 12"]) + ex("35% de 60", ["30% = 18", "5% = 3", "35% = 21"])) +
      sec("Inverter", ex("8% de 25", ["= 25% de 8", "= 2"])),
    pot: sec("Terminados em 5", ex("35²", ["3 × 4 = 12", "coloque 25 no final: 1225"])) +
      sec("Vizinhos de redondos", ex("41²", ["40² = 1600", "1600 + 40 + 41 = 1681"])) +
      sec("Raiz exata", `<p class="ex-rule">Final 1→1/9 · 4→2/8 · 5→5 · 6→4/6 · 9→3/7 · 0→0</p>` +
        ex("√2116", ["termina em 6 → raiz termina em 4 ou 6", "sem os dois últimos: 21 → 4² = 16 cabe → começa com 4", "44 ou 46? 45² = 2025 < 2116 → 46"])),
    divis: sec("Critérios", Object.keys(DIV_RULE).map(k => `<p class="ex-rule"><b>Por ${k}</b>: ${DIV_RULE[k]}.</p>`).join("")),
  };

  global.MathEngine = { TOPICS, THEORY, generate };
})(typeof window !== "undefined" ? window : globalThis);
