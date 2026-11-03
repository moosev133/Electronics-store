import type { Category, Product } from '../types/catalog';
import { Icon } from './Icon';
export function ProductFilters({
  category,
  products,
  params,
  onChange,
}: {
  category?: Category;
  products: Product[];
  params: URLSearchParams;
  onChange: (params: URLSearchParams) => void;
}) {
  const definitions = category?.filters || [
    { key: 'brand', label: 'מותג' },
    { key: 'subcategory', label: 'סוג מוצר' },
  ];
  const count = [...params.keys()].filter((k) => k.startsWith('f.')).length;
  function toggle(key: string, value: string) {
    const next = new URLSearchParams(params),
      values = next.getAll(`f.${key}`);
    next.delete(`f.${key}`);
    (values.includes(value) ? values.filter((v) => v !== value) : [...values, value]).forEach((v) =>
      next.append(`f.${key}`, v),
    );
    next.delete('page');
    onChange(next);
  }
  function clear() {
    const next = new URLSearchParams(params);
    [...next.keys()].filter((k) => k.startsWith('f.')).forEach((k) => next.delete(k));
    next.delete('page');
    onChange(next);
  }
  return (
    <div className="filters">
      <div className="filter-title">
        <h2>
          <Icon name="filters" size={18} />
          סינון מוצרים
        </h2>
        {count > 0 && <button onClick={clear}>ניקוי הכל</button>}
      </div>
      {definitions.map((f) => {
        const values = [
          ...new Set(
            products
              .flatMap((p) => [
                f.key === 'brand'
                  ? p.brand
                  : f.key === 'subcategory'
                    ? p.subcategory
                    : p.specs[f.key],
                ...p.variants.map((v) => v.specs[f.key]),
              ])
              .filter(Boolean),
          ),
        ].sort((a, b) => a.localeCompare(b, 'he', { numeric: true }));
        return (
          <details key={f.key} open>
            <summary>
              {f.label}
              <Icon name="down" size={14} />
            </summary>
            <div className="filter-options">
              {values.map((value) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    checked={params.getAll(`f.${f.key}`).includes(value)}
                    onChange={() => toggle(f.key, value)}
                  />
                  <span>{value}</span>
                  <small>
                    {
                      products.filter(
                        (p) =>
                          (f.key === 'brand'
                            ? p.brand
                            : f.key === 'subcategory'
                              ? p.subcategory
                              : p.specs[f.key]) === value ||
                          p.variants.some((v) => v.specs[f.key] === value),
                      ).length
                    }
                  </small>
                </label>
              ))}
            </div>
          </details>
        );
      })}
      <fieldset className="price-filter" disabled>
        <legend>טווח מחירים</legend>
        <input type="range" aria-label="טווח מחירים — לא זמין" />
        <p>סינון לפי מחיר יהיה זמין לאחר עדכון המחירים.</p>
      </fieldset>
      <p className="filter-disclaimer">
        מוצרי הדגמה מסומנים בנפרד. מחירים וזמינות מלאי יעודכנו בהמשך.
      </p>
    </div>
  );
}
