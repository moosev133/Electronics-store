import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { products } from '../src/data/products';
import { categories } from '../src/data/categories';
import { brandCatalog } from '../src/data/brands';
import { heroSlides, homepage, serviceHighlights } from '../src/data/homepage';
import { navigation } from '../src/config/navigation';
import { content } from '../src/data/information';
import { responsiveImages } from '../src/data/responsiveImages';

function unique(values: string[], label: string) {
  expect(new Set(values).size, `${label}: duplicate values`).toBe(values.length);
  for (const value of values) expect(value.trim(), `${label}: empty value`).not.toBe('');
}
function localImage(path: string) {
  expect(existsSync(`public/${path}`), `Missing image: public/${path}`).toBe(true);
}

describe('editable store content', () => {
  it('keeps product IDs, routes, variants and category/brand references valid', () => {
    unique(
      products.map((p) => p.id),
      'Product IDs',
    );
    unique(
      products.map((p) => p.slug),
      'Product routes',
    );
    unique(
      categories.map((c) => c.slug),
      'Category routes',
    );
    unique(
      brandCatalog.map((b) => b.slug),
      'Brand routes',
    );
    unique(
      brandCatalog.map((b) => b.name),
      'Brand names',
    );
    expect(categories.length, 'Keep at least one department for navigation').toBeGreaterThan(0);
    for (const item of [...categories, ...products, ...brandCatalog])
      expect(item.slug, `Invalid route slug: ${item.slug}`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    for (const p of products) {
      const category = categories.find((c) => c.slug === p.category);
      expect(category, `${p.id}: unknown category ${p.category}`).toBeDefined();
      expect(category?.subcategories, `${p.id}: unknown subcategory`).toContain(p.subcategory);
      expect(
        brandCatalog.some((b) => b.name === p.brand),
        `${p.id}: add brand ${p.brand} to brands.ts`,
      ).toBe(true);
      expect(p.variants.length, `${p.id}: needs at least one variant`).toBeGreaterThan(0);
      unique(
        p.variants.map((v) => v.id),
        `${p.id} variant IDs`,
      );
      expect(p.images.length, `${p.id}: needs a product image`).toBeGreaterThan(0);
      for (const image of [...p.images, ...p.variants.flatMap((v) => (v.image ? [v.image] : []))]) {
        localImage(image.src);
        expect(image.alt.trim(), `${p.id}: image alt text is missing`).not.toBe('');
      }
      expect(p.addedAt, `${p.id}: use YYYY-MM-DD`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(p.addedAt).toISOString().slice(0, 10), `${p.id}: invalid date`).toBe(
        p.addedAt,
      );
    }
  });

  it('checks prices without requiring prices or live inventory', () => {
    for (const p of products) {
      for (const amount of [p.price, p.previousPrice, ...p.variants.map((v) => v.price)]) {
        if (amount === undefined) continue;
        expect(Number.isFinite(amount) && amount >= 0, `${p.id}: invalid price`).toBe(true);
      }
      if (p.discount !== undefined)
        expect(p.discount >= 0 && p.discount <= 100, `${p.id}: invalid discount`).toBe(true);
      if (p.demo) {
        expect(p.verified, `${p.id}: demo product cannot be verified inventory`).toBe(false);
        expect(p.price, `${p.id}: do not give demo products invented prices`).toBeUndefined();
        expect(p.previousPrice).toBeUndefined();
        expect(p.discount).toBeUndefined();
        expect(p.availability).toBe('unknown');
        for (const variant of p.variants) expect(variant.price).toBeUndefined();
      }
    }
  });

  it('checks navigation, campaign links, logos and responsive image files', () => {
    const slugs = categories.map((c) => c.slug);
    const references = [
      ...navigation.categories,
      navigation.promotionCategory,
      ...homepage.categoryTiles,
      ...homepage.secondaryPromotions,
      ...homepage.featuredDepartments,
      homepage.editorial.category,
      ...heroSlides.map((s) => s.category),
    ];
    for (const slug of references)
      expect(slugs, `Update navigation/homepage: category '${slug}' no longer exists`).toContain(
        slug,
      );
    unique(
      heroSlides.map((s) => s.category),
      'Hero slide categories',
    );
    expect(heroSlides.length, 'Keep at least one homepage slide').toBeGreaterThan(0);
    expect(homepage.rotationMilliseconds).toBeGreaterThanOrEqual(1500);
    expect(homepage.productsPerRail).toBeGreaterThan(0);
    for (const category of categories) {
      unique(category.subcategories, `${category.slug} subcategories`);
      localImage(`assets/products/${category.image}.webp`);
    }
    for (const brand of brandCatalog) localImage(brand.logo);
    for (const slide of heroSlides) {
      localImage(slide.image);
      if (slide.smallImage) localImage(slide.smallImage);
    }
    localImage(homepage.editorial.image);
    for (const item of serviceHighlights)
      expect(content[item.route], `Missing info page ${item.route}`).toBeDefined();
    for (const [src, width] of Object.entries(responsiveImages)) {
      expect(width).toBeGreaterThanOrEqual(480);
      localImage(src);
      for (const size of [240, 480]) localImage(src.replace('.webp', `-${size}.webp`));
    }
  });
});
