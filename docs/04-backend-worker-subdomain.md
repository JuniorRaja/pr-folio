# 4. Backend Subdomain + Cloudflare Worker

Date: December 28, 2025

What I did:
- Created / deployed a Worker (via dashboard or Wrangler)
- Default Worker URL: https://app-name.accountname.workers.dev
- In Cloudflare → Workers & Pages → selected Worker → Settings → Domains & Routes
- Added custom domain: api.yourdomain.com (or backend.yourdomain.com etc.)
- Cloudflare auto-created CNAME record + issued free SSL

Result:
- Backend now live at: https://api.yourdomain.com
- Original workers.dev URL still works for testing
- Frontend (Vercel) can call backend via fetch('https://api.yourdomain.com/...')