import { Link } from 'react-router-dom';
import { BrandMark } from './Header';
import { Icon } from './Icon';
import { store } from '../config/store';
const columns = [
  {
    title: 'בואו להכיר',
    links: [
      ['אודות החנות', 'about'],
      ['סניפים ושעות פעילות', 'locations'],
      ['יצירת קשר', 'contact'],
    ],
  },
  {
    title: 'כאן בשבילכם',
    links: [
      ['שירות לקוחות', 'service'],
      ['משלוחים ואיסוף', 'delivery'],
      ['מידע על אחריות', 'warranty'],
      ['החזרות וביטולים', 'returns'],
    ],
  },
  {
    title: 'מידע ושקיפות',
    links: [
      ['מדיניות פרטיות', 'privacy'],
      ['תנאי שימוש', 'terms'],
      ['נגישות', 'accessibility'],
      ['על קטלוג ההמחשה', 'demo'],
    ],
  },
];
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <BrandMark />
            <p>
              טכנולוגיה שנבחרת במחשבה.
              <br />
              חוויה שמתחילה בפרטים הקטנים.
            </p>
            <Link className="text-link" to="/info/contact">
              אנחנו כאן בשבילכם
              <Icon name="arrowLeft" size={16} />
            </Link>
          </div>
          {columns.map((c) => (
            <div className="footer-column" key={c.title}>
              <h3>{c.title}</h3>
              {c.links.map(([label, slug]) => (
                <Link to={`/info/${slug}`} key={slug}>
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="footer-contact">
          <span>
            <Icon name="telephone" size={15} />
            {store.phone || 'מספר הטלפון יעודכן'}
          </span>
          <span>
            <Icon name="pin" size={15} />
            {store.address || 'כתובת החנות תעודכן'}
          </span>
          <span>
            <Icon name="clock" size={15} />
            {store.openingHours || 'שעות הפעילות יעודכנו'}
          </span>
          <Link to="/info/contact">
            <Icon name="instagram" size={15} />
            Instagram — פרטים יעודכנו
          </Link>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {store.name}
          </span>
          <p>אתר הדגמה · אין אפשרות לבצע הזמנה או תשלום. התמונות והנתונים להמחשה בלבד.</p>
          <span>
            עברית <span className="gold-dot" />
          </span>
        </div>
      </div>
    </footer>
  );
}
