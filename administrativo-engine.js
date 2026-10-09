/* ════════════════════════════════════════════════════════════
   DIREITO ADMINISTRATIVO — trilha, treino e lei seca
   Dados: bancos de questões por unidade e blocos de lei seca
   (Lei 9.784/99, Lei 8.112/90, Lei 8.429/92, Lei 14.133/21,
   DL 200/67, CTN, Código Civil, CF/88 e súmulas do STF).
   O motor está em juridico-core.js.
════════════════════════════════════════════════════════════ */
(function (global) {
  "use strict";

  const { sec, list, L } = global.JuridicoCore;

  /* ════════════════════════════════════════════════════════════
     BANCOS DA TRILHA
  ════════════════════════════════════════════════════════════ */
  const UNITS = {
    princ: {
      mc: [
        ["Os “supraprincípios” do regime jurídico-administrativo são:", "Supremacia do interesse público e indisponibilidade do interesse público", ["Legalidade e eficiência", "Moralidade e publicidade", "Autotutela e continuidade"],
          "Para Celso Antônio Bandeira de Mello, o regime jurídico-administrativo se apoia em duas pedras de toque: <b>supremacia</b> do interesse público (prerrogativas) e <b>indisponibilidade</b> do interesse público (sujeições).", 2],
        ["Pelo princípio da legalidade, o administrador público:", "Só pode fazer o que a lei permite ou autoriza", ["Pode fazer tudo o que a lei não proíbe", "Pode agir livremente na ausência de lei", "Deve seguir apenas os regulamentos internos"],
          "Legalidade administrativa = só fazer o que a lei autoriza. Já o <b>particular</b> pode fazer tudo o que a lei não proíbe (art. 5º, II, CF).", 1],
        ["A vedação de nomes, símbolos ou imagens que caracterizem promoção pessoal na publicidade oficial (art. 37, § 1º, CF) decorre principalmente da:", "Impessoalidade", ["Eficiência", "Continuidade", "Autotutela"],
          "A publicidade deve ter caráter educativo, informativo ou de orientação social. Usá-la para promoção pessoal fere a <b>impessoalidade</b> (finalidade pública).", 2],
        ["O princípio da eficiência foi incluído no caput do art. 37 da CF pela:", "EC 19/1998 (Reforma Administrativa)", ["Redação original de 1988", "EC 45/2004", "Lei 9.784/1999"],
          "A EC 19/1998 introduziu a eficiência e marcou a passagem para a administração gerencial.", 2],
        ["A Súmula Vinculante 13 (vedação ao nepotismo) se fundamenta principalmente nos princípios da:", "Moralidade e impessoalidade", ["Publicidade e eficiência", "Legalidade e continuidade", "Autotutela e motivação"],
          "SV 13: a nomeação de cônjuge, companheiro ou parente até o 3º grau da autoridade nomeante (ou de servidor em cargo de direção, chefia ou assessoramento) para cargo em comissão ou função de confiança viola a CF.", 2],
        ["O poder-dever de a Administração rever seus próprios atos, anulando os ilegais e revogando os inconvenientes, decorre do princípio da:", "Autotutela", ["Tutela", "Hierarquia", "Especialidade"],
          "Autotutela: controle sobre os <b>próprios</b> atos (Súmulas 346 e 473 do STF; art. 53 da Lei 9.784/99). <b>Tutela</b> é o controle finalístico da Administração direta sobre a indireta.", 1],
        ["O princípio que impede a interrupção dos serviços públicos essenciais é o da:", "Continuidade do serviço público", ["Especialidade", "Impessoalidade", "Autotutela"],
          "Serviços públicos não podem parar. Daí, por exemplo, as limitações ao direito de greve no serviço público.", 1],
        ["Razoabilidade e proporcionalidade estão previstas expressamente:", "No art. 2º da Lei 9.784/99, mas não no caput do art. 37 da CF", ["No caput do art. 37 da CF", "Apenas em súmulas do STF", "Em nenhuma norma: são só doutrina"],
          "Lei 9.784/99, art. 2º: legalidade, finalidade, motivação, razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, segurança jurídica, interesse público e eficiência.", 3],
      ],
      ce: [
        ["A Lei 9.784/99 prevê expressamente os princípios da motivação, da razoabilidade e da segurança jurídica.", true, "Art. 2º, caput, da Lei 9.784/99.", 2],
        ["Pelo princípio da publicidade, todos os atos administrativos devem ser divulgados, sem exceção.", false, "Há exceções: sigilo imprescindível à segurança da sociedade e do Estado e proteção da intimidade (art. 5º, XXXIII e LX, CF).", 2],
        ["A supremacia do interesse público autoriza a Administração a agir sem amparo legal.", false, "A supremacia convive com a legalidade: as prerrogativas da Administração precisam estar previstas em lei.", 1],
        ["Segundo a Súmula Vinculante 13, nomear o cônjuge da autoridade nomeante para cargo em comissão viola a Constituição.", true, "SV 13 — nepotismo.", 2],
        ["A impessoalidade se relaciona à finalidade pública: o ato deve atender ao interesse público, e não a interesses pessoais.", true, "Impessoalidade = finalidade + vedação de promoção pessoal + isonomia.", 1],
      ],
      sets: [],
      pairs: [
        { prompt: "Ligue cada princípio à sua ideia central:", why: "LIMPE (art. 37, CF) + autotutela, supremacia e continuidade (implícitos/doutrina).",
          pairs: [["Legalidade", "Só fazer o que a lei autoriza"], ["Impessoalidade", "Finalidade pública, sem promoção pessoal"], ["Moralidade", "Ética, probidade e boa-fé"], ["Publicidade", "Transparência dos atos"], ["Eficiência", "Resultados com qualidade e economia"], ["Autotutela", "Rever os próprios atos"], ["Continuidade", "Serviço público não pode parar"]] },
      ],
    },

    org: {
      mc: [
        ["A distribuição de competências dentro de uma mesma pessoa jurídica, por meio da criação de órgãos, é a:", "Desconcentração", ["Descentralização", "Delegação por contrato", "Outorga"],
          "<b>Desconcentração</b>: dentro da mesma pessoa (cria órgãos, há hierarquia). <b>Descentralização</b>: transfere a outra pessoa (física ou jurídica), sem hierarquia.", 1],
        ["Quando o Estado cria uma autarquia e lhe transfere, por lei, a titularidade e a execução de um serviço, há descentralização:", "Por outorga (por serviços)", ["Por delegação (colaboração)", "Territorial", "Por desconcentração"],
          "<b>Outorga</b>: por lei, transfere titularidade + execução a entidade da Administração indireta. <b>Delegação</b>: por contrato ou ato, transfere só a execução (ex.: concessionárias).", 2],
        ["Os órgãos públicos:", "Não têm personalidade jurídica própria", ["Têm personalidade jurídica de direito público", "Têm personalidade jurídica de direito privado", "São o mesmo que entidades da Administração indireta"],
          "Órgãos são centros de competência despersonalizados (teoria do órgão / imputação). Quem tem personalidade é o ente ou a entidade.", 1],
        ["A autarquia é criada:", "Diretamente por lei específica", ["Por decreto do Executivo", "Por lei que autoriza sua instituição, com registro dos atos constitutivos", "Por contrato social registrado na Junta Comercial"],
          "Art. 37, XIX, CF: lei específica <b>cria</b> autarquia e <b>autoriza</b> a instituição de empresa pública, sociedade de economia mista e fundação.", 1],
        ["A sociedade de economia mista deve adotar a forma de:", "Sociedade anônima", ["Qualquer forma admitida em direito", "Sociedade limitada", "Fundação"],
          "SEM: sempre S.A., com maioria do capital votante público. Empresa pública: capital 100% público e qualquer forma societária.", 2],
        ["A empresa pública tem capital:", "Exclusivamente público", ["Majoritariamente público, admitido capital privado votante", "Exclusivamente privado", "Misto, com controle privado"],
          "Empresa pública: capital exclusivamente público (pode ter participação de outros entes/entidades públicas).", 1],
        ["São entidades da Administração indireta:", "Autarquias, fundações públicas, empresas públicas e sociedades de economia mista", ["Ministérios, secretarias e autarquias", "União, Estados, DF e Municípios", "Concessionárias e permissionárias de serviço público"],
          "Art. 4º, II, do DL 200/67. Ministérios e secretarias são órgãos da Administração direta.", 1],
        ["As agências reguladoras, em regra, são criadas como:", "Autarquias em regime especial", ["Empresas públicas", "Órgãos da Administração direta", "Sociedades de economia mista"],
          "Têm maior autonomia: dirigentes com mandato fixo, autonomia técnica e financeira (Lei 13.848/2019).", 2],
        ["A relação entre a Administração direta e as entidades da indireta é de:", "Vinculação (controle finalístico ou tutela), sem hierarquia", ["Hierarquia", "Subordinação plena", "Independência total, sem controle"],
          "Entidades da indireta são <b>vinculadas</b> (não subordinadas) a um Ministério/Secretaria — supervisão ministerial.", 2],
      ],
      ce: [
        ["Na desconcentração há a criação de uma nova pessoa jurídica.", false, "Desconcentração cria <b>órgãos</b> dentro da mesma pessoa. Nova pessoa jurídica = descentralização.", 1],
        ["Na descentralização por delegação (colaboração), transfere-se apenas a execução do serviço, por contrato ou ato unilateral.", true, "Ex.: concessão e permissão de serviço público.", 2],
        ["Empresas públicas e sociedades de economia mista têm personalidade jurídica de direito privado.", true, "DL 200/67, art. 5º, II e III.", 1],
        ["Os Ministérios integram a Administração indireta.", false, "São órgãos da Administração <b>direta</b>.", 1],
        ["Cabe à lei complementar definir as áreas de atuação das fundações (art. 37, XIX, CF).", true, "Parte final do art. 37, XIX.", 3],
      ],
      sets: [
        { ask: it => `${it} é pessoa jurídica de direito:`,
          cats: {
            "Público": ["Uma autarquia", "Uma agência reguladora", "Uma fundação pública de direito público", "Uma associação pública (consórcio público)"],
            "Privado": ["Uma empresa pública", "Uma sociedade de economia mista", "Uma fundação pública de direito privado", "Uma subsidiária de empresa estatal"],
          },
          why: "Direito público: autarquias (inclusive agências e fundações autárquicas) e associações públicas. Direito privado: empresas públicas, sociedades de economia mista (e subsidiárias) e fundações públicas de direito privado." },
        { ask: it => `${it} pertence à Administração:`,
          cats: {
            "Direta (órgão)": ["O Ministério da Fazenda", "Uma Secretaria Estadual de Saúde", "A Presidência da República", "Uma Secretaria Municipal de Educação"],
            "Indireta (entidade)": ["O INSS (autarquia)", "A Caixa Econômica Federal (empresa pública)", "O Banco do Brasil (sociedade de economia mista)", "Os Correios (empresa pública)", "O Banco Central (autarquia)", "O IBAMA (autarquia)"],
          },
          why: "Direta: os entes federativos e seus órgãos (ministérios, secretarias). Indireta: autarquias, fundações públicas, empresas públicas e sociedades de economia mista." },
        { ask: it => `Situação: ${it} Isso é:`,
          cats: {
            "Desconcentração": ["A União cria uma nova Secretaria dentro de um Ministério.", "Um Estado divide sua Secretaria de Fazenda em delegacias regionais."],
            "Descentralização": ["A União cria, por lei, uma autarquia para cuidar da previdência.", "Um Município concede o transporte coletivo a uma empresa privada."],
          },
          why: "Desconcentração: dentro da mesma pessoa jurídica (órgãos). Descentralização: para outra pessoa (entidade da indireta ou particular delegatário)." },
      ],
      pairs: [
        { prompt: "Ligue cada entidade à sua característica:", why: "DL 200/67, art. 5º, e art. 37, XIX, CF.",
          pairs: [["Autarquia", "Criada por lei, direito público"], ["Empresa pública", "Capital exclusivamente público"], ["Sociedade de economia mista", "Sempre sociedade anônima"], ["Fundação pública", "Patrimônio afetado a um fim, sem lucro"]] },
      ],
    },

    poder: {
      mc: [
        ["São atributos do poder de polícia:", "Discricionariedade, autoexecutoriedade e coercibilidade", ["Imperatividade, tipicidade e hierarquia", "Vinculação, gratuidade e coercibilidade", "Presunção de veracidade, delegabilidade e hierarquia"],
          "Mnemônico <b>DAC</b>: Discricionariedade, Autoexecutoriedade e Coercibilidade.", 1],
        ["Aplicar penalidade a servidor que cometeu infração funcional é exercício do poder:", "Disciplinar", ["Hierárquico", "De polícia", "Regulamentar"],
          "Poder disciplinar: apurar infrações e punir servidores e particulares com <b>vínculo especial</b> com a Administração.", 1],
        ["Multar um restaurante por descumprir normas sanitárias é exercício do poder:", "De polícia", ["Disciplinar", "Hierárquico", "Regulamentar"],
          "Poder de polícia: limita direitos e atividades dos particulares em geral (vínculo geral), em favor do interesse público (art. 78 do CTN).", 1],
        ["Editar decreto para a fiel execução de uma lei é exercício do poder:", "Regulamentar", ["Hierárquico", "De polícia", "Disciplinar"],
          "Art. 84, IV, CF. O regulamento não pode inovar na ordem jurídica (salvo os decretos autônomos do art. 84, VI).", 1],
        ["Delegação e avocação de competências decorrem do poder:", "Hierárquico", ["Disciplinar", "De polícia", "Regulamentar"],
          "Hierárquico: dar ordens, fiscalizar, rever, delegar e avocar.", 2],
        ["Quando o agente atua fora dos limites da sua competência, há:", "Excesso de poder", ["Desvio de finalidade", "Omissão legítima", "Exercício regular de direito"],
          "Abuso de poder = <b>excesso</b> (vai além da competência) ou <b>desvio de finalidade/de poder</b> (é competente, mas busca outro fim).", 2],
        ["Remover um servidor como forma de punição (a remoção não é penalidade) configura:", "Desvio de finalidade", ["Excesso de poder", "Exercício regular do poder hierárquico", "Poder disciplinar legítimo"],
          "A autoridade é competente para remover, mas usou o ato com finalidade diferente da prevista em lei.", 2],
        ["Segundo o STF (Tema 532), o poder de polícia pode ser delegado a pessoas jurídicas de direito privado:", "Da Administração indireta, de capital majoritariamente público, que prestem exclusivamente serviço público próprio do Estado, em regime não concorrencial", ["Livremente, a qualquer particular", "Em nenhuma hipótese", "Apenas a concessionárias de serviço público"],
          "RE 633.782 (2020). Mesmo assim, a fase de <b>legislação</b> (ordem de polícia) é indelegável.", 3],
      ],
      ce: [
        ["O poder regulamentar permite ao Executivo criar, por decreto, obrigações não previstas em lei.", false, "O regulamento serve à fiel execução da lei e não pode inovar (salvo decreto autônomo, art. 84, VI, CF).", 1],
        ["O poder disciplinar alcança particulares com vínculo específico com a Administração, como empresas contratadas.", true, "Ex.: multa contratual aplicada a uma contratada.", 2],
        ["Todos os atos de polícia são autoexecutórios.", false, "Nem todos: a cobrança de multa não paga, por exemplo, depende de execução judicial.", 3],
        ["A decisão de recursos administrativos pode ser delegada.", false, "Lei 9.784/99, art. 13: não se delegam atos normativos, decisão de recursos e matérias de competência exclusiva.", 2],
      ],
      sets: [
        { ask: it => `Situação: ${it} É exercício do poder:`,
          cats: {
            "De polícia": ["Interditar restaurante por falta de higiene.", "Rebocar veículo estacionado em local proibido.", "Negar alvará de construção em desacordo com o plano diretor."],
            "Disciplinar": ["Aplicar suspensão a servidor faltoso.", "Multar empresa contratada que descumpriu o contrato administrativo."],
            "Hierárquico": ["Chefe avoca um processo que estava com seu subordinado.", "Superior revisa e corrige ato praticado por subordinado."],
            "Regulamentar": ["Presidente edita decreto para fiel execução de uma lei."],
          },
          why: "Polícia: limita a liberdade dos particulares em geral. Disciplinar: pune servidores e quem tem vínculo especial. Hierárquico: ordena, revisa, delega e avoca. Regulamentar: decretos para fiel execução da lei." },
      ],
      pairs: [
        { prompt: "Ligue cada conceito à sua definição:", why: "Abuso de poder = excesso ou desvio. Atributos do poder de polícia = DAC.",
          pairs: [["Excesso de poder", "Agente vai além da sua competência"], ["Desvio de finalidade", "Agente competente busca outro fim"], ["Autoexecutoriedade", "Executar sem ordem judicial prévia"], ["Coercibilidade", "Impor a medida, inclusive com força"]] },
      ],
    },

    atos: {
      mc: [
        ["São elementos (requisitos) do ato administrativo:", "Competência, finalidade, forma, motivo e objeto", ["Competência, imperatividade, forma, motivo e objeto", "Presunção, finalidade, forma, motivo e tipicidade", "Sujeito, vontade, objeto, causa e efeito"],
          "Mnemônico <b>COFIFOMOB</b>: COmpetência, FInalidade, FOrma, MOtivo, OBjeto (art. 2º da Lei 4.717/65).", 1],
        ["São atributos do ato administrativo:", "Presunção de legitimidade, autoexecutoriedade, tipicidade e imperatividade", ["Competência, finalidade e forma", "Discricionariedade, autoexecutoriedade e coercibilidade", "Legalidade, moralidade e eficiência"],
          "Mnemônico <b>PATI</b>. (Discricionariedade, autoexecutoriedade e coercibilidade são atributos do poder de polícia.)", 1],
        ["A extinção de um ato VÁLIDO por razões de conveniência e oportunidade é a:", "Revogação", ["Anulação", "Cassação", "Caducidade"],
          "Revogação: ato válido, mérito (conveniência e oportunidade), efeitos <b>ex nunc</b>, só pela própria Administração.", 1],
        ["A anulação de um ato ilegal produz efeitos, em regra:", "Ex tunc (retroativos)", ["Ex nunc (só para o futuro)", "Apenas após o trânsito em julgado", "Somente em relação a terceiros"],
          "A anulação retroage à origem do ato, ressalvados os direitos de terceiros de boa-fé.", 2],
        ["No controle dos atos administrativos, o Poder Judiciário:", "Pode anular atos ilegais, mas não revogá-los", ["Pode anular e revogar", "Só pode revogar", "Não pode controlar atos administrativos"],
          "Revogação é exame de mérito, exclusivo da própria Administração. O Judiciário faz controle de legalidade (Súmula 473 do STF).", 1],
        ["São elementos sempre vinculados do ato administrativo:", "Competência, finalidade e forma", ["Motivo e objeto", "Competência e motivo", "Finalidade e objeto"],
          "Nos atos discricionários, o <b>mérito</b> está no motivo e no objeto. Competência, finalidade e forma são sempre vinculados.", 2],
        ["A retirada de uma licença porque o beneficiário deixou de cumprir as condições exigidas é a:", "Cassação", ["Revogação", "Caducidade", "Contraposição"],
          "Cassação: o beneficiário descumpriu os requisitos para continuar usufruindo do ato.", 2],
        ["A extinção do ato porque uma lei nova passou a proibir a situação antes permitida é a:", "Caducidade", ["Cassação", "Revogação", "Anulação"],
          "Caducidade: norma jurídica superveniente torna inadmissível a situação.", 3],
        ["Pela teoria dos motivos determinantes:", "Os motivos declarados vinculam a validade do ato, mesmo quando a motivação não era obrigatória", ["O ato discricionário dispensa qualquer motivo", "O Judiciário não pode examinar os motivos do ato", "Só os atos vinculados precisam de motivo verdadeiro"],
          "Se o motivo declarado for falso ou inexistente, o ato é nulo — ex.: exoneração ad nutum motivada por fato que não ocorreu.", 2],
        ["Os vícios que, em regra, admitem convalidação são os de:", "Competência (não exclusiva) e forma (não essencial)", ["Finalidade e motivo", "Objeto e finalidade", "Qualquer elemento"],
          "Art. 55 da Lei 9.784/99: defeitos sanáveis, sem lesão ao interesse público nem prejuízo a terceiros. Vícios de finalidade, motivo e objeto não se convalidam.", 3],
      ],
      ce: [
        ["A revogação produz efeitos ex nunc e deve respeitar os direitos adquiridos.", true, "Súmula 473 do STF e art. 53 da Lei 9.784/99.", 1],
        ["Ato vinculado pode ser revogado por conveniência e oportunidade.", false, "Atos vinculados não têm mérito a ser reavaliado: não se revogam.", 2],
        ["A imperatividade está presente em todos os atos administrativos.", false, "Não está, por exemplo, nos atos enunciativos (certidões, pareceres) e nos negociais/permissivos (licenças, autorizações).", 2],
        ["A presunção de legitimidade é relativa: admite prova em contrário.", true, "É presunção <i>juris tantum</i>; o ônus de provar o vício é de quem alega.", 1],
      ],
      sets: [
        { ask: it => `Situação: ${it} Essa forma de extinção é a:`,
          cats: {
            "Anulação": ["Um ato praticado por autoridade incompetente é desfeito por ser ilegal.", "Uma licença concedida com base em documento falso é desfeita."],
            "Revogação": ["A prefeitura desfaz uma autorização válida porque deixou de ser conveniente ao interesse público."],
            "Cassação": ["Uma licença de funcionamento é retirada porque o dono descumpriu as condições impostas."],
            "Caducidade": ["Uma permissão perde o efeito porque uma nova lei proibiu a atividade antes permitida."],
            "Contraposição": ["A exoneração de um servidor extingue os efeitos do ato de nomeação."],
          },
          why: "Anulação: ilegalidade (ex tunc). Revogação: conveniência e oportunidade (ex nunc). Cassação: beneficiário descumpriu condições. Caducidade: lei nova tornou a situação inadmissível. Contraposição: ato posterior com efeitos opostos extingue o anterior." },
      ],
      pairs: [
        { prompt: "Ligue cada elemento do ato à pergunta que ele responde:", why: "COFIFOMOB.",
          pairs: [["Competência", "Quem pode praticar o ato?"], ["Finalidade", "Para quê? (interesse público)"], ["Forma", "Como o ato se exterioriza?"], ["Motivo", "Por quê? (fato e fundamento)"], ["Objeto", "O quê? (efeito/conteúdo)"]] },
      ],
    },

    agentes: {
      mc: [
        ["Única forma de provimento ORIGINÁRIO em cargo público (Lei 8.112/90):", "Nomeação", ["Promoção", "Readaptação", "Reintegração"],
          "Nomeação é a única forma originária. As demais (promoção, readaptação, reversão, aproveitamento, reintegração e recondução) são derivadas.", 1],
        ["Reinvestidura do servidor estável no cargo anterior quando invalidada sua demissão:", "Reintegração", ["Recondução", "Reversão", "Aproveitamento"],
          "Art. 28 da Lei 8.112/90 — com ressarcimento de todas as vantagens.", 1],
        ["Retorno do servidor estável ao cargo anterior por inabilitação no estágio probatório de outro cargo:", "Recondução", ["Reintegração", "Reversão", "Readaptação"],
          "Art. 29: recondução decorre de inabilitação em estágio probatório de outro cargo ou da reintegração do anterior ocupante.", 2],
        ["Retorno à atividade do servidor aposentado:", "Reversão", ["Reintegração", "Aproveitamento", "Recondução"],
          "Art. 25 da Lei 8.112/90.", 1],
        ["Retorno à atividade do servidor em disponibilidade:", "Aproveitamento", ["Reversão", "Readaptação", "Reintegração"],
          "Art. 30: aproveitamento obrigatório em cargo de atribuições e vencimentos compatíveis.", 1],
        ["Investidura em cargo compatível com limitação física ou mental sofrida pelo servidor:", "Readaptação", ["Reversão", "Recondução", "Aproveitamento"],
          "Art. 24 da Lei 8.112/90, verificada em inspeção médica.", 1],
        ["Prazo para a posse, segundo a Lei 8.112/90:", "30 dias, contados da publicação do ato de provimento", ["15 dias, contados da nomeação", "30 dias, contados da homologação do concurso", "60 dias, contados da publicação"],
          "Art. 13, § 1º. Depois da posse, o servidor tem 15 dias para entrar em exercício (art. 15, § 1º).", 1],
        ["A penalidade de suspensão não pode exceder:", "90 dias", ["30 dias", "60 dias", "120 dias"],
          "Art. 130 da Lei 8.112/90.", 2],
        ["Prazo de prescrição da ação disciplinar para infração punível com advertência:", "180 dias", ["2 anos", "5 anos", "1 ano"],
          "Art. 142: 5 anos (demissão, cassação, destituição de cargo em comissão), 2 anos (suspensão), 180 dias (advertência).", 3],
        ["Agentes políticos, servidores públicos, militares e particulares em colaboração são espécies de:", "Agentes públicos", ["Servidores estatutários", "Empregados públicos", "Agentes delegados"],
          "Agente público é o gênero: todo aquele que exerce, ainda que transitoriamente ou sem remuneração, função pública.", 1],
      ],
      ce: [
        ["Ascensão e transferência são formas de provimento válidas na Lei 8.112/90.", false, "Foram revogadas e são inconstitucionais (SV 43): ninguém pode ir para outra carreira sem novo concurso.", 2],
        ["A demissão é penalidade disciplinar prevista na Lei 8.112/90.", true, "Art. 127, III.", 1],
        ["Havendo conveniência para o serviço, a suspensão pode ser convertida em multa de 50% por dia de vencimento, ficando o servidor obrigado a trabalhar.", true, "Art. 130, § 2º, da Lei 8.112/90.", 3],
        ["A exoneração é uma penalidade disciplinar.", false, "Exoneração não é punição (é a pedido ou de ofício). A penalidade é a <b>demissão</b>.", 1],
      ],
      sets: [
        { ask: it => `Situação: ${it} Essa forma de provimento é a:`,
          cats: {
            "Nomeação": ["Candidato aprovado em concurso é investido pela primeira vez no cargo."],
            "Promoção": ["Servidor passa para a classe seguinte da sua carreira."],
            "Readaptação": ["Servidor que perdeu parte da visão vai para cargo compatível com sua limitação."],
            "Reversão": ["Aposentado por invalidez volta à atividade porque junta médica declarou insubsistentes os motivos."],
            "Aproveitamento": ["Servidor em disponibilidade volta a trabalhar em cargo compatível com o anterior."],
            "Reintegração": ["Servidor demitido volta ao cargo porque a Justiça anulou a demissão."],
            "Recondução": ["Servidor estável reprovado no estágio probatório de outro cargo volta ao cargo de origem."],
          },
          why: "Lei 8.112/90, art. 8º: nomeação, promoção, readaptação, reversão, aproveitamento, reintegração e recondução." },
      ],
      pairs: [
        { prompt: "Ligue cada penalidade ao seu prazo de prescrição (art. 142):", why: "Lei 8.112/90, art. 142.",
          pairs: [["Advertência", "180 dias"], ["Suspensão", "2 anos"], ["Demissão", "5 anos"]] },
      ],
    },

    licit: {
      mc: [
        ["São modalidades de licitação na Lei 14.133/2021:", "Pregão, concorrência, concurso, leilão e diálogo competitivo", ["Concorrência, tomada de preços, convite, concurso e leilão", "Pregão, concorrência, convite e leilão", "Concorrência, pregão, RDC e concurso"],
          "Art. 28. A nova lei extinguiu tomada de preços, convite e RDC.", 1],
        ["Modalidade obrigatória para aquisição de bens e serviços comuns:", "Pregão", ["Concorrência", "Concurso", "Diálogo competitivo"],
          "Art. 6º, XLI. Critério: menor preço ou maior desconto.", 1],
        ["Modalidade para alienação de imóveis ou de móveis inservíveis ou legalmente apreendidos:", "Leilão", ["Concorrência", "Pregão", "Concurso"],
          "Art. 6º, XL — critério: maior lance.", 1],
        ["Modalidade para escolha de trabalho técnico, científico ou artístico, com prêmio ao vencedor:", "Concurso", ["Leilão", "Pregão", "Diálogo competitivo"],
          "Art. 6º, XXXIX — critério: melhor técnica ou conteúdo artístico.", 1],
        ["Modalidade em que a Administração dialoga com licitantes previamente selecionados para desenvolver alternativas que atendam às suas necessidades:", "Diálogo competitivo", ["Concorrência", "Pregão", "Concurso"],
          "Art. 6º, XLII — para contratações inovadoras/complexas.", 2],
        ["Quando a competição é inviável (ex.: fornecedor exclusivo), a licitação é:", "Inexigível", ["Dispensável", "Obrigatória", "Deserta"],
          "Art. 74 da Lei 14.133/21. Na <b>dispensa</b> (art. 75) a competição é possível, mas a lei permite não licitar.", 1],
        ["A contratação de artista consagrado pela crítica especializada ou pela opinião pública é hipótese de:", "Inexigibilidade", ["Dispensa", "Licitação obrigatória por concurso", "Vedação de contratação"],
          "Art. 74, II.", 2],
        ["Pelo texto original da Lei 14.133/21, é dispensável a licitação para outros serviços e compras de valor inferior a:", "R$ 50.000,00", ["R$ 100.000,00", "R$ 17.600,00", "R$ 8.000,00"],
          "Art. 75, II (R$ 100 mil é para obras e serviços de engenharia e manutenção de veículos — inciso I). Os valores são atualizados anualmente por decreto.", 3],
        ["Critério de julgamento do leilão:", "Maior lance", ["Menor preço", "Maior desconto", "Técnica e preço"],
          "Art. 33, V.", 2],
        ["Os critérios de julgamento possíveis no pregão são:", "Menor preço ou maior desconto", ["Técnica e preço", "Melhor técnica", "Maior lance"],
          "Art. 6º, XLI.", 2],
      ],
      ce: [
        ["A Lei 14.133/2021 extinguiu as modalidades tomada de preços e convite.", true, "Art. 28 traz apenas pregão, concorrência, concurso, leilão e diálogo competitivo.", 1],
        ["É permitido combinar modalidades de licitação.", false, "Art. 28, § 2º: é vedada a criação de outras modalidades ou a combinação das existentes.", 2],
        ["É vedada a inexigibilidade para serviços de publicidade e divulgação.", true, "Art. 74, III.", 3],
        ["O rol de hipóteses de inexigibilidade do art. 74 é taxativo.", false, "É exemplificativo: “inviável a competição, <b>em especial</b> nos casos de…”.", 2],
      ],
      sets: [
        { ask: it => `Situação: ${it} A modalidade adequada é:`,
          cats: {
            "Pregão": ["Compra de material de escritório (bem comum).", "Contratação de serviço de limpeza (serviço comum)."],
            "Concorrência": ["Contratação da obra de construção de um hospital.", "Contratação de serviço especial julgado por técnica e preço."],
            "Concurso": ["Escolha do projeto arquitetônico de um monumento, com prêmio ao vencedor."],
            "Leilão": ["Venda de veículos inservíveis da prefeitura.", "Alienação de imóvel público."],
            "Diálogo competitivo": ["Contratação de solução inovadora que a Administração não consegue especificar sem dialogar com o mercado."],
          },
          why: "Pregão: bens e serviços comuns. Concorrência: bens e serviços especiais e obras/serviços de engenharia. Concurso: trabalho técnico, científico ou artístico com prêmio. Leilão: alienação de bens. Diálogo competitivo: soluções inovadoras/complexas." },
        { ask: it => `Situação: ${it} É caso de:`,
          cats: {
            "Inexigibilidade (art. 74)": ["Compra de equipamento que só um fornecedor exclusivo produz.", "Show de cantor consagrado pela opinião pública.", "Locação de imóvel cuja localização torna necessária a sua escolha.", "Credenciamento de clínicas médicas."],
            "Dispensa (art. 75)": ["Compra de pequeno valor, abaixo do limite legal.", "Contratação emergencial em situação de calamidade pública.", "Licitação anterior deserta, mantidas as condições do edital."],
          },
          why: "Inexigibilidade: competição <b>inviável</b> (rol exemplificativo). Dispensa: competição viável, mas a lei permite não licitar (rol taxativo)." },
      ],
      pairs: [],
    },

    resp: {
      mc: [
        ["A teoria adotada, como regra, pelo art. 37, § 6º, da CF é a do:", "Risco administrativo (responsabilidade objetiva)", ["Risco integral", "Culpa administrativa (responsabilidade subjetiva)", "Irresponsabilidade do Estado"],
          "Responsabilidade objetiva: basta conduta + dano + nexo causal; admite excludentes.", 1],
        ["São excludentes de responsabilidade na teoria do risco administrativo:", "Culpa exclusiva da vítima, caso fortuito ou força maior e fato exclusivo de terceiro", ["Ausência de culpa do agente e licitude do ato", "Apenas a culpa exclusiva da vítima", "Nenhuma: o Estado sempre indeniza"],
          "Essas causas rompem o nexo causal. A culpa <b>concorrente</b> da vítima apenas reduz a indenização.", 1],
        ["A ação regressiva do Estado contra o agente público exige:", "Comprovação de dolo ou culpa do agente", ["Apenas a prova do dano", "Condenação criminal do agente", "Nada, pois a responsabilidade do agente é objetiva"],
          "Art. 37, § 6º, CF: o Estado responde objetivamente; o agente responde regressivamente se agiu com dolo ou culpa.", 1],
        ["Segundo o STF (Tema 940), a vítima de dano causado por agente público no exercício da função deve propor a ação:", "Contra o Estado ou a prestadora de serviço público, e não diretamente contra o agente", ["Diretamente contra o agente", "Contra o Estado e o agente, obrigatoriamente juntos", "Apenas contra o agente, se houver dolo"],
          "Teoria da dupla garantia: protege a vítima (Estado solvente) e o agente (só responde ao Estado, em regresso).", 3],
        ["Concessionária de transporte público atropela um pedestre (não usuário do serviço). A responsabilidade da concessionária é:", "Objetiva, também em relação a terceiros não usuários", ["Subjetiva, pois o pedestre não é usuário", "Inexistente", "Objetiva apenas perante os passageiros"],
          "STF, RE 591.874: a responsabilidade objetiva alcança usuários e não usuários.", 2],
        ["A teoria do risco integral, que NÃO admite excludentes, aplica-se, por exemplo, a:", "Danos nucleares e danos ambientais", ["Qualquer dano causado por servidor", "Danos por omissão do Estado", "Acidentes de trânsito com viaturas"],
          "Exceções em que nem caso fortuito afasta o dever de indenizar.", 2],
        ["A culpa concorrente da vítima:", "Atenua (reduz) a indenização", ["Exclui totalmente a responsabilidade", "Não tem nenhum efeito", "Transforma a responsabilidade em subjetiva"],
          "Divide-se o prejuízo na proporção das culpas.", 2],
      ],
      ce: [
        ["A responsabilidade objetiva dispensa a prova de culpa, mas exige conduta, dano e nexo causal.", true, "São os três elementos da responsabilidade objetiva.", 1],
        ["A pessoa jurídica de direito privado prestadora de serviço público responde objetivamente pelos danos causados por seus agentes.", true, "Art. 37, § 6º, CF.", 1],
        ["Empresa pública que explora atividade econômica responde objetivamente com base no art. 37, § 6º, da CF.", false, "O § 6º abrange as de direito público e as de direito privado <b>prestadoras de serviço público</b>. As exploradoras de atividade econômica seguem o regime privado.", 3],
        ["O Estado responde pela morte de detento quando descumpre seu dever específico de proteção.", true, "STF, Tema 592 (art. 5º, XLIX, CF).", 3],
      ],
      sets: [],
      pairs: [
        { prompt: "Ligue cada teoria à sua característica:", why: "Evolução da responsabilidade civil do Estado.",
          pairs: [["Risco administrativo", "Objetiva, admite excludentes"], ["Risco integral", "Objetiva, sem excludentes"], ["Culpa administrativa", "Subjetiva: falta do serviço"], ["Irresponsabilidade", "“O Rei não erra”"]] },
      ],
    },

    improb: {
      mc: [
        ["Após a Lei 14.230/2021, para haver ato de improbidade administrativa exige-se:", "Dolo", ["Dolo ou culpa grave", "Culpa, em qualquer grau", "Apenas a voluntariedade do agente"],
          "Art. 1º, §§ 1º e 2º, da Lei 8.429/92: só condutas dolosas; dolo é a vontade livre e consciente de alcançar o resultado ilícito, não bastando a voluntariedade.", 1],
        ["As espécies de improbidade da Lei 8.429/92 são:", "Enriquecimento ilícito, lesão ao erário e violação aos princípios", ["Enriquecimento ilícito, peculato e corrupção", "Lesão ao erário, nepotismo e prevaricação", "Apenas enriquecimento ilícito e lesão ao erário"],
          "Arts. 9º, 10 e 11.", 1],
        ["A ação de improbidade prescreve em:", "8 anos, contados da ocorrência do fato", ["5 anos, contados do fim do mandato", "10 anos, contados do fato", "4 anos, contados da ciência"],
          "Art. 23 da Lei 8.429/92 (redação da Lei 14.230/21).", 2],
        ["A suspensão dos direitos políticos de até 14 anos é prevista para:", "Enriquecimento ilícito (art. 9º)", ["Lesão ao erário (art. 10)", "Violação aos princípios (art. 11)", "Qualquer espécie, conforme a gravidade"],
          "Art. 12: até 14 anos (art. 9º), até 12 anos (art. 10). Para o art. 11 não há mais suspensão dos direitos políticos.", 3],
        ["Após a reforma de 2021, o rol de condutas do art. 11 (violação aos princípios) é:", "Taxativo", ["Exemplificativo", "Inexistente", "Definido em regulamento"],
          "O caput passou a dizer “caracterizada por uma das seguintes condutas”.", 3],
        ["Receber propina para facilitar um contrato é exemplo de:", "Enriquecimento ilícito", ["Lesão ao erário", "Violação aos princípios", "Conduta atípica"],
          "Art. 9º: auferir vantagem patrimonial indevida em razão do cargo.", 1],
        ["Frustrar a licitude de licitação, causando perda patrimonial efetiva, é exemplo de:", "Lesão ao erário", ["Enriquecimento ilícito", "Violação aos princípios", "Crime de responsabilidade"],
          "Art. 10, VIII.", 2],
        ["As sanções previstas na CF (art. 37, § 4º) para improbidade são:", "Suspensão dos direitos políticos, perda da função, indisponibilidade dos bens e ressarcimento ao erário", ["Prisão, multa e perda da função", "Cassação dos direitos políticos e confisco", "Apenas multa civil"],
          "Mnemônico SuPer InRe, sem prejuízo da ação penal cabível.", 1],
      ],
      ce: [
        ["Após a Lei 14.230/2021, existe ato de improbidade culposo.", false, "Todas as modalidades exigem <b>dolo</b>.", 1],
        ["O mero exercício da função, sem comprovação de ato doloso com fim ilícito, afasta a responsabilidade por improbidade.", true, "Art. 1º, § 3º, da Lei 8.429/92.", 2],
        ["A ação de improbidade administrativa tem natureza penal.", false, "Tem natureza <b>civil</b>; as sanções valem “sem prejuízo da ação penal cabível”.", 2],
        ["O particular que induz ou concorre dolosamente para o ato de improbidade também se sujeita à Lei 8.429/92.", true, "Art. 3º.", 2],
      ],
      sets: [
        { ask: it => `Conduta: ${it} É improbidade por:`,
          cats: {
            "Enriquecimento ilícito (art. 9º)": ["Receber dinheiro para omitir ato de ofício.", "Usar veículo público em obra particular.", "Adquirir bens desproporcionais à renda, sem justificar a origem."],
            "Lesão ao erário (art. 10)": ["Permitir a venda de bem público por preço inferior ao de mercado.", "Frustrar a licitude de licitação, causando perda patrimonial.", "Conceder benefício fiscal sem observar as formalidades legais."],
            "Violação aos princípios (art. 11)": ["Revelar fato sigiloso conhecido em razão do cargo, beneficiando terceiro.", "Deixar de prestar contas, quando obrigado, para ocultar irregularidades.", "Nomear parente para cargo em comissão (nepotismo)."],
          },
          why: "Art. 9º: o agente <b>ganha</b> vantagem indevida. Art. 10: o <b>erário perde</b> (dano efetivo). Art. 11: viola deveres de honestidade, imparcialidade e legalidade (rol taxativo)." },
      ],
      pairs: [
        { prompt: "Ligue cada espécie à suspensão dos direitos políticos (art. 12):", why: "Lei 8.429/92, art. 12, com a redação da Lei 14.230/21.",
          pairs: [["Enriquecimento ilícito", "Até 14 anos"], ["Lesão ao erário", "Até 12 anos"], ["Violação aos princípios", "Não há suspensão"]] },
      ],
    },

    proc: {
      mc: [
        ["Prazo para interpor recurso administrativo, salvo disposição específica (Lei 9.784/99):", "10 dias", ["5 dias", "15 dias", "30 dias"],
          "Art. 59, contado da ciência ou divulgação oficial da decisão.", 1],
        ["Prazo para a autoridade reconsiderar a decisão antes de encaminhar o recurso à autoridade superior:", "5 dias", ["10 dias", "15 dias", "30 dias"],
          "Art. 56, § 1º.", 2],
        ["O recurso administrativo tramita, no máximo, por quantas instâncias?", "Três", ["Duas", "Quatro", "Ilimitadas"],
          "Art. 57, salvo disposição legal diversa.", 2],
        ["Prazo decadencial para anular atos que geraram efeitos favoráveis ao destinatário, salvo comprovada má-fé:", "5 anos", ["2 anos", "10 anos", "Não há prazo"],
          "Art. 54 da Lei 9.784/99.", 1],
        ["Concluída a instrução, a Administração tem para decidir:", "Até 30 dias, prorrogáveis por igual período, motivadamente", ["10 dias, improrrogáveis", "60 dias", "Prazo livre"],
          "Art. 49.", 2],
        ["NÃO podem ser objeto de delegação:", "Atos normativos, decisão de recursos e matérias de competência exclusiva", ["Atos de gestão e decisões de primeira instância", "Assinatura de contratos", "Atos de expediente"],
          "Art. 13 — mnemônico <b>CE-NO-RE</b>: Competência Exclusiva, atos NOrmativos, REcursos.", 1],
        ["Ter amizade íntima ou inimizade notória com o interessado caracteriza:", "Suspeição", ["Impedimento", "Incompetência", "Nulidade absoluta automática"],
          "Art. 20. A suspeição pode ser arguida; o impedimento (art. 18) é dever de comunicar e abster-se.", 2],
        ["Ter interesse direto ou indireto na matéria caracteriza:", "Impedimento", ["Suspeição", "Mera irregularidade", "Conflito de competência"],
          "Art. 18, I.", 2],
        ["Na revisão de processo do qual resultou sanção:", "Não pode haver agravamento da sanção", ["Pode haver agravamento", "Só pode ser feita a pedido", "Só pode ser feita em até 5 anos"],
          "Art. 65: revisão a qualquer tempo, a pedido ou de ofício, sem agravamento.", 2],
        ["Inexistindo disposição específica, os atos do processo devem ser praticados em:", "5 dias, podendo ser dilatado até o dobro mediante justificação", ["10 dias, improrrogáveis", "15 dias, prorrogáveis uma vez", "30 dias"],
          "Art. 24 e parágrafo único.", 3],
      ],
      ce: [
        ["No recurso administrativo pode haver reformatio in pejus, desde que o recorrente seja cientificado para apresentar alegações antes da decisão.", true, "Art. 64, parágrafo único. (Na <b>revisão</b>, ao contrário, é vedado agravar.)", 3],
        ["Processos que resultaram em sanções podem ser revistos a qualquer tempo, a pedido ou de ofício, quando surgirem fatos novos.", true, "Art. 65.", 2],
        ["O ato de delegação é irrevogável.", false, "Art. 14, § 2º: é revogável a qualquer tempo pela autoridade delegante.", 1],
        ["A avocação é permitida em caráter excepcional e temporário, por motivos relevantes devidamente justificados.", true, "Art. 15.", 2],
      ],
      sets: [
        { ask: it => `A autoridade que ${it} está em situação de:`,
          cats: {
            "Impedimento (art. 18)": ["tem interesse direto na matéria", "atuou como perito no mesmo processo", "está litigando judicialmente com o interessado", "tem o cônjuge como testemunha no processo"],
            "Suspeição (art. 20)": ["tem amizade íntima com o interessado", "tem inimizade notória com o cônjuge do interessado"],
          },
          why: "Impedimento: interesse na matéria; participação como perito, testemunha ou representante (inclusive do cônjuge/parentes até o 3º grau); litígio com o interessado. Suspeição: amizade íntima ou inimizade notória." },
      ],
      pairs: [
        { prompt: "Ligue cada situação ao prazo da Lei 9.784/99:", why: "Arts. 54, 56, 59 e 24.",
          pairs: [["Interpor recurso", "10 dias"], ["Reconsiderar a decisão", "5 dias"], ["Decidir o recurso", "30 dias"], ["Anular ato favorável (decadência)", "5 anos"]] },
      ],
    },
  };

  /* ════════════════════════════════════════════════════════════
     LEI SECA
  ════════════════════════════════════════════════════════════ */
  const LAW_BLOCKS = [
    { id: "princ", label: "Princípios", ref: "CF, art. 37 · Lei 9.784/99, art. 2º", items: [
      L("CF, art. 37, caput", "Princípios expressos na CF", "Quais princípios a Administração obedece segundo a CF?",
        "A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de legalidade, [[impessoalidade|imparcialidade|igualdade]], moralidade, publicidade e [[eficiência|economicidade|razoabilidade]] e, também, ao seguinte:"),
      L("CF, art. 37, § 1º", "Publicidade sem promoção pessoal", "Como deve ser a publicidade dos atos e programas oficiais?",
        "A publicidade dos atos, programas, obras, serviços e campanhas dos órgãos públicos deverá ter caráter educativo, informativo ou de orientação social, dela não podendo constar nomes, símbolos ou imagens que caracterizem [[promoção pessoal|propaganda partidária|publicidade comercial]] de autoridades ou servidores públicos."),
      L("Lei 9.784/99, art. 2º", "Princípios do processo administrativo", "Quais princípios a Lei 9.784/99 enumera?",
        "A Administração Pública obedecerá, dentre outros, aos princípios da legalidade, finalidade, [[motivação|publicidade|celeridade]], razoabilidade, proporcionalidade, moralidade, ampla defesa, contraditório, [[segurança jurídica|supremacia do interesse público|economicidade]], interesse público e eficiência."),
      L("Súmula 473 do STF", "Autotutela: anular e revogar", "O que a Súmula 473 diz sobre anulação e revogação?",
        "A administração pode [[anular|revogar|convalidar]] seus próprios atos, quando eivados de vícios que os tornam ilegais, porque deles não se originam direitos; ou [[revogá-los|anulá-los|cassá-los]], por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos, e ressalvada, em todos os casos, a apreciação judicial."),
    ] },
    { id: "org", label: "Organização administrativa", ref: "DL 200/67, art. 5º · CF, art. 37, XIX", items: [
      L("DL 200/67, art. 5º, I", "Autarquia", "Como o DL 200/67 define autarquia?",
        "Autarquia - o serviço autônomo, criado por [[lei|decreto|lei complementar]], com personalidade jurídica, patrimônio e receita próprios, para executar atividades [[típicas da Administração Pública|econômicas de interesse coletivo|de natureza privada]], que requeiram, para seu melhor funcionamento, gestão administrativa e financeira descentralizada."),
      L("DL 200/67, art. 5º, II", "Empresa pública", "Como o DL 200/67 define empresa pública?",
        "Empresa Pública - a entidade dotada de personalidade jurídica de direito [[privado|público]], com patrimônio próprio e capital [[exclusivo da União|majoritário da União|misto, com controle da União]], criado por lei para a exploração de atividade econômica que o Governo seja levado a exercer por força de contingência ou de conveniência administrativa podendo revestir-se de [[qualquer das formas admitidas em direito|forma de sociedade anônima, apenas|forma de sociedade limitada, apenas]]."),
      L("DL 200/67, art. 5º, III", "Sociedade de economia mista", "Como o DL 200/67 define sociedade de economia mista?",
        "Sociedade de Economia Mista - a entidade dotada de personalidade jurídica de direito privado, criada por lei para a exploração de atividade econômica, sob a forma de [[sociedade anônima|qualquer forma societária|sociedade limitada]], cujas ações com direito a voto pertençam em sua [[maioria|totalidade|minoria]] à União ou a entidade da Administração Indireta."),
      L("DL 200/67, art. 5º, IV", "Fundação pública", "Como o DL 200/67 define fundação pública?",
        "Fundação Pública - a entidade dotada de personalidade jurídica de direito privado, [[sem fins lucrativos|com fins lucrativos|de natureza empresarial]], criada em virtude de [[autorização legislativa|decreto do Executivo|lei complementar]], para o desenvolvimento de atividades que não exijam execução por órgãos ou entidades de direito público, com autonomia administrativa, patrimônio próprio gerido pelos respectivos órgãos de direção, e funcionamento custeado por recursos da União e de outras fontes."),
      L("CF, art. 37, XIX", "Criação das entidades", "Como são criadas as entidades da Administração indireta?",
        "somente por lei [[específica|complementar|ordinária genérica]] poderá ser criada autarquia e autorizada a instituição de empresa pública, de sociedade de economia mista e de fundação, cabendo à lei [[complementar|ordinária|delegada]], neste último caso, definir as áreas de sua atuação;"),
    ] },
    { id: "poder", label: "Competência e poder de polícia", ref: "Lei 9.784/99, arts. 11 a 15 · CTN, art. 78", items: [
      L("Lei 9.784/99, art. 11", "Irrenunciabilidade da competência", "A competência administrativa pode ser renunciada?",
        "A competência é [[irrenunciável|renunciável|transferível]] e se exerce pelos órgãos administrativos a que foi atribuída como própria, salvo os casos de delegação e avocação legalmente admitidos."),
      L("Lei 9.784/99, art. 13", "Matérias indelegáveis", "O que não pode ser objeto de delegação?",
        "Não podem ser objeto de delegação: I - a edição de atos de caráter [[normativo|ordinário|executório]]; II - a decisão de recursos [[administrativos|judiciais|hierárquicos impróprios]]; III - as matérias de competência [[exclusiva|privativa|concorrente]] do órgão ou autoridade."),
      L("Lei 9.784/99, art. 14, § 2º", "Revogabilidade da delegação", "A delegação pode ser revogada?",
        "O ato de delegação é revogável [[a qualquer tempo|após um ano|somente com motivação judicial]] pela autoridade delegante."),
      L("Lei 9.784/99, art. 15", "Avocação", "Quando a avocação é permitida?",
        "Será permitida, em caráter [[excepcional|ordinário|permanente]] e por motivos relevantes devidamente justificados, a avocação [[temporária|definitiva|permanente]] de competência atribuída a órgão hierarquicamente [[inferior|superior|equivalente]]."),
      L("CTN, art. 78", "Conceito de poder de polícia", "Como o CTN define poder de polícia?",
        "Considera-se poder de polícia atividade da administração pública que, limitando ou disciplinando direito, interesse ou liberdade, regula a prática de ato ou abstenção de fato, em razão de interesse [[público|privado relevante|coletivo da categoria]] concernente à segurança, à higiene, à ordem, aos costumes, à disciplina da produção e do mercado, ao exercício de atividades econômicas dependentes de concessão ou autorização do Poder Público, à tranquilidade pública ou ao respeito à propriedade e aos direitos individuais ou coletivos."),
    ] },
    { id: "atos", label: "Anulação, revogação e convalidação", ref: "Lei 9.784/99, arts. 53 a 55 · Súmula 346", items: [
      L("Lei 9.784/99, art. 53", "Dever de anular e faculdade de revogar", "Quando a Administração deve anular e quando pode revogar?",
        "A Administração [[deve|pode|poderá]] anular seus próprios atos, quando eivados de vício de legalidade, e [[pode|deve|tem o dever de]] revogá-los por motivo de conveniência ou oportunidade, respeitados os direitos adquiridos."),
      L("Lei 9.784/99, art. 54", "Decadência para anular", "Em quanto tempo decai o direito de anular atos favoráveis?",
        "O direito da Administração de anular os atos administrativos de que decorram efeitos favoráveis para os destinatários decai em [[cinco|dez|dois]] anos, contados da data em que foram praticados, salvo comprovada [[má-fé|culpa grave|ilegalidade]]."),
      L("Lei 9.784/99, art. 55", "Convalidação", "Quando os atos podem ser convalidados?",
        "Em decisão na qual se evidencie não acarretarem lesão ao interesse público nem prejuízo a terceiros, os atos que apresentarem defeitos [[sanáveis|insanáveis|graves]] poderão ser convalidados pela [[própria Administração|autoridade judicial|autoridade superior, apenas]]."),
      L("Súmula 346 do STF", "Nulidade dos próprios atos", "O que diz a Súmula 346 do STF?",
        "A administração pública pode declarar a [[nulidade|revogação|convalidação]] dos seus próprios atos."),
    ] },
    { id: "servidor", label: "Servidores (Lei 8.112/90)", ref: "Arts. 8º, 13, 15, 24 a 30, 127, 130 e 142", items: [
      L("Lei 8.112/90, art. 8º", "Formas de provimento", "Quais são as formas de provimento de cargo público?",
        "São formas de provimento de cargo público: I - nomeação; II - promoção; V - [[readaptação|transferência|ascensão]]; VI - reversão; VII - aproveitamento; VIII - [[reintegração|redistribuição|remoção]]; IX - recondução."),
      L("Lei 8.112/90, art. 13, § 1º", "Prazo da posse", "Em quanto tempo deve ocorrer a posse?",
        "A posse ocorrerá no prazo de [[trinta|quinze|sessenta]] dias contados da publicação do ato de provimento."),
      L("Lei 8.112/90, art. 15, § 1º", "Prazo para o exercício", "Em quanto tempo o empossado deve entrar em exercício?",
        "É de [[quinze|trinta|cinco]] dias o prazo para o servidor empossado em cargo público entrar em exercício, contados da data da [[posse|nomeação|publicação]]."),
      L("Lei 8.112/90, art. 24", "Readaptação", "O que é readaptação?",
        "Readaptação é a investidura do servidor em cargo de atribuições e responsabilidades compatíveis com a limitação que tenha sofrido em sua capacidade física ou mental verificada em [[inspeção médica|processo administrativo|perícia judicial]]."),
      L("Lei 8.112/90, art. 28", "Reintegração", "O que é reintegração?",
        "A reintegração é a reinvestidura do servidor [[estável|em estágio probatório|ocupante de cargo em comissão]] no cargo anteriormente ocupado, ou no cargo resultante de sua transformação, quando invalidada a sua [[demissão|exoneração|aposentadoria]] por decisão administrativa ou judicial, com ressarcimento de todas as vantagens."),
      L("Lei 8.112/90, art. 29", "Recondução", "O que é recondução e de que decorre?",
        "Recondução é o retorno do servidor estável ao cargo anteriormente ocupado e decorrerá de: I - inabilitação em [[estágio probatório|avaliação periódica|concurso interno]] relativo a outro cargo; II - [[reintegração|aposentadoria|exoneração]] do anterior ocupante."),
      L("Lei 8.112/90, art. 30", "Aproveitamento", "Como retorna o servidor em disponibilidade?",
        "O retorno à atividade de servidor em disponibilidade far-se-á mediante aproveitamento [[obrigatório|facultativo|discricionário]] em cargo de atribuições e vencimentos compatíveis com o anteriormente ocupado."),
      L("Lei 8.112/90, art. 127", "Penalidades disciplinares", "Quais são as penalidades disciplinares?",
        "São penalidades disciplinares: I - advertência; II - [[suspensão|multa|exoneração]]; III - demissão; IV - cassação de aposentadoria ou disponibilidade; V - destituição de cargo em comissão; VI - destituição de função comissionada."),
      L("Lei 8.112/90, art. 142", "Prescrição disciplinar", "Quais são os prazos de prescrição da ação disciplinar?",
        "A ação disciplinar prescreverá: I - em [[5 (cinco) anos|2 (dois) anos|10 (dez) anos]], quanto às infrações puníveis com demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão; II - em [[2 (dois) anos|5 (cinco) anos|1 (um) ano]], quanto à suspensão; III - em [[180 (cento e oitenta) dias|1 (um) ano|90 (noventa) dias]], quanto à advertência."),
    ] },
    { id: "licit", label: "Licitações (Lei 14.133/21)", ref: "Arts. 6º, 28, 33, 74 e 75", items: [
      L("Lei 14.133/21, art. 28", "Modalidades", "Quais são as modalidades de licitação?",
        "São modalidades de licitação: I - pregão; II - concorrência; III - concurso; IV - leilão; V - [[diálogo competitivo|tomada de preços|convite]]. § 2º É vedada a criação de outras modalidades de licitação ou, ainda, a [[combinação|exclusão|substituição]] daquelas referidas no caput deste artigo."),
      L("Lei 14.133/21, art. 6º, XLI", "Pregão", "Como a lei define pregão?",
        "pregão: modalidade de licitação [[obrigatória|facultativa|preferencial]] para aquisição de bens e serviços comuns, cujo critério de julgamento poderá ser o de menor preço ou o de [[maior desconto|melhor técnica|maior lance]];"),
      L("Lei 14.133/21, art. 6º, XL", "Leilão", "Como a lei define leilão?",
        "leilão: modalidade de licitação para alienação de bens imóveis ou de bens móveis [[inservíveis ou legalmente apreendidos|de qualquer natureza|de alto valor]] a quem oferecer o [[maior lance|menor preço|melhor técnica]];"),
      L("Lei 14.133/21, art. 6º, XXXIX", "Concurso", "Como a lei define concurso?",
        "concurso: modalidade de licitação para escolha de trabalho técnico, científico ou artístico, cujo critério de julgamento será o de [[melhor técnica ou conteúdo artístico|menor preço|técnica e preço]], e para concessão de prêmio ou remuneração ao vencedor;"),
      L("Lei 14.133/21, art. 33", "Critérios de julgamento", "Quais são os critérios de julgamento das propostas?",
        "O julgamento das propostas será realizado de acordo com os seguintes critérios: I - menor preço; II - maior desconto; III - melhor técnica ou conteúdo artístico; IV - técnica e preço; V - maior lance, no caso de [[leilão|concurso|pregão]]; VI - maior [[retorno econômico|vantajosidade|economicidade]]."),
      L("Lei 14.133/21, art. 74, caput, I e II", "Inexigibilidade", "Quando a licitação é inexigível?",
        "É inexigível a licitação quando [[inviável|desvantajosa|dispensável]] a competição, em especial nos casos de: I - aquisição de materiais, de equipamentos ou de gêneros ou contratação de serviços que só possam ser fornecidos por produtor, empresa ou representante comercial [[exclusivos|nacionais|cadastrados]]; II - contratação de profissional do setor artístico, diretamente ou por meio de empresário exclusivo, desde que consagrado pela crítica especializada ou pela [[opinião pública|Administração contratante|mídia local]];"),
      L("Lei 14.133/21, art. 75, I e II", "Dispensa por valor", "Quais são os limites de valor para dispensa? (valores atualizados anualmente por decreto)",
        "É dispensável a licitação: I - para contratação que envolva valores inferiores a R$ [[100.000,00 (cem mil reais)|50.000,00 (cinquenta mil reais)|330.000,00 (trezentos e trinta mil reais)]], no caso de obras e serviços de engenharia ou de serviços de manutenção de veículos automotores; II - para contratação que envolva valores inferiores a R$ [[50.000,00 (cinquenta mil reais)|100.000,00 (cem mil reais)|17.600,00 (dezessete mil e seiscentos reais)]], no caso de outros serviços e compras;"),
    ] },
    { id: "resp", label: "Responsabilidade civil do Estado", ref: "CF, art. 37, § 6º · CC, art. 43", items: [
      L("CF, art. 37, § 6º", "Responsabilidade objetiva", "Quem responde objetivamente pelos danos dos agentes?",
        "As pessoas jurídicas de direito público e as de direito privado [[prestadoras de serviços públicos|exploradoras de atividade econômica|integrantes da Administração indireta]] responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de [[dolo ou culpa|dolo, apenas|culpa grave, apenas]]."),
      L("Código Civil, art. 43", "Responsabilidade no Código Civil", "O que diz o Código Civil sobre a responsabilidade das pessoas de direito público?",
        "As pessoas jurídicas de direito público interno são civilmente responsáveis por atos dos seus agentes que nessa qualidade causem danos a terceiros, ressalvado direito [[regressivo|subsidiário|solidário]] contra os causadores do dano, se houver, por parte destes, [[culpa ou dolo|dolo, apenas|má-fé]]."),
    ] },
    { id: "improb", label: "Improbidade (Lei 8.429/92)", ref: "Arts. 1º, 9º, 10, 11 e 23", items: [
      L("Lei 8.429/92, art. 1º, § 1º", "Só condutas dolosas", "Quais condutas são atos de improbidade?",
        "Consideram-se atos de improbidade administrativa as condutas [[dolosas|culposas|dolosas ou culposas]] tipificadas nos arts. 9º, 10 e 11 desta Lei, ressalvados tipos previstos em leis especiais."),
      L("Lei 8.429/92, art. 1º, § 2º", "Conceito de dolo", "Como a lei define dolo?",
        "Considera-se dolo a vontade livre e consciente de alcançar o resultado ilícito tipificado nos arts. 9º, 10 e 11 desta Lei, não bastando a [[voluntariedade do agente|culpa grave|negligência do agente]]."),
      L("Lei 8.429/92, art. 1º, § 3º", "Mero exercício da função", "O mero exercício da função gera improbidade?",
        "O mero exercício da função ou desempenho de competências públicas, sem comprovação de ato [[doloso|culposo|ilegal]] com fim ilícito, afasta a responsabilidade por ato de improbidade administrativa."),
      L("Lei 8.429/92, art. 9º, caput", "Enriquecimento ilícito", "O que caracteriza o enriquecimento ilícito?",
        "Constitui ato de improbidade administrativa importando em enriquecimento ilícito auferir, mediante a prática de ato doloso, qualquer tipo de [[vantagem patrimonial indevida|prejuízo ao erário|benefício a terceiro]] em razão do exercício de cargo, de mandato, de função, de emprego ou de atividade nas entidades referidas no art. 1º desta Lei, e notadamente:"),
      L("Lei 8.429/92, art. 10, caput", "Lesão ao erário", "O que caracteriza a lesão ao erário?",
        "Constitui ato de improbidade administrativa que causa lesão ao erário qualquer ação ou omissão [[dolosa|dolosa ou culposa|culposa]], que enseje, [[efetiva e comprovadamente|potencial ou presumidamente|ainda que de forma presumida]], perda patrimonial, desvio, apropriação, malbaratamento ou dilapidação dos bens ou haveres das entidades referidas no art. 1º desta Lei, e notadamente:"),
      L("Lei 8.429/92, art. 11, caput", "Violação aos princípios", "O que caracteriza a violação aos princípios?",
        "Constitui ato de improbidade administrativa que atenta contra os princípios da administração pública a ação ou omissão dolosa que viole os deveres de honestidade, de imparcialidade e de [[legalidade|eficiência|publicidade]], caracterizada por [[uma das seguintes condutas|condutas como as seguintes, entre outras|qualquer conduta, notadamente as seguintes]]:"),
      L("Lei 8.429/92, art. 23, caput", "Prescrição", "Qual é o prazo de prescrição da ação de improbidade?",
        "A ação para a aplicação das sanções previstas nesta Lei prescreve em [[8 (oito) anos|5 (cinco) anos|10 (dez) anos]], contados a partir da ocorrência do fato ou, no caso de infrações permanentes, do dia em que cessou a permanência."),
    ] },
    { id: "proc", label: "Processo administrativo (Lei 9.784/99)", ref: "Arts. 18, 20, 24, 49, 56, 57, 59 e 65", items: [
      L("Lei 9.784/99, art. 18", "Impedimento", "Quem está impedido de atuar no processo?",
        "É impedido de atuar em processo administrativo o servidor ou autoridade que: I - tenha interesse [[direto ou indireto|direto, apenas|patrimonial]] na matéria; II - tenha participado ou venha a participar como perito, testemunha ou representante, ou se tais situações ocorrem quanto ao cônjuge, companheiro ou parente e afins até o [[terceiro|segundo|quarto]] grau; III - esteja litigando judicial ou administrativamente com o interessado ou respectivo cônjuge ou companheiro."),
      L("Lei 9.784/99, art. 20", "Suspeição", "Quando se pode arguir suspeição?",
        "Pode ser arguida a suspeição de autoridade ou servidor que tenha amizade [[íntima|pública|duradoura]] ou inimizade [[notória|declarada|antiga]] com algum dos interessados ou com os respectivos cônjuges, companheiros, parentes e afins até o terceiro grau."),
      L("Lei 9.784/99, art. 24", "Prazo geral dos atos", "Qual é o prazo geral para a prática dos atos no processo?",
        "Inexistindo disposição específica, os atos do órgão ou autoridade responsável pelo processo e dos administrados que dele participem devem ser praticados no prazo de [[cinco|dez|quinze]] dias, salvo motivo de força maior. Parágrafo único. O prazo previsto neste artigo pode ser dilatado até o [[dobro|triplo|quádruplo]], mediante comprovada justificação."),
      L("Lei 9.784/99, art. 49", "Prazo para decidir", "Concluída a instrução, em quanto tempo a Administração decide?",
        "Concluída a instrução de processo administrativo, a Administração tem o prazo de até [[trinta|dez|sessenta]] dias para decidir, salvo prorrogação por igual período expressamente motivada."),
      L("Lei 9.784/99, art. 56, § 1º", "Reconsideração", "A quem se dirige o recurso e em quanto tempo há reconsideração?",
        "O recurso será dirigido à autoridade que proferiu a decisão, a qual, se não a reconsiderar no prazo de [[cinco|dez|quinze]] dias, o encaminhará à autoridade [[superior|competente originária|judicial]]."),
      L("Lei 9.784/99, art. 57", "Instâncias", "Por quantas instâncias tramita o recurso?",
        "O recurso administrativo tramitará no máximo por [[três|duas|quatro]] instâncias administrativas, salvo disposição legal diversa."),
      L("Lei 9.784/99, art. 59", "Prazo do recurso", "Qual é o prazo para interpor recurso?",
        "Salvo disposição legal específica, é de [[dez|cinco|quinze]] dias o prazo para interposição de recurso administrativo, contado a partir da ciência ou divulgação oficial da decisão recorrida."),
      L("Lei 9.784/99, art. 65", "Revisão", "Quando cabe revisão e pode haver agravamento?",
        "Os processos administrativos de que resultem sanções poderão ser revistos, [[a qualquer tempo|no prazo de cinco anos|no prazo de dez dias]], a pedido ou de ofício, quando surgirem fatos novos ou circunstâncias relevantes suscetíveis de justificar a inadequação da sanção aplicada. Parágrafo único. Da revisão do processo [[não poderá|poderá]] resultar agravamento da sanção."),
    ] },
  ];

  /* ════════════════════════════════════════════════════════════
     TÓPICOS (trilha, em ordem lógica)
  ════════════════════════════════════════════════════════════ */
  const T = (id, label, icon, color, bg, border, desc) => ({ id, label, icon, color, bg, border, desc });
  const TOPICS = [
    T("princ", "Princípios", "🧭", "#3B82F6", "#EFF6FF", "#BFDBFE", "Regime jurídico-administrativo, LIMPE e princípios implícitos"),
    T("org", "Organização administrativa", "🏗️", "#6366F1", "#EEF2FF", "#C7D2FE", "Direta e indireta, desconcentração, descentralização e entidades"),
    T("poder", "Poderes administrativos", "⚡", "#F59E0B", "#FFFBEB", "#FDE68A", "Hierárquico, disciplinar, regulamentar, de polícia e abuso de poder"),
    T("atos", "Atos administrativos", "📄", "#8B5CF6", "#F5F3FF", "#DDD6FE", "Elementos, atributos, extinção e convalidação"),
    T("agentes", "Agentes públicos", "👔", "#10B981", "#ECFDF5", "#A7F3D0", "Lei 8.112/90: provimento, prazos e penalidades"),
    T("licit", "Licitações", "📑", "#06B6D4", "#ECFEFF", "#A5F3FC", "Lei 14.133/21: modalidades, critérios, dispensa e inexigibilidade"),
    T("resp", "Responsabilidade do Estado", "⚖️", "#EF4444", "#FEF2F2", "#FECACA", "Risco administrativo, excludentes e ação regressiva"),
    T("improb", "Improbidade administrativa", "🚨", "#EC4899", "#FDF2F8", "#FBCFE8", "Lei 8.429/92 após a Lei 14.230/21: espécies, dolo e sanções"),
    T("proc", "Processo administrativo", "🗂️", "#64748B", "#F1F5F9", "#CBD5E1", "Lei 9.784/99: delegação, impedimento, prazos e recursos"),
  ];

  /* ── Teoria (resumos) ────────────────────────────────────── */
  const THEORY = {
    princ: sec("Regime jurídico-administrativo", `<p><b>Supremacia</b> do interesse público (prerrogativas) + <b>indisponibilidade</b> do interesse público (sujeições).</p>`) +
      sec("Expressos na CF (art. 37) — LIMPE", list(["<b>Legalidade</b>: só o que a lei autoriza", "<b>Impessoalidade</b>: finalidade pública, sem promoção pessoal", "<b>Moralidade</b>: ética e boa-fé (nepotismo — SV 13)", "<b>Publicidade</b>: transparência, ressalvados sigilos legais", "<b>Eficiência</b>: EC 19/1998"])) +
      sec("Outros princípios", list(["Lei 9.784/99, art. 2º: finalidade, motivação, razoabilidade, proporcionalidade, ampla defesa, contraditório, segurança jurídica, interesse público", "<b>Autotutela</b>: anular os ilegais e revogar os inconvenientes (Súmulas 346 e 473)", "<b>Continuidade</b> do serviço público"])),
    org: sec("Desconcentração × descentralização", `<p class="ex-rule"><b>Desconcentração</b>: dentro da mesma pessoa jurídica → cria órgãos, com hierarquia.<br><b>Descentralização</b>: para outra pessoa → por <b>outorga</b> (lei, titularidade + execução, à indireta) ou por <b>delegação</b> (contrato/ato, só execução, a particulares).</p>`) +
      sec("Administração indireta", list(["<b>Autarquia</b>: criada por lei, direito público (inclui agências reguladoras)", "<b>Fundação pública</b>: lei autoriza; pode ser de direito público ou privado", "<b>Empresa pública</b>: lei autoriza; direito privado; capital 100% público; qualquer forma societária", "<b>Sociedade de economia mista</b>: lei autoriza; direito privado; S.A.; maioria do capital votante público"])) +
      sec("Controle", `<p>Entre direta e indireta: <b>vinculação</b> (tutela / supervisão ministerial), não hierarquia.</p>`),
    poder: sec("Poderes administrativos", list(["<b>Hierárquico</b>: ordenar, fiscalizar, rever, delegar e avocar", "<b>Disciplinar</b>: punir servidores e quem tem vínculo especial", "<b>Regulamentar</b>: decretos para fiel execução da lei (art. 84, IV, CF)", "<b>De polícia</b>: limitar liberdade e propriedade em favor do interesse público (art. 78, CTN) — atributos DAC: discricionariedade, autoexecutoriedade e coercibilidade"])) +
      sec("Abuso de poder", `<p class="ex-rule"><b>Excesso</b>: vai além da competência. <b>Desvio de finalidade</b>: é competente, mas busca fim diverso do legal.</p>`),
    atos: sec("Elementos — COFIFOMOB", `<p>COmpetência, FInalidade, FOrma (sempre vinculados) · MOtivo, OBjeto (mérito nos discricionários).</p>`) +
      sec("Atributos — PATI", `<p>Presunção de legitimidade, Autoexecutoriedade, Tipicidade, Imperatividade.</p>`) +
      sec("Extinção", list(["<b>Anulação</b>: ilegalidade, ex tunc, Administração ou Judiciário (decadência de 5 anos para atos favoráveis)", "<b>Revogação</b>: conveniência e oportunidade, ex nunc, só a Administração", "<b>Cassação</b>: beneficiário descumpriu condições", "<b>Caducidade</b>: lei nova tornou a situação inadmissível", "<b>Contraposição</b>: ato posterior com efeitos opostos"])) +
      sec("Convalidação", `<p>Defeitos sanáveis (competência não exclusiva e forma não essencial), sem lesão ao interesse público nem prejuízo a terceiros (art. 55, Lei 9.784/99).</p>`),
    agentes: sec("Formas de provimento (Lei 8.112/90, art. 8º)", list(["<b>Nomeação</b> (única originária)", "<b>Promoção</b>", "<b>Readaptação</b>: limitação física/mental", "<b>Reversão</b>: aposentado volta", "<b>Aproveitamento</b>: disponível volta", "<b>Reintegração</b>: demissão invalidada", "<b>Recondução</b>: inabilitação em estágio probatório de outro cargo ou reintegração do anterior ocupante"])) +
      sec("Prazos", `<p class="ex-rule">Posse: 30 dias da publicação · Exercício: 15 dias da posse · Suspensão: até 90 dias</p>`) +
      sec("Penalidades (art. 127) e prescrição (art. 142)", `<p>Advertência (180 dias) · Suspensão (2 anos) · Demissão, cassação de aposentadoria/disponibilidade, destituição de cargo em comissão (5 anos) · Destituição de função comissionada.</p>`),
    licit: sec("Modalidades (Lei 14.133/21, art. 28)", list(["<b>Pregão</b>: bens e serviços comuns (menor preço ou maior desconto)", "<b>Concorrência</b>: bens e serviços especiais, obras e serviços de engenharia", "<b>Concurso</b>: trabalho técnico, científico ou artístico, com prêmio", "<b>Leilão</b>: alienação de bens (maior lance)", "<b>Diálogo competitivo</b>: soluções inovadoras, com licitantes pré-selecionados"])) +
      sec("Contratação direta", `<p class="ex-rule"><b>Inexigibilidade</b> (art. 74): competição inviável — fornecedor exclusivo, artista consagrado, notória especialização, credenciamento, imóvel com localização necessária. Rol exemplificativo.<br><b>Dispensa</b> (art. 75): competição possível, mas a lei permite não licitar — pequeno valor, emergência, licitação deserta… Rol taxativo.</p>`),
    resp: sec("Regra: risco administrativo (art. 37, § 6º, CF)", list(["Objetiva: conduta + dano + nexo causal, sem precisar provar culpa", "Abrange pessoas de direito público e de direito privado prestadoras de serviço público (inclusive perante não usuários)", "Excludentes: culpa exclusiva da vítima, caso fortuito/força maior, fato exclusivo de terceiro", "Culpa concorrente: reduz a indenização", "Regresso contra o agente: só com dolo ou culpa", "Ação deve ser proposta contra o Estado, não contra o agente (Tema 940)"])) +
      sec("Outras teorias", `<p>Risco integral (sem excludentes): danos nucleares e ambientais. Omissão genérica: em regra, responsabilidade subjetiva (falta do serviço).</p>`),
    improb: sec("Lei 8.429/92 após a Lei 14.230/21", list(["Só existe improbidade <b>dolosa</b>", "Art. 9º — enriquecimento ilícito: até 14 anos de suspensão dos direitos políticos", "Art. 10 — lesão ao erário (perda efetiva e comprovada): até 12 anos", "Art. 11 — violação aos princípios (rol taxativo): sem suspensão dos direitos políticos", "Prescrição: 8 anos do fato", "Natureza civil, sem prejuízo da ação penal"])) +
      sec("Sanções na CF (art. 37, § 4º)", `<p>Suspensão dos direitos políticos, perda da função pública, indisponibilidade dos bens e ressarcimento ao erário.</p>`),
    proc: sec("Delegação e avocação", list(["Não se delegam (CE-NO-RE): competência exclusiva, atos normativos e decisão de recursos", "Delegação revogável a qualquer tempo", "Avocação: excepcional, temporária e justificada"])) +
      sec("Impedimento × suspeição", `<p class="ex-rule"><b>Impedimento</b> (art. 18): interesse na matéria, atuação como perito/testemunha/representante, litígio com o interessado.<br><b>Suspeição</b> (art. 20): amizade íntima ou inimizade notória.</p>`) +
      sec("Prazos", `<p class="ex-rule">Atos em geral: 5 dias (até o dobro) · Decidir: 30 dias (+30) · Recurso: 10 dias · Reconsideração: 5 dias · Decidir recurso: 30 dias · Até 3 instâncias · Anular ato favorável: 5 anos</p>`) +
      sec("Recurso × revisão", `<p>No recurso pode haver agravamento (com ciência prévia do recorrente). Na revisão (a qualquer tempo, por fatos novos), <b>não</b>.</p>`),
  };

  global.AdministrativoEngine = global.JuridicoCore.build({ UNITS, LAW_BLOCKS, TOPICS, THEORY, lawName: "da lei" });
})(typeof window !== "undefined" ? window : globalThis);
