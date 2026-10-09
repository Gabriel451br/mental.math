# 🧠 Treino para Concursos

Ferramentas de estudo para concursos em geral, em formato de jogo. A página inicial mostra as **matérias** (toque numa para ver os tópicos — os endereços `#rlm`, `#portugues`, `#constitucional` e `#administrativo` abrem direto):

| Matéria | Jogo | Arquivo |
|---------|------|---------|
| Raciocínio Lógico-Matemático (RLM) | ⚡ Matemática Mental (trilha de técnicas) | `matematica.html` + `matematica-engine.js` |
| Raciocínio Lógico-Matemático (RLM) | ⏱️ Cálculo cronometrado (dentro da Matemática Mental) | `matematica-rapida.html` |
| Raciocínio Lógico-Matemático (RLM) | 🧠 Lógica Proposicional | `logica.html` + `logica-engine.js` |
| Língua Portuguesa | ✍️ Fonologia e Acentuação | `portugues.html` + `portugues-engine.js` |
| Direito Constitucional | 📜 Constituição Federal (trilha, treino e lei seca) | `constitucional.html` + `constitucional-engine.js` |
| Direito Administrativo | 📑 Administração Pública (trilha, treino e lei seca) | `administrativo.html` + `administrativo-engine.js` |

Os jogos estilo Duolingo compartilham o mesmo motor (`duo.js` + `duo.css`), com duas abas:
- **🗺️ Trilha:** unidades em sequência; cada lição tem 10 questões, 5 vidas, e a dificuldade sobe sozinha conforme você ganha estrelas.
- **🎯 Treino:** você escolhe os conteúdos, a dificuldade, o número de questões e se joga com ou sem vidas.
- **⭐ Estrelas (nível de cada unidade e bloco de lei seca, até 5):** lição com **90% ou mais** ganha a estrela na hora; com **mais de 75%**, a estrela vem ao refazer os erros acertando todos. A dificuldade da trilha sobe com as estrelas.
- **Sem repetição:** a mesma lição nunca repete questão, e o app lembra as últimas questões vistas de cada conteúdo para variar entre uma lição e outra.

Funciona como **PWA (Progressive Web App)** — pode ser instalado no celular direto pelo navegador, sem App Store.

---

## ⚡ Matemática Mental (trilha de técnicas)

- **7 unidades:** Adição · Subtração · Multiplicação · Divisão · Porcentagem · Potências e raízes · Divisibilidade
- Ensina atalhos: somar por partes, arredondar e compensar, completar (troco), × 5 / × 9 / × 11, dobro e metade, ÷ 5 / ÷ 25, montar porcentagens com 10%/5%/1%, quadrados terminados em 5, raiz exata pelo último algarismo
- **Resposta digitada** (e perguntas de "qual o próximo passo?"); no Fácil aparece uma dica da técnica
- Ao errar: o passo a passo da técnica com os números da questão
- Na aba **Treino** fica o **Cálculo cronometrado** clássico

## 📜 Constituição Federal (Direito Constitucional)

- **Trilha com 9 unidades, em ordem lógica:** Teoria da Constituição · Princípios fundamentais · Direitos individuais · Remédios constitucionais · Direitos sociais · Nacionalidade · Direitos políticos · Organização do Estado · Administração Pública
- Questões de múltipla escolha, **certo/errado (estilo Cebraspe)**, classificação (ex.: privativa × concorrente, nato × naturalizado) e ligar pares, com explicação citando o artigo
- **Aba 📜 Lei seca:** 9 blocos com os artigos mais cobrados no texto literal (arts. 1º–4º, 5º, remédios, 6º–9º, 12–13, 14–16, 18/19/22/24, 37/41 e 60)
  - **Flashcards:** pergunta → toque para ver o texto da lei → "Lembrei / Não lembrei" (os esquecidos voltam para o fim)
  - **Exercícios:** complete a lacuna, certo/errado com o texto alterado e ligar assunto ao dispositivo
- Para incluir artigos, adicione itens em `LAW_BLOCKS` marcando os termos-chave como `[[correto|errado1|errado2]]`

## 📑 Direito Administrativo

- **Trilha com 9 unidades, em ordem lógica:** Princípios · Organização administrativa · Poderes administrativos · Atos administrativos · Agentes públicos (Lei 8.112/90) · Licitações (Lei 14.133/21) · Responsabilidade do Estado · Improbidade (Lei 8.429/92, após a Lei 14.230/21) · Processo administrativo (Lei 9.784/99)
- **Lei seca** em 9 blocos: CF (art. 37), Lei 9.784/99, DL 200/67, CTN (art. 78), Súmulas 346 e 473 do STF, Lei 8.112/90, Lei 14.133/21, Código Civil (art. 43) e Lei 8.429/92 — com flashcards e exercícios
- Os jogos de Direito usam o mesmo núcleo (`juridico-core.js`): cada matéria só fornece os dados (questões, lei seca, tópicos e teoria)

## ✍️ Fonologia e Acentuação (Português)

- **7 unidades:** Fonemas e letras · Encontros vocálicos · Divisão silábica · Sílaba tônica · Oxítona/paroxítona/proparoxítona · Acentuação · Novo Acordo
- **Dinâmicas de exercício:** múltipla escolha, **separar sílabas** tocando entre as letras, **tocar na sílaba tônica**, **tocar na letra que leva acento** e **ligar pares**
- Banco com ~185 palavras; as regras de acentuação são calculadas por código e conferidas contra a grafia de cada palavra
- Explicação ao errar: passo a passo (separar → achar a tônica → olhar a terminação → regra)

## 🧠 Lógica Proposicional (estilo Duolingo)

- **Trilha com 7 unidades:** Proposições · Conectivos · Valor lógico · Negação · Equivalências · Tautologia · Dedução (equações lógicas)
- **Questões geradas na hora** a partir de um banco de frases que se combinam ("Ana estuda", "o banco abre"…) — nunca repete igual
- **Respostas conferidas por tabela-verdade:** as alternativas erradas nunca são equivalentes à correta
- **Errou? Toque em "Ver explicação":** mostra o que você marcou, a regra, o passo a passo e um contraexemplo provando por que a sua opção está errada
- **Vidas (❤️ 5), XP, combo e dias seguidos**, ou modo treino livre
- **Teoria de cada unidade** (resumo com tabelas) e **"Refazer as que errei"** no fim da lição
- Atalhos de teclado: `1-4`/`A-D` para escolher, `Enter` para verificar/continuar

## ⏱️ Cálculo cronometrado — Funcionalidades

- **Operações:** Adição, Subtração, Multiplicação, Divisão, Potenciação, Raiz e Porcentagem
- Acesse pela aba **Treino** da Matemática Mental
- **Dois modos:** Geral (todas as operações) ou Múltipla escolha (selecione quais quer treinar)
- **3 níveis de dificuldade:** Fácil, Médio e Difícil
- **Cronômetro:** total e por questão
- **Resultados detalhados:** acertos, tempo médio e breakdown por operação
- **Recorde de sessão** para comparar tentativas
- **100% offline** após o primeiro acesso

---

## 📱 Como instalar no celular

### iPhone (Safari)
1. Acesse o link do GitHub Pages
2. Toque em **Compartilhar** → **"Adicionar à Tela de Início"**
3. Confirme — o ícone aparece como um app

### Android (Chrome)
1. Acesse o link do GitHub Pages
2. O Chrome exibirá automaticamente um banner **"Adicionar à tela inicial"**
3. Ou: menu (⋮) → **"Instalar app"**

---

## 🚀 Deploy no GitHub Pages

### Passo a passo

1. **Crie um repositório** no GitHub (ex: `treino-concursos`)

2. **Faça upload de todos os arquivos** desta pasta:
   ```
   index.html
   matematica.html
   matematica-engine.js
   matematica-rapida.html
   logica.html
   logica-engine.js
   portugues.html
   portugues-engine.js
   juridico-core.js
   constitucional.html
   constitucional-engine.js
   administrativo.html
   administrativo-engine.js
   duo.js
   duo.css
   manifest.json
   sw.js
   icons/
     icon-192.png
     icon-512.png
   README.md
   ```

3. **Ative o GitHub Pages:**
   - Vá em **Settings** → **Pages**
   - Em *Source*, selecione `Deploy from a branch`
   - Branch: `main` / Folder: `/ (root)`
   - Clique em **Save**

4. Após 1-2 minutos, seu app estará em:
   ```
   https://SEU_USUARIO.github.io/treino-concursos/
   ```

> ⚠️ O Service Worker só funciona em **HTTPS** — o GitHub Pages já serve em HTTPS automaticamente.

---

## 🗂️ Estrutura do projeto

```
treino-concursos/
├── index.html       ← Hub com todos os jogos
├── matematica.html  ← Matemática mental: trilha de técnicas
├── matematica-engine.js ← Técnicas, questões e explicações de cálculo mental
├── matematica-rapida.html ← Cálculo cronometrado (treino clássico)
├── logica.html      ← Jogo de lógica proposicional (interface)
├── logica-engine.js ← Gerador de questões e explicações de lógica
├── portugues.html   ← Jogo de fonologia e acentuação (interface)
├── portugues-engine.js ← Banco de palavras, regras e questões de português
├── juridico-core.js ← Núcleo comum dos jogos de Direito (questões, lei seca, flashcards)
├── constitucional.html ← Direito Constitucional: trilha, treino e lei seca
├── constitucional-engine.js ← Dados: questões e lei seca da CF/88
├── administrativo.html ← Direito Administrativo: trilha, treino e lei seca
├── administrativo-engine.js ← Dados: questões e lei seca de Direito Administrativo
├── duo.js / duo.css ← Motor compartilhado: trilha, treino, lei seca, vidas, XP e dinâmicas
├── manifest.json    ← Configuração PWA
├── sw.js            ← Service Worker (cache offline)
├── icons/
│   ├── icon-192.png ← Ícone para instalação
│   └── icon-512.png ← Ícone splash screen
└── README.md
```

---

## 🛠️ Tecnologias

- HTML5 / CSS3 / JavaScript puro (sem frameworks)
- PWA com Service Worker para funcionamento offline
- Responsivo para mobile

---

Bons estudos e boa prova! 🎯
