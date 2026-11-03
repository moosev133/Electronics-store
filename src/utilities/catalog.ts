import type { CartItem, Product } from '../types/catalog';
export const normalise = (value: string) =>
  value
    .toLocaleLowerCase('he')
    .replace(/["׳״'\s-]+/g, ' ')
    .trim();
export const productSearchText = (p: Product) =>
  normalise(
    `${p.name} ${p.brand} ${p.model} ${p.subcategory} ${p.variants.map((v) => `${v.model || ''} ${v.label}`).join(' ')}`,
  );
export function selectProducts(
  catalog: Product[],
  params: URLSearchParams,
  category?: string,
): Product[] {
  const q = normalise(params.get('q') || '');
  const result = catalog.filter((p) => {
    if (category && (category === 'offers' ? !p.sale : p.category !== category)) return false;
    if (params.get('new') === '1' && !p.isNew) return false;
    if (params.get('best') === '1' && !p.demoBestSeller) return false;
    if (q && !productSearchText(p).includes(q)) return false;
    for (const [key] of params) {
      if (!key.startsWith('f.')) continue;
      const field = key.slice(2);
      const value =
        field === 'brand' ? p.brand : field === 'subcategory' ? p.subcategory : p.specs[field];
      const values = [value, ...p.variants.map((v) => v.specs[field]).filter(Boolean)];
      if (!params.getAll(key).some((v) => values.includes(v))) return false;
    }
    return true;
  });
  switch (params.get('sort')) {
    case 'name':
      return result.sort((a, b) => a.name.localeCompare(b.name, 'he'));
    case 'brand':
      return result.sort((a, b) => a.brand.localeCompare(b.brand));
    case 'newest':
      return result.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case 'price-asc':
      return result.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    case 'price-desc':
      return result.sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity));
    default:
      return result.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
}
export function sanitiseCart(raw: unknown, catalog: Product[]): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const p = catalog.find((p) => p.id === item.productId);
    if (
      !p ||
      !p.variants.some((v) => v.id === item.variantId) ||
      !Number.isFinite(item.quantity) ||
      item.quantity < 1
    )
      return [];
    return [
      {
        productId: p.id,
        variantId: item.variantId,
        quantity: Math.min(99, Math.floor(item.quantity)),
      },
    ];
  });
}
export function cartTotal(items: CartItem[], catalog: Product[]): number | null {
  let total = 0;
  for (const item of items) {
    const p = catalog.find((p) => p.id === item.productId),
      v = p?.variants.find((v) => v.id === item.variantId);
    if (!p || !v) return null;
    const price = v.price ?? p.price;
    if (price === undefined) return null;
    total += price * item.quantity;
  }
  return total;
}
