import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => sessionStorage.setItem('electronics.entrance', '1'));
});

test('Lumivo models display their product dimensions and original photo without packaging tables', async ({
  page,
}) => {
  for (const family of [
    {
      slug: 'lumivo-chest-freezer',
      models: [
        ['BC/BD-446', '1280 × 735 × 850'],
        ['BC/BD-546', '1530 × 735 × 850'],
        ['BC/BD-607', '1800 × 710 × 850'],
        ['BC/BD-798', '1934 × 845 × 910'],
        ['BC/BD-1098', '2360 × 845 × 910'],
      ],
    },
    {
      slug: 'lumivo-display-cooler',
      models: [
        ['LC-700J', '700 × 605 × 1965'],
        ['LC-1120J', '1120 × 605 × 1965'],
        ['LC-1680J', '1680 × 605 × 1965'],
      ],
    },
  ]) {
    await page.goto(`/product/${family.slug}`);
    await expect(page.locator('.variant-selector button')).toHaveCount(family.models.length);
    await expect(page.locator('.product-page > .demo-note')).toHaveCount(0);
    for (const [model, dimensions] of family.models) {
      await page.getByRole('button', { name: new RegExp(model) }).click();
      await expect(page.locator('.model')).toContainText(model);
      await expect(page.getByRole('row', { name: /מידות המוצר/ })).toContainText(dimensions);
      await expect(page.locator('.purchase-price')).toContainText('מחיר יעודכן בקרוב');
      await expect(page.locator('.availability')).toContainText('זמינות המלאי תעודכן בהמשך');
      await expect(page.locator('.product-information')).not.toContainText(
        /אריזה|Package|נתוני הדגמה סינתטיים/,
      );
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    const selected = await page.url();
    await page.reload();
    await expect(page).toHaveURL(selected);
    await expect(page.locator('.model')).toContainText(family.models.at(-1)![0]);
    await page.getByRole('button', { name: 'הגדלת תמונת המוצר' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    // The bounded viewport is also used by the zoom view, so the full brochure is never shown.
    await expect(page.locator('.zoom-modal > svg.product-photo')).toHaveAttribute('viewBox', /\d/);
    await page.keyboard.press('Escape');
    const axe = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(axe.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
      [],
    );
    await page.locator('.product-detail').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/${family.slug}-${test.info().project.name}.png` });
  }
});

test('Lumivo brand, refrigeration filters, model search and cart retain the chosen model', async ({
  page,
  isMobile,
}) => {
  await page.goto('/brands');
  await page.getByRole('link', { name: 'Lumivo', exact: true }).click();
  await expect(page).toHaveURL(/brand\/lumivo/);
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(2);
  await page.goto('/category/refrigerators');
  if (isMobile) await page.getByRole('button', { name: 'סינון', exact: true }).click();
  const filters = isMobile
    ? page.getByRole('dialog', { name: 'סינון מוצרים' })
    : page.locator('.desktop-filters');
  await filters.getByRole('checkbox', { name: 'Lumivo' }).click();
  await expect(filters.getByRole('checkbox', { name: 'Lumivo' })).toBeChecked();
  if (isMobile) await page.getByRole('button', { name: 'הצגת 2 מוצרים' }).click();
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(2);
  await page.getByRole('button', { name: 'מקררי תצוגה ויין', exact: true }).click();
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(1);
  const search = page.getByRole('combobox', { name: 'חיפוש מוצרים, מותגים או דגמים' });
  await search.fill('LC-1680J');
  await search.press('ArrowDown');
  await search.press('Enter');
  await expect(page).toHaveURL(/product\/lumivo-display-cooler\?variant=lumivo-lc-1680j/);
  await expect(page.locator('.gallery-main .product-photo')).toHaveAttribute(
    'aria-label',
    /LC-1680J/,
  );
  await page.getByRole('button', { name: 'הוספה לסל', exact: true }).click();
  await page.getByRole('link', { name: 'סל קניות, 1 פריטים' }).click();
  await expect(page.locator('.cart-item')).toContainText('LC-1680J');
  await expect(page.locator('.cart-item .product-photo')).toHaveAttribute('aria-label', /LC-1680J/);
  await page.reload();
  await expect(page.locator('.cart-item')).toContainText('LC-1680J');
  await expect(page.getByRole('button', { name: 'התשלום עדיין לא זמין' })).toBeDisabled();
});
