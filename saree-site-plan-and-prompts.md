# Saree Showcase & Store — Professional Plan + Build Prompts

Working name: **Swavani** *(taken from your folder name `Swavani_Ecommerce`; replace `{{STORE_NAME}}` everywhere if different)*
Stack: **Next.js (App Router) + TypeScript + Tailwind + Three.js/R3F + GSAP + Lenis**

> Note: I could not open your two local files (`photo_2026-09-29…jpg` = logo, `Indian Saree Shopify Website Design.jpg` = template). Upload them in chat and I will lock the exact logo colours. Until then, the palette below is the one we already built in the hero page (silk maroon + zari gold + cream).

---

## 1. Concept: "The Living Silk Boutique"

One idea drives everything: **the whole site behaves like silk being unfolded, draped and revealed.**
Curtain opens → fabric ripples in the hero → scrolling unrolls a saree ribbon → cards tilt like hanging fabric → product page lets you turn and zoom the weave.

Mood: royal, warm, tactile, festive but not loud. Feels like walking into a heritage boutique, not a marketplace.

Signature motifs (reuse everywhere so the site feels designed, not templated):
- **Cusped Indian arch** (panel shapes, image frames, modal shapes)
- **Lotus** (loader, section dividers, wishlist icon, cursor)
- **Gold vine border** (page edges, section headers)
- **Paisley / kolam / temple-border** patterns (backgrounds at 4–6% opacity)
- **Zari gold line** (1px gold hairlines with a moving shine)

---

## 2. Colour system

Core palette (from your hero page; will be re-checked against your logo):

| Token | Hex | Use |
|---|---|---|
| `--silk-deep` | `#3A0615` | Deepest shadow, **all borders**, footer, text on cream |
| `--silk` | `#5C0F27` | Main brand surface (header, frames, hero frame) |
| `--silk-light` | `#7D1A38` | Silk highlight, hover surfaces, gradient top |
| `--silk-sheen` | `#A83A5A` | Sheen bands only (never text) |
| `--cream` | `#F4E8D4` | Main content background, cards |
| `--cream-warm` | `#EDDCC0` | Alternate sections, image mats |
| `--ivory` | `#FBF5EA` | Lightest surface, inputs, modals |
| `--zari` | `#B8925A` | Gold headings on cream, borders, icons |
| `--zari-bright` | `#D9B26D` | Gold on maroon (nav, lines, ornaments) |
| `--ink` | `#3A2A26` | Body text on cream |

Accent colours (small doses, for categories, badges and variant swatches so the site is not only red + gold):

| Token | Hex | Use |
|---|---|---|
| `--peacock` | `#0F5C63` | "New arrivals" badge, links on hover in editorial blocks |
| `--emerald` | `#1F6B4A` | "In stock", success |
| `--saffron` | `#D98324` | Festival/sale ribbon |
| `--indigo` | `#2B2F6B` | Bridal / night collection sections |
| `--rose` | `#C24B6B` | Wishlist heart, low-stock alert |

Gradients and materials:
- **Silk surface:** layered gradient = diagonal sheen bands + 1px thread lines + fine noise + vertical base gradient (`--silk-light → --silk → --silk-deep`). Already prototyped; move into a `.silk` utility class and a shader version for WebGL.
- **Zari gold text/lines:** `linear-gradient(100deg, #B8925A, #F1D9A0 45%, #B8925A)` with a slow shine sweep on hover.
- **Elevation:** shadows are warm and dark red-brown (`rgba(58,6,21,.25)`), never grey.

Rules:
- Gold text on cream only at large sizes (headings 24px+); body copy is `--ink`. Verify contrast with a checker.
- Cream text on maroon for body/nav on dark areas.
- Max 1 accent colour per section.
- Dark sections: alternate every 2–3 sections so the page has rhythm (cream → silk → cream → indigo → cream → deep footer).

---

## 3. Typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | **Cinzel** | Uppercase, letter-spacing .05em |
| Editorial / quotes / prices | **Cormorant Garamond** | Italic for taglines |
| UI / nav / buttons / body | **Montserrat** | Nav caps 11–12px, letter-spacing .06em |
| Optional Tamil | **Noto Serif Tamil** | Only if the store wants a bilingual toggle |

Load with `next/font` (self-hosted, no layout shift).
Scale: fluid `clamp()` for h1–h3; body 16–18px; line-height 1.6.

---

## 4. Motion & 3D language (the "wow" list)

Each item has a fallback so the site stays fast and accessible.

| # | Moment | How | Fallback |
|---|---|---|---|
| 1 | **Opening: silk curtains part** on a drawing lotus + wordmark, then the page settles in | Phase A: CSS/GSAP curtains (already built). Phase B: WebGL cloth shader that ripples and splits along the seam | CSS curtains; `prefers-reduced-motion` = quick fade |
| 2 | **Hero: floating silk** — a fabric plane with wave displacement reacting to mouse/gyro; gold zari dust particles | R3F plane + custom vertex/fragment shader, saree texture map | Static hero image with slow parallax |
| 3 | **Scroll: the saree unrolls** — pinned section where a fabric ribbon unrolls as you scroll, revealing collections one by one | GSAP ScrollTrigger + R3F ribbon (or SVG mask on a long image) | Vertical stack of collection cards |
| 4 | **Collections carousel** with 3D tilt cards and depth (front card sharp, back cards blurred) | CSS 3D transforms + GSAP Draggable/Embla | Plain horizontal scroll-snap |
| 5 | **Product cards** — hover tilt + gloss + zari zoom, second image swaps like turning the fabric | Pointer-based tilt, CSS `perspective` | No tilt on touch |
| 6 | **Product page: "Drape View"** — 360° turn of the saree on a mannequin, weave macro zoom, hotspots (pallu / border / body) | Image sequence (24–36 frames) or `.glb` in `<model-viewer>`/R3F | Gallery + zoom |
| 7 | **Colour variants re-tint** the preview live | Shader hue-shift or pre-rendered swatch images | Swap image |
| 8 | **Section reveals** — arch-mask reveal on images, gold line drawing under headings, lotus dividers | GSAP + SVG stroke-dashoffset | Opacity fade |
| 9 | **Smooth scroll** with a soft parallax on ornaments | Lenis | Native scroll |
| 10 | **Cursor:** small lotus that trails gold sparkle over interactive items (desktop only) | Canvas/DOM follower | Default cursor |
| 11 | **Page transitions:** silk wipe between routes | Next.js View Transitions / Framer Motion | Instant |
| 12 | **Lookbook:** full-screen story mode (swipe/scroll), each look tagged to products | Scroll-snap + GSAP | Grid |

Motion rules: durations 400–900ms for UI, 1.5–2.5s for signature moments; ease `cubic-bezier(.76,0,.2,1)` for big moves. Only animate `transform`/`opacity`. One heavy WebGL canvas per screen. Respect `prefers-reduced-motion`. Provide a "Skip intro" (already built).

---

## 5. Sitemap & page specs

1. **Home** — Opening → Hero (arch frame, floating silk, CTA) → Trust strip (handloom, authentic silk, free shipping over a threshold, easy support) → Unrolling collections → Featured sarees → Craft story (weaving process, video/macro) → Occasion picks (Wedding, Festival, Office, Daily) → Lookbook teaser → Testimonials → Instagram/gallery → Store visit + WhatsApp CTA → Footer
2. **Shop** — Filter drawer (fabric, colour swatches, occasion, price, work type), sort, grid/large-grid toggle, quick view, pagination or infinite scroll
3. **Collection pages** — e.g. Kanjivaram, Banarasi, Pattu, Cotton, Bridal; hero banner per collection with its own accent colour
4. **Product detail** — Drape View (3D/360), zoom, variant swatches, fabric + care + blouse-piece details, size/length info, "Enquire on WhatsApp", add to wishlist/cart, shipping/returns, related + "complete the look"
5. **Lookbook / Gallery** — Story-mode full-screen looks, shoppable tags
6. **Our Story** — Heritage, artisans, process timeline, values
7. **Visit Us / Contact** — Address, map, hours, WhatsApp, enquiry form
8. **Wishlist** and **Cart / Enquiry** — Phase 1: cart becomes a WhatsApp enquiry list; Phase 2: online checkout
9. **Policies** — Shipping, returns, privacy, terms
10. **Admin (Phase 2)** — Add/edit products, upload images, stock, feature flags

---

## 6. Architecture

**Stack:** Next.js (App Router, RSC), TypeScript, Tailwind CSS (tokens as CSS variables), Three.js + `@react-three/fiber` + `@react-three/drei`, GSAP (+ScrollTrigger), Lenis, Framer Motion, Zustand (cart/wishlist), Zod + React Hook Form.

**Commerce path (recommended for a friend's local store):**
- **Phase 1:** Products in typed JSON/MDX (or Sanity/Contentful CMS later). Cart → **WhatsApp order enquiry** (no payment risk, fastest launch).
- **Phase 2:** Online payments with **Razorpay** (UPI/cards) or go **headless Shopify** (Storefront API) if inventory is managed in Shopify.

**Folder structure**
```
app/
  (site)/
    page.tsx                # Home
    shop/page.tsx
    collections/[slug]/page.tsx
    product/[slug]/page.tsx
    lookbook/page.tsx
    our-story/page.tsx
    visit-us/page.tsx
    wishlist/page.tsx
    cart/page.tsx
  layout.tsx  globals.css  sitemap.ts  robots.ts
components/
  intro/        SilkCurtainIntro.tsx  LotusEmblem.tsx
  layout/       Header.tsx  Footer.tsx  MobileMenu.tsx  ArchFrame.tsx  VineBorder.tsx
  home/         Hero.tsx  FloatingSilk.tsx  UnrollCollections.tsx  CraftStory.tsx  Testimonials.tsx
  product/      ProductCard.tsx  DrapeViewer.tsx  VariantSwatches.tsx  ZoomLens.tsx
  ui/           Button.tsx  Badge.tsx  LotusDivider.tsx  Cursor.tsx  Reveal.tsx
  three/        SilkMaterial.tsx  ZariDust.tsx  Scene.tsx
lib/            products.ts  cart-store.ts  whatsapp.ts  seo.ts  motion.ts
data/           products.json  collections.json
public/         logo/  images/  models/  frames/  patterns/
styles/         tokens.css  silk.css
```

**Product data model**
```ts
type Product = {
  id: string; slug: string; name: string;
  collection: 'kanjivaram' | 'banarasi' | 'pattu' | 'cotton' | 'bridal' | string;
  fabric: string; weave?: string; work?: string;      // zari, embroidery…
  occasion: ('wedding'|'festival'|'office'|'daily')[];
  price: number; compareAtPrice?: number;
  colors: { name: string; hex: string; images: string[] }[];
  images: string[]; frames360?: string[]; model3d?: string;
  details: { length: string; blousePiece: boolean; care: string; };
  stock: 'in' | 'low' | 'out'; featured?: boolean; isNew?: boolean;
};
```

---

## 7. Quality guardrails

- **Performance:** LCP < 2.5s on mid-range phones. Lazy-load all WebGL; one canvas per view; compress textures (KTX2/WebP/AVIF); `next/image` everywhere; disable heavy effects on low-power/mobile.
- **Accessibility:** Keyboard-navigable, visible focus rings (gold), alt text for every product image, motion toggle, contrast checked.
- **SEO:** Per-page metadata, Product JSON-LD, sitemap, OpenGraph images, clean slugs, local-business schema for the store.
- **Responsive:** Mobile-first; 3D simplified on mobile (static + parallax).
- **Analytics & leads:** WhatsApp click events, enquiry form events.

---

## 8. Asset plan

I can create **SVG** assets (arch frames, vine borders, lotus, paisley patterns, dividers, icons) directly. I cannot create photoreal photographs; use your friend's real product photos where possible, and an image generator for banners/mood images with these prompts (keep the same suffix on all for a consistent look):

**Style suffix (add to every prompt):**
`warm soft studio light, deep maroon and antique gold palette, cream background, editorial fashion photography, shallow depth of field, ultra-detailed silk texture, no text, no watermark`

1. `Close-up macro of Kanjivaram silk saree zari border, rich maroon with gold temple motif` + suffix
2. `Elegant Indian woman in a maroon silk saree, gold jhumka and necklace, profile view, cream arched background` + suffix
3. `Flat lay of folded silk sarees in peacock blue, emerald, saffron and maroon on cream linen` + suffix
4. `Hands of a weaver at a handloom, gold thread, warm window light` + suffix
5. `Bridal saree draped on a mannequin, front and side, plain cream studio` + suffix (also use for 360° frames)
6. `Cream and gold Indian arch doorway with hanging jasmine, boutique interior` + suffix

For 360° Drape View, shoot the mannequin turning in 24–36 steps on a turntable with a plain background.

---

## 9. Build phases

1. **Foundation** — Next.js setup, tokens, fonts, layout, Header/Footer, silk + arch + vine SVG components
2. **Opening + Hero** — Curtain intro, floating-silk hero (R3F), CTA
3. **Home sections** — Unroll collections, featured products, craft story, testimonials, footer CTA
4. **Shop system** — Data, filters, cards, wishlist, WhatsApp cart
5. **Product page** — Gallery, zoom, variants, Drape View
6. **Content pages** — Lookbook, story, visit us, policies
7. **Polish** — Page transitions, cursor, perf pass, accessibility, SEO
8. **Phase 2** — Payments (Razorpay) or Shopify headless, admin/CMS

---

## 10. MASTER PROMPT (copy everything in the box into your AI coding tool)

````text
You are a senior creative front-end engineer and UI designer. Build a premium, 3D-feeling saree showcase and e-commerce website for a small boutique called "{{STORE_NAME}}" (working name: Swavani). The site must feel like a heritage silk boutique that comes alive: royal, warm, tactile, never cheap or templated.

## Tech
- Next.js (App Router) + TypeScript, Tailwind CSS with design tokens as CSS variables
- Three.js via @react-three/fiber + @react-three/drei for 3D moments
- GSAP + ScrollTrigger for scroll effects, Lenis for smooth scroll, Framer Motion for UI transitions
- Zustand for cart/wishlist, Zod + React Hook Form for forms
- next/font for fonts, next/image for all images
- Product data in typed JSON for now (structure must be easy to swap for a CMS or Shopify later)

## Brand theme
Concept: "The Living Silk Boutique" - the whole site behaves like silk unfolding, draping and revealing.
Motifs to reuse everywhere: cusped Indian arch, lotus, gold vine border, paisley/kolam patterns (4-6% opacity), 1px zari-gold hairlines with a moving shine.

Colour tokens (define in globals.css as CSS variables and map into Tailwind):
--silk-deep #3A0615 (all borders, footer, text on cream), --silk #5C0F27, --silk-light #7D1A38, --silk-sheen #A83A5A (sheen only),
--cream #F4E8D4, --cream-warm #EDDCC0, --ivory #FBF5EA,
--zari #B8925A (gold on cream, large text only), --zari-bright #D9B26D (gold on maroon), --ink #3A2A26,
accents (small doses, one per section): --peacock #0F5C63, --emerald #1F6B4A, --saffron #D98324, --indigo #2B2F6B, --rose #C24B6B.
Silk surface = layered gradient: diagonal sheen bands + 1px thread lines + fine noise + vertical base gradient (silk-light -> silk -> silk-deep). Implement as a reusable .silk class and as a WebGL shader material.
Zari gold text = linear-gradient(100deg,#B8925A,#F1D9A0 45%,#B8925A) with a slow shine sweep on hover.
Shadows are warm dark red-brown rgba(58,6,21,.25), never grey.
Alternate section backgrounds for rhythm: cream -> silk -> cream -> indigo -> cream -> silk-deep footer.

Fonts: Cinzel (headings, uppercase, tracking .05em), Cormorant Garamond (editorial, prices, quotes), Montserrat (UI, nav, body). Optional Noto Serif Tamil behind a language toggle.

## Signature motion & 3D (each needs a lightweight fallback)
1. Opening: dark red silk curtains part from the centre over a lotus emblem that draws itself and a wordmark that tracks in; the page behind settles from scale 1.06 to 1. Include a "Skip" button, Esc to skip, and a fast fade under prefers-reduced-motion. Play once per session.
2. Hero: cream cusped-arch panel with gold double-line border and a gold vine running up the left edge and around the arch; on the right a floating silk-fabric WebGL plane (wave-displacement shader, saree texture) reacting to mouse/gyro, plus subtle gold zari dust particles. Fallback: static image with slow parallax.
3. Scroll storytelling: a pinned section where a fabric ribbon unrolls as the user scrolls, revealing collections (Kanjivaram, Banarasi, Pattu, Cotton, Bridal) one by one. Fallback: stacked collection cards.
4. Collections carousel with 3D tilt cards and depth of field (front sharp, back blurred).
5. Product cards: pointer tilt + gloss highlight, second image swaps on hover, zari-gold zoom lens. Disable tilt on touch.
6. Product page "Drape View": 360-degree turn (image sequence or .glb), macro weave zoom, hotspots for pallu / border / body. Colour variant swatches re-tint the preview.
7. Section reveals: arch-mask image reveals, gold underline drawing under headings, lotus dividers.
8. Custom lotus cursor with gold sparkle trail on interactive elements (desktop only).
9. Silk-wipe page transitions between routes.
Rules: animate only transform/opacity, durations 400-900ms for UI and 1.5-2.5s for signature moments, easing cubic-bezier(.76,0,.2,1), one heavy WebGL canvas per screen, lazy-load all 3D, reduce/disable effects on low-power or mobile devices, honour prefers-reduced-motion.

## Pages
Home, Shop (filters: fabric, colour swatches, occasion, price, work; sort; quick view), Collection/[slug], Product/[slug], Lookbook (full-screen story mode with shoppable tags), Our Story, Visit Us / Contact (map, hours, WhatsApp, enquiry form), Wishlist, Cart, Policies.
Home order: Opening -> Hero -> Trust strip -> Unrolling collections -> Featured sarees -> Craft story -> Occasion picks -> Lookbook teaser -> Testimonials -> Gallery -> Visit-store CTA -> Footer.

## Commerce (Phase 1)
No payments yet. The cart becomes a WhatsApp order enquiry: build a pre-filled WhatsApp message (product names, links, selected colour, total) using a wa.me link with the store number from an env var. Keep a clean abstraction (lib/checkout.ts) so Razorpay or Shopify Storefront API can be plugged in later.

## Data model
Product: id, slug, name, collection, fabric, weave, work, occasion[], price, compareAtPrice, colors[{name,hex,images[]}], images[], frames360[], model3d, details{length,blousePiece,care}, stock('in'|'low'|'out'), featured, isNew.
Seed 12 realistic sample products across the 5 collections with placeholder images.

## Quality bar
- Mobile-first, fully responsive; simplified (non-WebGL) 3D on mobile
- LCP under 2.5s on mid-range phones; compressed textures/images; no layout shift
- Accessible: keyboard navigation, gold focus rings, alt text, contrast checked, motion toggle
- SEO: per-page metadata, Product JSON-LD, LocalBusiness schema, sitemap, robots, OpenGraph
- Clean, commented, typed code; components small and reusable; no unused dependencies
- Folder structure: app/(site)/..., components/{intro,layout,home,product,ui,three}, lib, data, public

## How to work
1. First output a short file tree and the list of dependencies, then wait for my "go".
2. Build in phases and stop after each for review: (1) foundation + tokens + layout + SVG ornaments, (2) opening + hero, (3) home sections, (4) shop + wishlist + WhatsApp cart, (5) product page + Drape View, (6) content pages, (7) polish/perf/SEO.
3. Use my logo from /public/logo/ and my photos from /public/images/ when present; otherwise use tasteful placeholders and mark each with a TODO.
4. Do not invent business facts (address, phone, prices, reviews); use clearly marked placeholders.
````

---

## 11. Page-by-page prompts (use after the master prompt)

**Phase 1 — Foundation**
````text
Set up the Next.js project per the master prompt. Create globals.css tokens, next/font setup (Cinzel, Cormorant Garamond, Montserrat), .silk and .zari-text utilities, Header (arch-framed logo, nav, search/account/cart icons, sticky with silk background), Footer (silk-deep with vine border), and reusable SVG components: ArchFrame, VineBorder, LotusDivider, Lotus. Add a design-tokens demo page at /_design to preview colours, type and ornaments.
````

**Phase 2 — Opening + Hero**
````text
Build SilkCurtainIntro: two silk curtain halves with gold seam and pleats, a self-drawing lotus arch emblem, wordmark tracking in, curtains part after ~1.9s over 1.7s, page settles from scale 1.06. Skip button + Esc, once per session, reduced-motion fallback. Then build Hero: cream cusped-arch panel with gold double border, gold vine around the arch, headline in Cinzel with a gold second line, tagline, CTA, and a FloatingSilk R3F plane with a wave shader and ZariDust particles on the right. Lazy-load the canvas with a static fallback.
````

**Phase 3 — Home sections**
````text
Build the home sections below the hero: Trust strip (4 icons), UnrollCollections (GSAP ScrollTrigger pinned ribbon unrolling through 5 collections, each with its own accent colour), Featured sarees (3D tilt ProductCards), Craft story (macro image + weaving process steps with a drawing gold line), Occasion picks, Lookbook teaser, Testimonials, Gallery grid with arch-mask reveals, Visit-store CTA with WhatsApp button. Alternate backgrounds per the colour rhythm.
````

**Phase 4 — Shop**
````text
Build /shop and /collections/[slug] from data/products.json: filter drawer (fabric, colour swatches, occasion, price range, work type), sort, grid toggle, quick-view modal (arch-shaped), wishlist (Zustand, persisted), and cart that produces a WhatsApp enquiry via lib/whatsapp.ts. ProductCard: pointer tilt, gloss, second-image swap, badges (New = peacock, Sale = saffron, Low stock = rose).
````

**Phase 5 — Product page**
````text
Build /product/[slug]: image gallery with zoom lens, DrapeViewer (image-sequence 360° with drag/scroll scrubbing, falls back to gallery), macro weave zoom, hotspots (pallu / border / body), colour swatches that switch images (and re-tint where a shader is available), details accordion (fabric, care, blouse piece, length), "Enquire on WhatsApp", add to wishlist, related products and "complete the look". Add Product JSON-LD.
````

**Phase 6 — Content pages**
````text
Build Lookbook (full-screen scroll-snap story mode, each look with shoppable product tags), Our Story (heritage timeline, artisans, values), Visit Us (address/hours placeholders, embedded map, WhatsApp, enquiry form with Zod validation), and Policies pages. Keep the arch/vine/lotus motifs consistent.
````

**Phase 7 — Polish**
````text
Add silk-wipe page transitions, lotus cursor, Lenis smooth scroll, a global "reduce motion" toggle, performance pass (lazy WebGL, image/texture compression, bundle check), accessibility audit (focus rings, alt text, contrast), and SEO (metadata, sitemap, robots, OpenGraph, LocalBusiness schema). Report Lighthouse scores and fix anything below 90.
````

---

## 12. What I need from you to finalise

1. Upload the **logo** and the **template screenshot** here so I can match exact colours/spacing.
2. Confirm the **store name** and whether to include **Tamil** text.
3. **Product photos** available? (Number of sarees, and whether you can shoot a turntable for the 360° view.)
4. Phase 1 = **WhatsApp enquiries** — is that OK, or do you need online payment at launch?
