import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/catalog';
import { ProductCard } from './ProductCard';
import { Icon } from './Icon';
export function ProductRail({
  title,
  eyebrow,
  note,
  products,
  href,
}: {
  title: string;
  eyebrow?: string;
  note?: string;
  products: Product[];
  href?: string;
}) {
  const rail = useRef<HTMLDivElement>(null);
  if (!products.length) return null;
  function scroll(dir: number) {
    rail.current?.scrollBy({
      left: dir * (rail.current.clientWidth * 0.8),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  return (
    <section className="product-section reveal">
      <div className="section-heading">
        <div>
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2>{title}</h2>
          {note && <p className="section-note">{note}</p>}
        </div>
        <div className="section-tools">
          {href && (
            <Link className="text-link" to={href}>
              לכל המוצרים
              <Icon name="arrowLeft" size={16} />
            </Link>
          )}
          <div className="rail-controls">
            <button
              className="icon-button"
              aria-label={`מוצרים קודמים — ${title}`}
              onClick={() => scroll(1)}
            >
              <Icon name="right" size={18} />
            </button>
            <button
              className="icon-button"
              aria-label={`מוצרים נוספים — ${title}`}
              onClick={() => scroll(-1)}
            >
              <Icon name="left" size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="product-rail" ref={rail} tabIndex={0} aria-label={title}>
        {products.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </section>
  );
}
