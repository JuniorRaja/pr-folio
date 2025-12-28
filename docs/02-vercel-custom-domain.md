# 2. Adding Custom Domain to Vercel

Date: December 28, 2025

What I did:
- Deployed frontend project to Vercel (already working on *.vercel.app)
- Went to Vercel dashboard → Project → Settings → Domains
- Added domain: yourdomain.com (and www.yourdomain.com)
- Vercel showed required DNS records:
  - A record for @ (apex domain) → one or more IPs (e.g. 216.198.79.114, 76.76.21.21 etc.)
  - CNAME for www → cname.vercel-dns.com

Steps in Hostinger DNS:
- Deleted default Hostinger A record for @
- Added Vercel's A record(s) for @
- Added CNAME for www
- Waited for propagation → site became live on custom domain

Result:
- https://yourdomain.com and https://www.yourdomain.com now serve Vercel frontend
- Automatic free SSL from Vercel