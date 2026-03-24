# SHRI — Premium E‑Commerce Storefront

React + JavaScript + Material UI + Framer Motion demo storefront: catalog, product detail, cart, wishlist, checkout UI, filters, dark/light mode, glass surfaces, and motion (including a flying “add to bag” cue).

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)

## Install

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Build (production)

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project structure

| Path | Role |
|------|------|
| `src/pages/` | Route screens (home, products, product detail, cart, wishlist, checkout) |
| `src/components/` | Layout, cart drawer, product cards, shared UI (`GlassSurface`, `GlowButton`, etc.) |
| `src/components/icons.jsx` | SvgIcon-based icons (no `@mui/icons-material` deep imports) |
| `src/context/shopContext.js` | React context instance |
| `src/context/ShopContext.jsx` | `ShopProvider` — cart, wishlist, theme mode, side cart, flying animation |
| `src/context/useShop.js` | `useShop()` hook |
| `src/hooks/` | e.g. `useFilteredProducts` |
| `src/services/products.js` | Demo catalog + Unsplash image URLs |
| `src/theme/` | MUI theme + glass / gradient tokens |

## Notes

- **Payments:** Checkout is UI-only; “Place order” clears the cart and shows a toast (demo).
- **Persistence:** Cart, wishlist, and theme mode are stored in `localStorage`.
- **Icons:** This repo ships custom `SvgIcon` wrappers so the app builds even when a local `@mui/icons-material` install is incomplete. You may add `@mui/icons-material` back and switch imports if your environment has a full install.
