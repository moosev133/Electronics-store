import { Link, useParams } from 'react-router-dom';
import { store } from '../config/store';
import { Icon } from '../components/Icon';
import { EmptyState } from '../components/EmptyState';
import { usePageMeta } from '../hooks/usePageMeta';
import { content } from '../data/information';
export default function InfoPage({ account = false }: { account?: boolean }) {
  const { slug } = useParams();
  const info = content[account ? 'account' : slug || ''];
  usePageMeta(info?.title || 'עמוד לא נמצא');
  if (!info)
    return <EmptyState title="העמוד לא נמצא" text="אפשר לחזור לעמוד הבית או להמשיך לקטלוג." />;
  return (
    <div className="container info-page">
      <nav className="breadcrumbs">
        <Link to="/">עמוד הבית</Link>
        <Icon name="left" size={13} />
        <span>{info.title}</span>
      </nav>
      <div className="info-layout">
        <aside>
          <span className="eyebrow">כאן בשבילכם</span>
          <nav aria-label="מרכז המידע">
            {Object.entries(content)
              .filter(([key]) => key !== 'account')
              .map(([key, item]) => (
                <Link key={key} to={`/info/${key}`} className={slug === key ? 'active' : ''}>
                  {item.title}
                  <Icon name="left" size={14} />
                </Link>
              ))}
          </nav>
        </aside>
        <article>
          <span className="eyebrow">מידע ושירות</span>
          <h1>{info.title}</h1>
          <p className="info-intro">{info.intro}</p>
          {info.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </section>
          ))}
          {slug === 'contact' && (
            <div className="info-contact-links">
              {store.phone && (
                <a className="button outline" href={`tel:${store.phone}`}>
                  התקשרו אלינו
                </a>
              )}
              {store.email && (
                <a className="button outline" href={`mailto:${store.email}`}>
                  שלחו דוא״ל
                </a>
              )}
              {store.instagram && (
                <a
                  className="button outline"
                  href={store.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
              )}
            </div>
          )}
          {account && (
            <div className="info-contact-links">
              <Link className="button gold" to="/favorites">
                המועדפים שלי
              </Link>
              <Link className="button outline" to="/cart">
                לסל הקניות
              </Link>
            </div>
          )}
          <Link className="text-link" to="/catalog">
            להמשיך לגלות מוצרים
            <Icon name="arrowLeft" size={17} />
          </Link>
        </article>
      </div>
    </div>
  );
}
