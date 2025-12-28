# Deployment Guide

## 1. Vercel Deployment (Frontend)

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Configuration
The project uses `vercel.json` for configuration:
- API function timeout: 10 seconds for email service
- SPA routing: All routes redirect to `index.html`

### Deploy Steps

**Option A: Automatic (Recommended)**
1. Push to GitHub main branch
2. Vercel auto-deploys on every commit

**Option B: Manual via CLI**
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables
Set in Vercel Dashboard → Project Settings → Environment Variables:
- Add any `.env` variables needed for production
- Email service credentials (if using `api/send-email.js`)

### Post-Deployment
- Verify at your Vercel domain
- Check Analytics: `@vercel/analytics` is integrated
- Monitor Speed Insights: `@vercel/speed-insights` is active

---

## 2. Cloudflare Deployment (Worker + RAG)

### Prerequisites
- Cloudflare account with Workers enabled
- Wrangler CLI installed: `npm install -g wrangler`
- Vectorize index created: `pr-verse-rag`
- D1 database created: `pr-verse-db`
- KV namespace created for rate limiting

### Configuration
Located in `pr-verse/wrangler.toml`:
- **Worker Name**: `pr-verse`
- **Vectorize**: RAG database binding
- **Workers AI**: Embeddings + LLM (`@cf/baai/bge-base-en-v1.5`)
- **D1**: Gallery engagement tracking
- **KV**: Rate limiting

### Deploy Steps

**Development Mode**
```bash
npm run worker:dev
# Opens local dev server with remote bindings
```

**Production Deploy**
```bash
npm run worker:deploy
# Deploys to Cloudflare Workers
```

### First-Time Setup
1. **Create Vectorize Index**:
   ```bash
   wrangler vectorize create pr-verse-rag --dimensions=768 --metric=cosine
   ```

2. **Create D1 Database**:
   ```bash
   wrangler d1 create pr-verse-db
   wrangler d1 execute pr-verse-db --file=pr-verse/schema.sql
   ```

3. **Create KV Namespace**:
   ```bash
   wrangler kv:namespace create RATE_LIMIT
   ```

4. **Update `wrangler.toml`** with generated IDs

### Environment Variables
Set via Wrangler secrets:
```bash
wrangler secret put CORS_ALLOWED_ORIGINS
wrangler secret put DEFAULT_ORIGIN
```

### Post-Deployment
- Worker URL: `https://pr-verse.<your-subdomain>.workers.dev`
- Check logs: `wrangler tail`
- Monitor in Cloudflare Dashboard → Workers & Pages

---

## 3. RAG Ingestion (Vectorize)

### Overview
The RAG system uses Cloudflare Vectorize to store portfolio data as embeddings for semantic search.

### Data Structure
Located in `pr-verse/scripts/upload.js`:
- **Categories**: personal, skills, experience, projects, contact
- **Fields**: source, category, text
- **Embedding Model**: `@cf/baai/bge-base-en-v1.5` (768 dimensions)

### Commands

**Upload Data**
```bash
npm run data:upload
# Then open http://localhost:8787 in browser
```
- Generates embeddings for each document
- Uploads vectors to Vectorize
- Shows progress for each source

**List Vectors**
```bash
npm run data:list
# Then open http://localhost:8787
```
- Queries all vectors
- Groups by category
- Shows total count

**Clear Database**
```bash
npm run data:clear
# Then open http://localhost:8787
```
- Deletes all vectors
- Processes in batches of 100
- Shows deletion progress

### Update Workflow
1. Edit `PORTFOLIO_DATA` array in `pr-verse/scripts/upload.js`
2. Run `npm run data:upload`
3. Verify with `npm run data:list`
4. Test queries via Worker API

### Best Practices
- Keep text chunks focused (100-300 words)
- Use descriptive source IDs
- Categorize for easier filtering
- Re-upload after significant content changes
- Monitor vector count to stay within limits

### Troubleshooting
- **Upload fails**: Check Vectorize index exists and dimensions match (768)
- **No results**: Verify vectors uploaded with `data:list`
- **Slow queries**: Reduce `topK` parameter in queries
- **Stale data**: Clear and re-upload vectors

---

## Quick Reference

| Task | Command |
|------|---------|
| Deploy Frontend | `git push` (auto) or `vercel --prod` |
| Deploy Worker | `npm run worker:deploy` |
| Dev Worker | `npm run worker:dev` |
| Upload RAG Data | `npm run data:upload` |
| List Vectors | `npm run data:list` |
| Clear Vectors | `npm run data:clear` |
| Build Frontend | `npm run build` |
| Preview Build | `npm run preview` |

---

## Architecture

```
┌─────────────────┐
│   Vercel        │  Frontend (React + Vite)
│   prasannar.com │  - SPA routing
└────────┬────────┘  - Email API function
         │
         │ API calls
         ▼
┌─────────────────┐
│ Cloudflare      │  Worker (pr-verse)
│ Workers         │  - RAG queries
└────────┬────────┘  - Gallery API
         │           - Rate limiting
         │
    ┌────┴────┬──────────┬─────────┐
    ▼         ▼          ▼         ▼
┌────────┐ ┌────────┐ ┌────┐ ┌────────┐
│Vectorize│ │Workers │ │ D1 │ │   KV   │
│  RAG    │ │   AI   │ │ DB │ │ Limits │
└─────────┘ └────────┘ └────┘ └────────┘
```
