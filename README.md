# 🧠 Treino para Concursos

Coleção de jogos educativos para concursos (ex.: **Banco do Brasil**). A página inicial é um hub com todos os jogos:

| Jogo | Arquivo | Conteúdo |
|------|---------|----------|
| 🧮 Matemática Mental | `matematica.html` | Operações contra o relógio |
| 🧠 Lógica Proposicional | `logica.html` + `logica-engine.js` | Proposições, conectivos, valor lógico, negações, equivalências, tautologias e deduções |

Funciona como **PWA (Progressive Web App)** — pode ser instalado no celular direto pelo navegador, sem App Store.

---

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

1. **Crie um repositório** no GitHub (ex: `treino-bb`)

2. **Faça upload de todos os arquivos** desta pasta:
   ```
   index.html
   matematica.html
   logica.html
   logica-engine.js
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
   https://SEU_USUARIO.github.io/treino-bb/
   ```

> ⚠️ O Service Worker só funciona em **HTTPS** — o GitHub Pages já serve em HTTPS automaticamente.

---

## 🗂️ Estrutura do projeto

```
treino-bb/
├── index.html       ← Hub com todos os jogos
├── matematica.html  ← Jogo de matemática mental
├── logica.html      ← Jogo de lógica proposicional (interface)
├── logica-engine.js ← Gerador de questões e explicações de lógica
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
