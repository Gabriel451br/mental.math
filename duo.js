/* ════════════════════════════════════════════════════════════
   DUO — motor de jogo compartilhado (estilo Duolingo)
   Cada matéria fornece um "engine" com { TOPICS, THEORY, generate }.
   Este arquivo cuida da trilha, do treino personalizado, das vidas,
   do XP, das dinâmicas de exercício e da tela de resultados.

   Tipos de questão suportados (campo q.type):
   - "choice" (padrão): múltipla escolha. q.layout = "list" | "chips" | "tiles"
       q.options, q.answer (índice). Em "tiles", q.disabled = índices não clicáveis
       e a última opção aparece como botão separado (ex.: "Sem acento").
   - "split": separar sílabas tocando entre as letras. q.letters, q.check(gaps)
   - "match": ligar pares. q.pairs = [[esquerda, direita], ...]
   - "input": resposta numérica digitada. q.answer = número
   Config opcional: backHref/backLabel (link de volta), trainLink (atalho no Treino)
   Opcionais: q.answerText, q.describe(valor), q.explain(valor), q.context
════════════════════════════════════════════════════════════ */
(function () {
  "use strict";

  const DIFFS = [
    { id: "easy",   label: "Fácil" },
    { id: "medium", label: "Médio" },
    { id: "hard",   label: "Difícil" },
  ];
  const NUMQS = [5, 10, 15, 20];
  const MAX_HEARTS = 5, XP_CORRECT = 10, XP_COMBO = 5, XP_PERFECT = 20;
  const LESSON_Q = 10, LESSONS_PER_LEVEL = 2, MAX_LEVEL = 5;
  const diffForLevel = l => (l < 2 ? "easy" : l < 4 ? "medium" : "hard");

  function DuoGame(cfg) {
    const { TOPICS, THEORY, generate } = cfg.engine;
    const diffs = DIFFS.map(d => ({ ...d, desc: (cfg.diffDesc || {})[d.id] || "" }));
    const $ = id => document.getElementById(id);
    const topicMeta = id => TOPICS.find(t => t.id === id);

    const state = {
      tab: "path", diff: "easy", numQ: 10, hearts: true,
      mixTopics: TOPICS.map(t => t.id),
      last: null,
      questions: [], current: 0, answers: [], value: null, checked: false,
      lives: MAX_HEARTS, combo: 0, xp: 0, failed: false,
      totalStart: 0, qStart: 0, timer: null, match: null,
    };

    /* ── Progresso salvo ─────────────────────────── */
    function loadProgress() {
      try {
        const p = JSON.parse(localStorage.getItem(cfg.storeKey));
        if (p && p.topics) return p;
      } catch (e) {}
      return { xp: 0, topics: {}, streak: { last: null, count: 0 } };
    }
    const progress = loadProgress();
    function saveProgress() {
      try { localStorage.setItem(cfg.storeKey, JSON.stringify(progress)); } catch (e) {}
    }
    const topicProg = id => (progress.topics[id] = progress.topics[id] || { lessons: 0, correct: 0, total: 0 });
    function levelInfo(id) {
      const l = topicProg(id).lessons;
      const level = Math.min(MAX_LEVEL, Math.floor(l / LESSONS_PER_LEVEL));
      const pct = level >= MAX_LEVEL ? 100 : ((l % LESSONS_PER_LEVEL) / LESSONS_PER_LEVEL) * 100;
      return { level, pct, lessons: l };
    }
    const dayStr = offset => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);
    function bumpStreak() {
      const s = progress.streak;
      if (s.last === dayStr(0)) return;
      s.count = s.last === dayStr(1) ? s.count + 1 : 1;
      s.last = dayStr(0);
    }

    /* ── Utilitários ─────────────────────────────── */
    function fmtTime(ms) {
      const s = Math.floor(ms / 1000);
      return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
    }
    function shuffle(a) {
      a = a.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    function showScreen(id) {
      document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
      $("screen-" + id).classList.add("active");
      window.scrollTo(0, 0);
    }
    const qType = q => q.type || "choice";
    const fmtNum = n => (Number.isInteger(n) ? String(n) : String(+n.toFixed(4)).replace(".", ","));
    // aceita "12,5", "1.250" (milhar) e "12.5"
    function parseNum(s) {
      s = String(s).trim().replace(/\s/g, "");
      if (!s) return NaN;
      if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
      else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, "");
      return /^-?\d*\.?\d+$/.test(s) ? parseFloat(s) : NaN;
    }
    const isCorrect = (q, v) => (q.check ? q.check(v) : qType(q) === "input" ? Math.abs(v - q.answer) < 1e-6 : v === q.answer);
    const answerText = q => q.answerText || (qType(q) === "input" ? fmtNum(q.answer) : q.options[q.answer]);
    const describe = (q, v) => (q.describe ? q.describe(v) : qType(q) === "input" ? fmtNum(v) : q.options[v]);

    /* ════════════════════════════════════════════
       ESQUELETO HTML
    ════════════════════════════════════════════ */
    $("app").innerHTML = `
<div id="screen-home" class="screen active">
  <div class="container">
    <a class="back-link" href="${cfg.backHref || "./"}">${cfg.backLabel || "← Todas as matérias"}</a>
    <div class="app-header">
      <div class="app-title">${cfg.title}</div>
      <div class="app-sub">${cfg.subtitle}</div>
    </div>
    <div class="stats-row">
      <div class="stat"><div class="stat-val" id="st-streak">0</div><div class="stat-lbl">🔥 dias seguidos</div></div>
      <div class="stat"><div class="stat-val" id="st-xp">0</div><div class="stat-lbl">⚡ XP total</div></div>
      <div class="stat"><div class="stat-val" id="st-acc">—</div><div class="stat-lbl">🎯 precisão</div></div>
    </div>

    <div class="tabs">
      <button class="tab" id="tab-path" onclick="G.setTab('path')">🗺️ Trilha</button>
      <button class="tab" id="tab-train" onclick="G.setTab('train')">🎯 Treino</button>
    </div>

    <div class="tab-panel" id="panel-path">
      <div class="path" id="path"></div>
      <div class="path-hint">Toque numa unidade para estudar a teoria ou começar uma lição.<br>
        A dificuldade sobe sozinha conforme você ganha estrelas.</div>
    </div>

    <div class="tab-panel" id="panel-train">
      ${cfg.trainLink ? `
      <a class="train-link" href="${cfg.trainLink.href}">
        <span class="train-link-icon">${cfg.trainLink.icon}</span>
        <span class="train-link-body"><b>${cfg.trainLink.title}</b><span>${cfg.trainLink.desc}</span></span>
        <span class="arrow">›</span>
      </a>
      <div class="sec-label" style="margin-top:1.2rem">Ou pratique as técnicas</div>` : ""}
      <div class="section">
        <div class="sec-label">Conteúdos</div>
        <div class="topics-grid" id="topics-grid"></div>
        <div class="ops-hint" id="topics-hint"></div>
      </div>
      <div class="section">
        <div class="sec-label">Dificuldade</div>
        <div class="row-3" id="diff-row"></div>
      </div>
      <div class="section">
        <div class="sec-label">Questões por sessão</div>
        <div class="numq-row" id="numq-row"></div>
      </div>
      <div class="section">
        <div class="sec-label">Modo</div>
        <div class="toggle-row">
          <button class="toggle-btn" id="btn-hearts-on" onclick="G.setHearts(true)">
            <div class="btn-title">❤️ Com vidas</div><div class="btn-desc">5 vidas, estilo Duolingo</div>
          </button>
          <button class="toggle-btn" id="btn-hearts-off" onclick="G.setHearts(false)">
            <div class="btn-title">♾️ Treino livre</div><div class="btn-desc">Sem limite de erros</div>
          </button>
        </div>
      </div>
      <button class="btn-3d" onclick="G.startTraining()">Iniciar treino →</button>
    </div>
  </div>
</div>

<div id="screen-quiz" class="screen">
  <div class="container">
    <div class="quiz-top">
      <button class="btn-close" onclick="G.quit()" aria-label="Sair">✕</button>
      <div class="progress-bg"><div class="progress-fill" id="progress-fill" style="width:0%"></div></div>
      <div class="hearts" id="hearts"></div>
    </div>
    <div class="quiz-meta">
      <div><span class="op-badge" id="op-badge"></span><span class="combo" id="combo"></span></div>
      <div class="quiz-timer" id="timer-total">0:00</div>
    </div>
    <div class="question-card">
      <div class="q-kind" id="q-kind"></div>
      <div id="q-context"></div>
      <div id="q-prompt"></div>
    </div>
    <div id="answer-area"></div>
  </div>
  <div class="sheet" id="sheet">
    <div class="sheet-inner">
      <div class="fb-title" id="fb-title"></div>
      <div class="fb-answer" id="fb-answer"></div>
      <div class="explain-panel" id="explain-panel"></div>
      <div class="sheet-actions">
        <button class="btn-3d btn-explain" id="btn-explain" style="display:none" onclick="G.toggleExplain()">📖 Ver explicação</button>
        <button class="btn-3d" id="btn-main" disabled onclick="G.main()">Verificar</button>
      </div>
    </div>
  </div>
</div>

<div id="screen-results" class="screen">
  <div class="container">
    <div class="score-hero">
      <div class="score-emoji" id="res-emoji"></div>
      <div class="score-pct" id="res-pct"></div>
      <div class="score-sub" id="res-sub"></div>
      <div class="score-xp" id="res-xp"></div>
    </div>
    <div class="metrics-grid" id="metrics-grid"></div>
    <div class="card"><div class="card-title">Por conteúdo</div><div id="breakdown-list"></div></div>
    <div class="history" id="history-list"></div>
    <div class="history-hint">Toque numa questão para ver a explicação</div>
    <div class="action-col">
      <button class="btn-3d red" id="btn-redo" onclick="G.redoWrong()">↺ Refazer as que errei</button>
      <button class="btn-3d" onclick="G.retry()">Nova lição</button>
      <button class="btn-3d ghost" onclick="G.home()">Voltar</button>
    </div>
  </div>
</div>

<div class="modal-bg" id="modal-bg" onclick="if(event.target===this)G.closeModal()">
  <div class="modal" id="modal"></div>
</div>`;

    /* ════════════════════════════════════════════
       HOME
    ════════════════════════════════════════════ */
    function buildHome() {
      const tot = Object.values(progress.topics).reduce((a, t) => [a[0] + t.correct, a[1] + t.total], [0, 0]);
      $("st-xp").textContent = progress.xp;
      const alive = progress.streak.last === dayStr(0) || progress.streak.last === dayStr(1);
      $("st-streak").textContent = alive ? progress.streak.count : 0;
      $("st-acc").textContent = tot[1] ? Math.round((tot[0] / tot[1]) * 100) + "%" : "—";

      ["path", "train"].forEach(t => {
        $("tab-" + t).classList.toggle("active", state.tab === t);
        $("panel-" + t).classList.toggle("active", state.tab === t);
      });

      const offsets = [0, 50, 70, 40, -10, -55, -60, -25];
      $("path").innerHTML = TOPICS.map((t, i) => {
        const L = levelInfo(t.id);
        const stars = "★".repeat(L.level) + "☆".repeat(MAX_LEVEL - L.level);
        return `
          <div class="node" style="transform:translateX(${offsets[i % offsets.length]}px)">
            <button class="node-btn" style="background:${t.bg};border-color:${t.border};border-bottom-color:${t.color}" onclick="G.openTopic('${t.id}')">
              <span class="node-ring" style="--c:${t.color};--p:${L.pct}"></span>${t.icon}
            </button>
            <div class="node-name" style="color:${t.color}">${t.label}</div>
            <div class="node-stars">${stars}</div>
          </div>`;
      }).join("");

      $("diff-row").innerHTML = diffs.map(d => `
        <button class="diff-btn${state.diff === d.id ? " active" : ""}" onclick="G.setDiff('${d.id}')">
          <div class="btn-title">${d.label}</div><div class="btn-desc">${d.desc}</div>
        </button>`).join("");
      $("numq-row").innerHTML = NUMQS.map(n =>
        `<button class="numq-btn${state.numQ === n ? " active" : ""}" onclick="G.setNumQ(${n})">${n}</button>`).join("");
      $("topics-grid").innerHTML = TOPICS.map(t => {
        const on = state.mixTopics.includes(t.id);
        return `<button class="topic-chip${on ? " active" : ""}" onclick="G.toggleTopic('${t.id}')"
          style="${on ? `color:${t.color};background:${t.bg};border-color:${t.border}` : ""}">
          <span class="ic">${t.icon}</span>${t.label}</button>`;
      }).join("");
      const n = state.mixTopics.length;
      $("topics-hint").textContent = `${n} conteúdo${n !== 1 ? "s" : ""} selecionado${n !== 1 ? "s" : ""}`;
      $("btn-hearts-on").classList.toggle("active", state.hearts);
      $("btn-hearts-off").classList.toggle("active", !state.hearts);
    }

    function openTopic(id) {
      const t = topicMeta(id), L = levelInfo(id), tp = topicProg(id);
      const acc = tp.total ? Math.round((tp.correct / tp.total) * 100) + "% de acerto" : "Ainda não praticado";
      const dl = diffs.find(d => d.id === diffForLevel(L.level)).label;
      $("modal").innerHTML = `
        <div class="modal-head"><span class="modal-icon">${t.icon}</span><span class="modal-title">${t.label}</span>
          <button class="btn-close" onclick="G.closeModal()">✕</button></div>
        <div class="modal-desc">${t.desc}</div>
        <div class="muted">Nível ${L.level} de ${MAX_LEVEL} · ${L.lessons} liç${L.lessons === 1 ? "ão" : "ões"} · ${acc}</div>
        <div class="level-bar"><div class="level-fill" style="width:${L.pct}%;background:${t.color}"></div></div>
        <div class="action-col">
          <button class="btn-3d" style="background:${t.color};border-bottom-color:rgba(0,0,0,.2)" onclick="G.startLesson('${id}')">
            Começar lição · ${dl}</button>
          <button class="btn-3d ghost" onclick="G.openTheory('${id}')">📖 Ver teoria</button>
        </div>`;
      $("modal-bg").classList.add("show");
    }
    function openTheory(id) {
      const t = topicMeta(id);
      $("modal").innerHTML = `
        <div class="modal-head"><span class="modal-icon">${t.icon}</span><span class="modal-title">Teoria — ${t.label}</span>
          <button class="btn-close" onclick="G.closeModal()">✕</button></div>
        ${THEORY[id]}
        <div class="action-col"><button class="btn-3d" onclick="G.startLesson('${id}')">Praticar agora</button></div>`;
      $("modal-bg").classList.add("show");
      $("modal").scrollTop = 0;
    }
    const closeModal = () => $("modal-bg").classList.remove("show");

    /* ════════════════════════════════════════════
       SESSÕES
    ════════════════════════════════════════════ */
    function buildQuestions(topics, n, diff) {
      const list = [];
      for (let i = 0; i < n; i++) list.push(topics[i % topics.length]);
      return shuffle(list).map(t => generate(t, diff));
    }
    // Trilha: lição curta, com vidas, dificuldade pelo nível da unidade
    function startLesson(id) {
      const diff = diffForLevel(levelInfo(id).level);
      state.last = { topics: [id], n: LESSON_Q, diff, hearts: true };
      runSession(buildQuestions([id], LESSON_Q, diff), true);
    }
    // Treino: configurações escolhidas pelo usuário
    function startTraining() {
      state.last = { topics: state.mixTopics.slice(), n: state.numQ, diff: state.diff, hearts: state.hearts };
      runSession(buildQuestions(state.last.topics, state.numQ, state.diff), state.hearts);
    }
    function retry() {
      const L = state.last;
      runSession(buildQuestions(L.topics, L.n, L.diff), L.hearts);
    }
    function redoWrong() {
      const wrong = state.answers.filter(a => !a.correct).map(a => a.q);
      if (wrong.length) runSession(wrong, state.useHearts);
    }

    function runSession(questions, useHearts) {
      closeModal();
      Object.assign(state, {
        questions, useHearts, current: 0, answers: [], lives: MAX_HEARTS,
        combo: 0, xp: 0, failed: false, totalStart: Date.now(),
      });
      showScreen("quiz");
      clearInterval(state.timer);
      state.timer = setInterval(() => { $("timer-total").textContent = fmtTime(Date.now() - state.totalStart); }, 500);
      renderQuestion();
    }

    /* ════════════════════════════════════════════
       QUIZ — renderização por tipo de questão
    ════════════════════════════════════════════ */
    const renderHearts = () => { $("hearts").textContent = state.useHearts ? `❤️ ${state.lives}` : "❤️ ∞"; };

    function renderQuestion() {
      const q = state.questions[state.current];
      const t = topicMeta(q.topic);
      $("progress-fill").style.width = `${(state.current / state.questions.length) * 100}%`;
      renderHearts();
      const badge = $("op-badge");
      badge.textContent = `${t.icon} ${t.label}`;
      badge.style.color = t.color; badge.style.background = t.bg; badge.style.borderColor = t.border;
      $("combo").textContent = state.combo >= 3 ? `🔥 ${state.combo} seguidas` : "";
      $("q-kind").textContent = `Questão ${state.current + 1} de ${state.questions.length} · ${q.kind}`;
      $("q-context").innerHTML = q.context || "";
      $("q-prompt").innerHTML = q.prompt;

      state.value = null;
      state.checked = false;
      state.qStart = Date.now();
      RENDER[qType(q)](q, $("answer-area"));

      $("sheet").className = "sheet";
      $("explain-panel").className = "explain-panel";
      $("btn-explain").style.display = "none";
      const btn = $("btn-main");
      btn.textContent = "Verificar";
      btn.className = "btn-3d green";
      btn.disabled = true;
      window.scrollTo(0, 0);
    }

    const RENDER = {
      input(q, box) {
        box.innerHTML = `<div class="answer-row"><input class="answer-input" id="ans-input" type="text"
          inputmode="decimal" autocomplete="off" placeholder="sua resposta" /></div>`;
        const el = $("ans-input");
        el.addEventListener("input", () => {
          const v = parseNum(el.value);
          state.value = isNaN(v) ? null : v;
          $("btn-main").disabled = state.value == null;
        });
        setTimeout(() => el.focus(), 80);
      },
      choice(q, box) {
        const layout = q.layout || "list";
        if (layout === "list") {
          box.innerHTML = `<div class="options">${q.options.map((o, i) => `
            <button class="opt" data-i="${i}" onclick="G.pick(${i})">
              <span class="key">${String.fromCharCode(65 + i)}</span>
              <span class="${q.optionClass || ""}">${o}</span>
            </button>`).join("")}</div>`;
        } else if (layout === "chips") {
          box.innerHTML = `<div class="chips">${q.options.map((o, i) =>
            `<button class="chip" data-i="${i}" onclick="G.pick(${i})">${o}</button>`).join("")}</div>`;
        } else { // tiles
          const last = q.options.length - 1, off = new Set(q.disabled || []);
          box.innerHTML = `<div class="tiles">${q.options.slice(0, last).map((o, i) => off.has(i)
              ? `<button class="tile off" disabled>${o}</button>`
              : `<button class="tile" data-i="${i}" onclick="G.pick(${i})">${o}</button>`).join("")}</div>
            <div class="tile-extra"><button class="opt" data-i="${last}" onclick="G.pick(${last})">${q.options[last]}</button></div>`;
        }
      },
      split(q, box) {
        state.value = new Set();
        box.innerHTML = `<div class="split">${q.letters.map((c, i) =>
          `<span class="ch">${c}</span>` + (i < q.letters.length - 1 ? `<button class="gap" data-g="${i + 1}" onclick="G.gap(${i + 1})">-</button>` : "")).join("")}</div>
          <div class="split-hint">Toque entre as letras para separar as sílabas</div>`;
      },
      match(q, box) {
        const idx = q.pairs.map((_, i) => i);
        state.match = { sel: { L: null, R: null }, done: new Set(), mistakes: 0 };
        const col = (side, order) => `<div class="match-col">${order.map(i =>
          `<button class="m-item" data-side="${side}" data-p="${i}" onclick="G.matchTap('${side}',${i})">${q.pairs[i][side === "L" ? 0 : 1]}</button>`).join("")}</div>`;
        box.innerHTML = `<div class="match">${col("L", shuffle(idx))}${col("R", shuffle(idx))}</div>`;
      },
    };

    function pick(i) {
      if (state.checked) return;
      state.value = i;
      document.querySelectorAll("#answer-area [data-i]").forEach(el => el.classList.toggle("selected", +el.dataset.i === i));
      $("btn-main").disabled = false;
    }
    function gap(g) {
      if (state.checked) return;
      const s = state.value;
      s.has(g) ? s.delete(g) : s.add(g);
      document.querySelector(`.gap[data-g="${g}"]`).classList.toggle("on", s.has(g));
      $("btn-main").disabled = s.size === 0;
    }
    function matchTap(side, p) {
      if (state.checked) return;
      const m = state.match;
      if (m.done.has(p)) return;
      m.sel[side] = m.sel[side] === p ? null : p;
      const paint = () => document.querySelectorAll(".m-item").forEach(el => {
        const ep = +el.dataset.p, es = el.dataset.side;
        el.classList.toggle("selected", m.sel[es] === ep && !m.done.has(ep));
      });
      paint();
      if (m.sel.L == null || m.sel.R == null) return;
      const [l, r] = [m.sel.L, m.sel.R];
      const elL = document.querySelector(`.m-item[data-side="L"][data-p="${l}"]`);
      const elR = document.querySelector(`.m-item[data-side="R"][data-p="${r}"]`);
      m.sel = { L: null, R: null };
      if (l === r) {
        m.done.add(l);
        elL.classList.add("done"); elR.classList.add("done");
      } else {
        m.mistakes++;
        [elL, elR].forEach(el => { el.classList.add("bad"); setTimeout(() => el.classList.remove("bad"), 450); });
      }
      paint();
      if (m.done.size === state.questions[state.current].pairs.length) {
        state.value = m.mistakes;
        $("btn-main").disabled = false;
        setTimeout(checkAnswer, 350);
      }
    }

    function markResult(q) {
      const t = qType(q);
      if (t === "choice") {
        document.querySelectorAll("#answer-area [data-i]").forEach(el => {
          const i = +el.dataset.i;
          el.disabled = true;
          el.classList.remove("selected");
          if (i === q.answer) el.classList.add("right");
          else if (i === state.value) el.classList.add("wrong");
        });
      } else if (t === "input") {
        const el = $("ans-input");
        el.disabled = true;
        el.classList.add(isCorrect(q, state.value) ? "correct" : "wrong");
      } else if (t === "split") {
        const right = new Set(q.gaps);
        document.querySelectorAll(".gap").forEach(el => {
          const g = +el.dataset.g, on = state.value.has(g);
          el.disabled = true;
          el.classList.remove("on");
          if (on && right.has(g)) el.classList.add("right");
          else if (on) el.classList.add("wrong");
          else if (right.has(g)) el.classList.add("missed");
        });
      }
    }

    function main() { if (!state.checked) checkAnswer(); else next(); }

    function checkAnswer() {
      if (state.checked || state.value == null) return;
      const q = state.questions[state.current];
      const value = qType(q) === "split" ? [...state.value].sort((a, b) => a - b) : state.value;
      const correct = isCorrect(q, value);
      state.checked = true;
      markResult(q);

      if (correct) {
        state.combo++;
        state.xp += XP_CORRECT + (state.combo >= 3 ? XP_COMBO : 0);
      } else {
        state.combo = 0;
        if (state.useHearts) state.lives--;
        if (navigator.vibrate) try { navigator.vibrate(120); } catch (e) {}
      }
      renderHearts();
      state.answers.push({ q, value, correct, time: (Date.now() - state.qStart) / 1000 });

      const praise = ["Muito bem!", "Mandou bem!", "Isso aí!", "Perfeito!", "Excelente!"];
      $("sheet").className = "sheet " + (correct ? "ok" : "bad");
      $("fb-title").textContent = correct
        ? (state.combo >= 3 ? `🔥 ${state.combo} seguidas!` : "✓ " + praise[Math.floor(Math.random() * praise.length)])
        : "✗ Resposta incorreta";
      $("fb-answer").innerHTML = `Resposta correta: <b>${answerText(q)}</b>`;
      $("explain-panel").innerHTML = explanationHTML(q, value);
      $("btn-explain").style.display = "";
      $("btn-explain").textContent = "📖 Ver explicação";
      const btn = $("btn-main");
      btn.disabled = false;
      btn.textContent = "Continuar";
      btn.className = "btn-3d " + (correct ? "green" : "red");

      if (state.useHearts && state.lives <= 0) {
        state.failed = true;
        btn.textContent = "Ver resultado";
        toggleExplain();
      }
    }

    function explanationHTML(q, value) {
      const ok = isCorrect(q, value);
      const head = ok
        ? `<div class="yours good">✓ Sua resposta: <b>${describe(q, value)}</b></div>`
        : `<div class="yours bad">✗ Sua resposta: <b>${describe(q, value)}</b></div>
           <div class="yours good">✓ Correta: <b>${answerText(q)}</b></div>`;
      return head + (q.explain ? q.explain(value) : "");
    }

    function toggleExplain() {
      const p = $("explain-panel");
      p.classList.toggle("show");
      $("btn-explain").textContent = p.classList.contains("show") ? "Fechar" : "📖 Ver explicação";
      if (p.classList.contains("show")) p.scrollTop = 0;
    }

    function next() {
      if (state.failed) return endQuiz();
      state.current++;
      if (state.current < state.questions.length) renderQuestion();
      else endQuiz();
    }

    function quit() {
      if (state.answers.length && !confirm("Sair da lição? O progresso desta lição será perdido.")) return;
      clearInterval(state.timer);
      home();
    }

    document.addEventListener("keydown", e => {
      if (!$("screen-quiz").classList.contains("active")) return;
      if (e.key === "Enter") {
        if (!$("btn-main").disabled) { e.preventDefault(); main(); }
        return;
      }
      const q = state.questions[state.current];
      if (qType(q) !== "choice" || state.checked) return;
      const k = e.key.toLowerCase();
      let idx = "123456789".indexOf(k);
      if (idx < 0 && (q.layout || "list") === "list") idx = "abcd".indexOf(k);
      const el = document.querySelector(`#answer-area [data-i="${idx}"]`);
      if (idx >= 0 && el && !el.disabled) pick(idx);
    });

    /* ════════════════════════════════════════════
       RESULTADOS
    ════════════════════════════════════════════ */
    function endQuiz() {
      clearInterval(state.timer);
      const totalMs = Date.now() - state.totalStart;
      const answered = state.answers.length;
      const correct = state.answers.filter(a => a.correct).length;
      const total = state.questions.length;
      const pct = Math.round((correct / total) * 100);
      const perfect = correct === total;

      if (perfect) state.xp += XP_PERFECT;
      progress.xp += state.xp;
      state.answers.forEach(a => { const tp = topicProg(a.q.topic); tp.total++; if (a.correct) tp.correct++; });
      if (!state.failed) [...new Set(state.questions.map(q => q.topic))].forEach(id => topicProg(id).lessons++);
      bumpStreak();
      saveProgress();

      showScreen("results");
      const color = perfect ? "#059669" : state.failed ? "#EF4444" : pct >= 70 ? "#3B82F6" : "#F59E0B";
      $("res-emoji").textContent = perfect ? "🏆" : state.failed ? "💔" : pct >= 70 ? "🎉" : "💪";
      $("res-pct").textContent = pct + "%";
      $("res-pct").style.color = color;
      $("res-sub").textContent = state.failed
        ? `Suas vidas acabaram na questão ${answered} de ${total}. Revise as explicações abaixo!`
        : `${correct} de ${total} corretas${perfect ? " — lição perfeita!" : ""}`;
      $("res-xp").textContent = `⚡ +${state.xp} XP${perfect ? ` (inclui +${XP_PERFECT} de bônus)` : ""}`;

      const avg = answered ? (totalMs / 1000 / answered).toFixed(1) : "0";
      $("metrics-grid").innerHTML = [
        { label: "Tempo total", val: fmtTime(totalMs) },
        { label: "Média/questão", val: avg + "s" },
        { label: "Acertos", val: `${correct}/${total}` },
      ].map(m => `<div class="metric-card"><div class="metric-val">${m.val}</div><div class="metric-lbl">${m.label}</div></div>`).join("");

      const used = TOPICS.filter(t => state.answers.some(a => a.q.topic === t.id));
      $("breakdown-list").innerHTML = used.map(t => {
        const A = state.answers.filter(a => a.q.topic === t.id);
        const C = A.filter(a => a.correct).length;
        return `<div class="breakdown-row">
          <span class="breakdown-sym">${t.icon}</span><span class="breakdown-name">${t.label}</span>
          <div class="bar-bg"><div class="bar-fill" style="width:${(C / A.length) * 100}%;background:${t.color}"></div></div>
          <span class="breakdown-cnt">${C}/${A.length}</span></div>`;
      }).join("");

      $("history-list").innerHTML = state.answers.map((a, i) => `
        <div class="history-row" id="hist-${i}">
          <button class="history-head" onclick="G.toggleHist(${i})">
            <span class="history-sym">${topicMeta(a.q.topic).icon}</span>
            <span class="history-q">${a.q.label}</span>
            <span class="history-res ${a.correct ? "ok" : "bad"}">${a.correct ? "✓" : "✗"}</span>
          </button>
          <div class="history-body"></div>
        </div>`).join("");
      $("btn-redo").style.display = state.answers.some(a => !a.correct) ? "" : "none";
    }

    function toggleHist(i) {
      const row = $("hist-" + i), body = row.querySelector(".history-body");
      if (!body.innerHTML) {
        const a = state.answers[i];
        body.innerHTML = `<div class="q-kind">${a.q.kind}</div>${a.q.context || ""}<div style="margin-bottom:10px">${a.q.prompt}</div>` +
          explanationHTML(a.q, a.value);
      }
      row.classList.toggle("open");
    }

    function home() { buildHome(); showScreen("home"); }

    /* ── API usada pelos onclick ─────────────────── */
    window.G = {
      setTab: t => { state.tab = t; buildHome(); },
      setDiff: d => { state.diff = d; buildHome(); },
      setNumQ: n => { state.numQ = n; buildHome(); },
      setHearts: on => { state.hearts = on; buildHome(); },
      toggleTopic: id => {
        const i = state.mixTopics.indexOf(id);
        if (i >= 0) { if (state.mixTopics.length > 1) state.mixTopics.splice(i, 1); }
        else state.mixTopics.push(id);
        buildHome();
      },
      openTopic, openTheory, closeModal, startLesson, startTraining, retry, redoWrong,
      pick, gap, matchTap, main, toggleExplain, quit, toggleHist, home,
      _state: state,
    };

    buildHome();

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => { navigator.serviceWorker.register("sw.js").catch(() => {}); });
    }
  }

  window.DuoGame = DuoGame;
})();
