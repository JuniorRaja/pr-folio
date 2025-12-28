# PR-Verse RAG Chatbot

Portfolio chatbot powered by Cloudflare Vectorize + Workers AI.

## Quick Start

```bash
# 1. Upload your data
npm run data:upload
# Open http://localhost:8787

# 2. Start chatbot
npm run worker:dev

# 3. Test
curl -X POST http://localhost:8787 -H "Content-Type: application/json" -d "{\"message\": \"What are your skills?\"}"

# 4. Deploy
npm run worker:deploy
```

## Data Management

```bash
npm run data:upload   # Upload data to Vectorize
npm run data:list     # List current vectors
npm run data:clear    # Delete all vectors
npm run worker:dev    # Run chatbot locally
npm run worker:deploy # Deploy to production
```

**After running each command, open http://localhost:8787 to execute.**

## Updating Data

Edit `scripts/upload.js` → modify the `PORTFOLIO_DATA` array → run `npm run data:upload`

```javascript
const PORTFOLIO_DATA = [
  {
    source: "unique-id",        // Unique identifier
    category: "skills",         // skills|projects|personal|experience|contact
    text: "Your content here..."
  }
];
```

## Project Structure

```
pr-verse/
├── src/
│   ├── index.js          # Main chatbot worker
│   ├── gallery-api.js    # Gallery features
│   └── rag/              # RAG system
│       ├── chatbot.js    # Query orchestration
│       ├── retrieval.js  # Vector search
│       ├── embeddings.js # Embedding generation
│       ├── prompts.js    # Prompt engineering
│       └── llm.js        # LLM interaction
├── scripts/
│   ├── upload.js         # Upload data (edit PORTFOLIO_DATA here)
│   ├── list.js           # List vectors
│   └── clear.js          # Clear all vectors
└── wrangler.toml         # Cloudflare config
```

## API

**POST /** - Chat endpoint

```json
// Request
{ "message": "What are your skills?" }

// Response
{ "answer": "I'm proficient in React, TypeScript...", "timestamp": "..." }
```

## Cloudflare Resources

- **Vectorize**: `pr-verse-rag` (768 dimensions, cosine)
- **Workers AI**: BGE embeddings + Llama 3 LLM
- **D1**: Gallery database
- **KV**: Rate limiting
