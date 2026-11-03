import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { normalise } from '../utilities/catalog';
import { asset, productImageSet } from '../config/store';
import { Icon } from './Icon';
export function Search() {
  const [query, setQuery] = useState(''),
    [open, setOpen] = useState(false),
    [active, setActive] = useState(-1);
  const navigate = useNavigate(),
    id = useId();
  const results = query.trim()
    ? products
        .filter((p) => normalise(`${p.name} ${p.brand} ${p.model}`).includes(normalise(query)))
        .slice(0, 5)
    : [];
  function submit() {
    setOpen(false);
    navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
  }
  return (
    <div
      className="search-wrap"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <form
        className="search-form"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label className="sr-only" htmlFor={id}>
          חיפוש מוצרים, מותגים או דגמים
        </label>
        <input
          id={id}
          placeholder="מה תרצו למצוא היום?"
          value={query}
          autoComplete="off"
          role="combobox"
          aria-expanded={open && !!query}
          aria-controls={`${id}-results`}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${id}-${active}` : undefined}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              setActive(-1);
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
              setActive((i) => Math.min(results.length - 1, i + 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((i) => Math.max(-1, i - 1));
            }
            if (e.key === 'Enter' && active >= 0 && open && results[active]) {
              e.preventDefault();
              setOpen(false);
              navigate(`/product/${results[active].slug}`);
            }
          }}
        />
        <span className="search-hint">מוצר, מותג או דגם</span>
        <button type="submit" aria-label="חיפוש">
          <Icon name="search" />
        </button>
      </form>
      {open && !!query && (
        <div className="search-results">
          <ul id={`${id}-results`} role="listbox" aria-label="הצעות חיפוש">
            {results.length ? (
              results.map((p, i) => (
                <li role="option" aria-selected={active === i} id={`${id}-${i}`} key={p.id}>
                  <Link to={`/product/${p.slug}`} onClick={() => setOpen(false)} tabIndex={-1}>
                    <img
                      src={asset(p.images[0].src)}
                      srcSet={productImageSet(p.images[0].src)}
                      sizes="48px"
                      alt=""
                      width="48"
                      height="48"
                    />
                    <span>
                      {p.name}
                      <small>
                        {p.brand} · {p.model}
                      </small>
                    </span>
                    <Icon name="left" size={16} />
                  </Link>
                </li>
              ))
            ) : (
              <li className="search-empty" role="option" aria-selected={false}>
                לא נמצאו מוצרים. נסו שם מוצר או מותג אחר.
              </li>
            )}
          </ul>
          <button className="search-all" onClick={submit}>
            כל תוצאות החיפוש <Icon name="arrowLeft" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
