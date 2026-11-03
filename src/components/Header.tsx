import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { asset, store } from '../config/store';
import { useShop } from '../hooks/ShopContext';
import { selectCategories } from '../data/categories';
import { Icon } from './Icon';
import { Search } from './Search';
import { MegaMenu } from './MegaMenu';
import { navigation } from '../config/navigation';
import { getCategory } from '../data/categories';
export function BrandMark() {
  return (
    <Link className="brand-mark" to="/" title="עמוד הבית">
      {store.logo ? (
        <img className="store-logo" src={asset(store.logo)} alt="" width="42" height="42" />
      ) : (
        <span className="brand-symbol" aria-hidden="true">
          <span />
          <span />
        </span>
      )}
      <span>
        <strong>{store.name}</strong>
        <small>{store.tagline}</small>
        <span className="sr-only"> — עמוד הבית</span>
      </span>
    </Link>
  );
}
export function Header() {
  const [menu, setMenu] = useState(false);
  const { cart, favorites } = useShop();
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div>
            <Link to="/info/locations">
              <Icon name="pin" size={13} />
              סניפים ושעות פעילות
            </Link>
            <span className="top-divider" />
            <Link to="/info/contact">
              <Icon name="telephone" size={13} />
              {store.phone || 'יצירת קשר'}
            </Link>
            <Link className="instagram-link" to="/info/contact" aria-label="פרטי Instagram">
              <Icon name="instagram" size={14} />
            </Link>
          </div>
          <span className="topbar-demo">קטלוג להמחשה · מחירים ומלאי יעודכנו בהמשך</span>
          <div>
            <Link to="/info/delivery">משלוחים ואיסוף</Link>
            <Link to="/info/service">שירות לקוחות</Link>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="container main-header">
          <BrandMark />
          <button
            className="mobile-menu icon-button"
            aria-label="פתיחת תפריט קטגוריות"
            aria-expanded={menu}
            onClick={() => setMenu(true)}
          >
            <Icon name="menu" />
          </button>
          <Search />
          <div className="header-actions">
            <Link to="/account" className="header-action" aria-label="החשבון שלי">
              <Icon name="user" size={22} />
              <span className="action-label">החשבון שלי</span>
            </Link>
            <Link to="/favorites" className="header-action">
              <span className="count-icon">
                <Icon name="heart" size={22} />
                {favorites.length > 0 && <b>{favorites.length}</b>}
              </span>
              <span className="action-label">מועדפים</span>
              <span className="sr-only">מועדפים, {favorites.length} מוצרים</span>
            </Link>
            <Link to="/cart" className="header-action">
              <span className="count-icon">
                <Icon name="bag" size={22} />
                <b data-testid="cart-count">{count}</b>
              </span>
              <span className="action-label">הסל שלי</span>
              <span className="sr-only">סל קניות, {count} פריטים</span>
            </Link>
          </div>
        </div>
        <nav className="department-nav" aria-label="ניווט ראשי">
          <div className="container department-inner">
            <button className="all-departments" aria-expanded={menu} onClick={() => setMenu(true)}>
              <Icon name="menu" size={19} />
              כל המחלקות
              <Icon name="down" size={13} />
            </button>
            {selectCategories(navigation.categories).map((c) => (
              <NavLink key={c.slug} to={`/category/${c.slug}`}>
                {c.shortName}
              </NavLink>
            ))}
            {getCategory(navigation.promotionCategory) && (
              <NavLink className="nav-offers" to={`/category/${navigation.promotionCategory}`}>
                <Icon name="sparkles" size={15} />
                {getCategory(navigation.promotionCategory)?.shortName}
              </NavLink>
            )}
          </div>
        </nav>
      </header>
      {menu && <MegaMenu onClose={() => setMenu(false)} />}
    </>
  );
}
