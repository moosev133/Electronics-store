import { describe, it, expect } from 'vitest';
import { sampleProducts as products } from './fixtures/catalog';
import { selectProducts, sanitiseCart, cartTotal } from '../src/utilities/catalog';
describe('real filtering and sorting', () => {
  it('ORs multiple values in one filter and ANDs distinct filters', () => {
    const params = new URLSearchParams('f.brand=Samsung&f.brand=LG&f.technology=OLED');
    const result = selectProducts(products, params, 'tvs');
    expect(result.length).toBeGreaterThan(0);
    expect(
      result.every((p) => ['Samsung', 'LG'].includes(p.brand) && p.specs.technology === 'OLED'),
    ).toBe(true);
  });
  it('matches available variant sizes', () => {
    const result = selectProducts(products, new URLSearchParams('f.size=75%E2%80%B3'), 'tvs');
    expect(result.length).toBe(3);
  });
  it('searches models and supports empty results', () => {
    expect(selectProducts(products, new URLSearchParams('q=TEST-1'))[0].id).toBe('sample-1');
    expect(selectProducts(products, new URLSearchParams('q=nonexistent-model'))).toEqual([]);
  });
  it('sorts by brand and newest', () => {
    const result = selectProducts(products, new URLSearchParams('sort=brand'));
    expect(result.map((p) => p.brand)).toEqual(
      [...result.map((p) => p.brand)].sort((a, b) => a.localeCompare(b)),
    );
    const dates = selectProducts(products, new URLSearchParams('sort=newest')).map(
      (p) => p.addedAt,
    );
    expect(dates).toEqual([...dates].sort().reverse());
  });
});
describe('cart trust boundaries', () => {
  it('rejects corrupt, unknown and invalid stored lines', () => {
    expect(sanitiseCart(null, products)).toEqual([]);
    expect(
      sanitiseCart(
        [
          { productId: 'unknown', variantId: 'x', quantity: 1 },
          { productId: 'sample-1', variantId: 'sample-1-default', quantity: -3 },
        ],
        products,
      ),
    ).toEqual([]);
    expect(
      sanitiseCart(
        [{ productId: 'sample-1', variantId: 'sample-1-default', quantity: 200 }],
        products,
      )[0].quantity,
    ).toBe(99);
  });
  it('never displays a zero total when a price is missing', () => {
    expect(
      cartTotal([{ productId: 'sample-1', variantId: 'sample-1-default', quantity: 2 }], products),
    ).toBeNull();
  });
  it('uses the variant price when a future verified catalog supplies one', () => {
    const p = {
      ...products[0],
      price: 100,
      variants: [{ ...products[0].variants[0], price: 150 }],
    };
    expect(cartTotal([{ productId: p.id, variantId: p.variants[0].id, quantity: 2 }], [p])).toBe(
      300,
    );
  });
});
