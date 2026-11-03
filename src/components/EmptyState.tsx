import { Link } from 'react-router-dom';
import { Icon } from './Icon';
export function EmptyState({
  title,
  text,
  href = '/',
  cta = 'לעמוד הבית',
  icon = 'bag',
}: {
  title: string;
  text: string;
  href?: string;
  cta?: string;
  icon?: string;
}) {
  return (
    <div className="container">
      <div className="empty-state page-empty">
        <Icon name={icon} size={48} />
        <h1>{title}</h1>
        <p>{text}</p>
        <Link className="button gold" to={href}>
          {cta}
          <Icon name="arrowLeft" size={18} />
        </Link>
      </div>
    </div>
  );
}
