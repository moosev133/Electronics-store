# Updating the store

The store is designed for recurring catalog and content updates. Product records, categories, banners and merchant details are separate from the reusable page layouts. A dashboard or CMS is not connected yet: these are editable, version-controlled content files. You can send future information as a spreadsheet, CSV, a document or a list; an importer can be added after the actual format is known.

## Lumivo batch — 3 November 2026

- Added two owner-supplied product families to Refrigerators & Freezers: chest freezers (five BC/BD models) and display/wine coolers (three LC-J models). All eight models were explicitly approved for inclusion. The owner identified the brand as Lumivo.
- Product dimensions are transcribed in millimeters, in the order printed in the sheets. Do not label axes without a source confirming the order. Never add packaging dimensions to specifications or visible image views.
- Freezers have distinct gross and net capacities; coolers list a single capacity without specifying gross vs. net. Preserve this distinction. Optional freezer LED/condenser equipment is not claimed as included.
- `Variant.model` holds the actual model identifier, `variantLabel` controls the choice heading, and `sourceNote` records customer-facing provenance. Search includes variant models. IDs remain stable for saved carts and links.
- The unmodified supplied JPEGs are in `public/assets/supplier/`. `ProductImage.frame` defines a bounded viewport around the original photo, shared by cards, gallery, zoom, search and cart. Brochure tables, unrelated products and phone overlays stay outside this viewport. Do not render these supplier sheets as unbounded images. The freezer photo represents the series; the three cooler photos follow the matching variants. No generated product imagery is used.
- Lumivo displays as plain text until an authentic logo is provided. Brand `logo` is optional.
- Prices, stock, warranty and delivery terms are still missing. The records are real supplied catalog data (`demo: false`, `verified: true`), not verified live inventory. Checkout stays disabled.
- **Pending washing machine:** the supplied sheet and photograph identify PILOT PILWM10400W. The owner confirmed a Lumivo version and will provide its matching photo/specifications. No PILOT photo or specifications have been relabeled as Lumivo; no washing-machine record is published yet.

## Where to change things

| Change                                                                                 | Edit                         |
| -------------------------------------------------------------------------------------- | ---------------------------- |
| Product names, models, descriptions, specifications, images, variants and price fields | `src/data/catalog.ts`        |
| Departments, category names, order, subcategories and filters                          | `src/data/categories.ts`     |
| Hero headlines, images, buttons, rotation speed and featured departments               | `src/data/homepage.ts`       |
| Desktop header category order                                                          | `src/config/navigation.ts`   |
| Brands, brand route slugs and authentic logo paths                                     | `src/data/brands.ts`         |
| Specification labels shown on product pages                                            | `src/data/specifications.ts` |
| Store identity, contact details, hours, delivery/pickup/warranty defaults              | `src/config/store.ts`        |
| About, delivery, returns, privacy and other information-page text                      | `src/data/information.ts`    |
| Colors, typography, spacing and responsive styling                                     | `src/styles/global.css`      |
| Local product imagery                                                                  | `public/assets/products/`    |

Product data is exported through `src/data/products.ts`. Pages, filters, search, cart and favorites share that entry point. Future CSV/CMS integration can replace the data source there without rebuilding each page.

## Routine product updates

1. Find the product's `id` in `catalog.ts` and edit its fields.
2. Keep `id`, `slug` and variant `id` values unchanged for the same product. Names and descriptions can change freely. Changing an ID creates a different product from the cart/favorites perspective; changing a slug breaks existing links unless a redirect is added.
3. Set the desired merchandising flags: `isNew` adds the product to new arrivals; `featured` adds it to the homepage's selected products; `sale` includes it in the offers catalog. New arrivals are sorted by `addedAt`, not record position. `demoBestSeller` is illustrative only and must not substitute for verified sales ranking.
4. Each product needs an existing category slug, an exact subcategory from that department, a brand registered in `brands.ts`, at least one image and at least one variant. A product with no choices still has one default variant.
5. Prices are numeric ILS values, without a currency sign or thousands separator. Leave an unknown price field absent rather than setting it to zero. Never add invented demo prices. Existing price, discount and availability fields are the data contract for the forthcoming real catalog; commercial messaging and checkout must be reviewed as part of the real-inventory rollout below.

Removing a product also removes its stale cart lines when the site next loads. Keep IDs stable when temporarily correcting a price or replacing an image.

## Category changes

- Change a Hebrew `name` or `shortName` while preserving `slug` for ordinary renaming.
- Add or reorder category objects without affecting product identities. Products are explicit records, not generated from the category order.
- Add filter keys matching the keys in product `specs`, then add their Hebrew labels in `specifications.ts`. Filter options come from the products automatically.
- After removing or changing a category slug, update product assignments, homepage selections, hero slides and header navigation. `npm run check:content` identifies stale references before publishing.
- `offers` is the special sale collection, not a normal product department. Keep that slug while the collection logic uses it.

## Images and homepage banners

Copy authorized product images into `public/assets/products/` and enter their local path and alt text in the product record. No competitor hotlinks are needed. A newly added image works immediately without smaller derivatives.

For new WebP images at least 480 pixels wide, run:

```bash
npm run images:optimise
```

This creates 240/480px derivatives and updates `src/data/responsiveImages.ts`. The helper only emits responsive URLs for files registered there. When replacing an existing image under the same name, regenerate its derivatives. Category images use a filename stem (`coffee` resolves to `assets/products/coffee.webp`). Hero and editorial images use explicit paths in `homepage.ts`; `smallImage` is optional for the hero. The supplied hero's small/original widths are 900/1672px. If replacing the first hero image, also update its early image preload in `index.html`; social sharing metadata is maintained there and in `scripts/postbuild.mjs`.

Edit hero text as plain strings, reorder the slide objects, or change their category destinations. The carousel count is calculated from the slides automatically. Edit `categoryTiles`, `secondaryPromotions` and `featuredDepartments` to choose homepage department placement. Brand logos use explicit paths, so names do not have to match filenames.

## When the real catalog arrives

The initial replacement is a deliberate content rollout, followed by smaller recurring updates:

- Map actual product IDs/SKUs, categories, variants and model photographs to the existing types.
- Replace synthetic specifications and demo images with verified information. Preserve clear image labels wherever a generic illustration remains.
- Update demo messaging, stock/price presentation, product-specific service information and variant labels to match the supplied inventory. The current UI still identifies this site as a demonstration; setting `verified` alone does not turn it into a live store.
- Replace placeholder business policies and social metadata with the owner's supplied text/details.
- Adapt browser scenarios that currently select named demo products to the new catalog. Filtering/cart unit tests use independent fixtures, so merchant inventory changes do not alter their expectations.
- Keep checkout unavailable until the actual backend and payment integration work. Catalog updates never create orders or accept payment by themselves.

## Verify and publish an update

```bash
npm run check:content  # missing images, duplicate IDs, invalid category/brand/banner references
npm run check          # TypeScript, lint, all unit/content tests, production build
npm run test:e2e       # browser checks when navigation or shopping flows are affected
npm run dev            # preview at http://localhost:3000; keep this process running while viewing
```

Changes appear immediately in the running local preview. The public site changes only after committing/pushing and running the configured deployment workflow. Follow the GitHub Pages steps in `README.md`. Git history records each update and provides a rollback path.
