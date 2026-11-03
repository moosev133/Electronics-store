import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { brands } from '../data/products';
import { brandAsset } from '../config/store';
import { PromoBanner } from '../components/PromoBanner';
import { usePageMeta } from '../hooks/usePageMeta';
export default function DirectoryPage({ showBrands = false }: { showBrands?: boolean }) {
  usePageMeta(showBrands ? 'המותגים המובילים' : 'כל המחלקות');
  return (
    <div className="container directory-page">
      <div className="page-heading">
        <span className="eyebrow">ההשראה הבאה שלכם</span>
        <h1>{showBrands ? 'המותגים המובילים' : 'כל המחלקות'}</h1>
        <p>
          {showBrands
            ? 'שיוכי המוצרים למותגים הם להמחשה בלבד. אין בכך הצהרה על שותפות או הרשאה.'
            : 'מבחר עולמות של טכנולוגיה, עיצוב ונוחות. בחרו מחלקה והתחילו לגלות.'}
        </p>
      </div>
      {showBrands ? (
        <div className="brand-grid directory-brands">
          {brands.map((brand) => (
            <Link key={brand} to={`/brand/${brand.toLowerCase()}`}>
              <img src={brandAsset(brand)} alt={brand} width="160" height="70" />
            </Link>
          ))}
        </div>
      ) : (
        <div className="directory-grid">
          {categories.map((c) => (
            <PromoBanner key={c.slug} category={c} compact />
          ))}
        </div>
      )}
    </div>
  );
}
