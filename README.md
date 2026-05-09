# 🧠 Treino Mental BB

Aplicativo de treinamento de matemática mental para o concurso do **Banco do Brasil**.

Funciona como **PWA (Progressive Web App)** — pode ser instalado no celular direto pelo navegador, sem App Store.

---

## ✨ Funcionalidades

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
├── index.html       ← App completo (HTML + CSS + JS)
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
