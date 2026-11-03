import { readdir } from 'node:fs/promises';
import sharp from 'sharp';
const folder = 'public/assets/products';
for (const file of await readdir(folder)) {
  if (!file.endsWith('.webp') || /-\d+\.webp$/.test(file)) continue;
  for (const width of [240, 480])
    await sharp(`${folder}/${file}`)
      .resize({ width })
      .webp({ quality: 80 })
      .toFile(`${folder}/${file.replace('.webp', `-${width}.webp`)}`);
}
await sharp('public/assets/hero-living.webp')
  .resize({ width: 900 })
  .webp({ quality: 80 })
  .toFile('public/assets/hero-living-900.webp');
console.log('Responsive product images (240/480/900 px) and hero (900/1672 px) ready.');
