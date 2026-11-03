import { Link } from 'react-router-dom';
import { useShop } from '../hooks/ShopContext';
import { findProduct, products } from '../data/products';
import { productImageSet, asset, priceText } from '../config/store';
import { cartTotal } from '../utilities/catalog';
import { EmptyState } from '../components/EmptyState';
import { Quantity } from '../components/Quantity';
import { Icon } from '../components/Icon';
import { usePageMeta } from '../hooks/usePageMeta';
export default function CartPage() {
  const { cart, quantity, remove, storageAvailable } = useShop();
  usePageMeta('סל הקניות');
  if (!cart.length)
    return (
      <EmptyState
        title="הסל שלכם מחכה לבחירות טובות"
        text="גלו את הקטלוג והוסיפו את המוצרים שאהבתם. הפריטים נשמרים במכשיר הזה."
        href="/catalog"
        cta="בואו לגלות מוצרים"
      />
    );
  const count = cart.reduce((n, i) => n + i.quantity, 0),
    total = cartTotal(cart, products);
  return (
    <div className="container cart-page">
      <nav className="breadcrumbs">
        <Link to="/">עמוד הבית</Link>
        <Icon name="left" size={13} />
        <span>סל הקניות</span>
      </nav>
      <div className="page-heading">
        <span className="eyebrow">הבחירות שלכם, במקום אחד</span>
        <h1>
          סל הקניות <small>({count})</small>
        </h1>
        <p>זהו סל הדגמה. הוספת מוצר אינה שומרת מלאי ואינה יוצרת הזמנה.</p>
      </div>
      {!storageAvailable && (
        <p role="status" className="demo-note">
          האחסון המקומי אינו זמין. הסל יישמר רק כל עוד העמוד פתוח.
        </p>
      )}
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => {
            const p = findProduct(item.productId)!,
              variant = p.variants.find((v) => v.id === item.variantId)!;
            return (
              <article className="cart-item" key={`${p.id}-${variant.id}`}>
                <Link to={`/product/${p.slug}?variant=${variant.id}`}>
                  <img
                    src={asset((variant.image || p.images[0]).src)}
                    srcSet={productImageSet((variant.image || p.images[0]).src)}
                    sizes="160px"
                    alt={`${p.name} — להמחשה`}
                    width="160"
                    height="150"
                  />
                </Link>
                <div>
                  <span className="eyebrow">{p.brand} · להמחשה</span>
                  <h2>
                    <Link to={`/product/${p.slug}?variant=${variant.id}`}>{p.name}</Link>
                  </h2>
                  <p>
                    {variant.label} · <bdi>{p.model}</bdi>
                  </p>
                  <strong>{priceText(variant.price ?? p.price)}</strong>
                  <Quantity
                    value={item.quantity}
                    onChange={(q) => quantity(p.id, variant.id, q)}
                    label={`כמות ${p.name} ${variant.label}`}
                  />
                </div>
                <button
                  className="icon-button remove-item"
                  aria-label={`הסרת ${p.name} מהסל`}
                  onClick={() => remove(p.id, variant.id)}
                >
                  <Icon name="trash" size={19} />
                </button>
              </article>
            );
          })}
          <Link className="text-link continue-shopping" to="/catalog">
            <Icon name="arrowRight" size={17} />
            להמשיך לגלות מוצרים
          </Link>
        </div>
        <aside className="cart-summary">
          <h2>סיכום הסל</h2>
          <div>
            <span>פריטים בסל</span>
            <strong>{count}</strong>
          </div>
          <div>
            <span>מחיר המוצרים</span>
            <span>{total === null ? 'ממתין לעדכון מחירים' : priceText(total)}</span>
          </div>
          <div>
            <span>משלוח</span>
            <span>טרם נקבע</span>
          </div>
          <div className="cart-total">
            <strong>סך הכל</strong>
            <strong>{total === null ? 'טרם זמין' : priceText(total)}</strong>
          </div>
          <button className="button gold" disabled aria-describedby="checkout-info">
            התשלום עדיין לא זמין
            <Icon name="bag" size={18} />
          </button>
          <p id="checkout-info">
            ניתן יהיה לרכוש לאחר עדכון מחירים ומלאי וחיבור מערכת תשלום מאובטחת. לא בוצעה הזמנה ולא
            נגבה תשלום.
          </p>
          <span className="cart-local">
            <Icon name="shield" size={16} />
            הסל נשמר במכשיר שלכם בלבד
          </span>
        </aside>
      </div>
    </div>
  );
}
