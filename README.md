# 🧠 Treino para Concursos

Ferramentas de estudo para concursos em geral, em formato de jogo. A página inicial organiza os jogos por **matéria**:

| Matéria | Jogo | Arquivo |
|---------|------|---------|
| Raciocínio Lógico-Matemático (RLM) | 🧮 Matemática Mental | `matematica.html` |
| Raciocínio Lógico-Matemático (RLM) | 🧠 Lógica Proposicional | `logica.html` + `logica-engine.js` |
| Língua Portuguesa | ✍️ Fonologia e Acentuação | `portugues.html` + `portugues-engine.js` |

Os jogos estilo Duolingo compartilham o mesmo motor (`duo.js` + `duo.css`), com duas abas:
- **🗺️ Trilha:** unidades em sequência; cada lição tem 10 questões, 5 vidas, e a dificuldade sobe sozinha conforme você ganha estrelas.
- **🎯 Treino:** você escolhe os conteúdos, a dificuldade, o número de questões e se joga com ou sem vidas.

Funciona como **PWA (Progressive Web App)** — pode ser instalado no celular direto pelo navegador, sem App Store.

---

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

## ✨ Matemática Mental — Funcionalidades

- **Operações:** Adição, Subtração, Multiplicação, Divisão, Potenciação, Raiz e Porcentagem
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
   logica.html
   logica-engine.js
   portugues.html
   portugues-engine.js
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
├── matematica.html  ← Jogo de matemática mental
├── logica.html      ← Jogo de lógica proposicional (interface)
├── logica-engine.js ← Gerador de questões e explicações de lógica
├── portugues.html   ← Jogo de fonologia e acentuação (interface)
├── portugues-engine.js ← Banco de palavras, regras e questões de português
├── duo.js / duo.css ← Motor compartilhado: trilha, treino, vidas, XP e dinâmicas
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
