# Traffic Board — INNOVA

Painel SaaS para gestão de tráfego pago.

## Deploy na Vercel (passo a passo)

### Opção 1 — Via GitHub (recomendado)

1. Crie um repositório no GitHub (ex: `traffic-board`)
2. Faça upload de todos os arquivos desta pasta para o repositório
3. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**
4. Importe o repositório do GitHub
5. Vercel detecta Vite automaticamente — clique em **Deploy**
6. Pronto! URL gerada automaticamente (ex: `traffic-board.vercel.app`)

### Opção 2 — Via Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto
cd traffic-board
npm install
vercel

# Seguir as instruções no terminal
```

### Opção 3 — Deploy direto por ZIP

1. Faça zip de todos os arquivos
2. Acesse [vercel.com/new](https://vercel.com/new)
3. Arraste e solte o ZIP

## Desenvolvimento local

```bash
npm install
npm run dev
# Acesse http://localhost:5173
```

## Configurações de produção

Após o deploy, as configurações ficam salvas apenas no browser (localStorage).
Para persistência real, conecte um backend (Supabase, PlanetScale, etc).

## Logins de acesso

- **Admin**: `admin` / `123`
- **Brenda**: `brenda` / `brenda`  
- **Gustavo**: `gustavo` / `gustavo`
