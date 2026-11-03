# Store design reference

On 3 November 2026 the owner explicitly approved the existing design and requested a color-only update from black/gold to white, light gray and gold. Preserve the layout, typography, images, icons, dimensions, spacing, responsive behavior and interactions in future updates unless the owner requests otherwise.

## Original design archive

- Git tag: `design/graphite-gold-original-2026-11-03`
- Original source commit: `6ebfcb3`
- Full source and graphics ZIP: `../output/electronics-store/design-backups/graphite-gold-original-2026-11-03.zip` in the local workspace.
- Original desktop/mobile screenshots are in the same folder, named `original-viewport-*.png` and `original-home-*.png`.
- The original theme used page background `#111419`, header `#161a20f5`, text `#f5f5f3` and champagne gold `#d9ba7a`. The tag preserves the complete styles and assets, not just these sample values.

Use the tag to inspect or restore the original design in an isolated checkout. Preserve newer catalog changes if reverting only its presentation.

## Current palette

Edit `src/styles/theme.css` for colors and gradients. `src/styles/global.css` retains the existing layout and consumes the named palette values.

| Role | Value |
| --- | --- |
| Soft white page | `#f6f7f4` |
| White panels and cards | `#ffffff` |
| Pale gray surfaces | `#f0f2ee` |
| Gray separation | `#e7eae5` |
| Main text | `#2b3035` |
| Secondary text | `#515b63` |
| Small supporting text | `#626b71` |
| Readable gold text and focus rings | `#806024` |
| Decorative gold | `#b49350` |
| Champagne button gradient | `#efdfbd` to `#e4cfa5` to `#d7bc87` |
| Gold text/button ink | `#352d20` |

Subtle neutral gradients distinguish hero, category, promotion, help and footer surfaces. The existing hero/editorial artwork is unchanged; light overlays provide a readable surface behind dark text. Product photos and brand logo files remain unchanged. Monochrome logo styling is darkened for the light background. The existing favicon geometry is unchanged, with its fill/stroke updated to the new palette.

Keep the HTML `theme-color` and SVG favicon colors aligned when changing the palette. Keep text gold separate from the lighter gold used on button backgrounds. Always check text contrast, selected states, search suggestions, dialogs and all responsive breakpoints after changing colors.

## Verification of the color-only update

- TypeScript, lint, 10 unit/content checks and the production build passed.
- Existing Playwright suite: 34 passed; 2 intentional non-mobile touch-test skips. Desktop, tablet and mobile layouts, catalog routes, search, filters, variants, galleries, cart, favorites and carousel behavior remained working.
- The existing axe WCAG A/AA checks passed on home, category, product and cart pages in all three viewport projects.
- Source comparison confirmed unchanged layout/typography/motion rules, page components, catalog data and all files in `public/assets`.
- Desktop and mobile homepage screenshots were visually reviewed. The shared UI and palette were also inspected in the in-app browser.
- These checks are not a claim of a complete accessibility certification or a new Lighthouse score.

## Image clarity refinement

The owner subsequently requested visible product corners and clearer homepage pictures. The radial edge masks and hero overlays were removed. Product images blend with the studio surface using `multiply`, preserving their full silhouette. The TV room image now sits in a softly framed, uncropped panel beside the copy on desktop and below it on mobile. The mobile panel is capped at 350px wide to leave space beneath the copy. Original image files, colors, typography and carousel behavior remain intact. Do not reintroduce edge fading over the products.
