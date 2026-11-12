## 1. Brand Identity & Vision
Bhukos is a social tasting diary and food discovery platform combining the community logging intimacy of Letterboxd, the visual delight of Pinterest, and the collectible excitement of trading cards. The visual language moves away from muted beige towards an energetic, appetizing, and premium palette celebrating global snack culture.

---

## 2. Color Palette & Tokens

### Primary Brand Accents
- **Tangerine Orange (Primary CTA & Brand Accent):** `#FF6B35`
- **Mango Yellow (Highlights & Star Ratings):** `#FFC857`
- **Cherry Red (Alerts, High-Heat, Spicy Tags):** `#EF476F`
- **Berry Purple (Community & Rare Badges):** `#8338EC`
- **Fresh Green (Verified Tasters & Freshness):** `#80B918`

### Neutral Canvas & Surfaces
- **Cream White (Surface Low / Page Background):** `#FFF9F0`
- **Pure White (Container Cards & Floating Surfaces):** `#FFFFFF`
- **Subtle Surface Tint:** `#FEF7FF`
- **Surface Dim / Borders:** `#DED7E4` / `#F0EAE1`
- **Deep Obsidian Charcoal (Primary Headings & Text):** `#24212A`
- **Muted Slate (Secondary Copy & Metadata):** `#6B6675`

### Rarity Tier Colors
- **Common:** Neutral Slate / Soft Zinc (`#71717A`)
- **Rare:** Emerald / Cyan Accent (`#06B6D4` / `#059669`)
- **Epic:** Magenta / Violet Gradient (`#8338EC` to `#D946EF`)
- **Legendary (Vault Grail):** Iridescent Gold Foil Sheen (`#FFB703` with multi-stop metallic linear gradients)

---

## 3. Typography & Hierarchy

### Font Families
- **Display Headings:** `Syne` (Bold, 700 / 800) — Expressive, sculptural, modern geometry with culinary charm.
- **Body & Interface:** `Plus Jakarta Sans` / Inter (400 Regular, 500 Medium, 600 SemiBold, 700 Bold) — Crisp legibility for logs, tables, forms, and product metadata.
- **Monospace & Timestamps:** `JetBrains Mono` / `SF Mono` (for batch codes, catalog IDs, and timestamps).

### Type Scale
- **Display Hero:** 48px – 64px, Line-height: 1.1, Letter-spacing: -0.03em
- **H1 (Page Titles):** 36px – 40px, Line-height: 1.2, Letter-spacing: -0.02em
- **H2 (Section Titles):** 24px – 28px, Line-height: 1.25, Letter-spacing: -0.01em
- **H3 (Card Titles):** 18px – 20px, Line-height: 1.3
- **Body Regular:** 15px / 16px, Line-height: 1.5
- **Caption / Meta:** 12px / 13px, Line-height: 1.4

---

## 4. Layout & Spacing Principles

- **Grid System:** 12-column responsive desktop layout (max-width: 1360px) with 24px gutters and generous vertical rhythm (64px–96px between key sections).
- **Corner Radii:**
  - Standard cards and buttons: `12px` to `16px` (`rounded-xl` / `rounded-2xl`)
  - Pill badges and chips: `9999px` (`rounded-full`)
  - Collectible FoodCards: `20px` (`rounded-[20px]`)
- **Elevation & Shadows:**
  - Card base: `0 4px 20px -2px rgba(36, 33, 42, 0.05)`
  - Elevated hover: `0 12px 32px -4px rgba(255, 107, 53, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)`
  - Legendary Foil Card: `0 0 24px rgba(255, 183, 3, 0.25)`

---

## 5. Signature Component Patterns

### A. Collectible FoodCards
- **Ratio:** 3:4 vertical poster format inspired by trading card proportions.
- **Artwork Layer:** High-res curated product imagery, bleed-to-edge with subtle bottom vignette.
- **Metadata Overlay:** Glassmorphism/frosted pill badges indicating Rarity, Category, Origin Country flag, and Catalog #.
- **Strict Separation of Concerns:** View-only on public discovery feeds; interaction tools (rating/logging) reside exclusively in the dedicated tasting flow.

### B. Rating System
- **Scale:** 5-star scoring with discrete 0.5 step intervals (0.5 to 5.0).
- **Interactive Component:** Custom dual-half star hover/drag with real-time numeric grade badge in bold display typography.

### C. Sensory Taste Radar
- 5-axis normalized sensory profile mapping:
  - *Umami*, *Spicy*, *Crunch*, *Sweet*, *Sour*.
- Semi-transparent gradient polygon fill (`rgba(255, 107, 53, 0.2)`) with `#FF6B35` perimeter vertices.

### D. Navigation Bar
- Fixed top navigation with frosted glass backing (`backdrop-blur-md bg-white/90`).
- Prominent persistent gradient CTA button: `+ Log a Taste`.
- Collector profile avatar pill with current level badge (`LVL 08`).