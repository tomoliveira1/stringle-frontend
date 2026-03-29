# 🚀 Guia de Setup — Stringle

Instruções passo a passo para rodar o Stringle localmente em diferentes sistemas operacionais.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### 1. Node.js

**Windows/Mac/Linux**:
- Acesse [nodejs.org](https://nodejs.org/)
- Baixe a versão LTS (v20+) ou Current (v22+)
- Execute o instalador e siga as instruções

**Verificar instalação**:
```bash
node --version
# v22.13.0 (ou similar)
```

### 2. pnpm (Gerenciador de Pacotes)

**Opção A: Via npm** (recomendado)
```bash
npm install -g pnpm
```

**Opção B: Via Homebrew** (macOS)
```bash
brew install pnpm
```

**Opção C: Via Chocolatey** (Windows)
```bash
choco install pnpm
```

**Verificar instalação**:
```bash
pnpm --version
# 10.4.1 (ou similar)
```

### 3. Git

**Windows**:
- Baixe em [git-scm.com](https://git-scm.com/)
- Execute o instalador

**macOS**:
```bash
brew install git
```

**Linux** (Ubuntu/Debian):
```bash
sudo apt-get install git
```

**Verificar instalação**:
```bash
git --version
# git version 2.x.x
```

---

## 💻 Instalação por Sistema Operacional

### Windows

#### Passo 1: Abrir Terminal
- Pressione `Win + R`
- Digite `cmd` e pressione Enter
- Ou use PowerShell (recomendado)

#### Passo 2: Clonar Repositório
```bash
git clone https://github.com/seu-usuario/stringle.git
cd stringle
```

#### Passo 3: Instalar Dependências
```bash
pnpm install
```

#### Passo 4: Iniciar Servidor
```bash
pnpm dev
```

#### Passo 5: Abrir no Navegador
- Abra seu navegador
- Acesse `http://localhost:5173/`

---

### macOS

#### Passo 1: Abrir Terminal
- Pressione `Cmd + Space`
- Digite `terminal` e pressione Enter

#### Passo 2: Instalar Homebrew (se não tiver)
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

#### Passo 3: Instalar Node.js e pnpm
```bash
brew install node pnpm
```

#### Passo 4: Clonar Repositório
```bash
git clone https://github.com/seu-usuario/stringle.git
cd stringle
```

#### Passo 5: Instalar Dependências
```bash
pnpm install
```

#### Passo 6: Iniciar Servidor
```bash
pnpm dev
```

#### Passo 7: Abrir no Navegador
- Abra Safari, Chrome ou Firefox
- Acesse `http://localhost:5173/`

---

### Linux (Ubuntu/Debian)

#### Passo 1: Abrir Terminal
- Pressione `Ctrl + Alt + T`

#### Passo 2: Atualizar Pacotes
```bash
sudo apt-get update
sudo apt-get upgrade
```

#### Passo 3: Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Passo 4: Instalar pnpm
```bash
npm install -g pnpm
```

#### Passo 5: Clonar Repositório
```bash
git clone https://github.com/seu-usuario/stringle.git
cd stringle
```

#### Passo 6: Instalar Dependências
```bash
pnpm install
```

#### Passo 7: Iniciar Servidor
```bash
pnpm dev
```

#### Passo 8: Abrir no Navegador
- Abra Firefox, Chrome ou Chromium
- Acesse `http://localhost:5173/`

---

## 🐳 Setup com Docker (Opcional)

Se preferir usar Docker:

### 1. Criar Dockerfile

Crie um arquivo `Dockerfile` na raiz do projeto:

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar arquivos
COPY package.json pnpm-lock.yaml ./

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código
COPY . .

# Expor porta
EXPOSE 5173

# Comando padrão
CMD ["pnpm", "dev", "--host"]
```

### 2. Criar docker-compose.yml

```yaml
version: '3.8'

services:
  stringle:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

### 3. Executar

```bash
docker-compose up
```

Acesse `http://localhost:5173/`

---

## 🔧 Troubleshooting

### Problema: "pnpm: comando não encontrado"

**Solução**:
```bash
npm install -g pnpm
```

Depois reinicie o terminal.

---

### Problema: "Porta 5173 já está em uso"

**Solução 1**: Usar outra porta
```bash
pnpm dev -- --port 3001
```

**Solução 2**: Matar processo na porta 5173

**Windows**:
```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

**macOS/Linux**:
```bash
lsof -i :5173
kill -9 <PID>
```

---

### Problema: "npm ERR! code ERESOLVE"

**Solução**:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

### Problema: "Module not found"

**Solução**:
```bash
pnpm install
pnpm dev
```

---

### Problema: "TypeScript errors"

**Solução**:
```bash
pnpm check
```

Se houver erros, verifique se todos os tipos estão instalados:
```bash
pnpm install --save-dev @types/node @types/react @types/react-dom
```

---

## 📦 Estrutura de Pastas Esperada

Após clonar e instalar, você deve ter:

```
stringle/
├── node_modules/          # Dependências (criado por pnpm install)
├── client/
│   ├── public/
│   ├── src/
│   └── index.html
├── server/
├── shared/
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── README.md
├── DOCUMENTACAO.md
└── SETUP.md               # Este arquivo
```

---

## ✅ Verificação de Setup

Execute este comando para verificar se tudo está correto:

```bash
pnpm check
```

Você deve ver:
```
✓ TypeScript check passed
```

---

## 🎯 Próximos Passos

Após setup bem-sucedido:

1. **Explorar o código**:
   ```bash
   code .  # Abrir no VS Code
   ```

2. **Ler a documentação**:
   - [README.md](./README.md) — Overview rápido
   - [DOCUMENTACAO.md](./DOCUMENTACAO.md) — Documentação completa

3. **Fazer modificações**:
   - Edite `client/src/` e veja as mudanças em tempo real (HMR)

4. **Build para produção**:
   ```bash
   pnpm build
   pnpm start
   ```

---

## 🆘 Precisa de Ajuda?

Se encontrar problemas:

1. **Verifique as versões**:
   ```bash
   node --version
   pnpm --version
   git --version
   ```

2. **Limpe cache e reinstale**:
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **Abra uma issue** no repositório com:
   - Sistema operacional
   - Versões do Node.js e pnpm
   - Mensagem de erro completa

---

**Última atualização**: 26 de março de 2026
