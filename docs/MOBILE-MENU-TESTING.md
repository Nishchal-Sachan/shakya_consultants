# Mobile Menu — Testing Checklist

Test the mobile menu and hero on these viewports to verify layout, no overlap, no transparency bleed, and clean open/close.

## Viewport sizes

| Device            | Width × Height | Notes                    |
|------------------|----------------|--------------------------|
| iPhone SE (2nd)  | 375 × 667      | Small width, medium height |
| iPhone SE (1st)  | 320 × 568      | Smallest common iPhone   |
| iPhone 12 / 13   | 390 × 844      | Standard modern iPhone   |
| iPhone 12/13 min | 390 × 664      | With Safari UI visible   |
| Android small    | 360 × 640      | Common Android           |
| Android narrow   | 360 × 780      | Tall Android             |

## How to test (Chrome DevTools)

1. Run the app: `npm run dev`
2. Open http://localhost:3000
3. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
4. Pick “iPhone SE”, “iPhone 12 Pro”, or set custom size (e.g. 360×640)
5. Use the checklist below

## Verification checklist

### No text overlap
- [ ] **iPhone SE (375×667)** — All nav links visible; “Get Started” CTA does not cover any link; no link text clipped or overlapping.
- [ ] **iPhone 12/13 (390×844)** — Same as above.
- [ ] **Android small (360×640)** — Same; header “Internationals” and close button do not overlap; CTA stays below last nav item with visible gap.

### No transparency bleed
- [ ] With menu **open**, the overlay is fully opaque; no hero video, gradient, or text visible through the menu.
- [ ] Menu background is solid (dark purple → black); no “see-through” to the hero.

### Menu opens & closes cleanly
- [ ] **Open** — Hamburger tap opens menu; panel slides in from the right (~250ms ease-out); body scroll is disabled.
- [ ] **Close** — Close (X) tap or Escape closes menu; panel slides out; body scroll restored; focus returns to hamburger.
- [ ] No flash, jump, or half-open state; overlay unmounts after the close animation.

### Hero remains untouched when menu is open
- [ ] Hero section does not scroll when menu is open (body overflow hidden).
- [ ] No hero content (headline, CTA, calendar) visible on top of or through the menu (menu z-index 9999 > hero 1).
- [ ] After closing the menu, hero looks unchanged (same scroll position, no layout shift).

## Quick manual test flow

1. Resize to **375 × 667** (iPhone SE).
2. Tap hamburger → menu opens, slides in, hero not visible behind it.
3. Scroll the menu (if many links) → nav links and CTA never overlap.
4. Tap “Get Started” → booking modal opens (optional); close modal.
5. Tap X or press Escape → menu slides out, focus on hamburger, hero unchanged.
6. Repeat at **360 × 640** and **390 × 844**.

## Code safeguards (already in place)

- **Overlay:** `backgroundColor: rgb(19, 8, 25)` + gradient so no transparency; `isolate` for stacking.
- **Nav area:** `pb-[max(8rem, calc(env(safe-area-inset-bottom)+6rem))]` so CTA never overlaps links on short screens.
- **Z-index:** Mobile menu 9999, Navbar 100, Hero content 1 — hero never above menu.
- **Body scroll:** Locked when `isMobileMenuOpen || isMenuClosing`, restored on close.
