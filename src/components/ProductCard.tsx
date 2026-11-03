import { Link } from 'react-router-dom';
import type { Product } from '../types/catalog';
import { priceText } from '../config/store';
import { useShop } from '../hooks/ShopContext';
import { Icon } from './Icon';
import { ProductPhoto } from './ProductPhoto';
export function ProductCard({ product: p }: { product: Product }) {
  const { favorites, toggleFavorite, add } = useShop(),
    saved = favorites.includes(p.id);
  return (
    <article className="product-card">
      <div className="product-visual">
        <Link to={`/product/${p.slug}`} tabIndex={-1} aria-hidden="true">
          <ProductPhoto
            image={p.images[0]}
            sizes="(max-width: 640px) 45vw, 280px"
            alt=""
            width={360}
            height={290}
            loading="lazy"
          />
        </Link>
        <span className={`product-badge ${p.isNew ? 'new' : ''}`}>
          {p.isNew ? 'חדש בקטלוג' : p.demo ? 'מבחר ההדגמה' : p.brand}
        </span>
        <button
          className={`favorite-button ${saved ? 'saved' : ''}`}
          aria-label={`${saved ? 'הסרה ממועדפים' : 'הוספה למועדפים'}: ${p.name}`}
          aria-pressed={saved}
          onClick={() => toggleFavorite(p.id)}
        >
          <Icon name="heart" size={19} />
        </button>
        <span className="image-note">{p.images[0].demo ? 'להמחשה' : 'צילום מהקטלוג'}</span>
      </div>
      <div className="product-body">
        <div className="product-meta">
          <span dir="ltr">{p.brand}</span>
          <small dir="ltr">{p.model}</small>
        </div>
        <h3>
          <Link to={`/product/${p.slug}`}>{p.name}</Link>
        </h3>
        <p className="product-specs">{Object.values(p.specs).slice(0, 3).join(' · ')}</p>
        <div className="product-price">
          <strong>{priceText(p.price)}</strong>
          {p.previousPrice !== undefined && <del>{priceText(p.previousPrice)}</del>}
          {p.discount !== undefined && <span>{p.discount}% הנחה</span>}
        </div>
        <div className="product-bottom">
          <span>{p.demo ? 'דגם ושיוך מותג להמחשה' : `${p.variants.length} דגמים לבחירה`}</span>
          <button
            className="add-small"
            aria-label={`הוספה לסל: ${p.name}`}
            onClick={() => add(p.id, p.variants[0].id)}
          >
            <Icon name="plus" size={18} />
            הוספה
          </button>
        </div>
      </div>
    </article>
  );
}
