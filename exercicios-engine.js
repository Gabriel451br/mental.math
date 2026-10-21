/* ════════════════════════════════════════════════════════════
   EXERCÍCIOS MISTOS — junta os conteúdos de todas as matérias
   Cada tópico ganha o prefixo do jogo de origem ("adm:princ",
   "con:lei:art5"…) e a geração é repassada ao motor original.
════════════════════════════════════════════════════════════ */
(function (global) {
  "use strict";

  // jogo de origem → motor, nome e matéria (a ordem aqui é a ordem na tela)
  const SOURCES = [
    { key: "mat", eng: global.MathEngine, game: "Matemática Mental", short: "Matemática", subject: "rlm" },
    { key: "log", eng: global.LogicEngine, game: "Lógica Proposicional", short: "Lógica", subject: "rlm" },
    { key: "fon", eng: global.PortuguesEngine, game: "Fonologia e Acentuação", short: "Fonologia", subject: "pt" },
    { key: "ort", eng: global.OrtografiaEngine, game: "Ortografia e Emprego das Palavras", short: "Ortografia", subject: "pt" },
    { key: "con", eng: global.ConstitucionalEngine, game: "Direito Constitucional", short: "Constitucional", subject: "con" },
    { key: "adm", eng: global.AdministrativoEngine, game: "Direito Administrativo", short: "Administrativo", subject: "adm" },
  ];

  const TOPICS = [], THEORY = {}, ROUTE = {};
  for (const src of SOURCES) {
    for (const t of src.eng.TOPICS) {
      const id = `${src.key}:${t.id}`;
      TOPICS.push({ ...t, id, chip: t.label, label: `${src.short} · ${t.label}`, group: src.game, subject: src.subject });
      THEORY[id] = (src.eng.THEORY || {})[t.id] || "";
      ROUTE[id] = d => src.eng.generate(t.id, d);
    }
    if (src.eng.LAW) {
      for (const b of src.eng.LAW.blocks) {
        const id = `${src.key}:lei:${b.id}`;
        TOPICS.push({ id, chip: b.label, label: `${src.short} · Lei seca: ${b.label}`, icon: "📜",
          color: "#B45309", bg: "#FFFBEB", border: "#FDE68A", desc: b.ref,
          group: `${src.game} — Lei seca`, subject: src.subject, law: true });
        ROUTE[id] = d => src.eng.LAW.generate(b.id, d);
      }
    }
  }

  function generate(topicId, d) {
    const q = ROUTE[topicId](d);
    q.topic = topicId;
    return q;
  }

  global.ExerciciosEngine = { TOPICS, THEORY, generate, SOURCES };
})(typeof window !== "undefined" ? window : globalThis);
