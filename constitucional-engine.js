/* ════════════════════════════════════════════════════════════
   DIREITO CONSTITUCIONAL — trilha, treino e lei seca (CF/88)
   - Trilha/treino: bancos de questões por unidade (múltipla escolha,
     certo/errado, classificação e ligar pares).
   - Lei seca: blocos de artigos em texto literal. Trechos marcados com
     [[correto|errado1|errado2]] viram lacunas, itens de certo/errado
     (trocando o termo correto por um errado) e flashcards.
════════════════════════════════════════════════════════════ */
(function (global) {
  "use strict";

  const { sec, list, L } = global.JuridicoCore;

  /* ════════════════════════════════════════════════════════════
     BANCOS DA TRILHA
     mc: [pergunta, correta, [erradas], explicação, nível]
     ce: [afirmação, verdadeira?, explicação, nível]
     sets: classificação { ask(item), cats: { rótulo: [itens] }, why }
     pairs: ligar pares { prompt, pairs: [[esquerda, direita]], why }
  ════════════════════════════════════════════════════════════ */
  const UNITS = {
    teoria: {
      mc: [
        ["Quanto à origem, a Constituição de 1988 é classificada como:", "Promulgada (democrática)", ["Outorgada", "Cesarista", "Pactuada"],
          "Foi elaborada por uma Assembleia Nacional Constituinte eleita pelo povo, por isso é <b>promulgada</b> (democrática). Outorgada é a imposta pelo governante (ex.: a de 1937).", 1],
        ["Quanto à estabilidade, a CF/88 é:", "Rígida", ["Flexível", "Semirrígida", "Imutável"],
          "Exige um processo mais difícil para ser alterada do que o das leis comuns: emenda votada em dois turnos em cada Casa, com 3/5 dos votos (art. 60, § 2º).", 1],
        ["Quanto à extensão, a CF/88 é:", "Analítica (prolixa)", ["Sintética (concisa)", "Histórica", "Costumeira"],
          "Trata de muitos assuntos em detalhe. A sintética traz só princípios gerais (ex.: a Constituição dos EUA).", 1],
        ["O poder constituinte originário é:", "Inicial, ilimitado juridicamente, incondicionado e autônomo", ["Derivado, limitado e condicionado", "Inicial, limitado e condicionado", "Secundário, ilimitado e condicionado"],
          "O originário cria uma nova ordem jurídica e não se submete a normas anteriores. Os poderes derivados (reformador, decorrente e revisor) são limitados e condicionados.", 2],
        ["O poder dos Estados-membros de elaborar suas próprias Constituições é o poder constituinte:", "Derivado decorrente", ["Originário", "Derivado reformador", "Derivado revisor"],
          "<b>Decorrente</b>: os Estados se auto-organizam por Constituições estaduais (art. 25). <b>Reformador</b>: emendas (art. 60). <b>Revisor</b>: revisão única do art. 3º do ADCT.", 2],
        ["A proposta de emenda à Constituição é aprovada se obtiver, em cada Casa, em dois turnos:", "Três quintos dos votos dos respectivos membros", ["Maioria absoluta dos votos", "Dois terços dos votos", "Maioria simples dos votos"],
          "Art. 60, § 2º.", 1],
        ["NÃO tem legitimidade para propor emenda à Constituição:", "Grupo de cidadãos, por iniciativa popular", ["O Presidente da República", "Um terço, no mínimo, dos membros do Senado Federal", "Mais da metade das Assembleias Legislativas"],
          "Art. 60, I a III: 1/3 da Câmara ou do Senado, o Presidente da República ou mais da metade das Assembleias Legislativas. A CF não prevê iniciativa popular de emenda.", 2],
        ["A Constituição NÃO pode ser emendada na vigência de:", "Intervenção federal, estado de defesa ou estado de sítio", ["Período eleitoral", "Recesso parlamentar", "Calamidade pública"],
          "Art. 60, § 1º — são as chamadas limitações circunstanciais.", 2],
        ["Norma que produz efeitos imediatamente, mas pode ter seu alcance restringido por lei, tem eficácia:", "Contida", ["Plena", "Limitada", "Exaurida"],
          "José Afonso da Silva: <b>plena</b> (efeitos integrais, sem restrição), <b>contida</b> (efeitos imediatos, mas restringíveis por lei — ex.: art. 5º, XIII) e <b>limitada</b> (depende de lei para produzir todos os efeitos).", 3],
        ["A matéria de proposta de emenda rejeitada ou havida por prejudicada:", "Não pode ser objeto de nova proposta na mesma sessão legislativa", ["Pode ser reapresentada a qualquer tempo", "Só pode ser reapresentada na próxima legislatura", "Pode ser reapresentada na mesma sessão por maioria absoluta"],
          "Art. 60, § 5º. Cuidado: para projeto de LEI, o art. 67 permite reapresentar na mesma sessão por maioria absoluta. Para PEC, não.", 3],
      ],
      ce: [
        ["A forma republicana de governo é cláusula pétrea expressa na CF/88.", false, "As cláusulas pétreas expressas (art. 60, § 4º) são: forma federativa de Estado; voto direto, secreto, universal e periódico; separação dos Poderes; direitos e garantias individuais. A forma republicana não está na lista.", 2],
        ["O voto obrigatório é cláusula pétrea.", false, "O voto protegido é o <b>direto, secreto, universal e periódico</b>. A obrigatoriedade não está no art. 60, § 4º.", 2],
        ["A emenda constitucional é promulgada pelas Mesas da Câmara dos Deputados e do Senado Federal.", true, "Art. 60, § 3º. Emenda não passa por sanção nem veto do Presidente.", 1],
        ["O Presidente da República pode vetar emenda constitucional aprovada pelo Congresso.", false, "Emenda não tem sanção nem veto: é promulgada pelas Mesas da Câmara e do Senado (art. 60, § 3º).", 1],
        ["A CF/88 é classificada como escrita, rígida e dogmática.", true, "Escrita (um documento), rígida (alteração mais difícil que a das leis) e dogmática (elaborada de uma vez por um órgão constituinte).", 1],
        ["O poder constituinte derivado reformador é exercido por meio de emendas à Constituição.", true, "Correto: o reformador altera a Constituição por emendas, respeitando os limites do art. 60.", 1],
      ],
      sets: [
        { ask: it => `“${it}” é cláusula pétrea expressa (art. 60, § 4º)?`,
          cats: {
            "Sim, é cláusula pétrea": ["A forma federativa de Estado", "O voto direto, secreto, universal e periódico", "A separação dos Poderes", "Os direitos e garantias individuais"],
            "Não é cláusula pétrea expressa": ["A forma republicana de governo", "O sistema presidencialista", "A obrigatoriedade do voto", "A capital federal em Brasília"],
          },
          why: "Art. 60, § 4º: não será objeto de deliberação a proposta de emenda tendente a abolir a <b>forma federativa de Estado</b>; o <b>voto direto, secreto, universal e periódico</b>; a <b>separação dos Poderes</b>; e os <b>direitos e garantias individuais</b>." },
      ],
      pairs: [
        { prompt: "Ligue cada poder constituinte à sua função:", why: "Originário cria; reformador emenda; decorrente organiza os Estados; revisor fez a revisão única prevista no ADCT.",
          pairs: [["Originário", "Cria uma nova Constituição"], ["Derivado reformador", "Altera a CF por emendas"], ["Derivado decorrente", "Elabora as Constituições estaduais"], ["Derivado revisor", "Revisão única do art. 3º do ADCT"]] },
        { prompt: "Ligue cada tipo de eficácia à sua descrição:", why: "Classificação de José Afonso da Silva.",
          pairs: [["Eficácia plena", "Efeitos integrais, sem restrição por lei"], ["Eficácia contida", "Efeitos imediatos, restringíveis por lei"], ["Eficácia limitada", "Depende de lei para produzir todos os efeitos"]] },
      ],
    },

    princ: {
      mc: [
        ["São fundamentos da República (art. 1º), EXCETO:", "Erradicar a pobreza e a marginalização", ["A soberania", "A dignidade da pessoa humana", "O pluralismo político"],
          "Erradicar a pobreza é <b>objetivo</b> (art. 3º). Dica: objetivos começam com verbo (construir, garantir, erradicar, promover). Fundamentos: <b>SO-CI-DI-VA-PLU</b> — soberania, cidadania, dignidade da pessoa humana, valores sociais do trabalho e da livre iniciativa, pluralismo político.", 1],
        ["Segundo o art. 2º, os Poderes da União são:", "Independentes e harmônicos entre si", ["Soberanos e subordinados entre si", "Independentes e hierarquizados", "Autônomos e subordinados ao Executivo"],
          "Art. 2º: Legislativo, Executivo e Judiciário, independentes e harmônicos entre si.", 1],
        ["A integração econômica, política, social e cultural dos povos da América Latina:", "Está prevista no parágrafo único do art. 4º", ["É fundamento da República (art. 1º)", "É objetivo fundamental (art. 3º)", "Não está prevista na Constituição"],
          "Art. 4º, parágrafo único: visa à formação de uma comunidade latino-americana de nações.", 2],
        ["Todo o poder emana do povo, que o exerce:", "Por meio de representantes eleitos ou diretamente", ["Exclusivamente por representantes eleitos", "Exclusivamente por plebiscito e referendo", "Por meio dos Poderes da União"],
          "Art. 1º, parágrafo único — democracia semidireta (representativa + participativa).", 1],
        ["A República Federativa do Brasil é formada pela união indissolúvel:", "Dos Estados, dos Municípios e do Distrito Federal", ["Dos Estados e do Distrito Federal, apenas", "Da União, dos Estados e dos Territórios", "Dos Estados e dos Municípios, admitida a secessão"],
          "Art. 1º, caput. Ser indissolúvel impede a secessão (separação de um ente).", 1],
        ["“Concessão de asilo político” é:", "Princípio das relações internacionais (art. 4º)", ["Fundamento da República (art. 1º)", "Objetivo fundamental (art. 3º)", "Direito social (art. 6º)"],
          "Art. 4º, X.", 2],
      ],
      ce: [
        ["Garantir o desenvolvimento nacional é fundamento da República Federativa do Brasil.", false, "É <b>objetivo</b> fundamental (art. 3º, II). Objetivos começam com verbos.", 1],
        ["A prevalência dos direitos humanos rege o Brasil em suas relações internacionais.", true, "Art. 4º, II.", 1],
        ["Os valores sociais do trabalho e da livre iniciativa são fundamentos da República.", true, "Art. 1º, IV.", 1],
        ["A não intervenção e a igualdade entre os Estados são objetivos fundamentais da República.", false, "São princípios das <b>relações internacionais</b> (art. 4º, IV e V).", 2],
        ["Constitui objetivo fundamental erradicar a pobreza e a marginalização e erradicar as desigualdades sociais e regionais.", false, "Pegadinha: a CF manda <b>erradicar</b> a pobreza e a marginalização, mas <b>reduzir</b> as desigualdades sociais e regionais (art. 3º, III).", 2],
      ],
      sets: [
        { ask: it => `“${it}” é, segundo a CF:`,
          cats: {
            "Fundamento (art. 1º)": ["A soberania", "A cidadania", "A dignidade da pessoa humana", "Os valores sociais do trabalho e da livre iniciativa", "O pluralismo político"],
            "Objetivo fundamental (art. 3º)": ["Construir uma sociedade livre, justa e solidária", "Garantir o desenvolvimento nacional", "Erradicar a pobreza e a marginalização", "Reduzir as desigualdades sociais e regionais", "Promover o bem de todos, sem preconceitos"],
            "Princípio das relações internacionais (art. 4º)": ["A independência nacional", "A prevalência dos direitos humanos", "A autodeterminação dos povos", "A não intervenção", "A defesa da paz", "O repúdio ao terrorismo e ao racismo", "A concessão de asilo político"],
          },
          why: "Fundamentos (art. 1º): SO-CI-DI-VA-PLU. Objetivos (art. 3º): começam com verbo — construir, garantir, erradicar/reduzir, promover. Relações internacionais (art. 4º): independência nacional, prevalência dos direitos humanos, autodeterminação, não intervenção, igualdade entre os Estados, defesa da paz, solução pacífica dos conflitos, repúdio ao terrorismo e ao racismo, cooperação entre os povos, asilo político." },
      ],
      pairs: [],
    },

    dir: {
      mc: [
        ["Segundo o caput do art. 5º, a inviolabilidade dos direitos à vida, à liberdade, à igualdade, à segurança e à propriedade é garantida:", "Aos brasileiros e aos estrangeiros residentes no País", ["Apenas aos brasileiros natos", "Apenas aos brasileiros natos e naturalizados", "Aos estrangeiros somente se naturalizados"],
          "Texto do art. 5º, caput. (O STF estende a proteção também a estrangeiros não residentes, mas a letra da lei fala em “residentes”.)", 1],
        ["Durante a NOITE, sem consentimento do morador, só se pode entrar na casa em caso de:", "Flagrante delito, desastre ou para prestar socorro", ["Determinação judicial", "Ordem da autoridade policial", "Nenhuma hipótese"],
          "Art. 5º, XI: flagrante, desastre e socorro valem a qualquer hora. A ordem judicial só pode ser cumprida <b>durante o dia</b>.", 2],
        ["O sigilo que pode ser quebrado por ordem judicial, para investigação criminal ou instrução processual penal (art. 5º, XII), é o das:", "Comunicações telefônicas", ["Correspondências", "Comunicações telegráficas", "Opiniões políticas"],
          "Art. 5º, XII: “salvo, <b>no último caso</b>” — o último da lista são as comunicações telefônicas.", 3],
        ["Para exercer o direito de reunião (art. 5º, XVI), exige-se:", "Apenas prévio aviso à autoridade competente", ["Prévia autorização da autoridade", "Autorização judicial", "Nada, nem aviso nem autorização"],
          "Art. 5º, XVI: reunião pacífica, sem armas, em local aberto ao público, independentemente de autorização — só se exige prévio <b>aviso</b>.", 1],
        ["As associações só podem ser compulsoriamente DISSOLVIDAS por:", "Decisão judicial transitada em julgado", ["Decisão administrativa", "Decisão judicial, ainda que provisória", "Lei específica"],
          "Art. 5º, XIX: para <b>suspender</b> atividades basta decisão judicial; para <b>dissolver</b>, exige-se o trânsito em julgado.", 2],
        ["Segundo a CF, é crime inafiançável e IMPRESCRITÍVEL:", "A prática do racismo", ["A tortura", "O tráfico ilícito de entorpecentes", "O terrorismo"],
          "Imprescritíveis: racismo e ação de grupos armados contra a ordem constitucional (XLII e XLIV). Tortura, tráfico, terrorismo e hediondos (“3TH”) são inafiançáveis e insuscetíveis de graça ou anistia, mas prescrevem.", 2],
        ["A pena de morte, no Brasil:", "É proibida, salvo em caso de guerra declarada", ["É proibida em qualquer hipótese", "É admitida para crimes hediondos", "É admitida durante o estado de sítio"],
          "Art. 5º, XLVII, a.", 1],
        ["O brasileiro NATO:", "Nunca será extraditado", ["Pode ser extraditado por tráfico de drogas", "Pode ser extraditado por crime comum anterior à naturalização", "Pode ser extraditado se houver tratado"],
          "Art. 5º, LI: nenhum brasileiro será extraditado, salvo o <b>naturalizado</b> (crime comum antes da naturalização ou tráfico de drogas).", 2],
        ["Segundo a Súmula Vinculante 25 do STF, a prisão civil por dívida:", "Só é admitida para o devedor de alimentos (inadimplemento voluntário e inescusável)", ["É admitida para o depositário infiel e para o devedor de alimentos", "É admitida para qualquer dívida reconhecida em juízo", "Não é admitida em nenhum caso"],
          "O texto do art. 5º, LXVII ainda menciona o depositário infiel, mas a SV 25 declarou essa prisão ilícita.", 3],
        ["Tratados de direitos humanos aprovados em cada Casa, em dois turnos, por três quintos dos votos, equivalem a:", "Emendas constitucionais", ["Leis ordinárias", "Leis complementares", "Normas supralegais"],
          "Art. 5º, § 3º. Os aprovados sem esse rito têm status supralegal, segundo o STF.", 2],
      ],
      ce: [
        ["Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei.", true, "Art. 5º, II — princípio da legalidade.", 1],
        ["É livre a manifestação do pensamento, sendo permitido o anonimato.", false, "Art. 5º, IV: é <b>vedado</b> o anonimato.", 1],
        ["A criação de associações depende de autorização do poder público.", false, "Art. 5º, XVIII: independe de autorização, sendo vedada a interferência estatal.", 1],
        ["A lei não prejudicará o direito adquirido, o ato jurídico perfeito e a coisa julgada.", true, "Art. 5º, XXXVI.", 1],
        ["Ninguém será considerado culpado até o trânsito em julgado de sentença penal condenatória.", true, "Art. 5º, LVII — presunção de inocência.", 1],
        ["As normas definidoras dos direitos e garantias fundamentais dependem de lei para ter aplicação.", false, "Art. 5º, § 1º: têm aplicação <b>imediata</b>.", 2],
        ["A pena de banimento é admitida em caso de guerra declarada.", false, "Só a pena de <b>morte</b> tem a exceção da guerra declarada. Banimento é sempre proibido (art. 5º, XLVII).", 2],
      ],
      sets: [
        { ask: it => `Segundo a CF, o crime de ${it} é:`,
          cats: {
            "Inafiançável e imprescritível": ["racismo", "ação de grupos armados contra a ordem constitucional e o Estado Democrático"],
            "Inafiançável e insuscetível de graça ou anistia": ["tortura", "tráfico ilícito de entorpecentes", "terrorismo", "crime hediondo"],
          },
          why: "Imprescritíveis (art. 5º, XLII e XLIV): <b>racismo</b> e <b>ação de grupos armados</b>. Insuscetíveis de graça ou anistia (XLIII): <b>tortura, tráfico, terrorismo e hediondos</b> — o “3TH”." },
        { ask: it => `A pena ${it} é:`,
          cats: {
            "Proibida pela CF (art. 5º, XLVII)": ["de morte, fora de guerra declarada", "de caráter perpétuo", "de trabalhos forçados", "de banimento", "cruel"],
            "Admitida pela CF (art. 5º, XLVI)": ["de privação ou restrição da liberdade", "de perda de bens", "de multa", "de prestação social alternativa", "de suspensão ou interdição de direitos"],
          },
          why: "Proibidas: morte (salvo guerra declarada), perpétua, trabalhos forçados, banimento e cruéis. Admitidas (XLVI): privação ou restrição da liberdade, perda de bens, multa, prestação social alternativa, suspensão ou interdição de direitos." },
      ],
      pairs: [],
    },

    rem: {
      mc: [
        ["São gratuitas, por determinação expressa da CF, as ações de:", "Habeas corpus e habeas data", ["Mandado de segurança e habeas corpus", "Ação popular e mandado de injunção", "Todas as ações constitucionais"],
          "Art. 5º, LXXVII. Na ação popular o autor é isento de custas e sucumbência, salvo má-fé (LXXIII) — regra parecida, mas em outro inciso.", 2],
        ["Tem legitimidade para propor ação popular:", "Qualquer cidadão", ["Qualquer pessoa, inclusive estrangeiros", "Exclusivamente o Ministério Público", "Partidos políticos com representação no Congresso"],
          "Art. 5º, LXXIII. Cidadão = eleitor (prova-se com o título de eleitor).", 1],
        ["O mandado de segurança coletivo pode ser impetrado por associação em funcionamento há pelo menos:", "Um ano", ["Seis meses", "Dois anos", "Três anos"],
          "Art. 5º, LXX, b.", 2],
        ["Pode impetrar mandado de segurança coletivo o partido político:", "Com representação no Congresso Nacional", ["Com registro no TSE, apenas", "Com pelo menos cinco anos de existência", "Que tenha eleito o Presidente da República"],
          "Art. 5º, LXX, a.", 2],
      ],
      ce: [
        ["O mandado de segurança protege direito líquido e certo amparado por habeas corpus.", false, "MS protege direito líquido e certo <b>não</b> amparado por HC ou HD (é residual) — art. 5º, LXIX.", 1],
        ["O habeas corpus pode ser preventivo, quando alguém se achar ameaçado de sofrer coação em sua liberdade de locomoção.", true, "Art. 5º, LXVIII: “sofrer ou se achar ameaçado de sofrer”.", 1],
        ["O autor da ação popular, salvo comprovada má-fé, fica isento de custas judiciais e do ônus da sucumbência.", true, "Art. 5º, LXXIII.", 1],
        ["O habeas data serve para obter informações de terceiros constantes de bancos de dados públicos.", false, "Serve para informações relativas à pessoa <b>do impetrante</b> (art. 5º, LXXII, a).", 2],
      ],
      sets: [
        { ask: it => `Situação: ${it} Qual é o remédio constitucional adequado?`,
          cats: {
            "Habeas corpus": ["João está preso sem flagrante e sem ordem judicial.", "Carlos está ameaçado de prisão ilegal por ordem de um delegado."],
            "Habeas data": ["Maria quer saber que informações sobre ela constam em um banco de dados do governo.", "Pedro quer corrigir um dado errado sobre ele em um cadastro público."],
            "Mandado de segurança": ["Uma autoridade negou ilegalmente a Ana um direito comprovado por documentos.", "Um servidor teve a posse negada ilegalmente, apesar de aprovado e com toda a documentação."],
            "Mandado de injunção": ["Um direito previsto na CF não pode ser exercido porque nunca foi editada a lei que o regulamenta."],
            "Ação popular": ["Um cidadão quer anular um contrato da prefeitura lesivo ao patrimônio público.", "Um eleitor quer anular um ato que causou dano ao meio ambiente."],
          },
          why: "HC: liberdade de locomoção. HD: conhecer ou retificar dados <b>da própria pessoa</b>. MS: direito líquido e certo não amparado por HC/HD. MI: falta de norma regulamentadora. Ação popular: cidadão anula ato lesivo ao patrimônio público, à moralidade, ao meio ambiente ou ao patrimônio histórico e cultural." },
      ],
      pairs: [
        { prompt: "Ligue cada remédio constitucional à sua finalidade:", why: "Art. 5º, LXVIII a LXXIII.",
          pairs: [["Habeas corpus", "Liberdade de locomoção"], ["Habeas data", "Informações sobre o próprio impetrante"], ["Mandado de segurança", "Direito líquido e certo"], ["Mandado de injunção", "Falta de norma regulamentadora"], ["Ação popular", "Anular ato lesivo ao patrimônio público"]] },
      ],
    },

    soc: {
      mc: [
        ["NÃO é direito social expresso no art. 6º:", "A propriedade", ["O transporte", "O lazer", "A moradia"],
          "Art. 6º: educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância e assistência aos desamparados. A propriedade é direito individual (art. 5º).", 1],
        ["A duração do trabalho normal não pode ser superior a:", "8 horas diárias e 44 semanais", ["8 horas diárias e 40 semanais", "10 horas diárias e 44 semanais", "6 horas diárias e 36 semanais"],
          "Art. 7º, XIII.", 1],
        ["As férias anuais são remuneradas com, pelo menos:", "Um terço a mais do que o salário normal", ["Metade a mais", "Um quarto a mais", "O dobro do salário"],
          "Art. 7º, XVII.", 1],
        ["A licença à gestante prevista no art. 7º tem duração de:", "120 dias", ["90 dias", "180 dias", "150 dias"],
          "Art. 7º, XVIII: cento e vinte dias, sem prejuízo do emprego e do salário.", 1],
        ["A hora extra deve ser remunerada em valor superior ao da hora normal em, no mínimo:", "50%", ["25%", "30%", "100%"],
          "Art. 7º, XVI.", 1],
        ["Quanto ao trabalho do menor, a CF:", "Proíbe qualquer trabalho a menores de 16 anos, salvo como aprendiz a partir de 14", ["Proíbe qualquer trabalho a menores de 14 anos, salvo como aprendiz a partir de 12", "Permite trabalho noturno a partir dos 16 anos", "Proíbe qualquer trabalho a menores de 18 anos"],
          "Art. 7º, XXXIII: trabalho noturno, perigoso ou insalubre é proibido a menores de 18; qualquer trabalho, a menores de 16, salvo aprendiz a partir de 14.", 2],
        ["O prazo prescricional para cobrar créditos trabalhistas é de:", "5 anos, até o limite de 2 anos após a extinção do contrato", ["2 anos, até o limite de 5 anos após a extinção do contrato", "5 anos, sem limite após a extinção", "3 anos, até o limite de 1 ano após a extinção"],
          "Art. 7º, XXIX.", 2],
        ["Para turnos ininterruptos de revezamento, a CF prevê jornada de:", "6 horas, salvo negociação coletiva", ["8 horas, salvo negociação coletiva", "4 horas", "12 horas, com 36 de descanso"],
          "Art. 7º, XIV.", 3],
      ],
      ce: [
        ["O transporte é direito social expresso na Constituição.", true, "Incluído no art. 6º pela EC 90/2015.", 2],
        ["Ninguém será obrigado a filiar-se ou a manter-se filiado a sindicato.", true, "Art. 8º, V.", 1],
        ["Compete aos trabalhadores decidir sobre a oportunidade de exercer o direito de greve e sobre os interesses que devam por meio dele defender.", true, "Art. 9º, caput.", 2],
        ["A licença à gestante prevista na CF é de 180 dias.", false, "A CF prevê <b>120 dias</b> (art. 7º, XVIII). A prorrogação para 180 dias vem de lei (Empresa Cidadã), não do texto constitucional.", 2],
      ],
      sets: [
        { ask: it => `“${it}” é direito social listado no art. 6º?`,
          cats: {
            "Sim, está no art. 6º": ["A educação", "A saúde", "A alimentação", "O trabalho", "A moradia", "O transporte", "O lazer", "A segurança", "A previdência social", "A proteção à maternidade e à infância", "A assistência aos desamparados"],
            "Não está no art. 6º": ["A propriedade", "A liberdade de crença", "A inviolabilidade do domicílio", "A livre manifestação do pensamento"],
          },
          why: "Art. 6º: educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância e assistência aos desamparados. Propriedade, crença, domicílio e manifestação do pensamento são direitos individuais (art. 5º)." },
      ],
      pairs: [
        { prompt: "Ligue cada direito trabalhista ao que a CF garante:", why: "Art. 7º, XIII, XVI, XVII e XVIII.",
          pairs: [["Jornada normal", "8 h diárias e 44 semanais"], ["Hora extra", "No mínimo 50% a mais"], ["Férias", "Com 1/3 a mais"], ["Licença à gestante", "120 dias"]] },
      ],
    },

    nac: {
      mc: [
        ["É brasileiro nato:", "O nascido no Brasil, de pais estrangeiros que não estejam a serviço de seu país", ["O estrangeiro residente no Brasil há mais de 15 anos, sem condenação penal", "O nascido no Brasil, de pais estrangeiros a serviço de seu país", "O português com residência permanente no Brasil"],
          "Art. 12, I, a (critério do solo). Se os pais estrangeiros estão a serviço do país deles, o filho não é brasileiro nato.", 1],
        ["Para os originários de países de língua portuguesa, a naturalização ordinária exige apenas:", "Residência por um ano ininterrupto e idoneidade moral", ["Residência por quinze anos e ausência de condenação penal", "Residência por quatro anos e domínio da língua", "Casamento com brasileiro"],
          "Art. 12, II, a.", 2],
        ["A naturalização extraordinária (art. 12, II, b) exige residência no Brasil há mais de:", "15 anos ininterruptos, sem condenação penal", ["10 anos ininterruptos", "1 ano ininterrupto e idoneidade moral", "5 anos, com domínio da língua portuguesa"],
          "Art. 12, II, b: e desde que o estrangeiro requeira a nacionalidade.", 2],
        ["É cargo privativo de brasileiro nato:", "Ministro de Estado da Defesa", ["Ministro da Justiça", "Senador da República", "Ministro do Superior Tribunal de Justiça"],
          "Art. 12, § 3º — <b>MP3.COM</b>: Ministro do STF, Presidente e Vice, Presidente da Câmara e do Senado, Carreira diplomática, Oficial das Forças Armadas, Ministro da Defesa.", 1],
        ["A lei pode estabelecer distinção entre brasileiros natos e naturalizados?", "Não, salvo nos casos previstos na própria Constituição", ["Sim, livremente", "Sim, desde que por lei complementar", "Não, em nenhuma hipótese"],
          "Art. 12, § 2º.", 2],
        ["São símbolos da República Federativa do Brasil:", "A bandeira, o hino, as armas e o selo nacionais", ["A bandeira, o hino e o brasão", "A bandeira, o hino, as armas e a língua portuguesa", "A bandeira e o hino, apenas"],
          "Art. 13, § 1º. A língua portuguesa é o <b>idioma oficial</b> (art. 13, caput), não símbolo.", 2],
        ["O filho de mãe brasileira, nascido no exterior e registrado em repartição brasileira competente, é:", "Brasileiro nato", ["Brasileiro naturalizado", "Estrangeiro, até optar pela nacionalidade", "Naturalizado, se vier a residir no Brasil"],
          "Art. 12, I, c (primeira parte): o registro em repartição brasileira competente já basta.", 2],
      ],
      ce: [
        ["O brasileiro naturalizado pode ser eleito Senador e presidir o Senado Federal.", false, "Pode ser Senador, mas <b>Presidente do Senado</b> é cargo privativo de nato (art. 12, § 3º, III).", 2],
        ["Aos portugueses com residência permanente no País, havendo reciprocidade, são atribuídos os direitos inerentes ao brasileiro, salvo os casos previstos na CF.", true, "Art. 12, § 1º.", 2],
        ["Os nascidos no estrangeiro de pai brasileiro a serviço da República Federativa do Brasil são brasileiros natos.", true, "Art. 12, I, b.", 1],
        ["A língua portuguesa é um dos símbolos da República.", false, "É o <b>idioma oficial</b> (art. 13, caput). Símbolos: bandeira, hino, armas e selo (§ 1º).", 1],
        ["Pela redação dada pela EC 131/2023, perde a nacionalidade o brasileiro que fizer pedido expresso de perda perante autoridade brasileira competente, ressalvadas situações que acarretem apatridia.", true, "Art. 12, § 4º, II (EC 131/2023). A simples aquisição de outra nacionalidade deixou de causar a perda.", 3],
      ],
      sets: [
        { ask: it => `O cargo de ${it}:`,
          cats: {
            "É privativo de brasileiro nato": ["Presidente da República", "Vice-Presidente da República", "Presidente da Câmara dos Deputados", "Presidente do Senado Federal", "Ministro do STF", "diplomata de carreira", "oficial das Forças Armadas", "Ministro de Estado da Defesa"],
            "Pode ser ocupado por naturalizado": ["Senador", "Deputado Federal", "Governador de Estado", "Ministro do STJ", "Ministro da Justiça", "Prefeito", "Procurador-Geral da República"],
          },
          why: "Art. 12, § 3º — <b>MP3.COM</b>: <b>M</b>inistro do STF; <b>P</b>residente e Vice-Presidente da República, <b>P</b>residente da Câmara, <b>P</b>residente do Senado; <b>C</b>arreira diplomática; <b>O</b>ficial das Forças Armadas; <b>M</b>inistro da Defesa." },
        { ask: it => `Situação: ${it} Essa pessoa é:`,
          cats: {
            "Brasileiro nato": ["Nasceu no Brasil, filha de turistas argentinos.", "Nasceu na França, filha de mãe brasileira a serviço do Brasil.", "Nasceu na Itália, filho de pai brasileiro, e foi registrado no consulado brasileiro.", "Nasceu no Japão, filha de mãe brasileira, veio morar no Brasil e optou, após a maioridade, pela nacionalidade brasileira."],
            "Brasileiro naturalizado": ["Angolano que mora no Brasil há um ano ininterrupto, com idoneidade moral, e obteve a nacionalidade na forma da lei.", "Alemão residente no Brasil há mais de 15 anos ininterruptos, sem condenação penal, que requereu a nacionalidade."],
            "Não é brasileiro": ["Nasceu no Brasil, filho de diplomatas franceses a serviço da França."],
          },
          why: "Natos (art. 12, I): nascidos no Brasil (salvo pais estrangeiros a serviço de seu país); nascidos no exterior de pai ou mãe brasileiro a serviço do Brasil; nascidos no exterior de pai ou mãe brasileiro registrados em repartição competente ou que venham residir no Brasil e optem pela nacionalidade. Naturalizados (II): ordinária (língua portuguesa: 1 ano + idoneidade) e extraordinária (15 anos + sem condenação + requerimento)." },
      ],
      pairs: [],
    },

    pol: {
      mc: [
        ["O alistamento eleitoral e o voto são FACULTATIVOS para:", "Os analfabetos, os maiores de 70 anos e os maiores de 16 e menores de 18 anos", ["Os analfabetos, os maiores de 65 anos e os menores de 18 anos", "Os maiores de 70 anos e os conscritos", "Os estrangeiros e os analfabetos"],
          "Art. 14, § 1º, II.", 1],
        ["NÃO podem alistar-se como eleitores:", "Os estrangeiros e, durante o serviço militar obrigatório, os conscritos", ["Os analfabetos e os maiores de 70 anos", "Os militares de carreira", "Os presos provisórios"],
          "Art. 14, § 2º.", 1],
        ["A idade mínima para concorrer a Governador é de:", "30 anos", ["35 anos", "21 anos", "25 anos"],
          "Art. 14, § 3º, VI, b.", 1],
        ["São inelegíveis:", "Os inalistáveis e os analfabetos", ["Os maiores de 70 anos", "Os menores de 21 anos", "Os brasileiros naturalizados"],
          "Art. 14, § 4º. O analfabeto pode votar (facultativo), mas não pode ser votado.", 2],
        ["Para concorrer a outros cargos, o Presidente, os Governadores e os Prefeitos devem renunciar aos mandatos até:", "Seis meses antes do pleito", ["Três meses antes do pleito", "Um ano antes do pleito", "Quatro meses antes do pleito"],
          "Art. 14, § 6º (desincompatibilização).", 2],
        ["A lei que alterar o processo eleitoral:", "Entra em vigor na publicação, mas não se aplica à eleição que ocorra até um ano da sua vigência", ["Só entra em vigor um ano após a publicação", "Aplica-se imediatamente a todas as eleições", "Só pode ser aprovada em ano não eleitoral"],
          "Art. 16 — princípio da anterioridade eleitoral.", 2],
        ["É hipótese de perda ou suspensão dos direitos políticos (art. 15):", "Condenação criminal transitada em julgado, enquanto durarem seus efeitos", ["Cassação por ato do Presidente da República", "Condenação criminal em primeira instância", "Não comparecimento a duas eleições seguidas"],
          "É vedada a cassação. Casos do art. 15: cancelamento da naturalização por sentença transitada em julgado; incapacidade civil absoluta; condenação criminal transitada em julgado; recusa de cumprir obrigação a todos imposta; improbidade administrativa.", 2],
        ["A soberania popular é exercida pelo sufrágio universal e pelo voto direto e secreto e, nos termos da lei, mediante:", "Plebiscito, referendo e iniciativa popular", ["Plebiscito, referendo e ação popular", "Eleição, referendo e veto popular", "Plebiscito, recall e iniciativa popular"],
          "Art. 14, caput.", 1],
      ],
      ce: [
        ["É vedada a cassação de direitos políticos.", true, "Art. 15, caput: só há perda ou suspensão, nos casos listados.", 1],
        ["O analfabeto pode votar, mas é inelegível.", true, "Voto facultativo (art. 14, § 1º, II, a) e inelegível (§ 4º).", 1],
        ["A idade mínima para Senador é de 30 anos.", false, "Senador: <b>35 anos</b> (igual a Presidente e Vice). 30 anos é para Governador e Vice-Governador.", 1],
        ["A filiação partidária é condição de elegibilidade.", true, "Art. 14, § 3º, V.", 1],
      ],
      sets: [
        { ask: it => `A idade mínima para ${it} é:`,
          cats: {
            "35 anos": ["Presidente da República", "Vice-Presidente da República", "Senador"],
            "30 anos": ["Governador", "Vice-Governador"],
            "21 anos": ["Deputado Federal", "Deputado Estadual", "Prefeito", "Vice-Prefeito", "juiz de paz"],
            "18 anos": ["Vereador"],
          },
          why: "Art. 14, § 3º, VI: 35 (Presidente, Vice e Senador), 30 (Governador e Vice), 21 (Deputados, Prefeito, Vice-Prefeito e juiz de paz), 18 (Vereador)." },
        { ask: it => `Para ${it}, o alistamento e o voto são:`,
          cats: {
            "Obrigatórios": ["um brasileiro alfabetizado de 30 anos", "uma brasileira alfabetizada de 69 anos", "um brasileiro naturalizado alfabetizado de 40 anos"],
            "Facultativos": ["um jovem de 16 anos", "uma jovem de 17 anos", "um idoso de 72 anos", "um adulto analfabeto de 35 anos"],
            "Vedados (inalistável)": ["um estrangeiro residente no Brasil", "um conscrito durante o serviço militar obrigatório"],
          },
          why: "Art. 14, §§ 1º e 2º: obrigatórios para maiores de 18; facultativos para analfabetos, maiores de 70 e de 16 a 18 anos; não se alistam estrangeiros e conscritos (durante o serviço militar obrigatório)." },
      ],
      pairs: [],
    },

    org: {
      mc: [
        ["A organização político-administrativa da República compreende:", "União, Estados, Distrito Federal e Municípios, todos autônomos", ["União, Estados e Municípios, sendo a União soberana", "União, Estados, DF, Municípios e Territórios, todos autônomos", "Estados e Municípios, subordinados à União"],
          "Art. 18. Territórios integram a União e não são entes autônomos. Soberania é da República (art. 1º, I), não da União.", 2],
        ["Segundo o art. 18, § 1º, a Capital Federal é:", "Brasília", ["O Distrito Federal", "O Rio de Janeiro", "A cidade definida em lei complementar"],
          "Pegadinha clássica: a capital é <b>Brasília</b>, não “o Distrito Federal”.", 1],
        ["Compete PRIVATIVAMENTE à União legislar sobre:", "Direito penal", ["Direito tributário", "Direito urbanístico", "Direito financeiro"],
          "Art. 22, I — <b>CAPACETE de PM</b>: Civil, Agrário, Penal, Aeronáutico, Comercial, Eleitoral, Trabalho, Espacial, Processual, Marítimo. Tributário, financeiro, penitenciário, econômico e urbanístico (<b>PUFETO</b>) são concorrentes (art. 24, I).", 1],
        ["Na legislação concorrente, a competência da União limita-se a:", "Estabelecer normas gerais", ["Legislar sobre tudo, cabendo aos Estados executar", "Suplementar a legislação estadual", "Nada, pois a competência é só dos Estados"],
          "Art. 24, § 1º.", 1],
        ["Na competência concorrente, a superveniência de lei federal sobre normas gerais:", "Suspende a eficácia da lei estadual, no que lhe for contrário", ["Revoga a lei estadual", "Não afeta a lei estadual", "Torna a lei estadual nula desde a origem"],
          "Art. 24, § 4º: <b>suspende</b> (não revoga!).", 3],
        ["A competência privativa da União (art. 22) pode ser delegada aos Estados por:", "Lei complementar, sobre questões específicas", ["Lei ordinária, sobre qualquer questão", "Emenda constitucional", "Decreto do Presidente da República"],
          "Art. 22, parágrafo único.", 2],
        ["É vedado à União, aos Estados, ao DF e aos Municípios:", "Recusar fé aos documentos públicos", ["Colaborar com cultos religiosos em caso de interesse público", "Firmar convênios entre si", "Criar Municípios"],
          "Art. 19: estabelecer cultos ou igrejas ou manter com eles dependência ou aliança (ressalvada a colaboração de interesse público); recusar fé aos documentos públicos; criar distinções entre brasileiros ou preferências entre si.", 2],
      ],
      ce: [
        ["Os Municípios estão incluídos na competência legislativa concorrente do art. 24.", false, "O art. 24 fala em União, Estados e Distrito Federal. Os Municípios suplementam a legislação federal e estadual no que couber (art. 30, II).", 2],
        ["Inexistindo lei federal sobre normas gerais, os Estados exercerão a competência legislativa plena, para atender a suas peculiaridades.", true, "Art. 24, § 3º.", 2],
        ["Os Territórios Federais são entes federativos dotados de autonomia.", false, "Os Territórios <b>integram a União</b> (art. 18, § 2º) e não são entes autônomos.", 2],
        ["A soberania é atributo da República Federativa do Brasil; União, Estados, DF e Municípios são autônomos.", true, "Art. 1º, I (soberania como fundamento da República) e art. 18 (entes autônomos).", 2],
      ],
      sets: [
        { ask: it => `Legislar sobre ${it} é competência:`,
          cats: {
            "Privativa da União (art. 22)": ["direito civil", "direito penal", "direito processual", "direito eleitoral", "direito do trabalho", "direito comercial", "direito agrário", "trânsito e transporte", "águas e energia", "nacionalidade, cidadania e naturalização", "diretrizes e bases da educação nacional"],
            "Concorrente: União, Estados e DF (art. 24)": ["direito tributário", "direito financeiro", "direito penitenciário", "direito econômico", "direito urbanístico", "orçamento", "procedimentos em matéria processual", "proteção à infância e à juventude", "previdência social e defesa da saúde", "educação, cultura, ensino e desporto"],
          },
          why: "Privativa (art. 22, I): <b>CAPACETE de PM</b> — Civil, Agrário, Penal, Aeronáutico, Comercial, Eleitoral, Trabalho, Espacial, Processual, Marítimo (e outros incisos, como trânsito, águas, energia, nacionalidade, diretrizes e bases da educação). Concorrente (art. 24): <b>PUFETO</b> — Penitenciário, Urbanístico, Financeiro, Econômico, Tributário — além de orçamento, procedimentos processuais, educação, saúde, infância e juventude. Atenção: “direito processual” é privativo, mas “procedimentos em matéria processual” é concorrente!" },
      ],
      pairs: [],
    },

    adm: {
      mc: [
        ["São princípios expressos no caput do art. 37:", "Legalidade, impessoalidade, moralidade, publicidade e eficiência", ["Legalidade, imparcialidade, moralidade, publicidade e economicidade", "Legalidade, razoabilidade, moralidade, proporcionalidade e eficiência", "Lealdade, impessoalidade, motivação, publicidade e eficiência"],
          "<b>LIMPE</b>. A eficiência foi incluída pela EC 19/1998.", 1],
        ["O prazo de validade do concurso público é de:", "Até 2 anos, prorrogável uma vez, por igual período", ["2 anos, prorrogável uma vez por até 1 ano", "Até 4 anos, improrrogável", "Até 2 anos, prorrogável indefinidamente"],
          "Art. 37, III.", 1],
        ["As funções de confiança são exercidas:", "Exclusivamente por servidores ocupantes de cargo efetivo", ["Por qualquer pessoa, de livre nomeação", "Preferencialmente por servidores de carreira", "Apenas por servidores estáveis"],
          "Art. 37, V. Já os cargos em comissão podem ter pessoas de fora, respeitado o percentual mínimo de servidores de carreira previsto em lei.", 2],
        ["NÃO é permitida a acumulação remunerada de:", "Dois cargos técnicos", ["Dois cargos de professor", "Um cargo de professor com outro técnico ou científico", "Dois cargos privativos de profissionais de saúde, com profissões regulamentadas"],
          "Art. 37, XVI: só as três hipóteses, e com compatibilidade de horários.", 2],
        ["O servidor nomeado por concurso para cargo efetivo adquire estabilidade após:", "3 anos de efetivo exercício", ["2 anos de efetivo exercício", "3 anos da posse, independentemente do exercício", "5 anos de efetivo exercício"],
          "Art. 41, caput. E é obrigatória a avaliação especial de desempenho (§ 4º).", 1],
        ["O servidor estável perderá o cargo, entre outras hipóteses, mediante:", "Processo administrativo em que lhe seja assegurada ampla defesa", ["Decisão discricionária do chefe do Poder", "Sentença judicial de primeira instância", "Avaliação de desempenho sem direito de defesa"],
          "Art. 41, § 1º: sentença judicial transitada em julgado; processo administrativo com ampla defesa; avaliação periódica de desempenho (lei complementar), com ampla defesa.", 2],
        ["Os atos de improbidade administrativa importarão (art. 37, § 4º):", "Suspensão dos direitos políticos, perda da função pública, indisponibilidade dos bens e ressarcimento ao erário", ["Cassação dos direitos políticos, perda da função e multa", "Perda dos direitos políticos e prisão", "Apenas ressarcimento ao erário"],
          "Mnemônico <b>SuPer InRe</b>: Suspensão dos direitos políticos, Perda da função, Indisponibilidade dos bens, Ressarcimento — sem prejuízo da ação penal.", 2],
        ["A responsabilidade das pessoas jurídicas de direito público pelos danos que seus agentes causarem a terceiros é:", "Objetiva, com direito de regresso contra o agente nos casos de dolo ou culpa", ["Subjetiva, dependendo de prova de culpa do Estado", "Objetiva, sem direito de regresso", "Inexistente se o agente agiu sem dolo"],
          "Art. 37, § 6º. Vale também para as pessoas de direito privado prestadoras de serviço público.", 2],
      ],
      ce: [
        ["A investidura em cargo em comissão declarado em lei de livre nomeação e exoneração depende de concurso público.", false, "Art. 37, II: os cargos em comissão são justamente a ressalva — não exigem concurso.", 1],
        ["Os cargos, empregos e funções públicas são acessíveis aos brasileiros e aos estrangeiros, na forma da lei.", true, "Art. 37, I.", 1],
        ["O direito de greve do servidor público será exercido nos termos e limites definidos em lei complementar.", false, "Art. 37, VII: lei <b>específica</b> (desde a EC 19/1998).", 3],
        ["É garantido ao servidor público civil o direito à livre associação sindical.", true, "Art. 37, VI.", 1],
      ],
      sets: [
        { ask: it => `O princípio da ${it} está EXPRESSO no caput do art. 37?`,
          cats: {
            "Sim, é expresso no art. 37": ["legalidade", "impessoalidade", "moralidade", "publicidade", "eficiência"],
            "Não está no caput do art. 37": ["razoabilidade", "proporcionalidade", "supremacia do interesse público", "autotutela", "motivação", "segurança jurídica"],
          },
          why: "Expressos no caput do art. 37: <b>LIMPE</b> — Legalidade, Impessoalidade, Moralidade, Publicidade, Eficiência. Os demais são princípios implícitos ou previstos em leis (ex.: Lei 9.784/99)." },
      ],
      pairs: [],
    },
  };

  /* ════════════════════════════════════════════════════════════
     LEI SECA — texto literal da CF/88 (artigos mais cobrados)
     L(dispositivo, assunto, pergunta do flashcard, texto)
  ════════════════════════════════════════════════════════════ */
  const LAW_BLOCKS = [
    { id: "princ", label: "Princípios fundamentais", ref: "Arts. 1º a 4º", items: [
      L("Art. 1º, caput", "Formação e natureza da República", "Como é formada a República e em que ela se constitui?",
        "A República Federativa do Brasil, formada pela [[união indissolúvel|união voluntária|associação soberana]] dos Estados e Municípios e do Distrito Federal, constitui-se em [[Estado Democrático de Direito|Estado Social de Direito|Estado Liberal de Direito]] e tem como fundamentos:"),
      L("Art. 1º, I a V", "Fundamentos da República", "Quais são os cinco fundamentos da República?",
        "I - a [[soberania|independência nacional|autodeterminação dos povos]]; II - a cidadania; III - a [[dignidade da pessoa humana|igualdade entre os Estados|prevalência dos direitos humanos]]; IV - os valores sociais do trabalho e da [[livre iniciativa|livre concorrência|propriedade privada]]; V - o [[pluralismo político|pluripartidarismo|pluralismo religioso]]."),
      L("Art. 1º, parágrafo único", "Titularidade e exercício do poder", "De quem emana o poder e como ele é exercido?",
        "Todo o poder emana do [[povo|Estado|Congresso Nacional]], que o exerce por meio de representantes eleitos ou [[diretamente|por delegação|pelos partidos políticos]], nos termos desta Constituição."),
      L("Art. 2º", "Separação dos Poderes", "Quais são os Poderes da União e como se relacionam?",
        "São Poderes da União, [[independentes e harmônicos|soberanos e harmônicos|independentes e subordinados]] entre si, o Legislativo, o Executivo e o Judiciário."),
      L("Art. 3º", "Objetivos fundamentais", "Quais são os objetivos fundamentais da República?",
        "Constituem objetivos fundamentais da República Federativa do Brasil: I - construir uma sociedade livre, justa e [[solidária|igualitária|fraterna]]; II - garantir o [[desenvolvimento nacional|pleno emprego|crescimento econômico]]; III - erradicar a pobreza e a marginalização e [[reduzir|erradicar|eliminar]] as desigualdades sociais e regionais; IV - promover o bem de todos, sem preconceitos de origem, raça, sexo, cor, idade e quaisquer outras formas de discriminação."),
      L("Art. 4º, I a X", "Princípios das relações internacionais", "Quais princípios regem o Brasil nas relações internacionais?",
        "A República Federativa do Brasil rege-se nas suas relações internacionais pelos seguintes princípios: I - independência nacional; II - prevalência dos [[direitos humanos|interesses nacionais|tratados internacionais]]; III - autodeterminação dos povos; IV - não-intervenção; V - igualdade entre os Estados; VI - defesa da paz; VII - solução pacífica dos conflitos; VIII - repúdio ao [[terrorismo e ao racismo|terrorismo e à tortura|racismo e à guerra]]; IX - cooperação entre os povos para o progresso da humanidade; X - concessão de [[asilo político|refúgio humanitário|extradição]]."),
      L("Art. 4º, parágrafo único", "Integração latino-americana", "O que o Brasil buscará em relação aos povos da América Latina?",
        "A República Federativa do Brasil buscará a integração econômica, política, social e cultural dos povos da [[América Latina|América do Sul|América]], visando à formação de uma [[comunidade latino-americana de nações|federação sul-americana|união aduaneira continental]]."),
    ] },
    { id: "art5", label: "Direitos e deveres individuais", ref: "Art. 5º (seleção)", items: [
      L("Art. 5º, caput", "Igualdade e direitos invioláveis", "Quem é protegido pelo caput do art. 5º e quais direitos são invioláveis?",
        "Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos [[estrangeiros residentes no País|estrangeiros naturalizados|estrangeiros com visto permanente]] a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à [[propriedade|moradia|dignidade]], nos termos seguintes:"),
      L("Art. 5º, II", "Princípio da legalidade", "O que diz o princípio da legalidade?",
        "ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de [[lei|decisão judicial|ato administrativo]];"),
      L("Art. 5º, IV", "Manifestação do pensamento", "Como a CF trata a manifestação do pensamento?",
        "é livre a manifestação do pensamento, sendo [[vedado|permitido|garantido]] o anonimato;"),
      L("Art. 5º, XI", "Inviolabilidade do domicílio", "Quando se pode entrar na casa sem consentimento do morador?",
        "a casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo em caso de flagrante delito ou desastre, ou para prestar socorro, ou, [[durante o dia|a qualquer hora|durante a noite]], por determinação [[judicial|policial|administrativa]];"),
      L("Art. 5º, XII", "Sigilo das comunicações", "Qual sigilo pode ser quebrado por ordem judicial e para quê?",
        "é inviolável o sigilo da correspondência e das comunicações telegráficas, de dados e das comunicações telefônicas, salvo, no último caso, por ordem [[judicial|da autoridade policial|do Ministério Público]], nas hipóteses e na forma que a lei estabelecer para fins de investigação criminal ou instrução processual [[penal|civil|administrativa]];"),
      L("Art. 5º, XVI", "Direito de reunião", "Quais são as condições do direito de reunião?",
        "todos podem reunir-se pacificamente, sem armas, em locais abertos ao público, independentemente de [[autorização|aviso|comunicação]], desde que não frustrem outra reunião anteriormente convocada para o mesmo local, sendo apenas exigido prévio [[aviso|requerimento|licenciamento]] à autoridade competente;"),
      L("Art. 5º, XIX", "Dissolução de associações", "Como uma associação pode ser dissolvida ou suspensa?",
        "as associações só poderão ser compulsoriamente dissolvidas ou ter suas atividades suspensas por decisão [[judicial|administrativa|legislativa]], exigindo-se, no [[primeiro|segundo]] caso, o trânsito em julgado;"),
      L("Art. 5º, XXXV", "Inafastabilidade da jurisdição", "O que a lei não pode excluir da apreciação do Judiciário?",
        "a lei não excluirá da apreciação do Poder Judiciário lesão ou [[ameaça|risco iminente|dano grave]] a direito;"),
      L("Art. 5º, XLII", "Racismo", "Como a CF trata o crime de racismo?",
        "a prática do racismo constitui crime inafiançável e [[imprescritível|insuscetível de graça ou anistia|hediondo]], sujeito à pena de [[reclusão|detenção|prisão simples]], nos termos da lei;"),
      L("Art. 5º, XLIII", "Tortura, tráfico, terrorismo e hediondos", "Como a CF trata tortura, tráfico, terrorismo e crimes hediondos?",
        "a lei considerará crimes inafiançáveis e insuscetíveis de [[graça ou anistia|prescrição|liberdade provisória]] a prática da tortura, o tráfico ilícito de entorpecentes e drogas afins, o terrorismo e os definidos como crimes hediondos, por eles respondendo os mandantes, os executores e os que, podendo evitá-los, se omitirem;"),
      L("Art. 5º, XLVII", "Penas proibidas", "Quais penas a CF proíbe?",
        "não haverá penas: a) de morte, salvo em caso de [[guerra declarada|estado de sítio|crime hediondo]], nos termos do art. 84, XIX; b) de caráter perpétuo; c) de trabalhos forçados; d) de [[banimento|multa|perda de bens]]; e) cruéis;"),
      L("Art. 5º, LI", "Extradição de brasileiro", "Quando um brasileiro pode ser extraditado?",
        "nenhum brasileiro será extraditado, salvo o [[naturalizado|nato|binacional]], em caso de crime comum, praticado [[antes|depois|durante o processo]] da naturalização, ou de comprovado envolvimento em tráfico ilícito de entorpecentes e drogas afins, na forma da lei;"),
      L("Art. 5º, LVII", "Presunção de inocência", "Até quando ninguém será considerado culpado?",
        "ninguém será considerado culpado até o [[trânsito em julgado de sentença penal condenatória|julgamento em segunda instância|recebimento da denúncia]];"),
      L("Art. 5º, § 1º", "Aplicação imediata", "Qual a aplicabilidade das normas de direitos fundamentais?",
        "As normas definidoras dos direitos e garantias fundamentais têm aplicação [[imediata|diferida|condicionada à edição de lei]]."),
      L("Art. 5º, § 3º", "Tratados de direitos humanos", "Como um tratado de direitos humanos ganha força de emenda?",
        "Os tratados e convenções internacionais sobre direitos humanos que forem aprovados, em cada Casa do Congresso Nacional, em [[dois turnos|um turno|três turnos]], por [[três quintos|dois terços|maioria absoluta]] dos votos dos respectivos membros, serão equivalentes às [[emendas constitucionais|leis complementares|leis ordinárias]]."),
    ] },
    { id: "rem", label: "Remédios constitucionais", ref: "Art. 5º, LXVIII a LXXVII", items: [
      L("Art. 5º, LXVIII", "Habeas corpus", "Quando se concede habeas corpus?",
        "conceder-se-á habeas corpus sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de [[locomoção|expressão|informação]], por ilegalidade ou abuso de poder;"),
      L("Art. 5º, LXIX", "Mandado de segurança", "Quando se concede mandado de segurança?",
        "conceder-se-á mandado de segurança para proteger direito [[líquido e certo|subjetivo ainda incerto|difuso]], não amparado por habeas corpus ou habeas data, quando o responsável pela ilegalidade ou abuso de poder for autoridade pública ou agente de pessoa jurídica no exercício de atribuições do Poder Público;"),
      L("Art. 5º, LXX", "Mandado de segurança coletivo", "Quem pode impetrar mandado de segurança coletivo?",
        "o mandado de segurança coletivo pode ser impetrado por: a) partido político com representação no [[Congresso Nacional|Tribunal Superior Eleitoral|Senado Federal]]; b) organização sindical, entidade de classe ou associação legalmente constituída e em funcionamento há pelo menos [[um ano|dois anos|seis meses]], em defesa dos interesses de seus membros ou associados;"),
      L("Art. 5º, LXXI", "Mandado de injunção", "Quando se concede mandado de injunção?",
        "conceder-se-á mandado de injunção sempre que a falta de [[norma regulamentadora|decisão judicial|ato administrativo]] torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania;"),
      L("Art. 5º, LXXII", "Habeas data", "Para que serve o habeas data?",
        "conceder-se-á habeas data: a) para assegurar o conhecimento de informações relativas à pessoa do [[impetrante|terceiro interessado|cônjuge do impetrante]], constantes de registros ou bancos de dados de entidades governamentais ou de caráter público; b) para a [[retificação|exclusão|publicação]] de dados, quando não se prefira fazê-lo por processo sigiloso, judicial ou administrativo;"),
      L("Art. 5º, LXXIII", "Ação popular", "Quem propõe ação popular e para quê?",
        "qualquer [[cidadão|pessoa|brasileiro nato]] é parte legítima para propor ação popular que vise a anular ato lesivo ao patrimônio público ou de entidade de que o Estado participe, à moralidade administrativa, ao meio ambiente e ao patrimônio histórico e cultural, ficando o autor, salvo comprovada [[má-fé|culpa|negligência]], isento de custas judiciais e do ônus da sucumbência;"),
      L("Art. 5º, LXXVII", "Gratuidade", "Quais ações são gratuitas por força da CF?",
        "são gratuitas as ações de [[habeas corpus e habeas data|habeas corpus e mandado de segurança|habeas data e ação popular]], e, na forma da lei, os atos necessários ao exercício da cidadania."),
    ] },
    { id: "soc", label: "Direitos sociais", ref: "Arts. 6º a 9º (seleção)", items: [
      L("Art. 6º", "Rol de direitos sociais", "Quais são os direitos sociais do art. 6º?",
        "São direitos sociais a educação, a saúde, a alimentação, o trabalho, a moradia, o [[transporte|meio ambiente|consumo]], o lazer, a segurança, a previdência social, a proteção à maternidade e à infância, a assistência aos [[desamparados|idosos|estrangeiros]], na forma desta Constituição."),
      L("Art. 7º, XIII", "Jornada de trabalho", "Qual é o limite da jornada normal de trabalho?",
        "duração do trabalho normal não superior a [[oito|seis|dez]] horas diárias e [[quarenta e quatro|quarenta|quarenta e oito]] semanais, facultada a compensação de horários e a redução da jornada, mediante acordo ou convenção coletiva de trabalho;"),
      L("Art. 7º, XVI", "Hora extra", "Qual é o adicional mínimo da hora extra?",
        "remuneração do serviço extraordinário superior, no mínimo, em [[cinquenta|vinte e cinco|cem]] por cento à do normal;"),
      L("Art. 7º, XVII", "Férias", "Como são remuneradas as férias?",
        "gozo de férias anuais remuneradas com, pelo menos, [[um terço|metade|um quarto]] a mais do que o salário normal;"),
      L("Art. 7º, XVIII", "Licença à gestante", "Qual é a duração da licença à gestante na CF?",
        "licença à gestante, sem prejuízo do emprego e do salário, com a duração de [[cento e vinte|noventa|cento e oitenta]] dias;"),
      L("Art. 7º, XXIX", "Prescrição trabalhista", "Qual é o prazo prescricional dos créditos trabalhistas?",
        "ação, quanto aos créditos resultantes das relações de trabalho, com prazo prescricional de [[cinco|dois|três]] anos para os trabalhadores urbanos e rurais, até o limite de [[dois|cinco|um]] anos após a extinção do contrato de trabalho;"),
      L("Art. 7º, XXXIII", "Trabalho do menor", "Quais são as regras para o trabalho do menor?",
        "proibição de trabalho noturno, perigoso ou insalubre a menores de [[dezoito|dezesseis|vinte e um]] e de qualquer trabalho a menores de [[dezesseis|quatorze|dezoito]] anos, salvo na condição de aprendiz, a partir de [[quatorze|doze|dezesseis]] anos;"),
      L("Art. 8º, V", "Liberdade sindical", "Alguém pode ser obrigado a se filiar a sindicato?",
        "ninguém será obrigado a [[filiar-se ou a manter-se filiado|contribuir ou a manter-se filiado|filiar-se, salvo se servidor público, ou a manter-se filiado]] a sindicato;"),
      L("Art. 9º, caput", "Direito de greve", "A quem compete decidir sobre a greve?",
        "É assegurado o direito de greve, competindo aos [[trabalhadores|sindicatos|empregadores]] decidir sobre a oportunidade de exercê-lo e sobre os interesses que devam por meio dele defender."),
    ] },
    { id: "nac", label: "Nacionalidade", ref: "Arts. 12 e 13", items: [
      L("Art. 12, I, a", "Nato: nascidos no Brasil", "Quem nasce no Brasil é sempre brasileiro nato?",
        "São brasileiros natos: os nascidos na República Federativa do Brasil, ainda que de pais estrangeiros, desde que estes [[não estejam a serviço de seu país|residam no Brasil|não sejam diplomatas de carreira]];"),
      L("Art. 12, I, b", "Nato: pais a serviço do Brasil", "Quando o nascido no estrangeiro é nato por serviço dos pais?",
        "os nascidos no estrangeiro, de pai brasileiro ou mãe brasileira, desde que qualquer deles esteja a serviço da [[República Federativa do Brasil|de organismo internacional|de empresa brasileira]];"),
      L("Art. 12, I, c", "Nato: registro ou opção", "Como o nascido no exterior, sem pais a serviço, pode ser nato?",
        "os nascidos no estrangeiro de pai brasileiro ou de mãe brasileira, desde que sejam registrados em repartição brasileira competente ou venham a residir na República Federativa do Brasil e optem, [[em qualquer tempo|até os vinte e um anos|em até quatro anos]], depois de atingida a maioridade, pela nacionalidade brasileira;"),
      L("Art. 12, II, a", "Naturalização ordinária", "O que se exige dos originários de países de língua portuguesa?",
        "São brasileiros naturalizados: os que, na forma da lei, adquiram a nacionalidade brasileira, exigidas aos originários de países de língua portuguesa apenas residência por [[um ano ininterrupto|quatro anos ininterruptos|quinze anos ininterruptos]] e idoneidade moral;"),
      L("Art. 12, II, b", "Naturalização extraordinária", "Quais são os requisitos da naturalização extraordinária?",
        "os estrangeiros de qualquer nacionalidade, residentes na República Federativa do Brasil há mais de [[quinze|dez|vinte]] anos ininterruptos e sem condenação penal, desde que requeiram a nacionalidade brasileira."),
      L("Art. 12, § 1º", "Quase-nacionalidade (portugueses)", "Que direitos têm os portugueses residentes no Brasil?",
        "Aos portugueses com residência permanente no País, se houver [[reciprocidade|tratado bilateral|naturalização]] em favor de brasileiros, serão atribuídos os direitos inerentes ao brasileiro, salvo os casos previstos nesta Constituição."),
      L("Art. 12, § 2º", "Distinção entre natos e naturalizados", "A lei pode distinguir natos de naturalizados?",
        "A lei [[não poderá|poderá|deverá]] estabelecer distinção entre brasileiros natos e naturalizados, salvo nos casos previstos nesta Constituição."),
      L("Art. 12, § 3º", "Cargos privativos de nato", "Quais cargos são privativos de brasileiro nato?",
        "São privativos de brasileiro nato os cargos: I - de Presidente e Vice-Presidente da República; II - de Presidente da Câmara dos Deputados; III - de Presidente do Senado Federal; IV - de Ministro do [[Supremo Tribunal Federal|Superior Tribunal de Justiça|Tribunal Superior Eleitoral]]; V - da carreira diplomática; VI - de oficial das Forças Armadas; VII - de Ministro de Estado da [[Defesa|Justiça|Fazenda]]."),
      L("Art. 12, § 4º", "Perda da nacionalidade (EC 131/2023)", "Em que casos se declara a perda da nacionalidade?",
        "Será declarada a perda da nacionalidade do brasileiro que: I - tiver cancelada sua naturalização, por [[sentença judicial|ato do Ministro da Justiça|decreto do Presidente da República]], em virtude de fraude relacionada ao processo de naturalização ou de atentado contra a ordem constitucional e o Estado Democrático; II - fizer pedido expresso de perda da nacionalidade brasileira perante autoridade brasileira competente, ressalvadas situações que acarretem [[apatridia|dupla nacionalidade|prejuízo patrimonial]]."),
      L("Art. 13", "Idioma oficial e símbolos", "Qual é o idioma oficial e quais são os símbolos nacionais?",
        "A [[língua portuguesa|língua portuguesa e a Libras|língua portuguesa e as línguas indígenas]] é o idioma oficial da República Federativa do Brasil. § 1º São símbolos da República Federativa do Brasil a bandeira, o hino, as [[armas e o selo|armas e o brasão|cores e o selo]] nacionais."),
    ] },
    { id: "pol", label: "Direitos políticos", ref: "Arts. 14 a 16", items: [
      L("Art. 14, caput", "Soberania popular", "Como é exercida a soberania popular?",
        "A soberania popular será exercida pelo sufrágio [[universal|censitário|capacitário]] e pelo voto direto e secreto, com valor igual para todos, e, nos termos da lei, mediante: I - plebiscito; II - referendo; III - [[iniciativa popular|ação popular|veto popular]]."),
      L("Art. 14, § 1º", "Voto obrigatório e facultativo", "Para quem o voto é obrigatório e para quem é facultativo?",
        "O alistamento eleitoral e o voto são: I - obrigatórios para os maiores de [[dezoito|dezesseis|vinte e um]] anos; II - facultativos para: a) os analfabetos; b) os maiores de [[setenta|sessenta e cinco|sessenta]] anos; c) os maiores de dezesseis e menores de dezoito anos."),
      L("Art. 14, § 2º", "Inalistáveis", "Quem não pode se alistar como eleitor?",
        "Não podem alistar-se como eleitores os [[estrangeiros|analfabetos|naturalizados]] e, durante o período do serviço militar obrigatório, os [[conscritos|militares de carreira|oficiais]]."),
      L("Art. 14, § 3º, VI", "Idades mínimas", "Quais são as idades mínimas para cada cargo?",
        "a idade mínima de: a) [[trinta e cinco|trinta|quarenta]] anos para Presidente e Vice-Presidente da República e Senador; b) [[trinta|trinta e cinco|vinte e cinco]] anos para Governador e Vice-Governador de Estado e do Distrito Federal; c) vinte e um anos para Deputado Federal, Deputado Estadual ou Distrital, Prefeito, Vice-Prefeito e juiz de paz; d) [[dezoito|vinte e um|dezesseis]] anos para Vereador."),
      L("Art. 14, § 4º", "Inelegíveis", "Quem é inelegível segundo o § 4º?",
        "São inelegíveis os [[inalistáveis e os analfabetos|estrangeiros e os maiores de setenta anos|analfabetos e os menores de vinte e um anos]]."),
      L("Art. 14, § 6º", "Desincompatibilização", "O que o chefe do Executivo deve fazer para concorrer a outro cargo?",
        "Para concorrerem a outros cargos, o Presidente da República, os Governadores de Estado e do Distrito Federal e os Prefeitos devem renunciar aos respectivos mandatos até [[seis meses|três meses|um ano]] antes do pleito."),
      L("Art. 15", "Perda e suspensão de direitos políticos", "Em que casos há perda ou suspensão dos direitos políticos?",
        "É vedada a [[cassação|suspensão temporária|perda definitiva]] de direitos políticos, cuja perda ou suspensão só se dará nos casos de: I - cancelamento da naturalização por sentença transitada em julgado; II - incapacidade civil [[absoluta|relativa|temporária]]; III - condenação criminal transitada em julgado, enquanto durarem seus efeitos; IV - recusa de cumprir obrigação a todos imposta ou prestação alternativa, nos termos do art. 5º, VIII; V - improbidade administrativa, nos termos do art. 37, § 4º."),
      L("Art. 16", "Anterioridade eleitoral", "Quando se aplica a lei que altera o processo eleitoral?",
        "A lei que alterar o processo eleitoral entrará em vigor na data de sua [[publicação|promulgação|sanção]], não se aplicando à eleição que ocorra até [[um ano|seis meses|dois anos]] da data de sua vigência."),
    ] },
    { id: "org", label: "Organização do Estado", ref: "Arts. 18, 19, 22 e 24", items: [
      L("Art. 18, caput e § 1º", "Entes federativos e capital", "Quais são os entes da Federação e qual é a capital?",
        "A organização político-administrativa da República Federativa do Brasil compreende a União, os Estados, o Distrito Federal e os Municípios, todos [[autônomos|soberanos|independentes]], nos termos desta Constituição. § 1º [[Brasília|O Distrito Federal|O Plano Piloto]] é a Capital Federal."),
      L("Art. 18, § 2º", "Territórios Federais", "Qual é a natureza dos Territórios Federais?",
        "Os Territórios Federais integram a [[União|região em que se localizam|Federação como entes autônomos]], e sua criação, transformação em Estado ou reintegração ao Estado de origem serão reguladas em [[lei complementar|lei ordinária|emenda constitucional]]."),
      L("Art. 19", "Vedações aos entes federativos", "O que é vedado à União, aos Estados, ao DF e aos Municípios?",
        "É vedado à União, aos Estados, ao Distrito Federal e aos Municípios: I - estabelecer cultos religiosos ou igrejas, subvencioná-los, embaraçar-lhes o funcionamento ou manter com eles ou seus representantes relações de dependência ou aliança, ressalvada, na forma da lei, a colaboração de [[interesse público|natureza cultural|caráter assistencial]]; II - recusar fé aos [[documentos públicos|documentos particulares|tratados internacionais]]; III - criar distinções entre brasileiros ou preferências entre si."),
      L("Art. 22, I", "Competência privativa da União", "Sobre quais ramos do direito a União legisla privativamente?",
        "Compete [[privativamente|concorrentemente|comumente]] à União legislar sobre: I - direito civil, comercial, penal, processual, [[eleitoral|tributário|financeiro]], agrário, marítimo, aeronáutico, espacial e do trabalho;"),
      L("Art. 22, parágrafo único", "Delegação aos Estados", "Como a União pode delegar competência privativa aos Estados?",
        "[[Lei complementar|Lei ordinária|Resolução do Senado]] poderá autorizar os Estados a legislar sobre questões [[específicas|gerais|quaisquer]] das matérias relacionadas neste artigo."),
      L("Art. 24, I", "Competência concorrente", "Quem legisla concorrentemente e sobre quais ramos do direito (inciso I)?",
        "Compete à União, aos Estados e [[ao Distrito Federal|aos Municípios|aos Territórios]] legislar concorrentemente sobre: I - direito tributário, financeiro, [[penitenciário|penal|processual]], econômico e urbanístico;"),
      L("Art. 24, § 1º", "Normas gerais", "Qual é o papel da União na legislação concorrente?",
        "No âmbito da legislação concorrente, a competência da União limitar-se-á a estabelecer [[normas gerais|normas específicas|normas suplementares]]."),
      L("Art. 24, § 3º", "Competência plena dos Estados", "O que acontece se não houver lei federal de normas gerais?",
        "Inexistindo lei federal sobre normas gerais, os Estados exercerão a competência legislativa [[plena|suplementar|residual]], para atender a suas peculiaridades."),
      L("Art. 24, § 4º", "Lei federal superveniente", "O que acontece com a lei estadual se vier lei federal de normas gerais?",
        "A superveniência de lei federal sobre normas gerais [[suspende|revoga|anula]] a eficácia da lei estadual, no que lhe for contrário."),
    ] },
    { id: "adm", label: "Administração Pública", ref: "Arts. 37 e 41 (seleção)", items: [
      L("Art. 37, caput", "Princípios da Administração", "Quais princípios a Administração Pública obedece (caput)?",
        "A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de legalidade, [[impessoalidade|imparcialidade|igualdade]], moralidade, publicidade e [[eficiência|economicidade|razoabilidade]] e, também, ao seguinte:"),
      L("Art. 37, I", "Acesso a cargos públicos", "Quem pode ter acesso a cargos, empregos e funções públicas?",
        "os cargos, empregos e funções públicas são acessíveis aos brasileiros que preencham os requisitos estabelecidos em lei, assim como aos [[estrangeiros, na forma da lei|portugueses, apenas|naturalizados, apenas]];"),
      L("Art. 37, II", "Concurso público", "A investidura depende de quê, e qual é a exceção?",
        "a investidura em cargo ou emprego público depende de aprovação prévia em concurso público de provas ou de [[provas e títulos|títulos|entrevistas]], de acordo com a natureza e a complexidade do cargo ou emprego, na forma prevista em lei, ressalvadas as nomeações para cargo em [[comissão|confiança|caráter efetivo]] declarado em lei de livre nomeação e exoneração;"),
      L("Art. 37, III", "Validade do concurso", "Qual é o prazo de validade do concurso?",
        "o prazo de validade do concurso público será de até [[dois anos|um ano|quatro anos]], prorrogável [[uma vez|duas vezes|indefinidamente]], por igual período;"),
      L("Art. 37, V", "Funções de confiança e cargos em comissão", "Quem exerce funções de confiança e a que se destinam?",
        "as funções de confiança, exercidas [[exclusivamente|preferencialmente|prioritariamente]] por servidores ocupantes de cargo efetivo, e os cargos em comissão, a serem preenchidos por servidores de carreira nos casos, condições e percentuais mínimos previstos em lei, destinam-se apenas às atribuições de direção, chefia e [[assessoramento|execução|fiscalização]];"),
      L("Art. 37, VII", "Greve do servidor", "Como será exercido o direito de greve do servidor?",
        "o direito de greve será exercido nos termos e nos limites definidos em lei [[específica|complementar|delegada]];"),
      L("Art. 37, XVI", "Acumulação de cargos", "Quando se admite acumular cargos públicos remunerados?",
        "é vedada a acumulação remunerada de cargos públicos, exceto, quando houver compatibilidade de horários, observado em qualquer caso o disposto no inciso XI: a) a de dois cargos de [[professor|técnico|nível superior]]; b) a de um cargo de professor com outro técnico ou científico; c) a de dois cargos ou empregos privativos de profissionais de [[saúde|educação|segurança pública]], com profissões regulamentadas;"),
      L("Art. 37, § 4º", "Improbidade administrativa", "Quais são as consequências da improbidade administrativa?",
        "Os atos de improbidade administrativa importarão a [[suspensão|perda|cassação]] dos direitos políticos, a perda da função pública, a indisponibilidade dos bens e o ressarcimento ao erário, na forma e gradação previstas em lei, sem prejuízo da ação penal cabível."),
      L("Art. 37, § 6º", "Responsabilidade civil do Estado", "Como o Estado responde pelos danos de seus agentes?",
        "As pessoas jurídicas de direito público e as de direito privado prestadoras de serviços públicos responderão pelos danos que seus agentes, nessa qualidade, causarem a terceiros, assegurado o direito de regresso contra o responsável nos casos de [[dolo ou culpa|dolo, apenas|culpa grave, apenas]]."),
      L("Art. 41, caput", "Estabilidade", "Quando o servidor adquire estabilidade?",
        "São estáveis após [[três|dois|cinco]] anos de efetivo exercício os servidores nomeados para cargo de provimento [[efetivo|em comissão|temporário]] em virtude de concurso público."),
      L("Art. 41, § 1º", "Perda do cargo do estável", "Em que hipóteses o servidor estável perde o cargo?",
        "O servidor público estável só perderá o cargo: I - em virtude de sentença judicial [[transitada em julgado|de primeira instância|proferida por órgão colegiado]]; II - mediante processo administrativo em que lhe seja assegurada ampla defesa; III - mediante procedimento de avaliação periódica de desempenho, na forma de lei [[complementar|ordinária|específica]], assegurada ampla defesa."),
      L("Art. 41, § 4º", "Avaliação especial de desempenho", "Qual é a condição para adquirir a estabilidade?",
        "Como condição para a aquisição da estabilidade, é obrigatória a avaliação especial de desempenho por [[comissão instituída para essa finalidade|chefia imediata do servidor|órgão de controle externo]]."),
    ] },
    { id: "emenda", label: "Emendas à Constituição", ref: "Art. 60", items: [
      L("Art. 60, I a III", "Iniciativa da PEC", "Quem pode propor emenda à Constituição?",
        "A Constituição poderá ser emendada mediante proposta: I - de [[um terço|um quinto|metade]], no mínimo, dos membros da Câmara dos Deputados ou do Senado Federal; II - do [[Presidente da República|Supremo Tribunal Federal|Procurador-Geral da República]]; III - de mais da [[metade|terça parte|quinta parte]] das Assembleias Legislativas das unidades da Federação, manifestando-se, cada uma delas, pela maioria [[relativa|absoluta|qualificada]] de seus membros."),
      L("Art. 60, § 1º", "Limitações circunstanciais", "Em que situações a CF não pode ser emendada?",
        "A Constituição não poderá ser emendada na vigência de intervenção federal, de estado de [[defesa|calamidade pública|emergência]] ou de estado de sítio."),
      L("Art. 60, § 2º", "Votação da PEC", "Como a PEC é votada e qual o quórum?",
        "A proposta será discutida e votada em cada Casa do Congresso Nacional, em [[dois turnos|um turno|três turnos]], considerando-se aprovada se obtiver, em ambos, [[três quintos|dois terços|a maioria absoluta]] dos votos dos respectivos membros."),
      L("Art. 60, § 3º", "Promulgação da emenda", "Quem promulga a emenda constitucional?",
        "A emenda à Constituição será promulgada [[pelas Mesas da Câmara dos Deputados e do Senado Federal|pelo Presidente da República|pelo Presidente do Supremo Tribunal Federal]], com o respectivo número de ordem."),
      L("Art. 60, § 4º", "Cláusulas pétreas", "Quais são as cláusulas pétreas?",
        "Não será objeto de deliberação a proposta de emenda tendente a abolir: I - a forma [[federativa|republicana|presidencialista]] de Estado; II - o voto direto, secreto, universal e [[periódico|obrigatório|facultativo]]; III - a separação dos Poderes; IV - os direitos e garantias [[individuais|sociais|coletivos]]."),
      L("Art. 60, § 5º", "Reapresentação de PEC rejeitada", "Quando uma PEC rejeitada pode ser reapresentada?",
        "A matéria constante de proposta de emenda rejeitada ou havida por prejudicada não pode ser objeto de nova proposta na mesma [[sessão legislativa|legislatura|sessão ordinária]]."),
    ] },
  ];

  /* ════════════════════════════════════════════════════════════
     TÓPICOS (trilha, em ordem lógica)
  ════════════════════════════════════════════════════════════ */
  const T = (id, label, icon, color, bg, border, desc) => ({ id, label, icon, color, bg, border, desc });
  const TOPICS = [
    T("teoria", "Teoria da Constituição", "🏛️", "#6366F1", "#EEF2FF", "#C7D2FE", "Classificação da CF/88, poder constituinte, eficácia e emendas"),
    T("princ", "Princípios fundamentais", "🧭", "#3B82F6", "#EFF6FF", "#BFDBFE", "Fundamentos, Poderes, objetivos e relações internacionais (arts. 1º a 4º)"),
    T("dir", "Direitos individuais", "🛡️", "#8B5CF6", "#F5F3FF", "#DDD6FE", "Art. 5º: legalidade, domicílio, sigilo, reunião, crimes e penas"),
    T("rem", "Remédios constitucionais", "💊", "#EC4899", "#FDF2F8", "#FBCFE8", "Habeas corpus, habeas data, mandado de segurança e de injunção, ação popular"),
    T("soc", "Direitos sociais", "👷", "#F59E0B", "#FFFBEB", "#FDE68A", "Art. 6º e direitos dos trabalhadores (arts. 7º a 9º)"),
    T("nac", "Nacionalidade", "🇧🇷", "#10B981", "#ECFDF5", "#A7F3D0", "Natos, naturalizados, cargos privativos e perda (arts. 12 e 13)"),
    T("pol", "Direitos políticos", "🗳️", "#06B6D4", "#ECFEFF", "#A5F3FC", "Voto, alistamento, elegibilidade e perda/suspensão (arts. 14 a 16)"),
    T("org", "Organização do Estado", "🗺️", "#EF4444", "#FEF2F2", "#FECACA", "Entes federativos, vedações e competências legislativas"),
    T("adm", "Administração Pública", "🏢", "#64748B", "#F1F5F9", "#CBD5E1", "LIMPE, concurso, acumulação, improbidade e estabilidade"),
  ];

  /* ── Teoria (resumos) ────────────────────────────────────── */
  const THEORY = {
    teoria: sec("Classificação da CF/88", list(["<b>Promulgada</b> (democrática) — feita por Assembleia Constituinte eleita", "<b>Escrita</b> e <b>dogmática</b>", "<b>Rígida</b> — emenda exige 2 turnos em cada Casa e 3/5 dos votos", "<b>Analítica</b> (prolixa) e <b>formal</b>"])) +
      sec("Poder constituinte", list(["<b>Originário</b>: cria a Constituição — inicial, ilimitado juridicamente, incondicionado e autônomo", "<b>Derivado reformador</b>: emendas (art. 60)", "<b>Derivado decorrente</b>: Constituições estaduais", "<b>Derivado revisor</b>: revisão única (art. 3º do ADCT)"])) +
      sec("Emendas (art. 60)", list(["Iniciativa: 1/3 da Câmara ou do Senado, Presidente da República, mais da metade das Assembleias Legislativas", "Votação: 2 turnos em cada Casa, 3/5 dos votos", "Promulgação: Mesas da Câmara e do Senado (sem sanção/veto)", "Não pode durante intervenção federal, estado de defesa ou de sítio", "Cláusulas pétreas: forma federativa; voto direto, secreto, universal e periódico; separação dos Poderes; direitos e garantias individuais"])) +
      sec("Eficácia das normas", list(["<b>Plena</b>: efeitos integrais, sem restrição", "<b>Contida</b>: efeitos imediatos, restringíveis por lei", "<b>Limitada</b>: depende de lei para produzir todos os efeitos"])),
    princ: sec("Fundamentos (art. 1º) — SO-CI-DI-VA-PLU", list(["Soberania", "Cidadania", "Dignidade da pessoa humana", "Valores sociais do trabalho e da livre iniciativa", "Pluralismo político"])) +
      sec("Poderes (art. 2º)", `<p>Legislativo, Executivo e Judiciário — <b>independentes e harmônicos</b> entre si.</p>`) +
      sec("Objetivos (art. 3º) — sempre com verbo", list(["<b>Construir</b> uma sociedade livre, justa e solidária", "<b>Garantir</b> o desenvolvimento nacional", "<b>Erradicar</b> a pobreza e a marginalização e <b>reduzir</b> as desigualdades", "<b>Promover</b> o bem de todos, sem preconceitos"])) +
      sec("Relações internacionais (art. 4º)", `<p>Independência nacional, prevalência dos direitos humanos, autodeterminação dos povos, não intervenção, igualdade entre os Estados, defesa da paz, solução pacífica dos conflitos, repúdio ao terrorismo e ao racismo, cooperação entre os povos, concessão de asilo político. + Integração da América Latina (parágrafo único).</p>`),
    dir: sec("Pontos mais cobrados do art. 5º", list(["Destinatários: brasileiros e estrangeiros residentes no País", "Legalidade (II): só a lei obriga", "Vedado o anonimato (IV)", "Casa (XI): flagrante, desastre e socorro a qualquer hora; ordem judicial só de dia", "Sigilo (XII): só o telefônico, por ordem judicial, para fins penais", "Reunião (XVI): sem autorização, só aviso prévio", "Associações (XIX): suspensão por decisão judicial; dissolução só com trânsito em julgado", "Presunção de inocência (LVII)", "Normas com aplicação imediata (§ 1º); tratados de DH com rito de emenda = emenda (§ 3º)"])) +
      sec("Crimes", `<p class="ex-rule"><b>Imprescritíveis</b>: racismo e ação de grupos armados.<br><b>Insuscetíveis de graça ou anistia</b>: tortura, tráfico, terrorismo e hediondos (3TH).<br>Todos são inafiançáveis.</p>`) +
      sec("Penas proibidas (XLVII)", `<p>Morte (salvo guerra declarada), perpétua, trabalhos forçados, banimento e cruéis.</p>`),
    rem: sec("Remédios constitucionais", list(["<b>Habeas corpus</b>: liberdade de locomoção (preventivo ou repressivo) — gratuito", "<b>Habeas data</b>: conhecer ou retificar dados <u>do próprio impetrante</u> — gratuito", "<b>Mandado de segurança</b>: direito líquido e certo não amparado por HC/HD", "<b>MS coletivo</b>: partido com representação no Congresso; sindicato, entidade de classe ou associação com 1 ano de funcionamento", "<b>Mandado de injunção</b>: falta de norma regulamentadora", "<b>Ação popular</b>: qualquer cidadão; anula ato lesivo ao patrimônio público, moralidade, meio ambiente e patrimônio histórico-cultural; isento de custas salvo má-fé"])),
    soc: sec("Direitos sociais (art. 6º)", `<p>Educação, saúde, alimentação, trabalho, moradia, transporte, lazer, segurança, previdência social, proteção à maternidade e à infância, assistência aos desamparados.</p>`) +
      sec("Trabalhadores (art. 7º)", list(["Jornada: 8 h diárias e 44 semanais", "Turnos ininterruptos: 6 h", "Hora extra: no mínimo +50%", "Férias: +1/3", "Licença à gestante: 120 dias", "Prescrição: 5 anos, até 2 anos após o fim do contrato", "Menor: nada antes dos 16 (aprendiz a partir de 14); noturno/perigoso/insalubre só a partir dos 18"])),
    nac: sec("Natos (art. 12, I)", list(["Nascidos no Brasil (salvo pais estrangeiros a serviço de seu país)", "Nascidos no exterior, pai ou mãe brasileiro a serviço do Brasil", "Nascidos no exterior, pai ou mãe brasileiro, com registro em repartição competente OU que venham residir no Brasil e optem após a maioridade"])) +
      sec("Naturalizados (art. 12, II)", list(["Ordinária — países de língua portuguesa: 1 ano ininterrupto + idoneidade moral", "Extraordinária: mais de 15 anos ininterruptos + sem condenação penal + requerimento"])) +
      sec("Cargos privativos de nato — MP3.COM", `<p>Ministro do STF; Presidente e Vice; Presidente da Câmara; Presidente do Senado; Carreira diplomática; Oficial das Forças Armadas; Ministro da Defesa.</p>`) +
      sec("Art. 13", `<p>Idioma oficial: língua portuguesa. Símbolos: bandeira, hino, armas e selo.</p>`),
    pol: sec("Voto (art. 14)", list(["Obrigatório: maiores de 18", "Facultativo: analfabetos, maiores de 70, de 16 a 18 anos", "Inalistáveis: estrangeiros e conscritos (serviço militar obrigatório)", "Inelegíveis: inalistáveis e analfabetos"])) +
      sec("Idades mínimas", `<p class="ex-rule">35: Presidente, Vice e Senador · 30: Governador e Vice · 21: Deputados, Prefeito, Vice-Prefeito e juiz de paz · 18: Vereador</p>`) +
      sec("Perda ou suspensão (art. 15)", `<p>Vedada a cassação. Casos: cancelamento da naturalização; incapacidade civil absoluta; condenação criminal transitada em julgado; recusa de obrigação a todos imposta; improbidade.</p>`) +
      sec("Anterioridade (art. 16)", `<p>Lei eleitoral vale na publicação, mas não se aplica à eleição que ocorra até 1 ano da sua vigência.</p>`),
    org: sec("Entes (art. 18)", `<p>União, Estados, DF e Municípios — todos <b>autônomos</b>. Capital: <b>Brasília</b>. Territórios integram a União.</p>`) +
      sec("Competências legislativas", `<p class="ex-rule"><b>Privativa da União (art. 22)</b> — CAPACETE de PM: Civil, Agrário, Penal, Aeronáutico, Comercial, Eleitoral, Trabalho, Espacial, Processual, Marítimo. Delegável aos Estados por <b>lei complementar</b> (questões específicas).</p>
        <p class="ex-rule"><b>Concorrente (art. 24)</b> — União, Estados e DF: PUFETO (Penitenciário, Urbanístico, Financeiro, Econômico, Tributário), orçamento, educação, saúde etc. União faz normas gerais; sem elas, Estados têm competência plena; lei federal posterior <b>suspende</b> a estadual no que for contrária.</p>`),
    adm: sec("Art. 37", list(["Princípios: <b>LIMPE</b>", "Concurso: provas ou provas e títulos; exceção: cargo em comissão", "Validade: até 2 anos, prorrogável uma vez por igual período", "Função de confiança: só servidor efetivo; cargos em comissão: direção, chefia e assessoramento", "Greve: lei específica", "Acumulação: 2 de professor; professor + técnico/científico; 2 de saúde — com compatibilidade de horários", "Improbidade: suspensão dos direitos políticos, perda da função, indisponibilidade dos bens, ressarcimento", "Responsabilidade objetiva do Estado, com regresso em dolo ou culpa"])) +
      sec("Estabilidade (art. 41)", `<p>3 anos de efetivo exercício + avaliação especial de desempenho. Perda do cargo: sentença transitada em julgado; processo administrativo; avaliação periódica (lei complementar) — sempre com ampla defesa.</p>`),
  };

  global.ConstitucionalEngine = global.JuridicoCore.build({ UNITS, LAW_BLOCKS, TOPICS, THEORY, lawName: "da Constituição" });
})(typeof window !== "undefined" ? window : globalThis);
