# Reference Analysis: TeddyPups U.A.E. (Website Clone)

**Reference Website URL:** [https://puppy.instabizweb.com/](https://puppy.instabizweb.com/)  
**Inspection Date:** October 21, 2026  
**Auditor / Architect:** Senior Full-Stack Engineer  

---

## 1. Executive Summary & Brand Identity

TeddyPups U.A.E. is a luxury boutique pet agency based in Downtown Dubai specializing in miniature teacup puppies (Maltipoo, Korean Teacup Pomeranian, Toy Poodle, Cavapoo, Shih Tzu, and Bichon Frise). The brand combines a warm, storybook aesthetic ("every puppy is family") with high-trust concierge adoption services.

The design features:
- Handcrafted, plush, and scrapbook aesthetic with organic shapes and paper tilts.
- Scalloped hem banners and headers (`tp-hem` and `tp-curtain-scallop`).
- Animated SVG mascots ("Teddy" running puppy with interactive states and paw prints).
- Refined typography blending serif display fonts, soft rounded hand lettering, and modern sans-serif body copy.
- A comforting cream, honey, toffee, and dark cocoa palette.

---

## 2. Route & Page Inventory

| Route | Page Title | Primary Purpose | Key Features |
|---|---|---|---|
| `/` | **Home** | Brand introduction, hero, available puppies preview, adoption paths, trust badges, happy families preview, FAQ preview, footer. | Running curtain intro animation, hero banner, dual adoption routes (Local Showroom vs International Import), featured puppies, trust points. |
| `/puppies` | **Available Puppies** | Complete puppy catalog with live inventory. | Breed and category filters, sketched puppy cards with tilt animations, badges ("Boy"/"Girl", "Available", "Reserved", "Import"), direct inquiry actions. |
| `/puppies/:slug` | **Puppy Detail** | Individual puppy dossier and inquiry view. | High-res photo gallery, age, breed, gender, microchip/vaccination checklist, health guarantee details, and inquiry drawer/form. |
| `/gone-home` | **Gone Home** | Archive of adopted puppies in their forever homes. | "Tickets Home" booth motif featuring interactive mascot Teddy, vintage admit-one ticket cards for 22+ adopted puppies. |
| `/happy-families` | **Happy Families** | Customer social proof and photo gallery. | "Wall of Happy Endings" photo collage showcasing adopted puppies with Dubai families, reviews, and heartwarming milestones. |
| `/how-it-works` | **How It Works** | Comprehensive adoption guide. | Step-by-step concierge process: visiting the Downtown Dubai showroom vs ordering upon request from certified breeders, vetting, cargo, 24/7 post-adoption care. |
| `/faq` | **FAQ** | Frequently asked questions. | 9 categorized accordion cards styled as pinned notes on a board covering health, travel, guarantees, visits, and reservations. |
| `/contact` | **Visit & Contact** | Showroom visit scheduling and inquiry letter. | Unique "Dear TeddyPups" letter-style interactive form, Downtown Dubai showroom address, WhatsApp direct link, phone & email contacts. |

---

## 3. Section-by-Section Breakdown

### 3.1 Global Header & Navigation (`<header class="tp-header">`)
- **Brand Identity:** Circular puppy brand emblem (`/brand/logo.png`), "TeddyPups" wordmark set in Fraunces Plush.
- **Desktop Navigation:** Navigation links (`Home`, `Puppies`, `Happy families`, `How it works`, `FAQ`, `Visit & contact`) with an animated puppy paw print icon indicator on active state.
- **Action Buttons:** WhatsApp direct CTA button (`btn-whatsapp`) linking to `https://wa.me/971541676733`.
- **Hem Detail:** Decorative SVG scalloped edge (`tp-hem`) underlining the entire navbar with stitch detailing.
- **Mobile Menu:** Fullscreen animated drawer dialog with oversized plush links, contact information, and quick WhatsApp launcher.

### 3.2 Intro Curtain (`<div class="tp-curtain">`)
- Animated warm blanket top/bottom scalloped border.
- Animated running Teddy mascot SVG accompanied by paw prints appearing in sequence.
- Brand motto: *"every puppy is family"*.

### 3.3 Home Page (`/`)
1. **Hero Section:**
   - Badge: *"Premium teacup puppies in Dubai"*.
   - Headline: *"Meet your new best friend in our Dubai showroom, or order a rare miniature breed from trusted breeders worldwide."*
   - CTA Buttons: "Meet the puppies" (primary honey/toffee pill button) and "How it works" (outlined cocoa button).
   - Trust highlights: Real photos, verified health certificates, Downtown Dubai showroom.
2. **Meet the Pups (Showcase):**
   - Live inventory preview cards with dynamic tilts, status pills, and gender labels.
3. **Two Ways to Meet Your Puppy:**
   - Card 1: *Puppies in Dubai* — Visit local puppies face-to-face in Downtown Dubai.
   - Card 2: *Imported for You* — Concierge import from premier international breeders in Korea and Europe.
4. **Your Puppy Journey (3-Step Guide):**
   - 1. Choose your breed -> 2. Get photos & health details -> 3. Secure & safe delivery.
5. **Why Families Trust TeddyPups:**
   - Veterinary health certification, licensed vaccines, microchipping, 24/7 post-adoption care.
6. **Happy Families Snippet & FAQ Snippet:**
   - Carousel/grid of client photos and quick expandable questions.
7. **Showroom Visit & Footer:**
   - Downtown Dubai showroom map card, visiting hours (10:00 AM – 10:00 PM), contact details.

### 3.4 Puppies Catalog (`/puppies`)
- Header: *"Available puppies — from Teddy's sketchbook"*.
- Category Filters:
  - *All*, *Maltipoo*, *Korean Teacup*, *Toy Poodle*, *Pomeranian*, *Shih Tzu*, *Cavapoo*, *Bichon*.
- Card Layout:
  - Organic rounded rectangular photo masks with subtle random tilts (`--tilt: 0.36deg`, `-1.2deg`).
  - Badges: Gender pill (Boy/Girl), Age (e.g. 3 months), Status (Available / Reserved).
  - Hover effects: Smooth elevation, shadow deepen, puppy photo slight scale.
  - Link to `/gone-home` ticket booth for adopted puppies.

### 3.5 Puppy Detail Page (`/puppies/:slug`)
- Breadcrumbs: Home / Puppies / [Puppy Name].
- Gallery: Main high-resolution image viewer with thumbnail selector and video placeholder.
- Key Specs: Breed, Gender, Estimated Adult Weight, DOB / Age, Origin (Local / Korea Import), Color.
- Health Records: Vaccinations up to date, Microchip registered, Dewormed, International Pet Passport.
- Action Buttons: "Reserve on WhatsApp", "Ask About [Name]" opening inquiry form.
- Related Puppies carousel.

### 3.6 Gone Home Page (`/gone-home`)
- Header: *"Gone home — tickets home"*.
- Mascot Illustration: Teddy puppy sitting inside ticket booth.
- Vintage Ticket Stubs:
  - Perforated ticket cards with "Admit One" tear-off stub, puppy portrait, name, breed, and destination route `"TeddyPups -> home ♥"`.

### 3.7 Happy Families Page (`/happy-families`)
- Header: *"Happy families — our wall of happy endings"*.
- Stat counter: *"64 moments and counting — every one of them was a Teddy Pup once"*.
- Masonry gallery with polaroid borders, customer quotes, and captions.

### 3.8 How It Works Page (`/how-it-works`)
- Dual journey pathways:
  1. *Meet in Person in Dubai*: Browse -> Schedule visit -> Bond -> Same-day homecoming.
  2. *Order Upon Request*: Sourcing -> Health vetting -> Flight & customs -> VIP airport collection.
- Logistics & Cargo info, travel crates, veterinary documentation.

### 3.9 FAQ Page (`/faq`)
- Corkboard/pinboard theme: *"9 notes on the board"*.
- 9 expandable accordions with smooth spring animations.

### 3.10 Visit & Contact Page (`/contact`)
- Letterhead Form: *"Dear TeddyPups, my name is [name]..."* with inline input fields for name, phone, email, location, puppy preference dropdown, and custom message.
- Downtown Dubai location details, Google Map embed card, WhatsApp direct link.

### 3.11 Global Footer
- Nighttime hill landscape silhouette (`tp-footer__hill`) with glowing moon and animated twinkle stars.
- Sleeping puppy mascot in basket (`tp-basket`).
- Quick navigation links, showroom address, email (`teddypupsadmin@gmail.com`), phone (`+971 54 167 6733`).
- Copyright and licensing notice.

---

## 4. Design Tokens & Typography

### 4.1 Typography
- **Headings & Brand Title:** `Fraunces`, `serif` (variable weight 400–800, soft display warmth)
- **Body & Controls:** `Figtree`, `sans-serif` (clean, contemporary, highly legible)
- **Handwritten / Accents:** `Shantell Sans`, `cursive` (whimsical notes, tags, scrapbook labels)

### 4.2 Color Palette
```css
:root {
  --color-milk: #fffdf8;         /* Canvas background */
  --color-cocoa: #2a170e;        /* Dark brand ink */
  --color-cocoa-soft: #5a3a28;   /* Secondary muted text */
  --color-honey: #f2be6b;        /* Primary warm accent */
  --color-honey-soft: #fbe3b4;   /* Light honey tint / borders */
  --color-toffee: #c2622b;       /* Button CTA / rich rust */
  --color-toffee-deep: #a24a1a;  /* Hover state for buttons */
  --color-blush: #f9cdbf;        /* Soft rosy highlight */
  --color-sky: #bfddf5;          /* Fresh sky blue accent */
  --color-sky-deep: #2f6e9e;     /* Deep sky blue text */
  --color-whatsapp: #25d366;     /* Official WhatsApp CTA */
}
```

### 4.3 Shapes, Borders & Shadows
- **Card Border Radius:** `1.5rem` to `2.5rem` (`rounded-3xl` / `rounded-[2rem]`)
- **Button Border Radius:** `9999px` (`rounded-full`)
- **Card Borders:** `2px solid var(--color-cocoa)` or `1px solid var(--color-honey-soft)`
- **Shadows:** Hard hand-drawn shadow offset `3px 4px 0px var(--color-cocoa)` for whimsical pop.

---

## 5. Interaction Inventory

1. **Curtain Intro:** Runs on first page load; puppy runs across screen leaving paw prints; fades out smoothly.
2. **Sticky Header:** Hides on scroll down, reveals on scroll up (`data-scrolled="true"`, `data-hidden="true/false"`).
3. **Mobile Drawer Menu:** Triggered by hamburger button; opens full-screen accessible dialog with plush typography.
4. **Puppy Filters:** Instant client-side and API-driven filtering by breed, gender, and status without page reload.
5. **Puppy Detail Modal / Route:** View all photos, video preview, medical records, and one-click WhatsApp reserve.
6. **FAQ Accordion:** Click on pin note toggles answer with animated height expansion.
7. **Contact Form:** Interactive letter with real-time validation, character counting, and API submission.
8. **WhatsApp Integration:** Auto-formatted pre-filled message according to the specific puppy being viewed.

---

## 6. Responsive Breakpoint Plan

- **Desktop (1440 × 900):** Max container width `110rem` (1760px), 3-column or 4-column puppy grid, full dual-track showroom/import layout.
- **Laptop (1366 × 768):** 3-column puppy grid, full navbar links visible.
- **Tablet (768 × 1024):** 2-column puppy grid, condensed header, mobile drawer hamburger menu becomes active.
- **Mobile (390 × 844):** Single-column stacked cards, full-width buttons, bottom safe area padding, touch-optimized dialog drawer.
