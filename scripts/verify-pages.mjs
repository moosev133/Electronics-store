import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { chromium } from '@playwright/test';
const root = resolve('dist'),
  base = '/Electronics-store/';
const mime = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};
const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const candidate = resolve(
    root,
    url.pathname.startsWith(base) ? url.pathname.slice(base.length) : 'missing',
  );
  try {
    if (!candidate.startsWith(root + '/') && candidate !== root) throw new Error('Invalid path');
    const info = await stat(candidate),
      path = info.isDirectory() ? resolve(candidate, 'index.html') : candidate;
    res.setHeader('Content-Type', mime[extname(path)] || 'application/octet-stream');
    res.end(await readFile(path));
  } catch {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end(await readFile(resolve(root, '404.html')));
  }
});
await new Promise((done) => server.listen(4174, '127.0.0.1', done));
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.addInitScript(() => sessionStorage.setItem('electronics.entrance', '1'));
  await page.goto('http://127.0.0.1:4174/Electronics-store/product/demo-tvs-1?variant=tvs-1-1');
  await page.getByRole('heading', { name: 'מסך חכם לחוויית קולנוע', exact: true }).waitFor();
  if (!page.url().endsWith('/Electronics-store/product/demo-tvs-1?variant=tvs-1-1'))
    throw new Error('Deep link/query not restored');
  if (
    !(
      (await page
        .getByRole('button', { name: '65″', exact: true })
        .getAttribute('aria-pressed')) === 'true'
    )
  )
    throw new Error('Variant not preserved');
  await page.goto('http://127.0.0.1:4174/Electronics-store/category/tvs?f.brand=LG&sort=brand');
  await page.locator('.catalog-grid .product-card').waitFor();
  if ((await page.locator('.catalog-grid .product-card').count()) !== 1)
    throw new Error('Filter not preserved');
  await page.reload();
  await page.locator('.catalog-grid .product-card').waitFor();
  const broken = await page
    .locator('.catalog-grid img')
    .evaluateAll((images) => images.some((im) => !im.naturalWidth));
  if (broken) throw new Error('Base-path asset failed');
  console.log(
    'PASS: GitHub Pages 404 fallback preserves clean product/category routes, variants, filters, refresh and asset base paths.',
  );
} finally {
  await browser.close();
  await new Promise((done) => server.close(done));
}
