import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { store } from '../config/store';
export function usePageMeta(
  title: string,
  description = 'קטלוג ההמחשה של חנות מוצרי החשמל. גלו מוצרים, השוו מאפיינים ושמרו פריטים לסל ולמועדפים.',
) {
  const location = useLocation();
  useEffect(() => {
    document.title = `${title} | ${store.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    if (store.canonicalOrigin) {
      const canonical =
        document.querySelector('link[rel="canonical"]') ||
        document.head.appendChild(
          Object.assign(document.createElement('link'), { rel: 'canonical' }),
        );
      canonical.setAttribute(
        'href',
        `${store.canonicalOrigin.replace(/\/$/, '')}${import.meta.env.BASE_URL.replace(/\/$/, '')}${location.pathname}`,
      );
    }
  }, [title, description, location.pathname]);
}
