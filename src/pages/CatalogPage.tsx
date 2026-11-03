import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { categories, getCategory } from '../data/categories';
import { products } from '../data/products';
import { brandCatalog } from '../data/brands';
import { selectProducts } from '../utilities/catalog';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { Modal } from '../components/Modal';
import { Icon } from '../components/Icon';
import { productImageSet, asset } from '../config/store';
import { usePageMeta } from '../hooks/usePageMeta';
import { EmptyState } from '../components/EmptyState';
import { BrandMark } from '../components/BrandMark';
export default function CatalogPage() {
  const { slug, brand: brandSlug } = useParams();
  const [params, setParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const category = getCategory(slug),
    brand = brandCatalog.find((b) => b.slug === brandSlug)?.name;
  const source = brand ? products.filter((p) => p.brand === brand) : products;
  const scoped = source.filter((p) => !slug || (slug === 'offers' ? p.sale : p.category === slug));
  const result = selectProducts(source, params, slug);
  const query = params.get('q');
  const title =
    category?.name ||
    (brand
      ? `מוצרי ${brand}`
      : query
        ? `תוצאות עבור ״${query}״`
        : params.get('new')
          ? 'מוצרים חדשים'
          : params.get('best')
            ? 'הנמכרים ביותר — להמחשה'
            : 'כל המוצרים');
  usePageMeta(title);
  if ((slug && !category) || (brandSlug && !brand))
    return (
      <EmptyState
        title="המחלקה לא נמצאה"
        text="אפשר להמשיך לגלות את המחלקות בקטלוג."
        href="/categories"
        cta="לכל המחלקות"
      />
    );
  const page = Math.max(1, Number(params.get('page')) || 1),
    shown = result.slice(0, page * 12);
  const active = [...params.entries()].filter(([key]) => key.startsWith('f.'));
  function removeFilter(key: string, value: string) {
    const next = new URLSearchParams(params);
    next.delete(key, value);
    next.delete('page');
    setParams(next);
  }
  return (
    <div className="container catalog-page">
      <nav className="breadcrumbs" aria-label="פירורי לחם">
        <Link to="/">עמוד הבית</Link>
        <Icon name="left" size={13} />
        <span>{title}</span>
      </nav>
      <div className="category-hero">
        <div>
          <span className="eyebrow">{category?.eyebrow || 'טכנולוגיה שנבחרת במחשבה'}</span>
          <h1>{title}</h1>
          <p>{category?.description || 'גלו, סננו ושמרו את הבחירות שלכם מתוך הקטלוג.'}</p>
          <small>מחירים ומלאי יעודכנו בהמשך · מוצרי הדגמה מסומנים בנפרד</small>
        </div>
        {category ? (
          <img
            src={asset(`assets/products/${category.image}.webp`)}
            srcSet={productImageSet(`assets/products/${category.image}.webp`)}
            sizes="(max-width: 640px) 130px, 300px"
            alt={`${category.shortName} — להמחשה`}
            width="330"
            height="220"
          />
        ) : brand ? (
          <BrandMark name={brand} className="brand-hero-image" width={200} height={100} />
        ) : (
          <Icon name="sparkles" size={80} />
        )}
      </div>
      <nav className="subcategory-nav" aria-label="תתי קטגוריות">
        <button
          className={!params.has('f.subcategory') ? 'selected' : ''}
          onClick={() => {
            const next = new URLSearchParams(params);
            next.delete('f.subcategory');
            next.delete('page');
            setParams(next);
          }}
        >
          הכל
        </button>
        {category?.slug === 'offers' ? (
          <>
            <Link to="/category/offers?new=1">חדש באתר</Link>
            <Link to="/category/offers?sort=newest">מבחר השבוע</Link>
          </>
        ) : (
          category?.subcategories.map((sub) => (
            <button
              key={sub}
              className={params.getAll('f.subcategory').includes(sub) ? 'selected' : ''}
              onClick={() => {
                const next = new URLSearchParams(params);
                next.set('f.subcategory', sub);
                next.delete('page');
                setParams(next);
              }}
            >
              {sub}
            </button>
          )) ||
          categories
            .filter((category) => category.slug !== 'offers')
            .map((c) => (
              <Link key={c.slug} to={`/category/${c.slug}`}>
                {c.shortName}
              </Link>
            ))
        )}
      </nav>
      <div className="catalog-layout">
        <aside className="desktop-filters">
          <ProductFilters
            category={category}
            products={scoped}
            params={params}
            onChange={setParams}
          />
        </aside>
        <div className="catalog-results">
          <div className="catalog-toolbar">
            <p>
              <strong>{result.length}</strong> מוצרים בקטלוג
            </p>
            <button className="mobile-filter button outline" onClick={() => setFiltersOpen(true)}>
              <Icon name="filters" size={17} />
              סינון {active.length > 0 && `(${active.length})`}
            </button>
            <label>
              מיון לפי
              <select
                value={params.get('sort') || 'featured'}
                onChange={(e) => {
                  const next = new URLSearchParams(params);
                  next.set('sort', e.target.value);
                  next.delete('page');
                  setParams(next);
                }}
              >
                <option value="featured">המומלצים שלנו</option>
                <option value="newest">החדשים ביותר</option>
                <option value="name">שם המוצר</option>
                <option value="brand">מותג</option>
                <option value="price-asc" disabled={!scoped.some((p) => p.price !== undefined)}>
                  מחיר — מהנמוך לגבוה (טרם זמין)
                </option>
                <option value="price-desc" disabled={!scoped.some((p) => p.price !== undefined)}>
                  מחיר — מהגבוה לנמוך (טרם זמין)
                </option>
              </select>
            </label>
          </div>
          {active.length > 0 && (
            <div className="active-filters">
              {active.map(([key, value]) => (
                <button key={`${key}-${value}`} onClick={() => removeFilter(key, value)}>
                  {value}
                  <Icon name="x" size={13} />
                  <span className="sr-only">הסרת סינון</span>
                </button>
              ))}
            </div>
          )}
          {shown.length ? (
            <>
              <div className="catalog-grid">
                {shown.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="load-more">
                <p>
                  מציגים {shown.length} מתוך {result.length} מוצרים
                </p>
                {shown.length < result.length && (
                  <button
                    className="button outline"
                    onClick={() => {
                      const next = new URLSearchParams(params);
                      next.set('page', String(page + 1));
                      setParams(next, { preventScrollReset: true });
                    }}
                  >
                    טענו מוצרים נוספים
                    <Icon name="plus" size={18} />
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Icon name="search" size={44} />
              <h2>לא נמצאו מוצרים מתאימים</h2>
              <p>נסו להסיר חלק מהמסננים או לחפש מוצר אחר.</p>
              <button className="button gold" onClick={() => setParams(new URLSearchParams())}>
                איפוס החיפוש והסינון
              </button>
            </div>
          )}
        </div>
      </div>
      {filtersOpen && (
        <Modal title="סינון מוצרים" onClose={() => setFiltersOpen(false)} className="filter-modal">
          <ProductFilters
            category={category}
            products={scoped}
            params={params}
            onChange={setParams}
          />
          <button className="button gold filter-apply" onClick={() => setFiltersOpen(false)}>
            הצגת {result.length} מוצרים
          </button>
        </Modal>
      )}
    </div>
  );
}
