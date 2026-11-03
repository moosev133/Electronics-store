import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { products, specLabels } from '../data/products';
import { findBrand } from '../data/brands';
import { getCategory } from '../data/categories';
import { ProductGallery } from '../components/ProductGallery';
import { ProductRail } from '../components/ProductRail';
import { Quantity } from '../components/Quantity';
import { EmptyState } from '../components/EmptyState';
import { Icon } from '../components/Icon';
import { useShop } from '../hooks/ShopContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { priceText, store } from '../config/store';
export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  usePageMeta(product?.name || 'המוצר לא נמצא');
  if (!product)
    return (
      <EmptyState
        title="המוצר לא נמצא"
        text="ייתכן שהקישור השתנה. אפשר להמשיך לקטלוג."
        href="/catalog"
        cta="לכל המוצרים"
      />
    );
  return <ProductDetail key={product.id} product={product} />;
}
function ProductDetail({ product: p }: { product: (typeof products)[number] }) {
  const [params, setParams] = useSearchParams();
  const variant = p.variants.find((v) => v.id === params.get('variant')) || p.variants[0];
  const [amount, setAmount] = useState(1);
  const { favorites, toggleFavorite, add, recent, viewed } = useShop();
  const category = getCategory(p.category)!;
  const saved = favorites.includes(p.id);
  useEffect(() => {
    viewed(p.id);
  }, [p.id, viewed]);
  const specs = { ...p.specs, ...variant.specs };
  const model = variant.model || p.model;
  const gallery = variant.image
    ? [variant.image, ...p.images.filter((im) => im.src !== variant.image?.src)]
    : p.images;
  return (
    <div className="container product-page">
      <nav className="breadcrumbs" aria-label="פירורי לחם">
        <Link to="/">עמוד הבית</Link>
        <Icon name="left" size={13} />
        <Link to={`/category/${p.category}`}>{category.name}</Link>
        <Icon name="left" size={13} />
        <span>{p.name}</span>
      </nav>
      {p.demo && (
        <div className="demo-note">
          <Icon name="sparkles" size={16} />
          <p>מוצר הדגמה: התמונה, המפרט ושיוך המותג להמחשה בלבד. אין מדובר בדגם מסחרי מאומת.</p>
        </div>
      )}
      <div className="product-detail">
        <ProductGallery key={variant.id} images={gallery} />
        <div className="purchase-panel">
          <Link className="product-brand" to={`/brand/${findBrand(p.brand)?.slug}`}>
            {p.brand}
            <Icon name="left" size={14} />
          </Link>
          <h1>{p.name}</h1>
          <p className="model">
            {p.demo ? 'דגם הדגמה' : 'דגם'} <bdi>{model}</bdi>
            {p.demo && (
              <>
                <span>·</span>מק״ט <bdi>{p.id}</bdi>
              </>
            )}
          </p>
          <p className="availability">
            <span />
            זמינות המלאי תעודכן בהמשך
          </p>
          <div className="key-specs">
            {Object.entries(specs)
              .slice(0, 3)
              .map(([key, value]) => (
                <span key={key}>
                  {specLabels[key]}
                  <strong>
                    <bdi dir={key === 'productDimensions' ? 'ltr' : 'auto'}>{value}</bdi>
                  </strong>
                </span>
              ))}
          </div>
          {p.variants.length > 1 && (
            <fieldset className="variant-selector">
              <legend>
                {p.variantLabel || 'בחרו גודל מסך'} {p.demo && <small>(אפשרויות הדגמה)</small>}
              </legend>
              <div>
                {p.variants.map((v) => (
                  <button
                    key={v.id}
                    className={variant.id === v.id ? 'selected' : ''}
                    aria-pressed={variant.id === v.id}
                    onClick={() => {
                      const next = new URLSearchParams(params);
                      next.set('variant', v.id);
                      setParams(next, { replace: true, preventScrollReset: true });
                    }}
                  >
                    <bdi>{v.label}</bdi>
                  </button>
                ))}
              </div>
            </fieldset>
          )}
          <div className="purchase-price">
            <strong>{priceText(variant.price ?? p.price)}</strong>
            {p.previousPrice !== undefined && <del>{priceText(p.previousPrice)}</del>}
            <p>ניתן לשמור בסל ההדגמה. רכישה ותשלום טרם זמינים.</p>
          </div>
          <div className="purchase-actions">
            <Quantity value={amount} onChange={setAmount} />
            <button className="button gold add-main" onClick={() => add(p.id, variant.id, amount)}>
              <Icon name="bag" size={19} />
              הוספה לסל
            </button>
            <button
              className={`icon-button favorite-detail ${saved ? 'saved' : ''}`}
              aria-label={saved ? 'הסרה ממועדפים' : 'הוספה למועדפים'}
              aria-pressed={saved}
              onClick={() => toggleFavorite(p.id)}
            >
              <Icon name="heart" size={22} />
            </button>
          </div>
          <div className="fulfillment">
            {[
              {
                icon: 'truck',
                title: 'משלוח עד הבית',
                text: store.shipping || 'עלות וזמן אספקה יעודכנו לאחר אימות',
                slug: 'delivery',
              },
              {
                icon: 'pin',
                title: 'איסוף מהחנות',
                text: store.pickup || 'מיקום ותנאי איסוף יעודכנו בהמשך',
                slug: 'locations',
              },
              {
                icon: 'shield',
                title: 'אחריות ושירות',
                text: store.warranty || 'נותן האחריות ותקופתה טרם אומתו',
                slug: 'warranty',
              },
            ].map((item) => (
              <Link to={`/info/${item.slug}`} key={item.icon}>
                <Icon name={item.icon} size={22} />
                <span>
                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </span>
                <Icon name="left" size={15} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="product-information">
        <section className="specification-section">
          <span className="eyebrow">כל הפרטים, במקום אחד</span>
          <h2>מפרט טכני</h2>
          <p className="section-note">
            {p.demo ? 'נתוני הדגמה סינתטיים — אינם מפרט של מוצר אמיתי.' : p.sourceNote}
          </p>
          <table>
            <caption className="sr-only">
              {p.demo ? 'מפרט הדגמה של' : 'מפרט של'} {p.name}, {variant.label}
            </caption>
            <tbody>
              <tr>
                <th scope="row">{p.demo ? 'מותג (שיוך להמחשה)' : 'מותג'}</th>
                <td>{p.brand}</td>
              </tr>
              <tr>
                <th scope="row">{p.demo ? 'דגם הדגמה' : 'דגם'}</th>
                <td>
                  <bdi>{model}</bdi>
                </td>
              </tr>
              {Object.entries(specs).map(([key, value]) => (
                <tr key={key}>
                  <th scope="row">{specLabels[key] || key}</th>
                  <td>
                    <bdi dir={key === 'productDimensions' ? 'ltr' : 'auto'}>{value}</bdi>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="product-accordions">
          <h2>להכיר קצת יותר</h2>
          <details open>
            <summary>
              על המוצר
              <Icon name="plus" size={18} />
            </summary>
            <p>{p.description}</p>
          </details>
          <details>
            <summary>
              מאפיינים עיקריים
              <Icon name="plus" size={18} />
            </summary>
            <ul>
              {Object.entries(specs)
                .slice(0, 5)
                .map(([key, value]) => (
                  <li key={key}>
                    {specLabels[key]}:{' '}
                    <bdi dir={key === 'productDimensions' ? 'ltr' : 'auto'}>{value}</bdi>
                    {p.demo && ' (להמחשה)'}
                  </li>
                ))}
            </ul>
          </details>
          <details>
            <summary>
              משלוח, איסוף ואחריות
              <Icon name="plus" size={18} />
            </summary>
            <p>
              פרטי הספק, עלויות וזמני אספקה, התקנה ותקופת אחריות יופיעו כאן לאחר אימות. אין התחייבות
              לאספקה בקטלוג ההמחשה.
            </p>
            <Link className="text-link" to="/info/delivery">
              למידע על משלוחים
            </Link>
          </details>
          <details>
            <summary>
              חוות דעת
              <Icon name="plus" size={18} />
            </summary>
            <p>
              טרם התקבלו חוות דעת מאומתות. פרסום ביקורות יתאפשר לאחר חיבור מערכת הזמנות ואימות
              רכישות.
            </p>
          </details>
          <details>
            <summary>
              מוצרים משלימים וחבילות
              <Icon name="plus" size={18} />
            </summary>
            <p>חבילות תואמות יוצגו לאחר אימות תאימות, מחירים וזמינות.</p>
            <Link className="text-link" to={`/category/${p.category}`}>
              למוצרים נוספים במחלקה
            </Link>
          </details>
        </section>
      </div>
      <ProductRail
        title="מבצעים נוספים שאולי יעניינו אותך"
        note="מבחר מקטגוריות אחרות להמחשה, ללא הטבות מחיר מאומתות"
        products={products
          .filter((item) => item.category !== p.category && item.sale)
          .filter((_, i) => i % 2 === 0)
          .slice(0, 8)}
      />
      <ProductRail
        title="מוצרים דומים"
        products={products.filter((item) => item.category === p.category && item.id !== p.id)}
        href={`/category/${p.category}`}
      />
      <ProductRail
        title="לאחרונה צפיתם"
        products={recent
          .filter((id) => id !== p.id)
          .flatMap((id) => products.filter((item) => item.id === id))}
      />
    </div>
  );
}
