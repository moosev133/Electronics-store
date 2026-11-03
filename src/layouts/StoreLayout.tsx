import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Entrance } from '../components/Entrance';
export function StoreLayout() {
  const { pathname } = useLocation();
  const initial = useRef(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (!initial.current) {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
    initial.current = false;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.04 },
    );
    const timer = setTimeout(
      () => document.querySelectorAll('.reveal').forEach((el) => observer.observe(el)),
      150,
    );
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        דלגו לתוכן המרכזי
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <Entrance />
    </>
  );
}
