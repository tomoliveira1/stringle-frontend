# Stringle 🎮

Um jogo **Wordle temático de tecnologia** desenvolvido em React 19 + TypeScript + Tailwind CSS 4.

Adivinhe a palavra (ou frase) de tecnologia do dia em 6 tentativas. Cada tentativa recebe feedback visual através de cores que indicam se as letras estão corretas, presentes em posição errada ou ausentes.

🌐 **Jogar online**: [stringle-huonfxmw.manus.space](https://stringle-huonfxmw.manus.space)

---

## ⚡ Quick Start

### Pré-requisitos
- **Node.js** v18+ (recomendado v22+)
- **pnpm** v10+ (ou npm/yarn)

### Instalação e Execução

```bash
# 1. Clonar repositório
git clone <seu-repositorio>
cd stringle

# 2. Instalar dependências
pnpm install

# 3. Iniciar servidor de desenvolvimento
pnpm dev

# 4. Abrir no navegador
# http://localhost:5173/
```

---

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| React | 19.2.1 | Framework UI |
| Vite | 7.1.7 | Build tool |
| TypeScript | 5.6.3 | Tipagem |
| Tailwind CSS | 4.1.14 | Estilos |
| Wouter | 3.3.5 | Roteamento |
| Lucide React | 0.453.0 | Ícones |
| Sonner | 2.0.7 | Toasts |

**Para lista completa**, veja [DOCUMENTACAO.md](./DOCUMENTACAO.md#-dependências-e-requisitos).

---

## 🎮 Como Jogar

1. **Adivinhe a palavra** de tecnologia do dia
2. **Digite uma tentativa** usando o teclado (físico ou virtual)
3. **Pressione ENTER** para confirmar
4. **Observe as cores**:
   - 🟩 **Verde**: letra correta na posição certa
   - 🟨 **Amarelo**: letra existe, posição errada
   - 🟦 **Azul**: letra em outra palavra (frases)
   - ⬛ **Cinza**: letra não existe
5. **Ganhe em até 6 tentativas** ou veja a resposta

---

## 🏗️ Arquitetura

### Estrutura de Pastas

```
client/src/
├── components/game/     # Componentes do jogo (Board, Tile, Keyboard, etc.)
├── contexts/            # Contexto de tema
├── hooks/               # useGame (lógica principal)
├── utils/               # getDailyWord, evaluateGuess
├── data/                # Banco de 328 palavras tech
├── pages/               # Home, NotFound
└── App.tsx              # Roteamento
```

### Fluxo de Dados

```
App
 ├─ ThemeProvider (tema dark/light)
 └─ Home
     └─ useGame (estado + lógica)
         ├─ Board (exibe tentativas)
         ├─ Keyboard (entrada do usuário)
         ├─ ResultModal (vitória/derrota)
         └─ HowToPlay (instruções)
```

---

## 🎨 Recursos

✅ **Gameplay**
- Board 6×6 com tiles animados
- Teclado virtual QWERTY
- 328 palavras/frases de tecnologia
- Palavra do dia determinística e global
- Suporte a frases multi-palavra

✅ **UX/UI**
- Animações: flip 3D, shake, pop
- Modo escuro (padrão) e claro
- Responsivo (mobile, tablet, desktop)
- Modal de vitória/derrota com compartilhamento
- Countdown até próxima palavra
- Instruções integradas

✅ **Persistência**
- Estado salvo em localStorage
- Tema preferido persistido
- Reseta automaticamente à meia-noite

---

## 🚀 Scripts

```bash
pnpm dev        # Servidor dev com HMR
pnpm build      # Build para produção
pnpm preview    # Visualizar build localmente
pnpm start      # Rodar servidor em produção
pnpm check      # Verificar tipos TypeScript
pnpm format     # Formatar código
```

---

## 🎯 Próximas Funcionalidades

- 📊 Painel de estatísticas (streak, taxa de acerto)
- 💡 Dicas contextuais após 3 tentativas
- 🔥 Modo difícil (letras reveladas devem ser reutilizadas)
- 🌍 Suporte a múltiplos idiomas
- 📱 PWA (Progressive Web App)

---

## 📖 Documentação Detalhada

Para informações completas sobre:
- Estrutura do projeto
- Como o jogo funciona
- Design system
- Troubleshooting

Veja **[DOCUMENTACAO.md](./DOCUMENTACAO.md)**.

---

## 🔧 Desenvolvimento

### Adicionar Nova Palavra

Edite `client/src/data/words.ts`:

```typescript
const WORD_LIST = [
  "REACT",
  "NODEJS",
  "MINHA_PALAVRA", // ← Adicione aqui
  // ...
];
```

### Customizar Cores

Edite `client/src/index.css` (variáveis CSS):

```css
:root {
  --background: oklch(0.145 0.008 250);  /* Fundo escuro */
  --foreground: oklch(0.96 0.004 250);   /* Texto escuro */
  /* ... */
}

.light {
  --background: oklch(0.98 0.002 250);   /* Fundo claro */
  --foreground: oklch(0.15 0.010 250);   /* Texto claro */
  /* ... */
}
```

---

## 📄 Licença

MIT — Veja [LICENSE](./LICENSE) para detalhes.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o repositório
2. Crie uma branch (`git checkout -b feature/sua-feature`)
3. Commit suas mudanças (`git commit -m 'Add: sua feature'`)
4. Push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ em React**

Última atualização: 26 de março de 2026
