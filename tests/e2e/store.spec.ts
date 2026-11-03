import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('electronics.entrance', '1'));
});
test('homepage, all assets, Hebrew RTL and no overflow', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('לראות מעבר');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  for (let y = 0; y < (await page.evaluate(() => document.body.scrollHeight)); y += 700)
    await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(600);
  const broken = await page
    .locator('img')
    .evaluateAll((images) =>
      images
        .filter(
          (im) => !(im as HTMLImageElement).complete || !(im as HTMLImageElement).naturalWidth,
        )
        .map((im) => im.getAttribute('src')),
    );
  expect(broken).toEqual([]);
  expect(errors).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'מעבר לשקופית 1', exact: true }).click();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `test-results/viewport-${test.info().project.name}.png` });
  await page.screenshot({
    path: `test-results/home-${test.info().project.name}.png`,
    fullPage: true,
  });
});
test('menu opens real category routes and closes with Escape', async ({ page, isMobile }) => {
  await page.goto('/');
  const menu = page.getByRole('button', {
    name: isMobile ? 'פתיחת תפריט קטגוריות' : 'כל המחלקות',
    exact: true,
  });
  await menu.click();
  const dialog = page.getByRole('dialog', { name: 'כל המחלקות' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'מכונות כביסה ומייבשים' }).click();
  await dialog.getByRole('link', { name: 'כל מוצרי המחלקה' }).click();
  await expect(page).toHaveURL(/category\/washing-machines/);
  await expect(dialog).not.toBeVisible();
  await menu.click();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});
test('category filtering, query persistence, sorting and empty results', async ({
  page,
  isMobile,
}) => {
  await page.goto('/category/tvs');
  if (isMobile) await page.getByRole('button', { name: 'סינון', exact: true }).click();
  const filters = isMobile
    ? page.getByRole('dialog', { name: 'סינון מוצרים' })
    : page.locator('.desktop-filters');
  await filters.getByRole('checkbox', { name: 'Samsung' }).click();
  await expect(filters.getByRole('checkbox', { name: 'Samsung' })).toBeChecked();
  await filters.getByRole('checkbox', { name: 'LG', exact: false }).click();
  await expect(filters.getByRole('checkbox', { name: 'LG', exact: false })).toBeChecked();
  await expect(page).toHaveURL(/f.brand=Samsung/);
  await expect(page).toHaveURL(/f.brand=LG/);
  if (isMobile) await page.getByRole('button', { name: 'הצגת 2 מוצרים' }).click();
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(2);
  await page.reload();
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(2);
  await page.getByRole('combobox').last().selectOption('brand');
  await expect(page).toHaveURL(/sort=brand/);
  await page.goto('/category/tvs?f.brand=Bosch');
  await expect(page.getByRole('heading', { name: 'לא נמצאו מוצרים מתאימים' })).toBeVisible();
  await page.getByRole('button', { name: 'איפוס החיפוש והסינון' }).click();
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(6);
});
test('gallery, selected variants, cart quantity, persistence, remove and disabled checkout', async ({
  page,
}) => {
  await page.goto('/product/demo-tvs-1');
  await page.getByRole('button', { name: '65″', exact: true }).click();
  await expect(page).toHaveURL(/variant=tvs-1-1/);
  await expect(page.locator('table')).toContainText('65″');
  await page.getByRole('button', { name: 'הצגת תמונה 2' }).click();
  await expect(page.locator('.gallery-main img')).toHaveAttribute('src', /tv-front/);
  await page.getByRole('button', { name: 'הגדלת תמונת המוצר' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'הוספה לסל', exact: true }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');
  await page.getByRole('button', { name: '75″', exact: true }).click();
  await page.getByRole('button', { name: 'הוספה לסל', exact: true }).click();
  await page.getByRole('link', { name: 'סל קניות, 2 פריטים' }).click();
  await expect(page.locator('.cart-item')).toHaveCount(2);
  await page.getByRole('button', { name: /הגדלת כמות.*65/ }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('3');
  await page.reload();
  await expect(page.getByTestId('cart-count')).toHaveText('3');
  await expect(page.getByRole('button', { name: 'התשלום עדיין לא זמין' })).toBeDisabled();
  await page
    .getByRole('button', { name: /הסרת.*מהסל/ })
    .first()
    .click();
  await expect(page.locator('.cart-item')).toHaveCount(1);
  await page.getByRole('button', { name: /הסרת.*מהסל/ }).click();
  await expect(page.getByRole('heading', { name: 'הסל שלכם מחכה לבחירות טובות' })).toBeVisible();
});
test('search suggestions, keyboard selection, favorites and brand navigation', async ({ page }) => {
  await page.goto('/');
  const search = page.getByRole('combobox', { name: 'חיפוש מוצרים, מותגים או דגמים' });
  await search.fill('DEMO-0101');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/product\/demo-tvs-1/);
  await page.getByRole('button', { name: 'הוספה למועדפים', exact: true }).click();
  await page.getByRole('link', { name: 'מועדפים, 1 מוצרים' }).click();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.product-card')).toHaveCount(1);
  await page.goto('/brands');
  await page.getByRole('link', { name: 'Bosch', exact: true }).click();
  await expect(page).toHaveURL(/brand\/bosch/);
  await expect(page.locator('.catalog-grid')).toContainText('Bosch');
});
test('every department route and recommendation order', async ({ page }) => {
  for (const slug of [
    'tvs',
    'smartphones',
    'air-conditioners',
    'washing-machines',
    'refrigerators',
    'kitchen',
    'small-appliances',
    'vacuum-cleaners',
    'computers',
    'smart-home',
    'heating',
    'offers',
  ]) {
    await page.goto(`/category/${slug}`);
    await expect(page.locator('.category-hero h1')).toBeVisible();
    expect(await page.locator('.product-card').count()).toBeGreaterThan(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.goto('/product/demo-tvs-1');
  await expect(page.locator('.product-section h2').first()).toBeVisible();
  const headings = await page.locator('.product-section h2').allTextContents();
  expect(headings[0]).toBe('מבצעים נוספים שאולי יעניינו אותך');
  expect(headings[1]).toBe('מוצרים דומים');
  expect(
    await page
      .locator('.product-section')
      .nth(0)
      .locator('.product-card h3 a')
      .evaluateAll((links) => links.every((a) => !a.getAttribute('href')?.includes('demo-tvs'))),
  ).toBe(true);
});
test('carousel manually advances, pauses and follows category', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'שקופית הבאה', exact: true }).click();
  await expect(page.locator('.hero h1')).toContainText('הטכנולוגיה שתאהבו');
  await expect(page.getByRole('button', { name: 'הפעלת סבב השקופיות' })).toBeVisible();
  await page.locator('.hero .button').click();
  await expect(page).toHaveURL(/category\/offers/);
});
test('reduced motion skips entrance and automatic rotation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.entrance')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'הפעלת סבב השקופיות' })).toBeDisabled();
});
test('key pages have no serious accessibility violations', async ({ page }) => {
  for (const route of ['/', '/category/tvs', '/product/demo-tvs-1', '/cart']) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(
      results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});

test('entrance skips once and carousel auto-rotation pauses on focus', async ({ page }) => {
  await page.clock.install();
  await page.addInitScript(() => sessionStorage.removeItem('electronics.entrance'));
  await page.goto('/');
  const skip = page.getByRole('button', { name: 'דילוג על הפתיח ←' });
  await expect(skip).toBeVisible();
  await skip.click();
  await expect(page.locator('.entrance')).toHaveCount(0);
  await page.getByRole('link', { name: 'גלו את הקטלוג', exact: true }).click();
  await expect(page.locator('.category-hero h1')).toBeVisible();
  await page.locator('.main-header .brand-mark').click();
  await expect(page.locator('.hero h1')).toContainText('לראות מעבר');
  await expect(page.locator('.entrance')).toHaveCount(0);
  await page.mouse.move(0, 0);
  await page.clock.fastForward(5200);
  await expect(page.locator('.hero h1')).toContainText('הטכנולוגיה שתאהבו');
  await page.locator('.hero .button').focus();
  await page.clock.fastForward(10000);
  await expect(page.locator('.hero h1')).toContainText('הטכנולוגיה שתאהבו');
});

test('load more, service pages and error routes remain usable', async ({ page }) => {
  await page.goto('/catalog');
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(12);
  await page.getByRole('button', { name: 'טענו מוצרים נוספים' }).click();
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(24);
  await expect(page).toHaveURL(/page=2/);
  for (const route of [
    '/info/contact',
    '/info/privacy',
    '/info/returns',
    '/info/delivery',
    '/account',
    '/categories',
    '/brands',
  ]) {
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.goto('/product/not-a-product');
  await expect(page.getByRole('heading', { name: 'המוצר לא נמצא' })).toBeVisible();
  await page.goto('/not-a-route');
  await expect(page.getByRole('heading', { name: 'העמוד הזה עדיין לא מחובר' })).toBeVisible();
});

test('touch swipe moves the promotional carousel', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Touch interaction is exercised on the mobile project');
  await page.goto('/');
  const hero = page.locator('.hero');
  await hero.evaluate((element) => {
    const first = new Touch({ identifier: 1, target: element, clientX: 100, clientY: 450 });
    const last = new Touch({ identifier: 1, target: element, clientX: 250, clientY: 450 });
    element.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [first] }));
    element.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [last] }));
  });
  await expect(hero.locator('h1')).toContainText('הטכנולוגיה שתאהבו');
  await expect(page.getByRole('button', { name: 'הפעלת סבב השקופיות' })).toBeVisible();
});
