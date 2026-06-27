# Dao Oracle Web App

This is the first full-stack Dao Oracle website build.

## Stack

- Next.js App Router
- Tailwind CSS
- Supabase Postgres/Auth
- OpenAI API
- Vercel Preview/Production

## Local Development

```bash
cd apps/web
npm install
cp .env.local.example .env.local
npm run dev
```

## Verification

```bash
npm run test
npm run build
npm run db:validate-seed
npm run db:seed-hexagrams -- --dry-run
```

## Vercel Deployment

Create a Vercel project from the GitHub repository and set:

- Root Directory: `apps/web`
- Framework Preset: Next.js
- Build Command: `npm run build`
- Install Command: `npm install`

Environment variables:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `OPENAI_READING_MODEL`
- `APP_ENV`

Use Supabase Staging for preview deployments. Use Supabase Production only after the reading flow, admin views, and AI output logging have been verified.

## Database

Apply migrations from:

```text
apps/web/supabase/migrations
```

Seed source:

```text
outputs/hexagram_content/dao_oracle_64_hexagrams_database_ready.jsonl
```

Dry run:

```bash
npm run db:seed-hexagrams -- --dry-run
```

Real import requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
