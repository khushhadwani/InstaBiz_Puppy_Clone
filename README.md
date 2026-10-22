# TeddyPups U.A.E. — Full-Stack Technical Assignment Clone

> High-fidelity, full-stack clone of [TeddyPups U.A.E.](https://puppy.instabizweb.com/) — Dubai's premier teacup puppy adoption and concierge platform. Built with React 18, Vite 6, Vanilla CSS Design System, and FastAPI with SQLite/SQLAlchemy.

---

## Table of Contents
1. [Overview and Reference Website](#overview-and-reference-website)
2. [Key Features and Implemented Pages](#key-features-and-implemented-pages)
3. [Architecture and Project Structure](#architecture-and-project-structure)
4. [Tech Stack](#tech-stack)
5. [Design System and Tokens](#design-system-and-tokens)
6. [Local Quickstart Guide](#local-quickstart-guide)
7. [Backend API Documentation](#backend-api-documentation)
8. [Deployment Guide](#deployment-guide)
9. [Loom Video Presentation Script and Guide](#loom-video-presentation-script-and-guide)

---

## Overview and Reference Website

- **Reference Target:** [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)
- **Platform Identity:** TeddyPups U.A.E. (Downtown Dubai showroom & rare import teacup concierge).
- **Brand Motto:** *"every puppy is family"*
- **Target Fidelity:** 100% clone matching layout, animations, typography, color palette, responsive behaviors, media gallery, and live inquiry features.

---

## Key Features and Implemented Pages

### 1. Home Page (`/`)
- **Hero Banner:** Custom SVG cloud badges, luxury headline, direct CTA navigation.
- **Featured Sketches Carousel:** Interactive puppy polaroid cards with organic tilt transformations (`--tilt`).
- **Dual Adoption Pathways:** "Puppies in Dubai" vs "Order Upon Request" (South Korea & Europe imports).
- **Interactive Adoption Steps:** 4-stage adoption roadmap.
- **Happy Family Testimonials & FAQ Teasers:** Real customer reviews with authentic photography.

### 2. Available Puppies Gallery (`/puppies`)
- **Live Breed Filter Pills:** Dynamic filtering for *All Breeds*, *Maltipoo*, *Korean Teacup*, *Toy Poodle*, *Pomeranian*, *Shih Tzu*, and *Cavapoo*.
- **Status Filter:** Filter by *All Status*, *Available Now*, and *Reserved*.
- **Real-time Search:** Instant debounced search filtering by name or breed.
- **URL Search Param Sync:** Links like `/puppies?breed=maltipoo` automatically preset filters.
- **Empty State Gracefulness:** Friendly sketch illustration with instant "Reset Filters" action.

### 3. Puppy Detail Storybook (`/puppies/:slug`)
- **Chapter 1: "hello, it's me":** High-resolution video and photo carousel with interactive thumbnail selector.
- **Puppy Tag Board:** Teddy mascot peek banner, available badge, breed specs, age, gender, and origin.
- **Direct WhatsApp Reservation:** Pre-formatted WhatsApp deep links directing to concierge with puppy details.
- **Chapter 2: "what comes with [Name]":** Health guarantees (vaccination, deworming, vet certificate, health check).
- **Chapter 3: "the way home":** Visual step-by-step onboarding pipeline.
- **Sequential Navigation:** Previous pup & Next pup navigation cards matching the original website.
- **Inquiry Modal:** Interactive modal with form validation to reserve or schedule showroom viewing.

### 4. Gone Home Ticket Booth (`/gone-home`)
- **Departure Board:** 24 adorable teacup puppy tickets showing adopted dates, family destinations, and photos.

### 5. Happy Families Community (`/happy-families`)
- **Testimonial Wall:** Real photographs and heartfelt stories from pet parents across Palm Jumeirah, Downtown Dubai, and Dubai Marina.

### 6. How Adoption Works (`/how-it-works`)
- **Comprehensive Guide:** Explains the showroom viewing experience vs. VIP white-glove international import workflow.

### 7. Frequently Asked Questions (`/faq`)
- **Interactive Accordion:** Accordion items grouped into Health & Care, Adoption Process, and Import & Delivery.

### 8. Visit & Contact (`/contact`)
- **Showroom Location:** Downtown Dubai details, opening hours, WhatsApp direct line, and interactive contact inquiry letter.

---

## Architecture and Project Structure

```
InstaBiz/
├── frontend/                     # React 18 SPA (Vite 6)
│   ├── public/
│   │   ├── brand/                # TeddyPups logo and favicon assets
│   │   ├── media/                # 72+ extracted puppy photos and MP4 videos
│   │   ├── _redirects            # Netlify SPA rewrite configuration
│   │   └── vercel.json           # Vercel SPA rewrite configuration
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/           # PuppyCard, PuppyFilterBar, InquiryModal
│   │   │   └── layout/           # SiteHeader, SiteFooter, MobileMenu, AppLayout
│   │   ├── data/                 # JSON fallback data (puppies, faqs, goneHome, etc.)
│   │   ├── pages/                # 8 fully functional view pages
│   │   ├── services/             # api.js (backend-first with offline JSON fallback)
│   │   ├── styles/               # index.css (complete design system & tokens)
│   │   ├── App.jsx               # React Router v6 routing table
│   │   └── main.jsx              # React DOM mounting
│   ├── index.html                # Google Fonts, Open Graph, SEO meta tags
│   ├── package.json              # Vite & React dependencies
│   └── vite.config.js            # Build optimization configuration
│
├── backend/                      # FastAPI REST API (Python 3)
│   ├── app/
│   │   ├── core/                 # App configuration & settings
│   │   ├── database/             # SQLite session & JSON seed dataset
│   │   ├── models/               # SQLAlchemy ORM models (Puppy, Media, Inquiry, Contact)
│   │   ├── schemas/              # Pydantic validation schemas
│   │   └── main.py               # FastAPI application, CORS, static routes & endpoints
│   ├── requirements.txt          # Python packages (FastAPI, Uvicorn, SQLAlchemy)
│   └── .env.example              # Environment variables template
│
├── scripts/                      # Data extraction, verification, & testing scripts
│   ├── reparse_puppies_clean.py  # Clean puppy extraction pipeline
│   ├── verify_media.py           # Integrity checker for all 72 media items
│   ├── test_filters.py           # Verification script for breed filters
│   └── test_api_endpoints.py     # Backend REST API test suite
│
├── README.md                     # Technical documentation & submission guide
└── .gitignore                    # Git ignore rules
```

---

## Tech Stack

### Frontend
- **Core:** React 18, React DOM 18
- **Build Tool:** Vite 6 (ultra-fast HMR and optimized production bundles)
- **Routing:** React Router DOM v6
- **Styling:** Vanilla CSS with comprehensive CSS custom properties (Design System)
- **Typography:** Figtree (Body), Fraunces (Headings), Shantell Sans (Handwritten accent)

### Backend
- **Framework:** FastAPI (Modern, high-performance async Python web framework)
- **Server:** Uvicorn (ASGI web server)
- **ORM:** SQLAlchemy 2.0 with SQLite database
- **Data Validation:** Pydantic v2
- **Storage:** Static file streaming for media assets

---

## Design System and Tokens

Defined centrally in `frontend/src/styles/index.css`:

```css
:root {
  --color-milk: #fffdf8;
  --color-milk-pure: #ffffff;
  --color-cocoa: #2a170e;
  --color-cocoa-soft: #5a4234;
  --color-honey: #f2be6b;
  --color-honey-soft: #faeedb;
  --color-toffee: #c2622b;
  --color-toffee-deep: #8f3d14;
  --color-rose: #f08a9d;
  --color-rose-soft: #fae0e5;
  --color-mint: #2e8b57;
  --color-mint-soft: #e2f4ea;
  
  --font-plush: 'Fraunces', serif;
  --font-body: 'Figtree', sans-serif;
  --font-scrawl: 'Shantell Sans', cursive;
  
  --shadow-hard: 4px 5px 0px var(--color-cocoa);
  --shadow-soft: 0 10px 30px rgba(42, 23, 14, 0.08);
  
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;
  --radius-full: 9999px;
}
```

---

## Local Quickstart Guide

### 1. Prerequisites
- Node.js (v18 or higher) & npm
- Python (v3.10 or higher)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
API documentation is available at [http://localhost:8000/docs](http://localhost:8000/docs).

---

## Backend API Documentation

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Service health status check |
| `GET` | `/api/puppies` | List puppies with filters (`breed`, `status`, `gender`, `search`) |
| `GET` | `/api/puppies/{slug}` | Full puppy dossier with photos and video gallery |
| `GET` | `/api/gone-home` | List of 24 adopted departure tickets |
| `GET` | `/api/faqs` | FAQs categorized by topic |
| `GET` | `/api/testimonials` | Client reviews and photographs |
| `GET` | `/api/site-config` | Store hours, phone, email, WhatsApp, and showroom address |
| `POST` | `/api/inquiries` | Submit puppy reservation or inquiry request |
| `POST` | `/api/contact` | Submit contact showroom letter |

---

## Deployment Guide

### Option 1: Vercel (Recommended)
1. Fork or push this repository to GitHub.
2. In Vercel, click **Add New Project** and import your repository.
3. Configure the build settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Vercel will deploy with automatic HTTPS and SPA routing enabled via `vercel.json`.

### Option 2: Netlify
1. Connect repository on Netlify.
2. Set base directory to `frontend`, build command to `npm run build`, and publish directory to `frontend/dist`.
3. SPA routing is automatically handled by `frontend/public/_redirects`.

---

## Loom Video Presentation Script and Guide

Use this structured walkthrough for your Loom recording:

### 1. Introduction (0:00 - 0:45)
- Introduce yourself and state the purpose: Complete Full-Stack clone of [TeddyPups U.A.E.](https://puppy.instabizweb.com/).
- Highlight that the goal was to achieve 100% fidelity across visual design, typography, responsiveness, media assets, and full-stack API integration.

### 2. Project Architecture & Technologies (0:45 - 2:00)
- **Frontend:** React 18, Vite 6, React Router DOM v6.
- **Design Philosophy:** Clean Vanilla CSS with a centralized tokenized design system (no generic Tailwind utility clutter), honoring exact brand colors, Fraunces serif headings, Figtree body, and Shantell Sans handwritten accents.
- **Backend:** FastAPI (Python), SQLAlchemy, and SQLite database with automatic seed data initialization and full CORS configuration.
- **Dual-Mode Data Layer:** The frontend utilizes a backend-first API architecture with local JSON caching as a resilient fallback.

### 3. Live Feature Demonstration (2:00 - 4:30)
- **Home Page:** Show the cloud badges, mascot headers, polaroid cards with organic tilt transformations, and testimonials.
- **Available Puppies & Dynamic Filters:** Demonstrate clicking breed pills (*Maltipoo*, *Korean Teacup*, *Toy Poodle*, *Pomeranian*, *Shih Tzu*, *Cavapoo*). Show how instant search and status toggles work seamlessly.
- **Puppy Detail Page:** Open a puppy profile (e.g., Max). Showcase the 4 chapters:
  1. *hello, it's me* — high-res video player and photo gallery selector.
  2. *what comes with Max* — veterinary health guarantee checklist.
  3. *the way home* — 4-step adoption and import roadmap.
  4. *Previous/Next Pup* navigation links.
  5. *Inquiry Modal & WhatsApp reservation* integration.
- **Additional Pages:** Quickly walk through *Gone Home* ticket booth, *Happy Families*, *How It Works*, *FAQ accordion*, and *Visit & Contact*.

### 4. Technical Challenges & Implementation Decisions (4:30 - 6:00)
- **Data Extraction & Media Integrity:** The reference site used Next.js RSC stream payloads. We extracted exact puppy records and downloaded 72+ media assets locally to guarantee zero broken image dependencies.
- **Corrupted Array Bug Resolution:** Identified that early scrapers mixed raw media chunks into the puppy array, resulting in fallback bear images and filter crashes. Resolved by building a clean parser that sanitizes fields and validates all 15 real puppy listings.
- **Null-Safe Filter Matching:** Implemented multi-field matching (breed, slug, sub-breed arrays) to ensure every breed filter reliably matches its corresponding puppies without runtime errors.
- **SPA Routing Configuration:** Created `_redirects` and `vercel.json` rules so direct navigation and page reloads never produce 404 errors in production.

### 5. AI Pair-Programming Tools Used (6:00 - 6:45)
- Used AI code assistants for rapid design system extraction, RSC stream parsing, regex data cleaning, and writing unit test suites for API validation.

### 6. Conclusion (6:45 - 7:00)
- Summary of accomplishments: Full-stack codebase, zero console errors, 100% visual fidelity, fully documented, and production ready.
