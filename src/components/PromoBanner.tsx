import { Link } from 'react-router-dom';
import { asset, productImageSet } from '../config/store';
import { Icon } from './Icon';
import type { Category } from '../types/catalog';
export function PromoBanner({
  category: c,
  compact = false,
}: {
  category: Category;
  compact?: boolean;
}) {
  return (
    <Link
      to={`/category/${c.slug}`}
      className={`promo-banner ${compact ? 'compact' : ''} promo-${c.image}`}
    >
      <div>
        <span className="eyebrow">{c.eyebrow}</span>
        <h3>{c.shortName}</h3>
        <p>{c.headline}</p>
        <span className="promo-link">
          למבחר המוצרים
          <Icon name="arrowLeft" size={17} />
        </span>
      </div>
      <img
        src={asset(`assets/products/${c.image}.webp`)}
        srcSet={productImageSet(`assets/products/${c.image}.webp`)}
        sizes="220px"
        width="320"
        height="260"
        alt={`${c.shortName} — להמחשה`}
        loading="lazy"
      />
    </Link>
  );
}
