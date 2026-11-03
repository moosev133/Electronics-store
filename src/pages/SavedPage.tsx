import { useShop } from '../hooks/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { EmptyState } from '../components/EmptyState';
import { usePageMeta } from '../hooks/usePageMeta';
export default function SavedPage() {
  const { favorites } = useShop();
  usePageMeta('המועדפים שלי');
  const selected = products.filter((p) => favorites.includes(p.id));
  if (!selected.length)
    return (
      <EmptyState
        title="מקום לדברים שאהבתם"
        text="לחצו על הלב ליד מוצר כדי לשמור אותו כאן, במכשיר שלכם."
        href="/catalog"
        cta="לגלות את הקטלוג"
        icon="heart"
      />
    );
  return (
    <div className="container saved-page">
      <div className="page-heading">
        <span className="eyebrow">הבחירות האישיות שלכם</span>
        <h1>המועדפים שלי</h1>
        <p>{selected.length} מוצרים שנשמרו במכשיר הזה</p>
      </div>
      <div className="catalog-grid">
        {selected.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
