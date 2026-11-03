# Image and brand provenance

## Product imagery

All files in `public/assets/products/` are original AI-generated, unbranded **demonstration illustrations**, created for this storefront with the built-in OpenAI ImageGen tool on 2026-11-03. They do not depict verified inventory or the exact models of any manufacturer. They must remain labeled as illustrations in the interface. No competitor product photography is used or hotlinked.

The primary catalog images are `tv.webp`, `phone.webp`, `ac.webp`, `washer.webp`, `fridge.webp`, `oven.webp`, `coffee.webp`, `vacuum.webp`, `laptop.webp`, `smart-home.webp`, and `heater.webp`. Each category also has a second gallery image: `tv-front.webp`, `phone-detail.webp`, `ac-detail.webp`, `washer-detail.webp`, `fridge-detail.webp`, `oven-detail.webp`, `coffee-detail.webp`, `vacuum-detail.webp`, `laptop-detail.webp`, `smart-home-detail.webp`, and `heater-detail.webp`. These additional views were created using reference-based ImageGen edits of the corresponding original illustration; the primary images remain unchanged. Most second views are front or opposite-side photographs; the vacuum detail focuses on its handle, motor, and dust chamber.

Each final image is 900 × 900 pixels, optimized to WebP with Sharp (quality 86). See [IMAGE-PROMPTS.json](IMAGE-PROMPTS.json) for each complete generation prompt and the reference image for gallery edits. The original generated PNGs were retained in the image tool's output directory; the website uses only the local, tracked WebP assets.

The hero image is documented separately by the application author. All generated concept imagery must be replaced with verified licensed model photography before live product sales.

## Brand logos

Logos identify manufacturers only. Their presence does not imply an official partnership, authorized reseller status, warranty entitlement, or endorsement. Logo artwork was downloaded as genuine SVG/PNG assets, not recreated using plain text. Logos may still be protected as trademarks even where the artwork has a permissive copyright status.

| Local file in `public/assets/brands/` | Source                                                                                                                        | Copyright license / provenance                                                                                 |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `samsung.svg`                         | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/samsung.svg)                                   | CC0-1.0; Simple Icons contributors                                                                             |
| `lg.svg`                              | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/lg.svg)                                        | CC0-1.0; Simple Icons contributors                                                                             |
| `bosch.svg`                           | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/bosch.svg)                                     | CC0-1.0; Simple Icons contributors                                                                             |
| `sony.svg`                            | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/sony.svg)                                      | CC0-1.0; Simple Icons contributors                                                                             |
| `xiaomi.svg`                          | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/xiaomi.svg)                                    | CC0-1.0; Simple Icons contributors                                                                             |
| `siemens.svg`                         | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/siemens.svg)                                   | CC0-1.0; Simple Icons contributors                                                                             |
| `apple.svg`                           | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/apple.svg)                                     | CC0-1.0; Simple Icons contributors                                                                             |
| `panasonic.svg`                       | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/panasonic.svg)                                 | CC0-1.0; Simple Icons contributors                                                                             |
| `lenovo.svg`                          | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/lenovo.svg)                                    | CC0-1.0; Simple Icons contributors                                                                             |
| `asus.svg`                            | [Simple Icons 13.17.0](https://cdn.jsdelivr.net/npm/simple-icons@13.17.0/icons/asus.svg)                                      | CC0-1.0; Simple Icons contributors                                                                             |
| `hisense.svg`                         | [Wikimedia Commons: Hisense.svg](https://commons.wikimedia.org/wiki/File:Hisense.svg)                                         | Public-domain text logo; sourced by Commons from the official Hisense site                                     |
| `philips.svg`                         | [Wikimedia Commons: Philips logo.svg](https://commons.wikimedia.org/wiki/File:Philips_logo.svg)                               | Public-domain text logo; Philips wordmark, source noted as Philips brand material                              |
| `tcl.svg`                             | [Wikimedia Commons: Logo of the TCL Corporation.svg](https://commons.wikimedia.org/wiki/File:Logo_of_the_TCL_Corporation.svg) | Public-domain logo; Commons license metadata retained in `tcl-source.json`                                     |
| `electra.png`                         | [Wikimedia Commons: Electra-cp-logo.png](https://commons.wikimedia.org/wiki/File:Electra-cp-logo.png)                         | Public-domain text logo; Electra Consumer Products, Commons license metadata retained in `electra-source.json` |

The Simple Icons license is included in `public/assets/brands/SIMPLE-ICONS-LICENSE.md`. Logos are locally hosted. Any monochrome presentation is applied by CSS. The Samsung, Sony, and Siemens SVG `viewBox` values were cropped to their visible artwork bounds, measured from 2400-pixel rendered alpha coverage with a small margin, so these short wordmarks scale properly in rectangular containers. Their source vector paths, title, and artwork are unchanged.

## Responsive delivery

The original 900px product renders are retained for gallery/zoom views. `scripts/optimise-images.mjs` generates 240px and 480px WebP derivatives for cards, category circles, search suggestions and banners. Components use `srcset` and `sizes` to select a suitable file. The homepage hero has 900px and 1672px versions and an early image preload. The exact hero brief is in [HERO-PROMPT.md](HERO-PROMPT.md).
