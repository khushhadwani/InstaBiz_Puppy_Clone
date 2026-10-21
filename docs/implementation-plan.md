# Implementation Plan: TeddyPups U.A.E. Full-Stack Clone

This plan outlines the component architecture, data flow, responsive strategies, and backend API integration required to reproduce `https://puppy.instabizweb.com/` with 100% fidelity.

---

## 1. Technical Stack Overview

### Frontend Architecture
- **Framework:** React 18 + Vite (fast HMR, lightweight, pure ESM)
- **Routing:** React Router v6 (`createBrowserRouter` / `BrowserRouter`)
- **Styling:** Modular CSS3 + Custom CSS Variables + Responsive Flexbox/Grid
- **Icons:** SVG vector paths matching original references + Lucide React icons
- **State Management:** React Context API + custom hooks (`usePuppies`, `useInquiry`)

### Backend Architecture
- **Language / Runtime:** Python 3.14 / 3.11+
- **Web Framework:** FastAPI (high performance ASGI, auto OpenAPI/Swagger documentation)
- **Data Validation & Serialization:** Pydantic v2
- **ORM & Data Layer:** SQLAlchemy 2.0
- **Database Engine:** MySQL (with transparent SQLite development fallback if local MySQL credentials are not supplied)
- **Server:** Uvicorn ASGI server

---

## 2. Page & Component Mapping

| Reference Page / Section | Implementation Component | File Path | Responsibilities |
|---|---|---|---|
| **Global Layout** | `AppLayout` | `src/components/layout/AppLayout.jsx` | Houses `<SiteHeader />`, `<Curtain />`, page transitions, and `<SiteFooter />`. |
| **Scalloped Sticky Header** | `SiteHeader` | `src/components/layout/SiteHeader.jsx` | Logo, brand name in plush font, navigation links with active paw indicator, WhatsApp CTA button, mobile drawer toggle. |
| **Intro Curtain Animation** | `Curtain` | `src/components/layout/Curtain.jsx` | Animated blanket with scallop borders, running puppy SVG mascot with paw prints, dismiss animation. |
| **Global Footer** | `SiteFooter` | `src/components/layout/SiteFooter.jsx` | Night sky with twinkling stars, glowing moon, sleeping puppy in basket SVG, showroom info, copyright. |
| **Mobile Navigation Dialog** | `MobileMenu` | `src/components/layout/MobileMenu.jsx` | Accessible modal dialog drawer with plush font links and quick actions. |
| **Home Page** | `HomePage` | `src/pages/HomePage.jsx` | Orchestrates Hero, Showcase, Dual Adoption Paths, Trust Points, Testimonials, FAQ preview. |
| ↳ *Hero Section* | `HeroSection` | `src/components/sections/home/HeroSection.jsx` | Bold headline, value badges, dual action buttons, animated decorative background. |
| ↳ *Puppy Showcase* | `PuppyShowcase` | `src/components/sections/home/PuppyShowcase.jsx` | Highlighted puppy cards with tilts, gender badges, and "Meet All Puppies" button. |
| ↳ *Two Ways to Meet* | `AdoptionPaths` | `src/components/sections/home/AdoptionPaths.jsx` | Interactive comparison between local Dubai showroom visit and VIP Korean/European import. |
| ↳ *Adoption Journey* | `JourneySteps` | `src/components/sections/home/JourneySteps.jsx` | 3-step illustrated walkthrough of the adoption lifecycle. |
| ↳ *Trust & Guarantee* | `TrustBadges` | `src/components/sections/home/TrustBadges.jsx` | Veterinary health check, licensed vaccines, international microchip. |
| **Available Puppies** | `PuppiesPage` | `src/pages/PuppiesPage.jsx` | Category filter bar, search input, responsive grid of puppy cards, link to `/gone-home`. |
| ↳ *Puppy Card* | `PuppyCard` | `src/components/common/PuppyCard.jsx` | Organic frame, photo cover, status badge, tilt angle, age, breed, gender pill. |
| ↳ *Puppy Filter Bar* | `PuppyFilterBar` | `src/components/common/PuppyFilterBar.jsx` | Filter pills by breed (Maltipoo, Poodle, Pomeranian, etc.) and availability status. |
| **Puppy Detail** | `PuppyDetailPage` | `src/pages/PuppyDetailPage.jsx` | Full photo gallery, medical specs, passport status, import timeline, inquiry sheet. |
| ↳ *Inquiry Form* | `InquiryModal` | `src/components/common/InquiryModal.jsx` | Form allowing users to ask questions or reserve puppy, submitting to FastAPI backend. |
| **Gone Home** | `GoneHomePage` | `src/pages/GoneHomePage.jsx` | "Tickets Home" booth, interactive Teddy mascot, vintage admit-one ticket cards. |
| **Happy Families** | `HappyFamiliesPage` | `src/pages/HappyFamiliesPage.jsx` | Masonry photo wall of 64 client moments, testimonial quotes, family stories. |
| **How It Works** | `HowItWorksPage` | `src/pages/HowItWorksPage.jsx` | In-depth breakdown: in-person showroom protocol, overseas sourcing, flight crate safety, 24/7 care. |
| **FAQ** | `FaqPage` | `src/pages/FaqPage.jsx` | Pinned-note corkboard layout with 9 interactive spring accordions. |
| **Visit & Contact** | `ContactPage` | `src/pages/ContactPage.jsx` | Personalized "Dear TeddyPups" letter contact form, showroom map embed, business hours. |

---

## 3. Backend & Database Architecture

### 3.1 REST API Endpoints (FastAPI)

1. `GET /api/health` — Health check endpoint.
2. `GET /api/puppies` — List all puppies with optional query params (`breed`, `gender`, `status`, `featured`).
3. `GET /api/puppies/{slug}` — Retrieve full profile of a single puppy including media and records.
4. `GET /api/gone-home` — List adopted puppies with family tickets.
5. `GET /api/testimonials` — List happy family stories and moments.
6. `GET /api/faqs` — List FAQ items grouped by category.
7. `POST /api/inquiries` — Create a puppy inquiry or consultation booking. Validated with Pydantic; persists to MySQL.
8. `POST /api/contact` — Submit the "Dear TeddyPups" contact letter form. Validated and persisted.

### 3.2 Database Schema (MySQL)

```sql
CREATE TABLE IF NOT EXISTS puppies (
    id VARCHAR(36) PRIMARY KEY,
    slug VARCHAR(120) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    breed VARCHAR(100) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    gender_label VARCHAR(20) NOT NULL,
    age VARCHAR(50) NOT NULL,
    colour VARCHAR(50),
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'available',
    featured BOOLEAN DEFAULT FALSE,
    origin VARCHAR(50) DEFAULT 'local',
    cover_image_url VARCHAR(500) NOT NULL,
    cover_focal_x FLOAT DEFAULT 0.5,
    cover_focal_y FLOAT DEFAULT 0.5,
    cover_bg_color VARCHAR(20) DEFAULT '#785838',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS puppy_media (
    id VARCHAR(36) PRIMARY KEY,
    puppy_id VARCHAR(36) NOT NULL,
    url VARCHAR(500) NOT NULL,
    kind VARCHAR(20) DEFAULT 'image',
    width INT,
    height INT,
    alt_text VARCHAR(255),
    display_order INT DEFAULT 0,
    FOREIGN KEY (puppy_id) REFERENCES puppies(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    puppy_id VARCHAR(36),
    puppy_name VARCHAR(100),
    customer_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    city VARCHAR(100),
    message TEXT,
    inquiry_type VARCHAR(50) DEFAULT 'general',
    status VARCHAR(30) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (puppy_id) REFERENCES puppies(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_name VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    city VARCHAR(100),
    puppy_interest VARCHAR(100),
    letter_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Execution Phases & Milestones

1. **Phase 1: Reconnaissance & Planning (Completed)**
   - Analyze pages, extract design tokens, fonts, SVG icons, and complete puppies data stream.
   - Author `docs/reference-analysis.md` and `docs/implementation-plan.md`.
2. **Phase 2: Architecture & Project Scaffolding**
   - Create `website-clone/` with `frontend/` (React/Vite) and `backend/` (FastAPI/SQLAlchemy).
   - Write `docs/architecture.md`.
3. **Phase 3: Visual Design System & Asset Integration**
   - Configure Google Fonts (Fraunces, Figtree, Shantell Sans).
   - Implement `index.css` design tokens, scalloped SVG borders, button utilities, mascot SVGs.
   - Bundle local optimized images in `frontend/public/`.
4. **Phase 4: Component & Page Implementation**
   - Build Header, Footer, Intro Curtain, Mobile Drawer.
   - Implement all 6 main routes + detail route + gone-home route.
   - Implement Puppy Catalog filters and "Dear TeddyPups" letter form.
5. **Phase 5: Responsive Layout & Mobile Fidelity**
   - Validate desktop (1440x900), laptop (1366x768), tablet (768x1024), and mobile (390x844).
6. **Phase 6: FastAPI Backend & MySQL Database Integration**
   - Build FastAPI REST routes, SQLAlchemy models, Pydantic schemas, and seed database.
   - Connect frontend API client with fallback caching.
7. **Phase 7: Testing, Verification & Testing Report**
   - Verify all endpoints, forms, routes, and responsive layouts.
   - Author `docs/testing-report.md`.
8. **Phase 8: Comprehensive Documentation & AI History**
   - Author `README.md`, `docs/ai-workflow.md`, `docs/ai-prompt-sequence.md`.
9. **Phase 9: Git & GitHub Preparation**
   - Initialize git, configure `.gitignore`, prepare atomic commits.
10. **Phase 10: Deployment Preparation**
    - Vercel/Netlify configuration for frontend, ASGI production guide.
11. **Phase 11: Loom Recording Script**
    - Author `docs/loom-script.md`.
12. **Phase 12: Technical Interview Preparation**
    - Author `docs/interview-preparation.md`.
