import { Link } from 'react-router-dom';
import { HeroCarousel } from '../components/HeroCarousel';
import { ProductRail } from '../components/ProductRail';
import { PromoBanner } from '../components/PromoBanner';
import { Icon } from '../components/Icon';
import { products } from '../data/products';
import { brandCatalog } from '../data/brands';
import { selectCategories, getCategory } from '../data/categories';
import { productImageSet, asset, brandAsset } from '../config/store';
import { usePageMeta } from '../hooks/usePageMeta';
import { useShop } from '../hooks/ShopContext';
import { homepage, serviceHighlights } from '../data/homepage';
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
        {serviceHighlights.map((s) => (
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
          {selectCategories(homepage.categoryTiles).map((c) => (
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
        products={products.filter((p) => p.featured).slice(0, homepage.productsPerRail)}
        href="/category/offers"
      />
      <section className="secondary-promos reveal" aria-label="גלו מחלקות נוספות">
        {selectCategories(homepage.secondaryPromotions).map((category) => (
          <PromoBanner key={category.slug} category={category} compact />
        ))}
      </section>
      <ProductRail
        title="מוצרים חדשים"
        eyebrow="רעננות שמרגישים"
        products={products
          .filter((p) => p.isNew)
          .sort((a, b) => b.addedAt.localeCompare(a.addedAt))
          .slice(0, homepage.productsPerRail)}
        href="/catalog?new=1"
      />
      {getCategory(homepage.editorial.category) && (
        <section className="editorial-banner reveal">
          <img
            src={asset(homepage.editorial.image)}
            alt={homepage.editorial.alt}
            width="1672"
            height="941"
            loading="lazy"
          />
          <div>
            <span className="eyebrow">{homepage.editorial.eyebrow}</span>
            <h2>
              {homepage.editorial.title}
              <br />
              {homepage.editorial.accent}
            </h2>
            <p>
              {homepage.editorial.description}
              <br />
              {homepage.editorial.descriptionSecondLine}
            </p>
            <Link className="button outline" to={`/category/${homepage.editorial.category}`}>
              {homepage.editorial.cta}
              <Icon name="arrowLeft" size={17} />
            </Link>
          </div>
        </section>
      )}
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
          {brandCatalog.map((brand) => (
            <Link to={`/brand/${brand.slug}`} key={brand.slug} aria-label={`מוצרי ${brand.name}`}>
              <img
                src={brandAsset(brand.name)}
                alt={brand.name}
                width="130"
                height="50"
                loading="lazy"
              />
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
          .slice(0, homepage.productsPerRail)}
        href="/catalog?best=1"
      />
      <div className="department-features">
        {selectCategories(homepage.featuredDepartments).map((c) => {
          const slug = c.slug;
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
        })}
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
