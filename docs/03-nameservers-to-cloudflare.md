# 3. Migrating Nameservers to Cloudflare

Date: December 28, 2025

Why: Easier DNS management + free proxy/security + subdomain for backend Worker

What I did:
1. Created free Cloudflare account
2. Added site → yourdomain.com → selected Free plan
3. Cloudflare scanned existing DNS (saw Vercel records)
4. Got two custom nameservers from Cloudflare (e.g. maya.ns.cloudflare.com + nile.ns.cloudflare.com)
5. In Hostinger hPanel → Domains → Manage → Nameservers → Custom → pasted Cloudflare nameservers
6. Waited for propagation (checked with whatsmyDns.net – NS records updated)
7. In Cloudflare dashboard → DNS tab → confirmed Vercel A + CNAME records were imported
8. Enabled proxy (orange cloud) on records where wanted

Result:
- DNS now fully managed by Cloudflare
- Vercel site still works (proxied)
- Free CDN, DDoS protection, WAF available

Next: Used this to add backend subdomain