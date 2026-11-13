1. Brand Identity & Design Philosophy

Bhukos ("A Good Taste Club") is an artisanal culinary cataloging platform and social tasting archive. It records India's packaged delicacies, nostalgic pantry treasures, regional confections, and corner-shop discoveries.

Core Philosophy

Gastronomy Ledger & Archival Index: Rather than an over-saturated arcade game or sterile SaaS interface, the visual language is modeled on an heirloom culinary ledger, botanical field notes, and literary review prints—tactile, warm, curated, and dignified.

Letterboxd for Packaged Tastes with Collectible Rarity: Every snack, beverage, and biscuit is treated as a numbered specimen in a collective sensory library, complete with collectible rarity tiers that celebrate cultural rarity and nostalgic iconic status.

Fluid Universal Responsiveness: Every component, layout grid, typography rule, and navigation chrome seamlessly scales from handheld smartphones up to high-resolution multi-column desktops.

2. Multi-Device Breakpoint System & Viewport Architecture
Breakpoint Tier	Media Query / Target	Layout Behavior & Grid Columns	Shell Architecture

Mobile Compact (xs)	< 390px (iPhone SE, small Androids)	Single column, edge-to-edge with 16px gutter. Snack cards stack vertically or scroll in snap carousels.	Minimal sticky top header (56px) + fixed bottom nav dock (60px + safe area).
Mobile Standard (sm)	390px – 639px (iPhone 14/15/16 Pro, Pixel, Galaxy)	Single column (1 col), fluid spacing, horizontal swipeable milestone rails.	Sticky top brand header + fixed bottom nav dock with elevated central + Log a Taste CTA.

Tablet / Foldable (md)	640px – 1023px (iPads, Tablets, Foldable unfolding)	2-column responsive card grids (grid-cols-2 gap-5). Side-by-side modal cards.	Expanded top navigation bar with condensed search; bottom dock hidden in landscape tablet.

Desktop Standard (lg)	1024px – 1439px (MacBook Air/Pro, Laptops)	3 to 4-column collectible card grids (grid-cols-4 gap-6). Letterboxd 2-column side-by-side tasting workspace.	Persistent full desktop header with full inline search pill, actions, and multi-column archival footer.

Wide Desktop (xl / 2xl)	≥ 1440px (27" Studio Display, 4K monitors)	4-column grids with bounded container max-w-7xl (1280px), generous vertical whitespace (96px).	Centered max-width canvas container preventing content stretching; high-density cards.

3. Color Palette & Theme Tokens
Core Brand & Ink Tokens
Terracotta / Brick Spice (Primary CTA & Brand Anchor): #C8381D
Terracotta Dark / Pressed State: #A62B14
Terracotta Glow / Subtle Wash: rgba(200, 56, 29, 0.12)
Deep Saffron / Warm Amber (Sub-accent & Milestones): #E06D14
Marigold Ochre (Warm Indicators & Streak Nodes): #D9822B
Gilded Brass / Archival Medallion Gold: #D4A347 / #C58B2E
Charcoal Ink (Headings, Primary Text, Dark Accents): #2A221E
Muted Walnut / Bistro Grey (Secondary Copy & Metadata): #5E544E
Archival Ledger Border (Hairline Dividers): #E8DDD6
Subtle Ledger Border (Light): #F0E7E1
Canvas & Surface Hierarchy
Canvas Base (Chai Cream / Warm Alabaster): #FFF8F5
Surface Dim / Muted Ledger: #E2D8D3
Surface Bright: #FFF8F5
Surface Container Lowest (Pure Card Surface): #FFFFFF
Surface Container Low (Parchment Tint): #FCF2EC
Surface Container High (Highlighted Panels & Sections): #F7ECE5
Subtle Ledger Tint / Table Header: #F5ECE6
Warm Footer Backdrop: #FAF0EB
Streak & Specimen Card Dark Surface: linear-gradient(180deg, #1C1124 0%, #2B1812 50%, #B84A1A 100%)
Collectible Rarity System Tokens
Integrated into the top right of collectible cards, badges, and modals:

Common (Everyday Pantry Staples — Parle-G, Crax):
Badge Background: rgba(255, 255, 255, 0.15) or rgba(226, 216, 211, 0.25)
Text Color: #E2D8D3
Border: 1px solid rgba(255, 255, 255, 0.2)
Label: COMMON
Rare (Regional Delights & Classic Specialties — Aloo Bhujia, Paper Boat):
Badge Background: rgba(217, 130, 43, 0.2)
Text Color: #FAD59A
Border: 1px solid rgba(217, 130, 43, 0.5)
Accent Tone: Amber / Warm Ochre #D9822B
Label: RARE
Epic (Cult Following & Heritage Icons — Thums Up Charged, Keventers):
Badge Background: rgba(138, 58, 185, 0.25)
Text Color: #E8BAFF
Border: 1px solid rgba(179, 102, 235, 0.55)
Accent Tone: Royal Amethyst #8A3AB9
Label: EPIC
Legendary (Sacred Institution & Historic Icons — Old Monk, Gold Spot):
Badge Background: linear-gradient(135deg, rgba(212, 163, 71, 0.35) 0%, rgba(200, 56, 29, 0.3) 100%)
Text Color: #FFE299
Border: 1px solid #D4A347
Shadow: 0 0 12px rgba(212, 163, 71, 0.35)
Label: LEGENDARY (often with specimen age/vintage stamp, e.g. LEGENDARY RUM • 7 YRS)
Flavor Profile Chips
Sweet: Background: #FDF0F0 | Text: #C8381D | Border: #F5D5D5
Spice / Hot Pepper: Background: #FDF0ED | Text: #C8381D | Border: #F6D3CA
Crunch / Toasted: Background: #FAF3E3 | Text: #A6731B | Border: #EEDBA8
Richness / Golden Ghee: Background: #FBF6ED | Text: #B57E28 | Border: #F2E2C4
Tangy / Chatpata: Background: #F8EDE7 | Text: #964223 | Border: #E7C6B7
Savoury / Umami: Background: #F4EFEA | Text: #4E443E | Border: #DDD3CA
4. Typography Scale & Fluid Hierarchy
Font Families
Display & Headings: Literata (Serif; weights: 500, 600, 700; with editorial Italic for quotes and lore).
Interface & Metadata: Plus Jakarta Sans / Inter (Sans-Serif; weights: 400, 500, 600, 700). Minimum mobile font size: 16px on inputs to prevent iOS auto-zoom.
Ledger Counters & Catalog Codes: JetBrains Mono / SF Mono (Monospace for batch numbers, SKU counts, timestamps, and catalog IDs, e.g., INDEX V2.4, DRN #01, COLLECTION NO. 042, 335/∞).
Responsive Scale (Fluid clamp / Breakpoint scaling)
Element	Desktop (≥ 1024px)	Tablet (640px – 1023px)	Mobile (< 640px)	Line-Height & Style
Hero Title	48px – 56px	36px – 42px	28px – 34px	1.15, Serif Bold, -0.025em tracking
Page Title (H1)	36px – 40px	30px – 32px	24px – 28px	1.2, Serif SemiBold
Section Title (H2)	24px – 26px	20px – 22px	18px – 20px	1.25, Serif SemiBold
Card Title (H3)	18px – 20px	17px – 18px	16px – 17px	1.3, Serif or Bold Sans
Body Regular	15px – 16px	15px	14px – 15px	1.55, Sans-Serif
Metadata / Badges	11px – 12px	11px	10px – 11px	1.4, Monospace Uppercase Tracked
Rarity Badge	11px	10px	10px	1.2, Monospace SemiBold, tracking-widest
Form Inputs	14px – 15px	15px	16px (prevents iOS zoom)	1.5, Sans-Serif
5. Universal Navigation & Chrome Architecture
A. Desktop Chrome (≥ 1024px)
Sticky Top Bar: h-18 (72px), bg-[#FFF8F5]/90 backdrop-blur-md border-b border-[#E8DDD6].
Brand lockup left: Serif Bhukos wordmark + A TASTE CLUB monospace pill.
Centered links: Home, Discover, Wishlist, My collection, Log a taste with 2px terracotta active border.
Search pill: Integrated input with icon and keyboard shortcut hint (⌘K).
Action right: + Submit a snack (bordered button), + Log a taste (terracotta primary button), LVL 08 badge, and profile avatar.
Desktop Footer: 4-column layout (Brand Manifesto, Directory Archive, Snack Registry, Colophon) padded at py-12.
B. Mobile Chrome (< 1024px / Small Screens)
Top Header Bar: Compact h-14 (56px) sticky bar.
Left: Bhukos wordmark (20px).
Right: Minimal quick-action cluster — Search magnifying icon, LVL 08 pill badge, and 32px profile avatar.
Fixed Bottom Navigation Dock:
Sticky at viewport bottom: h-16 + env(safe-area-inset-bottom).
Background: bg-[#FFF8F5]/95 backdrop-blur-lg border-t border-[#E8DDD6].
5 Navigation touch targets (minimum 48px x 48px tap bounding boxes):
Home (House icon + text)
Discover (Compass icon + text)
Center Elevated Floating Button: Circular terracotta action button (w-12 h-12 rounded-full bg-[#C8381D] text-white shadow-lg -mt-5 flex items-center justify-center border-4 border-[#FFF8F5] active:scale-95 transition-transform) for + Log a Taste.
Wishlist (Bookmark ribbon icon + text)
My Collection (Grid / Journal icon + text)
Bottom Body Padding: Every page body on mobile enforces pb-24 (96px) to ensure no content is obscured behind the fixed bottom nav dock.
6. Key Feature Responsive Layout Specifications
A. Collectible Pantry Snack Cards (with Rarity Badges)
Artwork Plate Structure:
Dark gradient background plate (linear-gradient(180deg, #1C1124 0%, #2B1812 50%, #B84A1A 100%)).
Top Left: Bold brand insignia pill (e.g. OLD MONK, HALDIRAM'S, PARLE, COCA-COLA).
Top Right (Rarity Pill): COMMON, RARE, EPIC, or LEGENDARY with corresponding color treatment and glow.
Center: Illustrated product bottle or snack packet specimen.
Bottom Tag: Monospace specimen metadata or rating stamp (e.g. ★ 8.5 • LEGENDARY RUM).
Body Content:
Overline brand category in uppercase monospace (COCA-COLA • DRINKS).
Serif product heading (e.g. Maaza Mango Drink).
Sensory tasting notes (2 lines max).
Flavor profile tags along the card base (#Sweet, #Mango, #Velvety).
Responsive Layout:
Desktop (lg): grid grid-cols-4 gap-6.
Tablet (md): grid grid-cols-2 gap-5.
Mobile (sm): Single-column stack or horizontal snap carousel (snap-x snap-mandatory overflow-x-auto).
B. Interactive Taste Streak Ritual Card (Hero Feature)
Styling: Dark roasted-spice ledger container (bg-gradient-to-br from-[#2B1812] to-[#1C1124] rounded-2xl p-6 border border-[#523A31] text-white).
Header: Taste Streak Ritual • DAY 02 / 07 with pulsing fiery ember indicator, weekly progress bar (28% Complete), and +50 XP Today badge.
7-Day Arc Milestone Nodes (Mon–Sun):
Desktop: Balanced horizontal row with even spacing (grid grid-cols-7 gap-3).
Mobile: Horizontal scroll rail (overflow-x-auto flex gap-3 snap-x no-scrollbar pb-2) with active day centered and glowing terracotta flame node (ring-4 ring-[#C8381D]/40).
Action CTA: Full-width mobile touch button "Log Today's Sip" (h-12 rounded-xl bg-[#C8381D] font-medium text-white active:bg-[#A62B14]).
C. Letterboxd-Inspired "Log a Taste" Experience
Desktop (lg): 2-column split screen:
Left column (w-5/12): Product selector dropdown, staging preview card displaying rarity badge (LEGENDARY), status tags (Saved in Wishlist ✓).
Right column (w-7/12): White ledger form card (bg-white rounded-2xl p-8 border border-[#E8DDD6]), star rating, markdown review textarea, flavor tag pills, and submit button.
Mobile (sm): Vertical stacked workflow:
Top: Collapsible product preview pill/card with quick swap button and rarity badge.
Middle: Full-width tasting diary form inputs with touch-friendly 5-star rating (44px star touch targets) and tap-friendly flavor tag chips (py-2 px-3.5).
Bottom: Sticky or inline full-width submission CTA "Save Taste Log" with haptic feedback.
D. Celebratory Confetti & Particle Micro-Interactions
Trigger: Instant execution on clicking "Save Taste Log".
Palette: Saffron ribbons (#E06D14), terracotta squares (#C8381D), marigold flakes (#D9822B), and warm cream sparkles (#FAF3E3).
Responsive Adaptations:
Desktop: Full canvas particle burst (60–80 particles) radiating outward across the split view.
Mobile: Concentrated vertical fountain burst (35–45 particles) optimized for handheld GPU performance and smooth 60fps rendering without viewport overflow.
Fully respects prefers-reduced-motion: reduce.
E. Unlocked "Archivist Badge" Celebration Modal
Desktop Presentation:
Centered dialog overlay (max-w-lg mx-auto bg-[#FFF8F5] border border-[#E8DDD6] rounded-3xl p-8 shadow-2xl backdrop-blur-sm).
Mobile Presentation:
Refactors into an ergonomic Mobile Bottom Sheet Drawer:
Slides smoothly from bottom viewport (rounded-t-3xl border-t border-[#E8DDD6] max-h-[90vh] overflow-y-auto p-6 bg-[#FFF8F5]).
Centered top drag handle (w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-4).
Visual Content:
Gilded sunburst compass crest medallion ("CERTIFIED PANTRY ARCHIVIST").
Milestone tag: ARCHIVAL MILESTONE REACHED • TASTE LEDGER V2.4.
Title: "Archivist Badge Unlocked!" in Literata serif.
Personalized copy: "Your sensory review for Maaza Mango Drink has been officially inscribed in the club ledger..."
Rewards Ledger list: +100 Archival XP, 'Master Taster' Stamp, Rare Tasting Notes.
Full-width stacked action buttons: Primary terracotta "Add to My Collection & View Badge" on top, neutral "Keep Exploring Pantry" below.
F. Personal Collection & Wishlist Backlog
My Collection ("Cellar Journal"):
Displays logged specimen cards with individual user ratings and rarity badges (★ 8.0 • RARE, ★ 10.0 • LEGENDARY).
Filter tabs by rarity tier (All, Common, Rare, Epic, Legendary) and category.
Wishlist ("Backlog Index"):
Queued taste cards with numbered slot markers (Slot #01: Parle-G [COMMON], Slot #02: Old Monk Rum [LEGENDARY]).
7. Touch Target & Accessibility Standards
Strict Touch Target Size: All interactive buttons, navigation icons, flavor pills, and star ratings enforce a minimum touch target bounding box of 44px × 44px (iOS HIG standard) / 48px × 48px (Android Material standard).
Safe Area Insets: Full adherence to CSS env(safe-area-inset-top) and env(safe-area-inset-bottom) to support notched displays and Android gesture navigation bars.
Contrast & Legibility: Charcoal Ink (#2A221E) and Terracotta (#C8381D) maintain a contrast ratio > 4.5:1 against the Chai Cream base (#FFF8F5) for WCAG AA compliance.
Haptic & Active States: All buttons include subtle :active:scale-95 micro-compression for tactile feedback on mobile devices.