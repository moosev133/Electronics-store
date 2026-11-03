# Quality assurance

Executed locally on 2026-11-03 against the completed frontend. No production inventory, checkout or payment service was tested or implied.

## Automated checks

- TypeScript strict check: passed.
- ESLint: passed using the current lint stack, including Hooks checks.
- Vitest: 10 tests passed (catalog integrity, valid assets and variants, all departments, honest demo values, multi-value filters, sorting, search, stored cart validation and missing-price handling).
- Full Playwright suite: **34 passed, 2 intentionally skipped**. The two skipped cases are touch-only tests on desktop/tablet; the mobile touch test passed.
- Viewports: desktop 1440×1000, tablet 820×1180, mobile 390×844 (Chromium).
- Tested: homepage images/RTL/overflow, mega-menu and Escape, category filters and URL refresh, sorting/empty state, galleries/zoom, variants and specification updates, add/remove/quantity/persistent cart, unavailable checkout, search keyboard selection, favorites, brands, all 12 departments, recommendation order, reduced motion, entrance skip/session behavior, automatic carousel and focus pause, touch swipe, pagination, service routes and invalid-route states.
- Follow-up checks after responsive-image/accessibility refinements cover homepage image loading, cart/variant flow and axe audits at all three sizes.
- Axe audits cover WCAG 2 A/AA, 2.1 A/AA and 2.2 AA on the homepage, TV catalog, TV product and cart. Automated checks supplement visual inspection; they are not a formal accessibility certification.
- GitHub Pages simulation: direct clean product/category paths, variant/filter query strings, reload and asset base paths pass using `scripts/verify-pages.mjs`.
- `git diff --check`: passed.

## Visual review

Inspected the homepage and product page in the in-app browser, plus desktop/tablet/mobile screenshots. Verified the original cinematic hero, coherent studio photography, correct product categories, Hebrew layout, readable cards, selected variants and consistent light/dark surfaces. Source images, model labels and brand associations remain explicitly illustrative.

## Production lab measurement

Lighthouse mobile simulation on the compiled GitHub Pages build, served locally:

| Category       | Score |
| -------------- | ----: |
| Performance    |    95 |
| Accessibility  |   100 |
| Best practices |   100 |
| SEO            |   100 |

Largest Contentful Paint in that run was 2.9 s. These are local lab results, not field Core Web Vitals or guarantees under production hosting/network conditions. The initial audit identified image delivery, label naming and carousel target sizes; responsive derivatives, hero preloading and accessible controls addressed them. The SEO audit does not establish server-rendered indexing: routes remain client-rendered, and no unverified Product structured data is emitted.

## Dependency audit and operational limits

`npm audit --omit=dev` reports **0 vulnerabilities**. The full audit reports **11 moderate development-only advisories** in the current ESLint/TypeScript-ESLint dependency chain (primarily minimatch); no high or critical advisories remain. Current tool versions were installed and verified; unsafe dependency overrides or suggested downgrades were not forced. The static production bundle does not include those lint tools.

Store identity/contact information, verified catalog/pricing/stock, business policies, accounts, backend and payment provider remain intentionally unconfigured. Browsers beyond Chromium and real physical devices were not exercised. The user's old Codespaces preview URL returned 404; local source testing was completed instead. Public deployment requires the documented GitHub Pages setup/workflow.

## Recurring-update refactor (2026-11-03)

Product records were made independent of category ordering. Homepage campaigns, navigation, brand assets and information-page copy now live in editable data/configuration files. Content validation checks relationships, IDs, dates, prices, logos and image derivatives; filtering/cart tests use a fixed fixture independent of merchant inventory.

After the refactor, strict TypeScript, lint, all 10 unit/content tests and the production build passed. The full desktop/tablet/mobile browser suite passed again: 34 passed, 2 intentionally skipped touch cases. No new Lighthouse measurement is claimed for this refactor. The local preview remains running for the owner to view.
