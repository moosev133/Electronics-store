import { readFile, writeFile } from 'node:fs/promises';
const base = process.env.VITE_BASE_PATH || '/';
// GitHub Pages serves this for clean SPA deep links, then the index restores the original URL.
const html = `<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><meta name="robots" content="noindex"><title>מעבר לקטלוג</title><script>var base=${JSON.stringify(base)};var path=location.pathname.slice(base.length-1)+location.search+location.hash;location.replace(base+'?__route='+encodeURIComponent(path));</script><p>טוענים את הקטלוג… <a href="${base}">לעמוד הבית</a></p></html>`;
await writeFile('dist/404.html', html);
await writeFile('dist/.nojekyll', '');
if (process.env.VITE_SITE_URL) {
  const origin = process.env.VITE_SITE_URL.replace(/\/$/, '');
  const index = await readFile('dist/index.html', 'utf8');
  await writeFile(
    'dist/index.html',
    index.replace(
      /(<meta\s+property="og:image"\s+content=")([^"]+)/,
      `$1${origin}${base}assets/hero-living.webp`,
    ),
  );
}
