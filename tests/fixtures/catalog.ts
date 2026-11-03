import type { Product } from '../../src/types/catalog';

// Fixed test inventory: routine merchant updates must not change filtering/cart test expectations.
export const sampleProducts: Product[] = ['Samsung', 'LG', 'Sony', 'Philips'].map((brand, i) => ({
  id: `sample-${i + 1}`,
  slug: `sample-${i + 1}`,
  name: `מוצר לבדיקה ${i + 1}`,
  brand,
  model: `TEST-${i + 1}`,
  category: i < 3 ? 'tvs' : 'small-appliances',
  subcategory: i < 3 ? 'מסכים' : 'קפה',
  description: 'Test fixture only',
  specs: { technology: i % 2 ? 'QLED' : 'OLED', size: '55″' },
  images: [{ src: 'assets/products/tv.webp', alt: 'Test illustration', demo: true }],
  variants: [{ id: `sample-${i + 1}-default`, label: '75″', specs: { size: '75″' } }],
  availability: 'unknown',
  isNew: true,
  featured: i === 0,
  sale: i === 0,
  demoBestSeller: false,
  demo: true,
  verified: false,
  addedAt: `2026-10-0${i + 1}`,
}));
