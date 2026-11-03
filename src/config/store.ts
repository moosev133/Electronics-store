import type { Locale } from '../types/catalog';

// The single configuration point for verified merchant information. Empty values never become fake links.
export const store = {
  name: 'שם החנות',
  tagline: 'טכנולוגיה. עיצוב. חיים.',
  logo: null as string | null,
  phone: null as string | null,
  email: null as string | null,
  instagram: null as string | null,
  address: null as string | null,
  openingHours: null as string | null,
  shipping: null as string | null,
  pickup: null as string | null,
  warranty: null as string | null,
  locale: 'he' as Locale,
  checkoutEnabled: false,
  canonicalOrigin: import.meta.env.VITE_SITE_URL || '',
};
export const localeSettings: Record<Locale, { dir: 'rtl' | 'ltr'; currency: string }> = {
  he: { dir: 'rtl', currency: 'ILS' },
  ar: { dir: 'rtl', currency: 'ILS' },
  en: { dir: 'ltr', currency: 'ILS' },
};
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const productImageSet = (path: string) =>
  path.startsWith('assets/products/')
    ? [240, 480]
        .map((width) => `${asset(path.replace('.webp', `-${width}.webp`))} ${width}w`)
        .concat(`${asset(path)} 900w`)
        .join(', ')
    : undefined;
export const brandAsset = (brand: string) =>
  asset(`assets/brands/${brand.toLowerCase()}.${brand === 'Electra' ? 'png' : 'svg'}`);
export const priceText = (price?: number) =>
  price === undefined
    ? 'מחיר יעודכן בקרוב'
    : new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: 'ILS',
        maximumFractionDigits: 0,
      }).format(price);
