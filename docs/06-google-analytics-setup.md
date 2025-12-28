# 6. Google Analytics 4 (GA4) Setup

Date: December 28, 2025

Goal: Track page views, time on page, user interests, popular pages, sources

What I did:
- Created / used GA4 property → got Measurement ID (G-XXXXXXXXXX)
- Added gtag.js script to public/index.html (Vite project)
- Implemented manual page_view tracking for SPA (useLocation hook + gtag('config') on route change)
- Added cookie consent banner + Consent Mode v2:
  - Banner shows "Accept" / "Reject"
  - Default: analytics_storage = denied
  - On accept: update to granted → full tracking + cookies
  - Used js-cookie or similar to remember choice
- Enabled enhanced measurement in GA4 admin (scrolls, outbound clicks)

Result:
- Realtime reports show visits
- After some traffic: Reports → Engagement → Pages and screens (time spent, popular pages)
- Demographics / Interests reports (when enough data)

Pending: Buy + setup custom email @yourdomain.com via Hostinger