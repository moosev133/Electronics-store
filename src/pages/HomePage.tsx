import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductRail } from '../components/ProductRail';
import { PromoBanner } from '../components/PromoBanner';
import { Icon } from '../components/Icon';
import { products, brands } from '../data/products';
import { categories } from '../data/categories';
import { productImageSet, asset, brandAsset } from '../config/store';
import { usePageMeta } from '../hooks/usePageMeta';
import { useShop } from '../hooks/ShopContext';
export default function HomePage() {
  usePageMeta('טכנולוגיה שנבחרת במחשבה');
  const { recent } = useShop();
  return (
    <div className="container home-page">
      <div className="welcome-line">
        <span>בית לטכנולוגיה. מקום להשראה.</span>
        <Link to="/catalog">
          גלו את הקטלוג
          <Icon name="arrowLeft" size={14} />
        </Link>
      </div>
      <HeroCarousel />
      <div className="service-strip">
        {[
          {
            icon: 'truck',
            title: 'משלוחים ואיסוף',
            text: 'כל המידע, במקום אחד',
            route: 'delivery',
          },
          {
            icon: 'shield',
            title: 'קונים עם כל המידע',
            text: 'מפרטים, אפשרויות ואחריות',
            route: 'warranty',
          },
          {
            icon: 'headphones',
            title: 'יש עם מי לדבר',
            text: 'הכירו את ערוצי השירות',
            route: 'service',
          },
          {
            icon: 'heart',
            title: 'הבחירות שלכם נשמרות',
            text: 'מועדפים וסל אישי במכשיר',
            route: 'demo',
          },
        ].map((s) => (
          <Link to={`/info/${s.route}`} key={s.icon}>
            <Icon name={s.icon} size={27} />
            <span>
              <strong>{s.title}</strong>
              <small>{s.text}</small>
            </span>
          </Link>
        ))}
      </div>
      <section className="category-section reveal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">כל מה שהבית צריך</span>
            <h2>מה תרצו לשדרג היום?</h2>
          </div>
          <Link className="text-link" to="/categories">
            לכל המחלקות
            <Icon name="arrowLeft" size={16} />
          </Link>
        </div>
        <div className="category-grid">
          {categories.slice(0, 8).map((c) => (
            <Link to={`/category/${c.slug}`} className="category-card" key={c.slug}>
              <div>
                <img
                  src={asset(`assets/products/${c.image}.webp`)}
                  srcSet={productImageSet(`assets/products/${c.image}.webp`)}
                  sizes="110px"
                  alt={`${c.shortName} — להמחשה`}
                  width="160"
                  height="130"
                  loading="lazy"
                />
              </div>
              <span>{c.shortName}</span>
            </Link>
          ))}
        </div>
      </section>
      <ProductRail
        title="מבצעים חמים"
        eyebrow="נבחרו בשבילכם"
        note="תצוגת מבצעים להמחשה — מחירים והטבות יעודכנו בהמשך"
        products={products.filter((p) => p.featured).slice(0, 8)}
        href="/category/offers"
      />
      <section className="secondary-promos reveal" aria-label="גלו מחלקות נוספות">
        {['air-conditioners', 'washing-machines', 'refrigerators'].map((slug) => (
          <PromoBanner key={slug} category={categories.find((c) => c.slug === slug)!} compact />
        ))}
      </section>
      <ProductRail
        title="מוצרים חדשים"
        eyebrow="רעננות שמרגישים"
        products={products
          .filter((p) => p.isNew)
          .filter((_, i) => i % 2 === 1)
          .reverse()
          .slice(0, 8)}
        href="/catalog?new=1"
      />
      <section className="editorial-banner reveal">
        <img
          src={asset('assets/hero-living.webp')}
          alt="סלון בהדמיה עם טלוויזיה רחבה — תמונת אווירה"
          width="1672"
          height="941"
          loading="lazy"
        />
        <div>
          <span className="eyebrow">הבית. בגרסה הבאה שלו.</span>
          <h2>
            עיצוב שמרגישים.
            <br />
            טכנולוגיה שחיים.
          </h2>
          <p>
            גלו את המוצרים שמשתלבים בחלל שלכם
            <br />
            והופכים כל יום לקצת יותר מיוחד.
          </p>
          <Link className="button outline" to="/category/smart-home">
            להכיר את הבית החכם
            <Icon name="arrowLeft" size={17} />
          </Link>
        </div>
      </section>
      <section className="brands-section reveal">
        <div className="section-heading">
          <div>
            <span className="eyebrow">שמות שמכירים</span>
            <h2>המותגים המובילים</h2>
          </div>
          <Link className="text-link" to="/brands">
            לכל המותגים
            <Icon name="arrowLeft" size={16} />
          </Link>
        </div>
        <div className="brand-grid">
          {brands.map((brand) => (
            <Link to={`/brand/${brand.toLowerCase()}`} key={brand} aria-label={`מוצרי ${brand}`}>
              <img src={brandAsset(brand)} alt={brand} width="130" height="50" loading="lazy" />
            </Link>
          ))}
        </div>
        <p className="section-note">
          הסימנים המסחריים שייכים לבעליהם. הצגתם אינה מעידה על שותפות, הרשאה או מלאי מאומת.
        </p>
      </section>
      <ProductRail
        title="הנמכרים ביותר"
        eyebrow="השראה לבחירה הבאה"
        note="דירוג לדוגמה בלבד — אינו מבוסס על נתוני מכירות"
        products={products
          .filter((p) => p.demoBestSeller)
          .sort((a, b) => a.brand.localeCompare(b.brand))
          .slice(0, 8)}
        href="/catalog?best=1"
      />
      <div className="department-features">
        {['tvs', 'washing-machines', 'kitchen', 'air-conditioners', 'small-appliances'].map(
          (slug) => {
            const c = categories.find((c) => c.slug === slug)!;
            return (
              <section className="department-feature reveal" key={slug}>
                <PromoBanner category={c} />
                <ProductRail
                  title={`מבחר ${c.shortName}`}
                  products={products.filter((p) => p.category === slug)}
                  href={`/category/${slug}`}
                />
              </section>
            );
          },
        )}
      </div>
      <ProductRail
        title="לאחרונה צפיתם"
        products={recent.flatMap((id) => products.filter((p) => p.id === id))}
      />
      <section className="help-banner">
        <span className="help-icon">
          <Icon name="headphones" size={36} />
        </span>
        <div>
          <h2>הבחירה הנכונה מתחילה בשיחה.</h2>
          <p>מידע על המוצרים, המחלקות ודרכי יצירת הקשר — הכל במקום אחד.</p>
        </div>
        <Link className="button outline" to="/info/service">
          למרכז השירות
          <Icon name="arrowLeft" size={17} />
        </Link>
      </section>
    </div>
  );
}
