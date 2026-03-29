# Stringle — Ideias de Design

## Abordagem 1 — Terminal Hacker (Cyberpunk Minimalista)
<response>
<text>
**Design Movement:** Cyberpunk Terminal / Hacker Aesthetic
**Core Principles:**
- Fundo escuro absoluto com texto monoespaçado brilhante
- Efeito de scanlines e glow neon nos tiles
- Sensação de "hackear o sistema" ao revelar letras
- Tipografia monospace como identidade central

**Color Philosophy:** Preto profundo (#0a0a0a) com verde neon (#00ff41) e ciano (#00d4ff). Amarelo elétrico (#ffff00) para "presente". Cinza escuro para ausente. A paleta evoca terminais de computador dos anos 80, criando nostalgia tech.

**Layout Paradigm:** Layout assimétrico com header de terminal (mostrando "STRINGLE v1.0 > _"), grid de tiles com bordas neon, teclado virtual com teclas estilo keycap mecânico.

**Signature Elements:**
- Efeito de cursor piscando no input
- Animação de "digitação" ao revelar letras (letra por letra)
- Borda com efeito de glitch ao errar

**Interaction Philosophy:** Cada interação parece uma operação de terminal. Enter = "executar comando". Vitória = "ACESSO CONCEDIDO". Derrota = "ACESSO NEGADO".

**Animation:** Flip com efeito de glitch, shake com distorção de cor, fade com dissolução de pixels.

**Typography System:** JetBrains Mono (display + body), peso 700 para tiles, 400 para teclado.
</text>
<probability>0.07</probability>
</response>

## Abordagem 2 — Minimalismo Editorial Tech (ESCOLHIDA)
<response>
<text>
**Design Movement:** Swiss International Typographic Style + Tech Editorial
**Core Principles:**
- Grid rigoroso com espaçamento generoso e hierarquia tipográfica clara
- Modo escuro como padrão, com transição suave para modo claro
- Cores semânticas fortes: verde esmeralda, âmbar quente, azul índigo, cinza neutro
- Tiles com bordas finas e cantos levemente arredondados, sem excessos decorativos

**Color Philosophy:** Fundo escuro #111827 (gray-900) com tiles em #1f2937. Cores de feedback: verde #22c55e (correct), âmbar #f59e0b (present), azul índigo #6366f1 (present-other-word), cinza #4b5563 (absent). Texto branco puro #f9fafb. A paleta é limpa, legível e tecnológica.

**Layout Paradigm:** Layout centralizado vertical com header compacto, board de tiles como elemento principal, teclado virtual fixo na parte inferior. Proporções áureas entre os elementos.

**Signature Elements:**
- Tiles com flip 3D ao revelar (perspectiva real)
- Teclado virtual com teclas que mostram o estado das letras já usadas
- Contador regressivo elegante no header

**Interaction Philosophy:** Cada tentativa é um "commit". A revelação é um momento de tensão. A vitória é uma celebração contida mas satisfatória.

**Animation:** Flip 3D suave (0.5s ease), shake horizontal ao erro, bounce ao completar linha, confetti discreto na vitória.

**Typography System:** Space Grotesk (display/header, bold 700), IBM Plex Mono (tiles, bold 800), Inter (teclado, medium 500).
</text>
<probability>0.09</probability>
</response>

## Abordagem 3 — Brutalismo Lúdico
<response>
<text>
**Design Movement:** Neo-Brutalism + Playful Tech
**Core Principles:**
- Bordas grossas e sombras sólidas (box-shadow sem blur)
- Cores vibrantes e contrastantes sobre fundo creme/off-white
- Tipografia bold e expressiva, quase cartaz
- Interações com feedback físico exagerado (bounce, wobble)

**Color Philosophy:** Fundo #fafaf0 (creme), tiles com borda preta 3px e sombra sólida. Verde #16a34a, amarelo #ca8a04, azul #2563eb, cinza #6b7280. Cada cor tem peso visual forte.

**Layout Paradigm:** Layout levemente inclinado, tiles com sombra sólida que "levanta" ao hover, teclado com teclas tipo botão físico.

**Signature Elements:**
- Sombra sólida nos tiles (4px 4px 0 #000)
- Animação de "pressionar" tecla física
- Título com efeito de texto recortado

**Interaction Philosophy:** O jogo deve parecer um brinquedo físico de alta qualidade. Cada clique tem peso e resposta tátil visual.

**Animation:** Bounce exagerado ao revelar, wobble ao errar, pop ao vencer.

**Typography System:** Syne (display, extrabold 800), Space Mono (tiles, bold 700), DM Sans (teclado, medium 500).
</text>
<probability>0.06</probability>
</response>

---

## Design Escolhido: Abordagem 2 — Minimalismo Editorial Tech

Filosofia adotada: Swiss International Typographic Style com estética tech editorial. Modo escuro como padrão, tipografia Space Grotesk + IBM Plex Mono, cores semânticas fortes e animações de flip 3D nos tiles.
