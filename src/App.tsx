import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { StoreLayout } from './layouts/StoreLayout';
import { ShopProvider } from './hooks/ShopContext';
import { EmptyState } from './components/EmptyState';
import HomePage from './pages/HomePage';
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const SavedPage = lazy(() => import('./pages/SavedPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const DirectoryPage = lazy(() => import('./pages/DirectoryPage'));
export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ShopProvider>
        <Suspense
          fallback={
            <div className="page-loading" role="status">
              <span />
              טוענים את הבחירה הבאה שלכם…
            </div>
          }
        >
          <Routes>
            <Route element={<StoreLayout />}>
              <Route index element={<HomePage />} />
              <Route path="category/:slug" element={<CatalogPage />} />
              <Route path="brand/:brand" element={<CatalogPage />} />
              <Route path="catalog" element={<CatalogPage />} />
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="favorites" element={<SavedPage />} />
              <Route path="account" element={<InfoPage account />} />
              <Route path="info/:slug" element={<InfoPage />} />
              <Route path="categories" element={<DirectoryPage />} />
              <Route path="brands" element={<DirectoryPage showBrands />} />
              <Route
                path="*"
                element={
                  <EmptyState
                    title="העמוד הזה עדיין לא מחובר"
                    text="הקישור לא נמצא, אבל הבחירה הבאה שלכם מחכה בקטלוג."
                    href="/catalog"
                    cta="לכל המוצרים"
                  />
                }
              />
            </Route>
          </Routes>
        </Suspense>
      </ShopProvider>
    </BrowserRouter>
  );
}
