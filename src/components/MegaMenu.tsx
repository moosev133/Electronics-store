import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { Modal } from './Modal';
import { Icon } from './Icon';
import { asset, productImageSet } from '../config/store';
export function MegaMenu({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState(categories[0]);
  return (
    <Modal title="כל המחלקות" onClose={onClose} className="mega-menu">
      <div className="mega-layout">
        <div className="mega-categories">
          {categories.map((c) => (
            <button
              className={c.slug === selected.slug ? 'selected' : ''}
              key={c.slug}
              onClick={() => setSelected(c)}
              aria-pressed={selected.slug === c.slug}
            >
              <Icon name={c.icon} />
              <span>{c.name}</span>
              <Icon name="left" size={16} />
            </button>
          ))}
        </div>
        <div className="mega-detail">
          <span className="eyebrow">{selected.eyebrow}</span>
          <h3>{selected.name}</h3>
          <div className="mega-sublinks">
            {selected.subcategories.map((sub) => (
              <Link
                key={sub}
                to={`/category/${selected.slug}?${selected.slug === 'offers' ? (sub === 'חדש באתר' ? 'new=1' : '') : `f.subcategory=${encodeURIComponent(sub)}`}`}
                onClick={onClose}
              >
                {sub}
                <Icon name="arrowLeft" size={16} />
              </Link>
            ))}
          </div>
          <Link className="button gold" to={`/category/${selected.slug}`} onClick={onClose}>
            כל מוצרי המחלקה
            <Icon name="arrowLeft" size={16} />
          </Link>
          <div className="mega-image">
            <img
              src={asset(`assets/products/${selected.image}.webp`)}
              srcSet={productImageSet(`assets/products/${selected.image}.webp`)}
              sizes="250px"
              alt={`${selected.shortName} — להמחשה`}
              width="320"
              height="220"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
