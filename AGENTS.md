# Store maintenance

The owner plans to supply real products, categories, images, pricing and business details soon, and expects frequent incremental updates afterward.

- Preserve the approved layout, typography, graphics, spacing and interactions. The current palette is soft white/light gray with gold, centralized in `src/styles/theme.css`. Change structure only when explicitly requested. The original graphite/gold version is preserved under Git tag `design/graphite-gold-original-2026-11-03`; see `docs/DESIGN.md`.
- Keep recurring content changes in `src/data/` and merchant configuration in `src/config/`. Do not duplicate catalog data inside page components.
- `src/data/catalog.ts` is the editable product inventory. `src/data/products.ts` is the stable consumer entry point. Replace the data source through that boundary if importing from a spreadsheet, CMS or backend later.
- Keep product IDs, variant IDs and route slugs stable when changing names, prices, images or descriptions. They connect saved carts, favorites and links.
- Category order must not generate or rename product records. New categories may be empty while inventory is prepared.
- Use `docs/UPDATING-THE-STORE.md` for the editable-file map and update workflow.
- Run `npm run check` after content changes; it includes relationship and local-image validation. Run relevant browser checks for affected navigation or shopping flows.
- Keep demo and verified inventory clearly distinguished. Do not invent prices, stock, reviews, discounts, policies or store details. Receiving real inventory does not authorize enabling checkout without a working backend/payment integration.
- The current editor is source-controlled content, not an admin dashboard. Do not describe a CMS, importer or payment provider as connected until it exists and has been verified.
- The primary review preview is GitHub Pages at `https://moosev133.github.io/Electronics-store/`. The user explicitly authorized making this repository public on 2026-11-03. Deploy through the existing GitHub Actions workflow on `main`; preserve the `/Electronics-store/` base path. See `docs/PREVIEW.md` for the preview and previous Sites deployment.
- Keep preview hosting and related services on free plans. Do not enable paid upgrades, trials that convert to paid subscriptions, automatic credit purchases, paid add-ons or domain purchases without a new explicit user instruction. The user confirmed this constraint on 2026-11-03.
