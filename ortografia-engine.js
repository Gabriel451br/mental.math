/* ════════════════════════════════════════════════════════════
   PORTUGUÊS — Ortografia e emprego das palavras
   Porquês, há/a, onde/aonde, expressões que confundem, parônimos,
   grafia (letras) e hífen. Cada forma tem sua regra, para explicar
   tanto a resposta certa quanto por que a opção marcada está errada.
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
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const MAXLVL = { easy: 1, medium: 2, hard: 3 };
  function byLevel(list, d) {
    const ok = list.filter(x => (x.lvl || 1) <= MAXLVL[d]);
    if (d === "hard") {
      const hard = ok.filter(x => (x.lvl || 1) >= 2);
      if (hard.length && chance(0.6)) return hard;
    }
    return ok.length ? ok : list;
  }
  const BLANK = `<span class="blank">______</span>`;
  const CE = ["Certo", "Errado"];

  /* ════════════════════════════════════════════════════════════
     FRASES PARA COMPLETAR
     F(frase com ___, resposta, opções, nível)
     As regras de cada forma ficam em RULES (chave = forma em minúsculas).
  ════════════════════════════════════════════════════════════ */
  const F = (s, a, o, lvl = 1) => ({ s, a, o, lvl });

  const P4 = ["por que", "por quê", "porque", "porquê"];
  const HA = ["há", "a", "à"];
  const CERCA = ["acerca", "a cerca", "há cerca"];
  const ONDE = ["onde", "aonde", "donde"];

  const UNITS = {
    porque: {
      items: [
        F("___ você chegou atrasado?", "por que", P4),
        F("___ o prazo foi prorrogado?", "por que", P4),
        F("Não sei ___ ela desistiu do concurso.", "por que", P4, 2),
        F("Ninguém explicou ___ a reunião foi cancelada.", "por que", P4, 2),
        F("Quero entender ___ o sistema caiu ontem.", "por que", P4, 2),
        F("Estas são as razões ___ lutamos.", "por que", P4, 3),
        F("O caminho ___ passamos estava em obras.", "por que", P4, 3),
        F("Você faltou à prova ___?", "por quê", P4),
        F("Ela foi embora sem dizer ___.", "por quê", P4, 2),
        F("O gerente recusou o pedido e não disse ___.", "por quê", P4, 2),
        F("Ele não veio à reunião ___?", "por quê", P4, 2),
        F("Cheguei atrasado ___ o ônibus quebrou.", "porque", P4),
        F("Não fui à festa ___ estava cansado.", "porque", P4),
        F("Ele foi aprovado ___ se dedicou muito.", "porque", P4),
        F("Estude todos os dias, ___ a prova está próxima.", "porque", P4, 2),
        F("O jogo foi adiado ___ choveu muito.", "porque", P4),
        F("Ninguém entendeu o ___ da decisão.", "porquê", P4),
        F("Quero saber o ___ de tanta demora.", "porquê", P4),
        F("Sempre há um ___ para tudo.", "porquê", P4, 2),
        F("Ele explicou todos os ___ da mudança.", "porquês", ["porquês", "por quês", "porques", "por que"], 3),
      ],
    },
    haa: {
      items: [
        F("Moro nesta cidade ___ dez anos.", "há", HA),
        F("___ dois meses que não vejo meu irmão.", "há", HA),
        F("Ele saiu ___ poucos minutos.", "há", HA),
        F("O concurso foi realizado ___ um ano.", "há", HA),
        F("___ muitas vagas abertas neste edital.", "há", HA, 2),
        F("Não ___ motivo para preocupação.", "há", HA, 2),
        F("Daqui ___ duas semanas sairá o resultado.", "a", HA),
        F("A prova será daqui ___ três dias.", "a", HA),
        F("A escola fica ___ dois quilômetros daqui.", "a", HA, 2),
        F("Estamos ___ cinco dias da prova.", "a", HA, 2),
        F("Falamos ___ do novo edital.", "acerca", CERCA, 2),
        F("Discutiram ___ das mudanças na lei.", "acerca", CERCA, 2),
        F("O hospital fica ___ de três quilômetros do centro.", "a cerca", CERCA, 3),
        F("Daqui ___ de um mês teremos o resultado.", "a cerca", CERCA, 3),
        F("Ele chegou ___ de duas horas.", "há cerca", CERCA, 3),
        F("___ de cem candidatos na sala.", "há cerca", CERCA, 3),
      ],
    },
    onde: {
      items: [
        F("___ você mora?", "onde", ONDE),
        F("___ estão os documentos?", "onde", ONDE),
        F("Não sei ___ deixei as chaves.", "onde", ONDE),
        F("Esta é a cidade ___ nasci.", "onde", ONDE),
        F("A empresa ___ trabalho fica no centro.", "onde", ONDE, 2),
        F("___ você vai com tanta pressa?", "aonde", ONDE),
        F("___ vamos chegar com essa atitude?", "aonde", ONDE, 2),
        F("Leve-me ___ você for.", "aonde", ONDE, 2),
        F("Não sei ___ eles querem chegar.", "aonde", ONDE, 2),
        F("___ vem esse barulho?", "donde", ONDE, 3),
        F("Ninguém sabe ___ surgiu essa ideia.", "donde", ONDE, 3),
      ],
    },
    expr: {
      items: [
        F("Ele é um ___ aluno.", "mau", ["mau", "mal"]),
        F("Que ___ humor!", "mau", ["mau", "mal"]),
        F("Ela dormiu ___ ontem.", "mal", ["mal", "mau"]),
        F("O candidato se saiu ___ na prova.", "mal", ["mal", "mau"]),
        F("O ___ do século é a pressa.", "mal", ["mal", "mau"], 2),
        F("Estudei muito, ___ não passei.", "mas", ["mas", "mais"]),
        F("Preciso de ___ tempo para estudar.", "mais", ["mais", "mas"]),
        F("Estude, ___ você não passará.", "senão", ["senão", "se não"], 2),
        F("___ chover, iremos à praia.", "se não", ["se não", "senão"], 2),
        F("Não fez nada ___ reclamar.", "senão", ["senão", "se não"], 3),
        F("Estudo todo dia ___ de passar no concurso.", "a fim", ["a fim", "afim"], 2),
        F("Biologia e química são áreas ___.", "afins", ["afins", "a fins"], 2),
        F("Ela fala ___.", "demais", ["demais", "de mais"], 2),
        F("Os ___ candidatos devem aguardar lá fora.", "demais", ["demais", "de mais"], 2),
        F("Não vejo nada ___ nesse pedido.", "de mais", ["de mais", "demais"], 3),
        F("Não estudou, ___ trabalhou.", "tampouco", ["tampouco", "tão pouco"], 3),
        F("Ganhou ___ que mal paga o aluguel.", "tão pouco", ["tão pouco", "tampouco"], 3),
        F("___ café, tomei chá.", "em vez de", ["em vez de", "ao invés de"], 3),
        F("Estou ___ de todas as novidades.", "a par", ["a par", "ao par"], 2),
      ],
    },
    paron: {
      items: [
        F("A ___ do Senado durou cinco horas.", "sessão", ["sessão", "seção", "cessão"]),
        F("Comprei ingresso para a ___ das 20h no cinema.", "sessão", ["sessão", "seção", "cessão"]),
        F("Procure a ___ de hortifrúti no mercado.", "seção", ["seção", "sessão", "cessão"]),
        F("A ___ de direitos autorais foi registrada em cartório.", "cessão", ["cessão", "sessão", "seção"], 2),
        F("O ___ da orquestra foi emocionante.", "concerto", ["concerto", "conserto"]),
        F("Levei o celular para o ___.", "conserto", ["conserto", "concerto"]),
        F("Faça uma ___ detalhada do local do acidente.", "descrição", ["descrição", "discrição"]),
        F("O cargo exige ___ e sigilo.", "discrição", ["discrição", "descrição"], 2),
        F("O ___ jurista proferiu a palestra.", "eminente", ["eminente", "iminente"], 2),
        F("Há risco ___ de desabamento.", "iminente", ["iminente", "eminente"], 2),
        F("O motorista ___ as leis de trânsito.", "infringiu", ["infringiu", "infligiu"], 3),
        F("O juiz ___ uma pena severa ao réu.", "infligiu", ["infligiu", "infringiu"], 3),
        F("O Congresso ___ o tratado internacional.", "ratificou", ["ratificou", "retificou"], 2),
        F("Foi preciso ___ o edital, que tinha um erro.", "retificar", ["retificar", "ratificar"], 2),
        F("O ___ na avenida está intenso.", "tráfego", ["tráfego", "tráfico"]),
        F("A polícia combate o ___ de drogas.", "tráfico", ["tráfico", "tráfego"]),
        F("O juiz expediu um ___ de busca e apreensão.", "mandado", ["mandado", "mandato"], 2),
        F("O ___ do prefeito é de quatro anos.", "mandato", ["mandato", "mandado"], 2),
        F("O ___ da mesa é de dois metros.", "comprimento", ["comprimento", "cumprimento"]),
        F("Ele fez questão de dar um ___ a todos.", "cumprimento", ["cumprimento", "comprimento"]),
        F("Guarde os alimentos na ___.", "despensa", ["despensa", "dispensa"], 2),
        F("O chefe concedeu ___ ao funcionário.", "dispensa", ["dispensa", "despensa"], 2),
        F("O preso voltou para a ___.", "cela", ["cela", "sela"]),
        F("Ele colocou a ___ no cavalo.", "sela", ["sela", "cela"]),
        F("O ___ do IBGE conta a população.", "censo", ["censo", "senso"], 2),
        F("Ele tem bom ___ de humor.", "senso", ["senso", "censo"]),
        F("O juiz ___ o pedido da defesa.", "deferiu", ["deferiu", "diferiu"], 3),
        F("O submarino ___ depois de horas no fundo do mar.", "emergiu", ["emergiu", "imergiu"], 3),
      ],
    },
  };

  /* ── Regra de cada forma ─────────────────────────────────── */
  const RULES = {
    "por que": "<b>por que</b> (separado, sem acento): pergunta direta ou indireta (= por qual motivo) ou equivale a <b>pelo qual / pela qual / pelos quais</b>.",
    "por quê": "<b>por quê</b> (separado, com acento): no <b>fim da frase</b> ou antes de pontuação.",
    "porque": "<b>porque</b> (junto, sem acento): <b>explica ou dá a causa</b> (= pois, uma vez que).",
    "porquê": "<b>porquê</b> (junto, com acento): é <b>substantivo</b> (= o motivo); vem com artigo ou determinante: o porquê, um porquê.",
    "porquês": "<b>porquês</b>: plural do substantivo porquê (= os motivos).",
    "por quês": "Forma inexistente: o plural do substantivo é <b>porquês</b>, junto.",
    "porques": "Forma inexistente: o plural do substantivo é <b>porquês</b>, com acento.",
    "há": "<b>há</b> (verbo haver): indica <b>tempo passado</b> (= faz) ou <b>existência</b> (= existe/existem).",
    "a": "<b>a</b> (preposição): indica <b>tempo futuro</b> ou <b>distância</b>.",
    "à": "<b>à</b> (crase = a + a): só ocorre antes de palavra feminina que admite artigo. Não se usa para tempo passado, futuro em números nem distância genérica.",
    "acerca": "<b>acerca de</b>: = sobre, a respeito de.",
    "a cerca": "<b>a cerca de</b>: = a aproximadamente (distância ou tempo futuro).",
    "há cerca": "<b>há cerca de</b>: = faz aproximadamente (tempo passado) ou existem aproximadamente.",
    "onde": "<b>onde</b>: lugar fixo, com verbos de permanência (estar, ficar, morar, nascer…). Pergunta “em que lugar?”.",
    "aonde": "<b>aonde</b> (a + onde): movimento, com verbos que pedem a preposição <b>a</b> (ir, chegar, levar…). Pergunta “para que lugar?”.",
    "donde": "<b>donde</b> (de + onde): procedência, origem — com verbos como vir, surgir, sair.",
    "mau": "<b>mau</b>: adjetivo, o contrário de <b>bom</b>.",
    "mal": "<b>mal</b>: advérbio, o contrário de <b>bem</b>; ou substantivo (o mal = a doença, o problema).",
    "mas": "<b>mas</b>: conjunção de oposição (= porém, contudo).",
    "mais": "<b>mais</b>: indica quantidade ou intensidade, o contrário de <b>menos</b>.",
    "senão": "<b>senão</b>: = caso contrário, do contrário; ou = a não ser, exceto.",
    "se não": "<b>se não</b>: = caso não (conjunção condicional <i>se</i> + <i>não</i>).",
    "a fim": "<b>a fim de</b>: indica finalidade (= para).",
    "afim": "<b>afim</b>: = semelhante, que tem afinidade (plural: afins).",
    "afins": "<b>afins</b>: semelhantes, que têm afinidade.",
    "a fins": "Forma inadequada aqui: para indicar afinidade usa-se <b>afins</b>, junto.",
    "demais": "<b>demais</b>: = excessivamente, muito; ou = os outros, os restantes.",
    "de mais": "<b>de mais</b>: o contrário de <b>de menos</b> (refere-se a substantivo ou pronome: nada de mais).",
    "tampouco": "<b>tampouco</b>: = também não, nem.",
    "tão pouco": "<b>tão pouco</b>: = muito pouco (intensidade).",
    "em vez de": "<b>em vez de</b>: = no lugar de. Serve para qualquer substituição.",
    "ao invés de": "<b>ao invés de</b>: = ao contrário de; só se usa com ideias <b>opostas</b> (subir × descer).",
    "a par": "<b>a par</b>: = ciente, informado (estar a par de algo).",
    "ao par": "<b>ao par</b>: termo do câmbio — moedas de valores equivalentes.",
    "sessão": "<b>sessão</b>: reunião ou tempo de duração de um evento (sessão do Senado, do cinema).",
    "seção": "<b>seção</b> (ou secção): divisão, departamento, setor.",
    "cessão": "<b>cessão</b>: ato de ceder (cessão de direitos, de um imóvel).",
    "concerto": "<b>concerto</b>: apresentação musical; harmonia, acordo.",
    "conserto": "<b>conserto</b>: reparo, ato de consertar.",
    "descrição": "<b>descrição</b>: ato de descrever.",
    "discrição": "<b>discrição</b>: qualidade de quem é discreto, reserva.",
    "eminente": "<b>eminente</b>: ilustre, notável, elevado.",
    "iminente": "<b>iminente</b>: prestes a acontecer.",
    "infringiu": "<b>infringir</b>: violar, desrespeitar (uma lei, uma regra).",
    "infligiu": "<b>infligir</b>: aplicar (pena, castigo, derrota).",
    "ratificou": "<b>ratificar</b>: confirmar, validar.",
    "ratificar": "<b>ratificar</b>: confirmar, validar.",
    "retificou": "<b>retificar</b>: corrigir, tornar reto.",
    "retificar": "<b>retificar</b>: corrigir, tornar reto.",
    "tráfego": "<b>tráfego</b>: trânsito, movimento de veículos ou dados.",
    "tráfico": "<b>tráfico</b>: comércio ilegal (de drogas, de armas).",
    "mandado": "<b>mandado</b>: ordem judicial ou administrativa (mandado de busca, de segurança).",
    "mandato": "<b>mandato</b>: período de exercício de um cargo eletivo; procuração.",
    "comprimento": "<b>comprimento</b>: extensão, medida.",
    "cumprimento": "<b>cumprimento</b>: saudação; ou ato de cumprir (cumprimento de uma ordem).",
    "despensa": "<b>despensa</b>: lugar onde se guardam mantimentos.",
    "dispensa": "<b>dispensa</b>: licença, ato de dispensar.",
    "cela": "<b>cela</b>: quarto pequeno; cômodo de prisão.",
    "sela": "<b>sela</b>: assento que se põe no cavalo; também forma do verbo selar.",
    "censo": "<b>censo</b>: recenseamento, contagem da população.",
    "senso": "<b>senso</b>: juízo, capacidade de julgar (bom senso, senso de humor).",
    "deferiu": "<b>deferir</b>: atender, conceder (deferir um pedido).",
    "diferiu": "<b>diferir</b>: adiar; ou ser diferente.",
    "emergiu": "<b>emergir</b>: vir à tona, sair de dentro da água.",
    "imergiu": "<b>imergir</b>: afundar, mergulhar.",
  };
  const ruleOf = f => RULES[f.toLowerCase()] || "";
  const fillText = (it, word) => {
    const w = it.s.startsWith("___") ? cap(word) : word;
    return it.s.replace("___", `<b>${w}</b>`);
  };

  function genFill(u, d) {
    const it = pick(byLevel(UNITS[u].items, d));
    const atStart = it.s.startsWith("___");
    const show = w => (atStart ? cap(w) : w);
    const correct = show(it.a);
    const { options, answer } = mkOptions(correct, it.o.filter(o => o !== it.a).map(show));
    return {
      kind: "Complete a frase", prompt: `Complete corretamente:<div class="sentence">${it.s.replace("___", BLANK)}</div>`,
      options, answer, label: it.s.replace("___", "___"),
      explain: ch => sec("Frase correta", `<p>${fillText(it, it.a)}</p>`) +
        sec("Regra", `<p class="ex-rule">${ruleOf(it.a)}</p>`) +
        (ch !== answer ? sec("Sua opção", `<p class="ex-rule">${ruleOf(options[ch]) || "Essa forma não se encaixa nesta frase."}</p>`, "ex-wrong") : ""),
    };
  }
  function genFillCE(u, d) {
    const it = pick(byLevel(UNITS[u].items, d));
    const truth = chance(0.5);
    const shown = truth ? it.a : pick(it.o.filter(o => o !== it.a));
    return {
      kind: "Certo ou errado", prompt: `A frase está escrita corretamente?<div class="sentence">${fillText(it, shown)}</div>`,
      options: CE, answer: truth ? 0 : 1, label: it.s.replace("___", shown),
      explain: () => sec("Gabarito", `<p><b>${truth ? "CERTO" : "ERRADO"}</b></p>`) +
        sec("Frase correta", `<p>${fillText(it, it.a)}</p><p class="ex-rule">${ruleOf(it.a)}</p>`) +
        (truth ? "" : sec("O que estava errado", `<p class="ex-rule">${ruleOf(shown) || "Essa forma não se encaixa nesta frase."}</p>`, "ex-wrong")),
    };
  }

  // Parônimos: ligar a palavra ao significado
  const MEANING = {
    "sessão": "reunião; tempo de um evento", "seção": "divisão, departamento", "cessão": "ato de ceder",
    "concerto": "apresentação musical", "conserto": "reparo",
    "descrição": "ato de descrever", "discrição": "reserva, ser discreto",
    "eminente": "ilustre, notável", "iminente": "prestes a acontecer",
    "infringir": "violar uma lei", "infligir": "aplicar uma pena",
    "ratificar": "confirmar", "retificar": "corrigir",
    "tráfego": "trânsito", "tráfico": "comércio ilegal",
    "mandado": "ordem judicial", "mandato": "período de um cargo eletivo",
    "comprimento": "extensão", "cumprimento": "saudação; ato de cumprir",
    "despensa": "lugar de guardar mantimentos", "dispensa": "licença",
    "cela": "cômodo de prisão", "sela": "assento do cavalo",
    "censo": "contagem da população", "senso": "juízo",
    "emergir": "vir à tona", "imergir": "afundar",
    "deferir": "atender um pedido", "diferir": "adiar",
  };
  const PARON_GROUPS = [["sessão", "seção", "cessão"], ["concerto", "conserto"], ["descrição", "discrição"], ["eminente", "iminente"],
    ["infringir", "infligir"], ["ratificar", "retificar"], ["tráfego", "tráfico"], ["mandado", "mandato"], ["comprimento", "cumprimento"],
    ["despensa", "dispensa"], ["cela", "sela"], ["censo", "senso"], ["emergir", "imergir"], ["deferir", "diferir"]];
  function genParonMatch() {
    // 2 grupos de parônimos misturados: obriga a diferenciar os pares
    let words = [];
    for (const g of sample(PARON_GROUPS, 3)) { words.push(...g); if (words.length >= 4) break; }
    words = words.slice(0, 4);
    return {
      type: "match", kind: "Ligue ao significado", prompt: "Ligue cada palavra ao seu significado:",
      pairs: words.map(w => [w, MEANING[w]]), check: v => v === 0,
      answerText: words.map(w => `${w} → ${MEANING[w]}`).join(" · "),
      describe: v => (v === 0 ? "todos os pares certos" : `${v} tentativa${v > 1 ? "s" : ""} errada${v > 1 ? "s" : ""} ao ligar`),
      label: "Parônimos: " + words.join(", "),
      explain: () => sec("Pares corretos", words.map(w => `<p><b>${w}</b>: ${MEANING[w]}</p>`).join("")),
    };
  }

  /* ════════════════════════════════════════════════════════════
     GRAFIA — palavras com lacuna de letras
     "exce[ç|ss|s]ão": a primeira opção é a correta.
  ════════════════════════════════════════════════════════════ */
  const G = (w, why, lvl = 1) => ({ w, why, lvl });
  const SPELL = [
    G("exce[ç|ss|s]ão", "exceção: com <b>ç</b> (de exceto). Cuidado: “excessão” não existe.", 2),
    G("e[xc|ss|c]esso", "excesso: <b>xc</b> e depois <b>ss</b> (de exceder).", 2),
    G("obse[ss|ç|s]ão", "obsessão: com <b>ss</b> (de obsesso).", 3),
    G("preten[s|ç|ss]ão", "pretensão: verbos em <b>-nder</b> (pretender) formam substantivos com <b>s</b>.", 2),
    G("exten[s|ç|ss]ão", "extensão: de estender/extenso, com <b>s</b>.", 2),
    G("expan[s|ç|ss]ão", "expansão: verbos em <b>-ndir</b> (expandir) formam substantivos com <b>s</b>.", 2),
    G("ascen[s|ç|ss]ão", "ascensão: de ascender, com <b>s</b>.", 2),
    G("discu[ss|ç|s]ão", "discussão: verbos em <b>-tir</b>/<b>-ter</b> com radical em -cut, -met, -ced… formam com <b>ss</b> (discutir → discussão).", 2),
    G("admi[ss|ç|s]ão", "admissão: de admitir (<b>-mitir → -missão</b>).", 2),
    G("suce[ss|ç|s]ão", "sucessão: de suceder (<b>-ceder → -cessão</b>).", 2),
    G("na[sc|c|ss]er", "nascer: com <b>sc</b>.", 1),
    G("pi[sc|c|ss]ina", "piscina: com <b>sc</b>.", 1),
    G("cre[sc|c|ss]er", "crescer: com <b>sc</b>.", 1),
    G("cansa[ç|ss|s]o", "cansaço: com <b>ç</b> (sufixo -aço).", 1),
    G("an[s|c|ç]ioso", "ansioso: com <b>s</b> (de ânsia).", 1),
    G("en[x|ch]ergar", "enxergar: depois de <b>en-</b> inicial usa-se <b>x</b>.", 1),
    G("en[x|ch]aqueca", "enxaqueca: depois de <b>en-</b> inicial usa-se <b>x</b>.", 2),
    G("me[x|ch]er", "mexer: depois da sílaba inicial <b>me-</b> usa-se <b>x</b> (mexer, mexilhão). Exceção: mecha.", 1),
    G("[x|ch]ícara", "xícara: com <b>x</b> (origem indígena/africana costuma ter x).", 1),
    G("fai[x|ch]a", "faixa: depois de <b>ditongo</b> usa-se <b>x</b> (caixa, peixe, faixa).", 1),
    G("cai[x|ch]a", "caixa: depois de <b>ditongo</b> usa-se <b>x</b>.", 1),
    G("bru[x|ch]a", "bruxa: com <b>x</b>.", 1),
    G("salsi[ch|x]a", "salsicha: com <b>ch</b>.", 2),
    G("chu[ch|x]u", "chuchu: com <b>ch</b>.", 2),
    G("me[ch|x]a", "mecha (de cabelo): com <b>ch</b> — é a exceção da regra “me- + x”.", 3),
    G("bele[z|s]a", "beleza: substantivo abstrato derivado de adjetivo (belo) termina em <b>-eza</b>.", 1),
    G("certe[z|s]a", "certeza: substantivo abstrato de adjetivo (certo) → <b>-eza</b>.", 1),
    G("portugue[s|z]a", "portuguesa: adjetivos de origem/título terminam em <b>-esa</b> (francesa, princesa).", 2),
    G("parali[s|z]ar", "paralisar: a palavra primitiva já tem <b>s</b> (paralisia) → mantém o s.", 2),
    G("anali[s|z]ar", "analisar: de análise, com <b>s</b>.", 2),
    G("pesqui[s|z]ar", "pesquisar: de pesquisa, com <b>s</b>.", 1),
    G("catequi[z|s]ar", "catequizar: com <b>z</b>, apesar de catequese ter s — exceção clássica de prova.", 3),
    G("reali[z|s]ar", "realizar: sufixo <b>-izar</b> (real + izar).", 1),
    G("atra[s|z]ado", "atrasado: de atrás/atraso, com <b>s</b>.", 2),
    G("pra[z|s]eroso", "prazeroso: de prazer, com <b>z</b>.", 2),
    G("qui[s|z]", "quis: os verbos querer e pôr usam <b>s</b> (quis, quiser, pus, puser).", 2),
    G("fi[z|s]", "fiz: o verbo fazer usa <b>z</b> (fiz, fez, fizer).", 2),
    G("via[g|j]em", "viagem (substantivo): com <b>g</b>. Já “que eles viajem” (verbo) é com <b>j</b>.", 2),
    G("berin[j|g]ela", "berinjela: com <b>j</b>.", 2),
    G("lo[j|g]ista", "lojista: de loja, com <b>j</b> (derivados mantêm a letra).", 1),
    G("ma[j|g]estade", "majestade: com <b>j</b>.", 2),
    G("can[j|g]ica", "canjica: com <b>j</b>.", 2),
    G("su[j|g]eira", "sujeira: de sujo, com <b>j</b>.", 1),
    G("a[g|j]ência", "agência: com <b>g</b> (terminações -ência, -ágio, -égio, -ígio, -ógio, -úgio usam g).", 1),
    G("pr[i|e]vilégio", "privilégio: começa com <b>pri</b> (não existe “previlégio”).", 3),
    G("[e|i]mpecilho", "empecilho: com <b>e</b> (não existe “impecilho”).", 2),
    G("mendi[g|ng]o", "mendigo: sem n (não existe “mendingo”).", 1),
    G("benefic[e|ie]nte", "beneficente: sem i (não existe “beneficiente”).", 2),
    G("mort[a|o]dela", "mortadela: com <b>a</b> (não existe “mortandela”/“mortodela”).", 1),
    G("táb[u|o]a", "tábua: com <b>u</b>.", 1),
    G("mág[o|u]a", "mágoa: com <b>o</b>.", 1),
    G("eng[o|u]lir", "engolir: com <b>o</b>.", 1),
  ];
  function spellParts(g) {
    const m = g.w.match(/^(.*)\[([^\]]+)\](.*)$/);
    const opts = m[2].split("|");
    return { pre: m[1], post: m[3], opts, word: m[1] + opts[0] + m[3], wrong: opts.slice(1).map(o => m[1] + o + m[3]) };
  }
  const spellExplain = g => sec("Grafia correta", `<p style="font-size:20px"><b>${spellParts(g).word}</b></p><p class="ex-rule">${g.why}</p>`);

  function genSpellGap(u, d) {
    const g = pick(byLevel(SPELL, d)), p = spellParts(g);
    const { options, answer } = mkOptions(p.opts[0], p.opts.slice(1));
    return {
      layout: "chips", kind: "Complete a palavra",
      prompt: `Qual letra completa a palavra?<div class="sentence" style="text-align:center;font-size:26px">${p.pre}<span class="blank" style="min-width:40px"></span>${p.post}</div>`,
      options, answer, answerText: p.word, describe: v => p.pre + options[v] + p.post,
      label: `Grafia: ${p.word}`, explain: () => spellExplain(g),
    };
  }
  function genSpellMC(u, d) {
    const g = pick(byLevel(SPELL, d)), p = spellParts(g);
    const { options, answer } = mkOptions(p.word, p.wrong);
    return { kind: "Grafia correta", prompt: "Qual é a grafia <b>correta</b>?", options, answer, label: `Grafia: ${p.word}`, explain: () => spellExplain(g) };
  }
  function genSpellCE(u, d) {
    const g = pick(byLevel(SPELL, d)), p = spellParts(g);
    const truth = chance(0.5), shown = truth ? p.word : pick(p.wrong);
    return {
      kind: "Certo ou errado", prompt: `A palavra está escrita corretamente?<div class="sentence" style="text-align:center;font-size:24px">${shown}</div>`,
      options: CE, answer: truth ? 0 : 1, label: `Grafia: ${shown}`,
      explain: () => sec("Gabarito", `<p><b>${truth ? "CERTO" : "ERRADO"}</b></p>`) + spellExplain(g),
    };
  }

  /* ════════════════════════════════════════════════════════════
     HÍFEN (Novo Acordo) — H([correta, erradas...], regra, nível)
  ════════════════════════════════════════════════════════════ */
  const HR = {
    igual: "Prefixo terminado em vogal + palavra começando pela <b>mesma vogal</b> → <b>com hífen</b> (micro-ondas, anti-inflamatório).",
    dif: "Prefixo terminado em vogal + palavra começando por <b>vogal diferente</b> → <b>junto</b> (autoescola, infraestrutura).",
    rs: "Prefixo terminado em vogal + palavra começando por <b>r</b> ou <b>s</b> → <b>junto, dobrando a consoante</b> (antissocial, contrarregra, ultrassom).",
    co: "O prefixo <b>co-</b> em regra se junta sem hífen, mesmo diante de o (coautor, coordenar, cooperar).",
    rr: "Prefixo terminado em <b>r</b> (inter, super, hiper) + palavra começando por <b>r</b> → <b>com hífen</b> (inter-regional, hiper-realista).",
    sub: "Prefixo <b>sub-</b> + palavra começando por <b>r</b> ou <b>b</b> → <b>com hífen</b> (sub-reitor, sub-bibliotecário).",
    h: "Prefixo + palavra começando por <b>h</b> → <b>com hífen</b> (super-homem, anti-higiênico).",
    tonico: "Prefixos tônicos <b>pré-, pós-, pró-</b> e os prefixos <b>ex-</b> (anterior), <b>vice-</b> e <b>recém-</b> → <b>sempre com hífen</b>.",
    bem: "<b>bem</b>: em regra com hífen (bem-vindo, bem-estar).",
    mal: "<b>mal</b> + vogal, <b>h</b> ou <b>l</b> → com hífen (mal-estar, mal-humorado); + outras consoantes → junto (malcriado, malfeito).",
    loc: "<b>Locuções</b> (substantivas, adverbiais etc.) <b>não têm hífen</b> pelo Novo Acordo (dia a dia, fim de semana, mão de obra).",
    exc: "Exceções consagradas pelo uso mantêm o hífen: <b>cor-de-rosa</b>, água-de-colônia, arco-da-velha, mais-que-perfeito, pé-de-meia.",
    comp: "Compostos sem elemento de ligação, com sentido próprio, mantêm o hífen (guarda-chuva, arco-íris, segunda-feira).",
    perdeu: "Alguns compostos perderam a noção de composição e passaram a ser escritos <b>juntos</b> com o Novo Acordo: paraquedas, paraquedista, mandachuva.",
    mini: "Prefixo terminado em vogal + consoante diferente de r/s/h → <b>junto</b> (minissaia é caso de s dobrado; seminovo, autopeça).",
  };
  const H = (forms, rule, lvl = 1) => ({ forms, rule, lvl });
  const HYPHEN = [
    H(["micro-ondas", "microondas", "micro ondas"], "igual"),
    H(["anti-inflamatório", "antiinflamatório", "anti inflamatório"], "igual", 2),
    H(["semi-interno", "semiinterno", "semi interno"], "igual", 3),
    H(["autoescola", "auto-escola", "auto escola"], "dif"),
    H(["autoestima", "auto-estima", "auto estima"], "dif"),
    H(["infraestrutura", "infra-estrutura", "infra estrutura"], "dif", 2),
    H(["semianalfabeto", "semi-analfabeto", "semi analfabeto"], "dif", 3),
    H(["antissocial", "anti-social", "antisocial"], "rs"),
    H(["contrarregra", "contra-regra", "contraregra"], "rs", 2),
    H(["ultrassom", "ultra-som", "ultrasom"], "rs", 2),
    H(["minissaia", "mini-saia", "minisaia"], "rs", 2),
    H(["coautor", "co-autor", "co autor"], "co", 2),
    H(["inter-regional", "interregional", "inter regional"], "rr", 3),
    H(["hiper-realista", "hiperrealista", "hiper realista"], "rr", 3),
    H(["sub-reitor", "subreitor", "sub reitor"], "sub", 3),
    H(["super-homem", "superhomem", "super homem"], "h", 2),
    H(["pré-escola", "préescola", "pre-escola"], "tonico"),
    H(["pós-graduação", "posgraduação", "pós graduação"], "tonico"),
    H(["ex-presidente", "expresidente", "ex presidente"], "tonico"),
    H(["vice-diretor", "vicediretor", "vice diretor"], "tonico"),
    H(["recém-nascido", "recémnascido", "recem nascido"], "tonico", 2),
    H(["bem-vindo", "benvindo", "bem vindo"], "bem"),
    H(["mal-estar", "malestar", "mal estar"], "mal", 2),
    H(["malcriado", "mal-criado", "mal criado"], "mal", 2),
    H(["dia a dia", "dia-a-dia", "diadia"], "loc"),
    H(["fim de semana", "fim-de-semana", "fimdesemana"], "loc"),
    H(["mão de obra", "mão-de-obra", "mãodeobra"], "loc", 2),
    H(["cor-de-rosa", "cor de rosa", "cor-de rosa"], "exc", 3),
    H(["guarda-chuva", "guardachuva", "guarda chuva"], "comp"),
    H(["arco-íris", "arcoíris", "arco íris"], "comp", 2),
    H(["paraquedas", "para-quedas", "pára-quedas"], "perdeu", 3),
    H(["mandachuva", "manda-chuva", "manda chuva"], "perdeu", 3),
  ];
  const hyExplain = h => sec("Grafia correta", `<p style="font-size:20px"><b>${h.forms[0]}</b></p><p class="ex-rule">${HR[h.rule]}</p>`);
  function genHyMC(u, d) {
    const h = pick(byLevel(HYPHEN, d));
    const { options, answer } = mkOptions(h.forms[0], h.forms.slice(1));
    return { kind: "Hífen", prompt: "Qual é a grafia correta, segundo o Novo Acordo?", options, answer, label: `Hífen: ${h.forms[0]}`, explain: () => hyExplain(h) };
  }
  function genHyCE(u, d) {
    const h = pick(byLevel(HYPHEN, d));
    const truth = chance(0.5), shown = truth ? h.forms[0] : pick(h.forms.slice(1));
    return {
      kind: "Certo ou errado", prompt: `A grafia está correta, segundo o Novo Acordo?<div class="sentence" style="text-align:center;font-size:24px">${shown}</div>`,
      options: CE, answer: truth ? 0 : 1, label: `Hífen: ${shown}`,
      explain: () => sec("Gabarito", `<p><b>${truth ? "CERTO" : "ERRADO"}</b></p>`) + hyExplain(h),
    };
  }
  function genHyRule(u, d) {
    // qual regra explica a grafia
    const h = pick(byLevel(HYPHEN.filter(x => ["igual", "dif", "rs", "tonico", "loc", "h"].includes(x.rule)), d));
    const label = { igual: "Vogal + mesma vogal: com hífen", dif: "Vogal + vogal diferente: junto", rs: "Vogal + r ou s: junto, dobrando a consoante", tonico: "Prefixo que sempre leva hífen (pré, pós, ex, vice, recém)", loc: "Locução: sem hífen", h: "Prefixo + h: com hífen" };
    const others = sample(Object.keys(label).filter(k => k !== h.rule), 3);
    const { options, answer } = mkOptions(h.rule, others);
    return { kind: "Qual regra?", prompt: `Qual regra explica a grafia de <b>${h.forms[0]}</b>?`, options: options.map(k => label[k]), answer, label: `Regra do hífen: ${h.forms[0]}`, explain: () => hyExplain(h) };
  }

  /* ════════════════════════════════════════════════════════════
     TÓPICOS
  ════════════════════════════════════════════════════════════ */
  const W = (e, m, h) => ({ easy: e, medium: m, hard: h });
  const TOPICS = [
    { id: "porque", label: "Os porquês", icon: "❓", color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE",
      desc: "Por que, por quê, porque e porquê", gens: [[genFill, W(2, 2, 2)], [genFillCE, W(1, 1, 1)]] },
    { id: "haa", label: "Há × a", icon: "⏳", color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE",
      desc: "Tempo passado, futuro e distância; acerca de, a cerca de, há cerca de", gens: [[genFill, W(2, 2, 2)], [genFillCE, W(1, 1, 1)]] },
    { id: "onde", label: "Onde × aonde", icon: "📍", color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0",
      desc: "Onde, aonde e donde", gens: [[genFill, W(2, 2, 2)], [genFillCE, W(1, 1, 1)]] },
    { id: "expr", label: "Expressões que confundem", icon: "🔀", color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A",
      desc: "Mal/mau, mas/mais, senão/se não, a fim/afim, demais/de mais, tampouco…", gens: [[genFill, W(2, 2, 2)], [genFillCE, W(1, 1, 1)]] },
    { id: "paron", label: "Parônimos", icon: "👯", color: "#EC4899", bg: "#FDF2F8", border: "#FBCFE8",
      desc: "Sessão/seção/cessão, mandado/mandato, ratificar/retificar…", gens: [[genFill, W(2, 2, 2)], [genFillCE, W(1, 1, 1)], [genParonMatch, W(0.8, 0.8, 0.8)]] },
    { id: "grafia", label: "Grafia", icon: "🔤", color: "#06B6D4", bg: "#ECFEFF", border: "#A5F3FC",
      desc: "S, SS, Ç, SC, XC · X ou CH · S ou Z · G ou J", gens: [[genSpellGap, W(1.5, 1.5, 1.5)], [genSpellMC, W(1, 1, 1)], [genSpellCE, W(1, 1, 1)]] },
    { id: "hifen", label: "Hífen", icon: "➖", color: "#EF4444", bg: "#FEF2F2", border: "#FECACA",
      desc: "Prefixos, compostos e locuções pelo Novo Acordo", gens: [[genHyMC, W(1.5, 1.5, 1.5)], [genHyCE, W(1, 1, 1)], [genHyRule, W(0.6, 0.8, 1)]] },
  ];

  function generate(topicId, d) {
    const t = TOPICS.find(x => x.id === topicId);
    const total = t.gens.reduce((s, g) => s + g[1][d], 0);
    let r = Math.random() * total, fn = t.gens[0][0];
    for (const [g, w] of t.gens) { if ((r -= w[d]) <= 0) { fn = g; break; } }
    const q = fn(topicId, d);
    q.topic = topicId;
    return q;
  }

  /* ── Teoria ──────────────────────────────────────────────── */
  const rules = keys => keys.map(k => `<p class="ex-rule">${RULES[k]}</p>`).join("");
  const ex = list => `<ul style="margin-left:18px">${list.map(i => `<li>${i}</li>`).join("")}</ul>`;
  const THEORY = {
    porque: sec("Os quatro porquês", rules(["por que", "por quê", "porque", "porquê"])) +
      sec("Exemplos", ex(["<b>Por que</b> você faltou? / Não sei <b>por que</b> ele faltou.", "Você faltou <b>por quê</b>?", "Faltei <b>porque</b> estava doente.", "Ninguém entendeu o <b>porquê</b> da falta."])) +
      sec("Dica rápida", `<p>Dá para trocar por <b>pois</b>? → <b>porque</b>. Tem artigo antes (o, um)? → <b>porquê</b>. Está no fim da frase? → <b>por quê</b>. Nos demais casos → <b>por que</b>.</p>`),
    haa: sec("Há × a", rules(["há", "a"])) +
      sec("Dica rápida", `<p>Troque por <b>faz</b>: se der certo, use <b>há</b> (Moro aqui <b>há</b> = faz dez anos). Futuro e distância → <b>a</b> (daqui <b>a</b> dois dias; <b>a</b> dois quilômetros).</p>`) +
      sec("Acerca × a cerca × há cerca", rules(["acerca", "a cerca", "há cerca"])),
    onde: sec("Onde, aonde e donde", rules(["onde", "aonde", "donde"])) +
      sec("Dica rápida", `<p>Quem <b>vai</b>, vai <b>a</b> algum lugar → <b>aonde</b>. Quem <b>está</b>, está <b>em</b> algum lugar → <b>onde</b>. Quem <b>vem</b>, vem <b>de</b> algum lugar → <b>donde</b> (de onde).</p>`),
    expr: sec("Mal × mau", rules(["mal", "mau"]) + `<p>Dica: troque por <b>bem/bom</b>. Mal ↔ bem; mau ↔ bom.</p>`) +
      sec("Mas × mais", rules(["mas", "mais"])) + sec("Senão × se não", rules(["senão", "se não"])) +
      sec("A fim de × afim", rules(["a fim", "afim"])) + sec("Demais × de mais", rules(["demais", "de mais"])) +
      sec("Tampouco × tão pouco", rules(["tampouco", "tão pouco"])) + sec("Em vez de × ao invés de", rules(["em vez de", "ao invés de"])) +
      sec("A par × ao par", rules(["a par", "ao par"])),
    paron: sec("Parônimos (parecidos na escrita/som, sentidos diferentes)", Object.keys(MEANING).map(w => `<p><b>${w}</b>: ${MEANING[w]}</p>`).join("")),
    grafia: sec("Regras úteis", ex([
      "Verbos em <b>-nder</b> e <b>-ndir</b> → substantivo com <b>s</b>: pretender → pretensão; expandir → expansão",
      "Verbos em <b>-ceder</b>, <b>-mitir</b>, <b>-gredir</b>, <b>-cutir</b> → <b>ss</b>: suceder → sucessão; admitir → admissão; discutir → discussão",
      "Depois de ditongo → <b>x</b>: caixa, peixe, faixa", "Depois de <b>en-</b> inicial → <b>x</b>: enxergar, enxaqueca (exceção: encher e derivados)",
      "Substantivo abstrato de adjetivo → <b>-eza</b>: belo → beleza", "Origem/título → <b>-esa</b>: portuguesa, princesa",
      "Primitiva com <b>s</b> mantém o s: análise → analisar; paralisia → paralisar",
      "Terminações -ágio, -égio, -ígio, -ógio, -úgio e -ência → <b>g</b>", "Derivados mantêm a letra: loja → lojista; sujo → sujeira",
      "Querer e pôr → <b>s</b> (quis, pus); fazer → <b>z</b> (fiz)"])),
    hifen: sec("Prefixos (Novo Acordo)", Object.entries(HR).filter(([k]) => ["igual", "dif", "rs", "co", "rr", "sub", "h", "tonico", "mini"].includes(k)).map(([, v]) => `<p class="ex-rule">${v}</p>`).join("")) +
      sec("Compostos e locuções", [HR.bem, HR.mal, HR.loc, HR.exc, HR.comp, HR.perdeu].map(v => `<p class="ex-rule">${v}</p>`).join("")),
  };

  global.OrtografiaEngine = { TOPICS, THEORY, generate, _internal: { UNITS, SPELL, HYPHEN, RULES, MEANING, spellParts } };
})(typeof window !== "undefined" ? window : globalThis);
