# Store maintenance

The owner plans to supply real products, categories, images, pricing and business details soon, and expects frequent incremental updates afterward.

- Preserve the established premium graphite/champagne Hebrew RTL design unless a redesign is requested.
- Keep recurring content changes in `src/data/` and merchant configuration in `src/config/`. Do not duplicate catalog data inside page components.
- `src/data/catalog.ts` is the editable product inventory. `src/data/products.ts` is the stable consumer entry point. Replace the data source through that boundary if importing from a spreadsheet, CMS or backend later.
- Keep product IDs, variant IDs and route slugs stable when changing names, prices, images or descriptions. They connect saved carts, favorites and links.
- Category order must not generate or rename product records. New categories may be empty while inventory is prepared.
- Use `docs/UPDATING-THE-STORE.md` for the editable-file map and update workflow.
- Run `npm run check` after content changes; it includes relationship and local-image validation. Run relevant browser checks for affected navigation or shopping flows.
- Keep demo and verified inventory clearly distinguished. Do not invent prices, stock, reviews, discounts, policies or store details. Receiving real inventory does not authorize enabling checkout without a working backend/payment integration.
- The current editor is source-controlled content, not an admin dashboard. Do not describe a CMS, importer or payment provider as connected until it exists and has been verified.
- The existing private hosted preview and its Site identity are documented in `docs/PREVIEW.md`. Reuse that Site for preview updates; a GitHub push alone does not publish it.
