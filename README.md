# TeddyPups U.A.E. — Full-Stack Website Clone

A complete clone of [puppy.instabizweb.com](https://puppy.instabizweb.com/) — a premium teacup puppy adoption platform based in Downtown Dubai, UAE.

---

## ?? Live Preview

Run locally:
```bash
cd frontend
npm install
npm run dev
```
Visit ? **http://localhost:5173/**

---

## ?? Project Structure

```
InstaBiz/
+-- frontend/             # React + Vite frontend (main deliverable)
¦   +-- index.html        # SEO-ready entry (Open Graph, fonts, meta)
¦   +-- public/
¦   ¦   +-- brand/logo.png        # TeddyPups mascot logo
¦   ¦   +-- media/               # 150+ puppy photo/video assets
¦   +-- src/
¦       +-- App.jsx               # React Router v6 — all 8 routes
¦       +-- styles/index.css      # Design system: tokens, components
¦       +-- data/                 # Static JSON data (fallback)
¦       ¦   +-- puppies.json      # 25 puppies with full media & metadata
¦       ¦   +-- goneHome.json     # Adopted puppies
¦       ¦   +-- faqs.json         # FAQ content
¦       ¦   +-- testimonials.json # Happy families testimonials
¦       +-- services/api.js       # API client with local data fallback
¦       +-- components/
¦       ¦   +-- layout/           # AppLayout, SiteHeader, MobileMenu, SiteFooter, Curtain
¦       ¦   +-- common/           # PuppyCard, PuppyFilterBar, InquiryModal
¦       +-- pages/                # 8 pages: Home, Puppies, Detail, GoneHome, HappyFamilies, HowItWorks, FAQ, Contact
+-- backend/              # FastAPI optional backend
+-- docs/                 # Architecture & implementation docs
+-- scripts/              # Reference extraction utility scripts
```

---

## ?? Design System

Reverse-engineered from the reference site:

| Token | Value | Use |
|---|---|---|
| `--color-milk` | `#fffdf8` | Page background |
| `--color-cocoa` | `#2a170e` | Primary text, borders |
| `--color-honey` | `#f2be6b` | CTA highlight |
| `--color-toffee` | `#c2622b` | Links, accents, buttons |
| `--color-whatsapp` | `#25d366` | WhatsApp button |

**Fonts (Google Fonts):** Figtree (body) • Fraunces (display) • Shantell Sans (handwritten)

---

## ?? Pages

| Route | Page | Key Features |
|---|---|---|
| `/` | Home | Hero, featured puppies, journey steps, trust section, testimonials |
| `/puppies` | Available Puppies | Filter by breed/status/search, 25+ puppy cards |
| `/puppies/:slug` | Puppy Dossier | Media gallery, specs, inquiry modal, WhatsApp CTA |
| `/gone-home` | Gone Home | Vintage ticket-booth for adopted puppies |
| `/happy-families` | Happy Families | Testimonials wall |
| `/how-it-works` | Adoption Guide | In-Person vs Concierge Import pathways |
| `/faq` | FAQ | Accordion Q&A board |
| `/contact` | Contact | Letterhead-style form + showroom info |

---

## ? Technical Highlights

- **React 18** + **Vite 6** + **React Router v6** nested layout routes
- **Vanilla CSS** design system with CSS custom properties (no Tailwind)
- **Graceful degradation** — 100% functional offline with static JSON data
- **SEO ready** — title, meta description, Open Graph, Twitter cards
- **Pixel-perfect fidelity** — scalloped SVG header hem, paw nav indicator, tilt cards, vintage ticket design, SVG hill footer, curtain intro animation

---

## ?? Running Locally

```bash
cd frontend
npm install
npm run dev
```

**Production Build:**
```bash
cd frontend
npm run build
# Deploy frontend/dist/ to Netlify, Vercel, or any static host
```

---

## ??? Technologies

| Tech | Purpose |
|---|---|
| React 18 | UI components |
| Vite 6 | Build tool |
| React Router v6 | Client-side routing |
| Vanilla CSS | Styling |
| Google Fonts | Figtree, Fraunces, Shantell Sans |
| FastAPI (optional) | Backend API |
| Google Antigravity (Gemini) | AI-assisted development |

---

## ?? AI Tools Used

Built using **Google Antigravity** (Gemini AI):
1. Reference site HTML/CSS extraction via Python scripts
2. Design token extraction from CSS bundles
3. Puppy data parsing from Next.js RSC payloads
4. React component generation
5. Media asset mirroring (150+ photos/videos)

---

## ? Assignment Checklist

- ? Complete clone matching design, layout, responsiveness
- ? All 8 pages implemented
- ? 25 real puppy listings with actual photos/videos
- ? Filter, search, and sort functionality
- ? Individual puppy detail pages with media gallery
- ? Inquiry modal + WhatsApp integration
- ? Contact form (letterhead style)
- ? Mobile-responsive with off-canvas menu
- ? Curtain/splash intro animation
- ? SEO meta tags
- ? Production build ready

---

*TeddyPups U.A.E. clone — built as a full-stack development assignment.*
