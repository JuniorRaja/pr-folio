# Portfolio & Lifestyle

A personal space where tech meets life. This site showcases my journey as a developer while sharing glimpses of the things I love—books, travel, music, and creative expression.

## Tech Stack

The architecture demonstrates full-stack capabilities with a focus on performance and user experience:

**Frontend**
- React 18 with TypeScript for type-safe component development
- Vite for lightning-fast builds and HMR
- TailwindCSS + Radix UI for accessible, composable primitives
- Three.js ecosystem (React Three Fiber, Drei) for 3D graphics
- Framer Motion for fluid animations
- React Router for client-side routing with dynamic pages

**Backend & APIs**
- Cloudflare Workers with D1 (SQLite) for gallery engagement tracking
- Vercel Edge Functions for contact form email handling via Nodemailer
- RAG-powered AI chatbot using Cloudflare Workers AI with vector embeddings
- TanStack Query for server state management and caching

**Analytics & Monitoring**
- Google Analytics 4 with custom event tracking
- Vercel Analytics for real-time performance insights
- Vercel Speed Insights for Core Web Vitals monitoring

**Responsive Design**
- Custom hooks for breakpoint detection and mobile-first layouts
- Adaptive component rendering based on viewport
- Touch-optimized interactions for mobile devices

## Architecture

The project uses a distributed architecture that leverages edge computing for optimal performance:

**Hybrid Deployment**
- Vercel hosts the React SPA with automatic code splitting and CDN distribution
- Cloudflare Workers run at the edge for low-latency API responses
- D1 database stores gallery engagement data (likes, views, comments)
- GitHub + jsDelivr CDN serves static assets (images, manifests)

**AI Chatbot with RAG**
The chatbot uses Retrieval-Augmented Generation to answer questions about my portfolio. It queries a vector database of embedded content (projects, skills, experience) and generates contextual responses using Cloudflare Workers AI. Rate limiting prevents abuse while maintaining a conversational experience.

**Edge Functions**
Vercel Edge Functions handle the contact form submission, sending formatted HTML emails through SMTP. This serverless approach eliminates the need for a persistent backend while maintaining security through environment variables.

**Performance Optimizations**
- Manual code splitting with Rollup chunks (React, Radix, Three.js, Router)
- Lazy loading for routes and heavy components
- Image optimization through CDN with WebP format
- Build-time minification with console/debugger removal in production
- Asset inlining for small files (< 4KB)

---


## What's Inside

Built with React, TypeScript, and Three.js, this portfolio blends interactive 3D experiences with a clean, modern interface. The site features custom-built components that go beyond typical portfolio templates:

- **3D Book Shelf** – Interactive book displays with realistic hover animations and spine details
- **Interactive Globe** – A Three.js-powered globe mapping travel experiences and locations
- **Music Player** – Embedded audio player with custom controls and playback features
- **Bento Grid Layout** – Modern card-based design with responsive animations
- **Photo Gallery** – Dynamic album viewer with engagement tracking via Cloudflare Workers
- **Real-time Analytics** – Integrated Vercel Analytics and Google Analytics for insights

---

*This is a personal project reflecting my approach to web development—thoughtful, performant, and a bit playful.*
