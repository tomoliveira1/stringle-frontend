# Stringle — Documentação Completa

## 📋 Visão Geral

**Stringle** é um jogo Wordle temático de tecnologia, desenvolvido em React 19 + TypeScript + Tailwind CSS 4. O jogador tem 6 tentativas para adivinhar uma palavra ou frase de tecnologia do dia. Cada tentativa recebe feedback visual através de cores que indicam se as letras estão corretas, presentes em posição errada, presentes em outra palavra (para frases) ou ausentes.

---

## 🛠️ Dependências e Requisitos

### Requisitos do Sistema
- **Node.js**: v18+ (recomendado v22.13.0)
- **pnpm**: v10.4.1+ (gerenciador de pacotes)
- **Git**: para controle de versão

### Dependências Principais (Runtime)

| Pacote | Versão | Propósito |
|--------|--------|----------|
| `react` | ^19.2.1 | Framework UI |
| `react-dom` | ^19.2.1 | Renderização DOM |
| `wouter` | ^3.3.5 | Roteamento client-side |
| `lucide-react` | ^0.453.0 | Ícones SVG |
| `sonner` | ^2.0.7 | Sistema de toasts/notificações |
| `tailwindcss` | ^4.1.14 | Framework CSS (via vite plugin) |
| `framer-motion` | ^12.23.22 | Animações (não usado atualmente, mas disponível) |
| `@radix-ui/*` | ^1.x | Componentes UI acessíveis (Dialog, etc.) |

### Dependências de Desenvolvimento

| Pacote | Versão | Propósito |
|--------|--------|----------|
| `vite` | ^7.1.7 | Build tool e dev server |
| `@vitejs/plugin-react` | ^5.0.4 | Plugin React para Vite |
| `@tailwindcss/vite` | ^4.1.3 | Plugin Tailwind para Vite |
| `typescript` | 5.6.3 | Tipagem estática |
| `esbuild` | ^0.25.0 | Bundler para produção |
| `prettier` | ^3.6.2 | Formatação de código |

---

## 🚀 Como Rodar Localmente

### 1. Clonar o Repositório

```bash
git clone <seu-repositorio>
cd stringle
```

### 2. Instalar Dependências

```bash
pnpm install
```

Se preferir usar npm ou yarn:
```bash
npm install
# ou
yarn install
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor iniciará em `http://localhost:5173/` (ou a próxima porta disponível).

### 4. Acessar o Jogo

Abra seu navegador e acesse:
```
http://localhost:5173/
```

### 5. Build para Produção

```bash
pnpm build
```

Isso gera:
- `dist/` — arquivos estáticos (HTML, CSS, JS)
- `dist/index.js` — servidor Node.js para produção

### 6. Rodar em Produção

```bash
pnpm start
```

O servidor rodará em `http://localhost:3000/` (ou conforme configurado).

---

## 📁 Estrutura do Projeto

```
stringle/
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── game/
│   │   │   │   ├── Board.tsx          # Grid 6x6 de tentativas
│   │   │   │   ├── Tile.tsx           # Tile individual com flip 3D
│   │   │   │   ├── Keyboard.tsx       # Teclado virtual QWERTY
│   │   │   │   ├── ColorLegend.tsx    # Legenda de cores
│   │   │   │   ├── Countdown.tsx      # Timer até próxima palavra
│   │   │   │   ├── ResultModal.tsx    # Modal vitória/derrota
│   │   │   │   └── HowToPlay.tsx      # Modal de instruções
│   │   │   ├── ui/                    # Componentes shadcn/ui
│   │   │   └── ErrorBoundary.tsx      # Tratamento de erros
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx       # Contexto de tema (dark/light)
│   │   ├── hooks/
│   │   │   └── useGame.ts             # Hook principal do jogo
│   │   ├── utils/
│   │   │   ├── getDailyWord.ts        # Seleção de palavra do dia
│   │   │   └── evaluateGuess.ts       # Lógica de avaliação
│   │   ├── data/
│   │   │   └── words.ts               # Banco de 328 palavras/frases tech
│   │   ├── pages/
│   │   │   ├── Home.tsx               # Página principal
│   │   │   └── NotFound.tsx           # Página 404
│   │   ├── App.tsx                    # Componente raiz com roteamento
│   │   ├── main.tsx                   # Entry point React
│   │   └── index.css                  # Estilos globais + animações
│   └── index.html                     # Template HTML
├── server/
│   └── index.ts                       # Servidor Express (produção)
├── shared/
│   └── const.ts                       # Constantes compartilhadas
├── package.json                       # Dependências e scripts
├── tsconfig.json                      # Configuração TypeScript
├── vite.config.ts                     # Configuração Vite
├── tailwind.config.ts                 # Configuração Tailwind
└── DOCUMENTACAO.md                    # Este arquivo
```

---

## 🎮 Como o Jogo Funciona

### 1. Seleção da Palavra do Dia

**Arquivo**: `client/src/utils/getDailyWord.ts`

A palavra é selecionada de forma **determinística e global**:
- Usa a data atual (UTC) como seed
- Calcula o número de dias desde 2026-01-01
- Aplica modulo no tamanho da lista (328 palavras)
- **Resultado**: todos os jogadores recebem a mesma palavra no mesmo dia

```typescript
// Exemplo: 26 de março de 2026
// Dias desde epoch: 84
// Índice: 84 % 328 = 84
// Palavra: WORD_LIST[84]
```

### 2. Entrada do Usuário

**Arquivo**: `client/src/hooks/useGame.ts`

O jogador digita letras usando:
- **Teclado físico**: teclas A-Z, Backspace, Enter
- **Teclado virtual**: cliques nos botões

Validações:
- Apenas letras A-Z são aceitas
- Máximo de letras = comprimento da palavra do dia
- Backspace remove a última letra
- Enter submete a tentativa (se tiver comprimento correto)

### 3. Avaliação da Tentativa

**Arquivo**: `client/src/utils/evaluateGuess.ts`

Cada letra recebe um status baseado na comparação com a palavra do dia:

| Status | Cor | Significado |
|--------|-----|-------------|
| `correct` | 🟩 Verde | Letra na posição correta |
| `present` | 🟨 Amarelo | Letra existe, posição errada (mesma palavra) |
| `present-other` | 🟦 Azul | Letra existe em outra palavra (frases) |
| `absent` | ⬛ Cinza | Letra não existe |

**Exemplo com frase "HELLO WORLD"**:
- Tentativa: "WORLD HELLO"
- H: presente-outra (está em HELLO, não em WORLD)
- E: presente-outra (está em HELLO, não em WORLD)
- L: presente (em WORLD, posição errada)
- L: presente (em WORLD, posição errada)
- O: presente (em WORLD, posição errada)

### 4. Persistência de Estado

**Arquivo**: `client/src/hooks/useGame.ts`

O estado é salvo em `localStorage` com a chave `stringle_game`:

```json
{
  "currentInput": "HE",
  "currentRow": 2,
  "guesses": [
    {
      "input": "RUST",
      "letters": [
        { "letter": "R", "status": "absent" },
        { "letter": "U", "status": "absent" },
        { "letter": "S", "status": "absent" },
        { "letter": "T", "status": "absent" }
      ]
    }
  ],
  "status": "playing",
  "today": "2026-03-26",
  "invalidShake": false,
  "revealingRow": -1
}
```

**Comportamento**:
- Estado é carregado ao iniciar o jogo
- Atualizado a cada ação (digitar, deletar, submeter)
- Persiste entre recarregamentos da página
- Reseta automaticamente à meia-noite (nova palavra)

### 5. Animações

**Arquivo**: `client/src/index.css`

| Animação | Trigger | Efeito |
|----------|---------|--------|
| `shake` | Tentativa inválida | Movimento horizontal rápido |
| `tile-pop` | Letra digitada | Escala 1 → 1.12 → 1 |
| `tile-flip` | Reveal de resultado | Rotação 3D (0° → -90°) |
| `bounce-in` | Modal aparece | Entrada com bounce |

### 6. Modo Escuro/Claro

**Arquivo**: `client/src/contexts/ThemeContext.tsx`

- **Padrão**: modo escuro (#111827)
- **Alternável**: clique no ícone Sol/Lua no header
- **Persistência**: salvo em `localStorage` com chave `theme`
- **Aplicação**: classe `.dark` ou `.light` no `<html>`

**Cores por tema**:

| Elemento | Escuro | Claro |
|----------|--------|-------|
| Fundo | #111827 | #f8f8f8 |
| Card | #1f2937 | #ffffff |
| Texto | #f5f5f5 | #1a1a1a |
| Borda | rgba(255,255,255,0.12) | #e5e5e5 |

### 7. Modal de Resultado

**Arquivo**: `client/src/components/game/ResultModal.tsx`

Exibido após vitória ou derrota:
- **Vitória**: emoji 🎉, número de tentativas, preview de emojis
- **Derrota**: emoji 😔, palavra correta revelada
- **Countdown**: tempo até meia-noite (próxima palavra)
- **Compartilhamento**: copia resultado em formato Wordle para clipboard

**Formato de compartilhamento**:
```
Stringle 2026-03-26 3/6

🟩🟨⬛🟩
🟩🟩🟩🟩
🟩🟩🟩🟩

stringle-huonfxmw.manus.space
```

---

## 📊 Banco de Dados de Palavras

**Arquivo**: `client/src/data/words.ts`

Contém **328 palavras e frases** de tecnologia:

```typescript
const WORD_LIST = [
  "REACT",
  "NODEJS",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "GITHUB COPILOT",
  // ... 323 mais
];
```

**Critérios**:
- Palavras: 4-15 caracteres (sem espaços)
- Frases: 2-3 palavras, 8-20 caracteres (sem espaços)
- Temas: linguagens, frameworks, ferramentas, conceitos
- Idioma: português e inglês

---

## 🎨 Design System

### Tipografia

| Uso | Fonte | Peso |
|-----|-------|------|
| Headers, UI | Space Grotesk | 500-700 |
| Tiles, Monospace | IBM Plex Mono | 600 |
| Body | Space Grotesk | 400 |

### Paleta de Cores

**Feedback de Letras**:
- Verde (Correto): `#22c55e` (emerald-500)
- Amarelo (Presente): `#f59e0b` (amber-500)
- Azul (Outra palavra): `#6366f1` (indigo-500)
- Cinza (Ausente): `#4b5563` (gray-600)

**Tema Escuro**:
- Fundo: `oklch(0.145 0.008 250)` ≈ #111827
- Card: `oklch(0.195 0.010 250)` ≈ #1f2937
- Texto: `oklch(0.96 0.004 250)` ≈ #f5f5f5

**Tema Claro**:
- Fundo: `oklch(0.98 0.002 250)` ≈ #f8f8f8
- Card: `oklch(1 0 0)` ≈ #ffffff
- Texto: `oklch(0.15 0.010 250)` ≈ #1a1a1a

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor dev com HMR

# Build
pnpm build        # Compila para produção
pnpm preview      # Visualiza build de produção localmente

# Qualidade
pnpm check        # Verifica tipos TypeScript
pnpm format       # Formata código com Prettier

# Produção
pnpm start        # Roda servidor Node.js em produção
```

---

## 🐛 Troubleshooting

### Problema: "Porta 5173 já está em uso"
**Solução**: Vite usará a próxima porta disponível automaticamente, ou especifique:
```bash
pnpm dev -- --port 3001
```

### Problema: "Módulo não encontrado"
**Solução**: Reinstale dependências:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Problema: "Tema não muda"
**Solução**: Limpe localStorage:
```javascript
localStorage.clear();
location.reload();
```

### Problema: "Palavra do dia não muda"
**Solução**: Verifique se a data do sistema está correta. A palavra muda à meia-noite UTC.

---

## 📱 Responsividade

O jogo é totalmente responsivo:
- **Mobile** (< 640px): Tiles 60px, teclado compacto
- **Tablet** (640px - 1024px): Tiles 70px, espaçamento aumentado
- **Desktop** (> 1024px): Tiles 80px, layout otimizado

---

## 🔐 Segurança

- **Sem backend**: jogo roda 100% no cliente
- **Sem dados pessoais**: apenas localStorage local
- **Sem rastreamento**: sem cookies de tracking
- **HTTPS**: recomendado em produção

---

## 📄 Licença

MIT — Veja LICENSE para detalhes.

---

## 🤝 Contribuindo

Para contribuir:
1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'Add feature'`)
4. Push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para dúvidas ou bugs, abra uma issue no repositório.

**Última atualização**: 26 de março de 2026
