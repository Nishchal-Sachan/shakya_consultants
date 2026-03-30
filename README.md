# SaaS Agency Website

Professional SaaS agency website built with Next.js, TypeScript, and Tailwind CSS.

## Project Structure

```
app/
 ├─ layout.tsx
 ├─ page.tsx
 ├─ globals.css
 ├─ components/
 │   ├─ layout/
 │   │   ├─ Navbar.tsx
 │   │   └─ Footer.tsx
 │   ├─ ui/
 │   │   ├─ Button.tsx
 │   │   ├─ Card.tsx
 │   │   ├─ Badge.tsx
 │   │   └─ SectionHeading.tsx
 │   └─ sections/
 ├─ data/
public/
 └─ assets/
     ├─ logo.svg
     ├─ icons/
     ├─ avatars/
     ├─ logos/
     └─ case-studies/
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Add your assets to the `public/assets/` folder with the exact names specified.

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Asset Files Required

Place these files in `public/assets/`:
- `logo.svg` - Main logo
- `icon-play.svg`, `icon-arrow-right.svg`, `icon-check.svg`, `icon-menu.svg`, `icon-close.svg`, `icon-quote.svg`, `icon-star.svg`, `icon-chevron-down.svg`
- `pattern-grid.svg` (optional)
- `illustration-hero.png`, `illustration-services.png`, `illustration-cta.png`
- `avatars/avatar-1.jpg`, `avatar-2.jpg`, `avatar-3.jpg`
- `logos/logo-1.svg` through `logo-6.svg`
- `case-studies/case-1.jpg`, `case-2.jpg`, `case-3.jpg`

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Architecture**: Component-driven, reusable
