# Hebrew electronics storefront

A complete React + TypeScript frontend demonstration, rebuilt from the repository's original single-page prototype. The Hebrew RTL structure and existing department taxonomy are retained; alert-only actions and invented prices are replaced with real routed browsing and explicit demo states.

## Run locally or in GitHub Codespaces

Requires **Node 22.12+**.

```bash
npm ci
npm run dev
```

Open the forwarded **port 3000** in Codespaces, or http://localhost:3000 locally. The supplied `.devcontainer` installs dependencies and forwards the correct ports. An old Codespaces URL only works while its Codespace and dev server are running.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`npm run check` runs the four quality checks. Production files are in `dist/`; the preview runs on port 4173.

## Browser tests

```bash
npx playwright install chromium
npm run test:e2e
```

Playwright covers desktop (1440 px), tablet (820 px), and mobile (390 px). Tests include catalog filters, query persistence, sorting, model search, keyboard selection, galleries, variants, favorites, cart quantities/removal/persistence, disabled checkout, department routes, reduced motion, missing assets, overflow, and axe accessibility audits. See `docs/QA.md` for the final execution evidence and limitations.

## Features

- 12 routed departments and relevant subcategory navigation, plus brand catalogs.
- Hebrew-first RTL layout, local Heebo fonts, soft white/light gray surfaces and champagne-gold accents. The original graphite/gold design is archived; see [Design reference](docs/DESIGN.md).
- Lightweight, skippable entrance; six-slide carousel with keyboard/touch controls and pause; reduced-motion support.
- Data-driven product cards, new arrivals, illustrative best sellers, department promotions, and recently viewed products.
- Multi-select category-specific filters in URL search parameters, sorting, load more and empty results. Price filters are disabled while prices are absent.
- Product galleries, zoom, URL-persisted variants, specifications, service information and ordered cross-category/same-category recommendations.
- Local cart and favorites, safe parsing of stored cart data, quantity controls and explicit unavailable checkout.
- Local generated demonstration imagery and authentic manufacturer logo assets, with source notes.
- Accessible native dialogs, visible focus, skip link, semantic headings, route titles/descriptions, Open Graph metadata and code-split routes.

## Configure the store

For recurring updates, use [Updating the store](docs/UPDATING-THE-STORE.md). Product records, category definitions, homepage banners, navigation, brands and information-page copy each have dedicated editable files. Run `npm run check:content` to catch broken references and missing images.

Edit **`src/config/store.ts`** for the name, logo, phone, email, address, hours, Instagram and service details. No identity or contact information is invented. Empty fields have informative placeholders rather than fake links. Set `VITE_SITE_URL` to the production origin to enable canonical URLs. Update `index.html`'s static social metadata with the final identity before launch.

Product records are in `src/data/catalog.ts` (exported through `src/data/products.ts`), and departments are in `src/data/categories.ts`; interfaces are in `src/types/catalog.ts`. Every seeded product uses a `DEMO-…` model, synthetic illustrative specifications and a generic illustration. Brand assignments demonstrate filtering and are **not verified product associations**. Prices, discounts, stock, reviews and warranty claims are intentionally absent. Before commercial use, replace these entries with verified inventory, licensed model imagery, merchant policies and business information.

`price`, `previousPrice`, `discount`, variant prices and availability are typed for future catalog ingestion. Only publish verified information. Do not add Product/Offer structured data while this catalog is demonstrative.

## Backend and Israeli payment integration

This is a frontend demonstration. It does not create accounts, orders, payments, inquiries, or fake confirmations. `CheckoutProvider` in `src/types/catalog.ts` defines a future server adapter boundary. A backend must re-price and validate stock, shipping and tax, create idempotent orders, and use provider-hosted checkout plus verified webhooks. No payment credentials belong in Vite environment variables. Checkout remains disabled until a complete backend flow replaces it; flipping a configuration flag is insufficient.

## Localization

Hebrew is complete. The locale type, direction/currency settings and metadata boundary are centralized in `src/config/store.ts` and `src/types/catalog.ts`. For Arabic/English, extract page copy into locale dictionaries and translate product data before exposing a language switch. No unfinished language control is shown to shoppers.

## Hosted preview

The owner-private preview is live at **https://mostafa-electronics-preview.meliodasin14.chatgpt.site**. Sign in with the owning ChatGPT account if prompted. It contains the demonstration catalog; checkout remains disabled.

The source remains on GitHub under `codex/premium-hebrew-storefront`. Preview publication is a separate Sites deployment, not an automatic consequence of a GitHub push. See [Preview hosting and updates](docs/PREVIEW.md) for the existing Site identity and update workflow.

## Deploy to GitHub Pages

On 3 November 2026, GitHub declined Pages activation because the current plan does not support Pages for this private repository. Repository visibility was preserved. The steps below remain available if the account becomes eligible.

1. Push/merge this feature branch into `main` after review, or run the deployment workflow manually on the feature branch.
2. In the repository, open **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The `Deploy to GitHub Pages` workflow builds with `VITE_BASE_PATH=/Electronics-store/` and publishes `dist/`.
4. The expected address is `https://moosev133.github.io/Electronics-store/` **after a successful deployment**. This README does not claim the site is already deployed.

Clean routes such as `/Electronics-store/category/tvs` work through the generated `404.html` redirect. It preserves the route and query string, and `index.html` restores the original URL. On a host supporting SPA rewrites, serve `index.html` for missing routes and use the appropriate `VITE_BASE_PATH` (`/` for a root domain).

```bash
VITE_BASE_PATH=/Electronics-store/ VITE_SITE_URL=https://moosev133.github.io npm run build
VITE_BASE_PATH=/Electronics-store/ npm run preview
```

GitHub Pages is appropriate for this frontend demo. For production search indexing and commerce, use server rendering/prerendering and verified backend data; this client-rendered app does not claim server-rendered product SEO.

## Project structure

```text
src/components/   Reusable shopping, navigation, gallery and modal components
src/pages/        Home, catalog, product, cart, favorites and service routes
src/layouts/      Shared header/footer and navigation focus management
src/config/       Merchant identity, asset paths, locale configuration
src/data/         Structured demonstration catalog and departments
src/hooks/        Shopping state, local persistence, metadata and motion preferences
src/utilities/    Pure filtering, cart validation and storage helpers
src/types/        Catalog and future checkout contracts
src/styles/       Responsive design system
public/assets/    Optimized local product/hero imagery and brand logos
scripts/          GitHub Pages route fallback generation
tests/           Unit and browser tests
```

Research, image provenance and QA evidence are documented in `docs/`. No competitor code, branding or promotional artwork was copied.
