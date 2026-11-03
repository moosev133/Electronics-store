import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { products } from '../data/products';
import type { CartItem } from '../types/catalog';
import { sanitiseCart } from '../utilities/catalog';
import { readStorage, writeStorage, storageSnapshot, subscribeStorage } from '../utilities/storage';
interface ShopState {
  cart: CartItem[];
  favorites: string[];
  recent: string[];
  notice: string;
  storageAvailable: boolean;
  add: (productId: string, variantId: string, quantity?: number) => void;
  quantity: (productId: string, variantId: string, quantity: number) => void;
  remove: (productId: string, variantId: string) => void;
  toggleFavorite: (id: string) => void;
  viewed: (id: string) => void;
}
const Context = createContext<ShopState | null>(null);
const validIds = (raw: unknown) =>
  Array.isArray(raw)
    ? raw.filter((id): id is string => typeof id === 'string' && products.some((p) => p.id === id))
    : [];
export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState(() =>
    sanitiseCart(readStorage('electronics.cart.v1'), products),
  );
  const [favorites, setFavorites] = useState(() =>
    validIds(readStorage('electronics.favorites.v1')),
  );
  const [recent, setRecent] = useState(() => validIds(readStorage('electronics.recent.v1')));
  const [notice, setNotice] = useState('');
  const storageAvailable = useSyncExternalStore(subscribeStorage, storageSnapshot);
  useEffect(() => {
    writeStorage('electronics.cart.v1', cart);
  }, [cart]);
  useEffect(() => {
    writeStorage('electronics.favorites.v1', favorites);
  }, [favorites]);
  useEffect(() => {
    writeStorage('electronics.recent.v1', recent);
  }, [recent]);
  useEffect(() => {
    if (!notice) return;
    const id = setTimeout(() => setNotice(''), 3500);
    return () => clearTimeout(id);
  }, [notice]);
  function add(productId: string, variantId: string, amount = 1) {
    if (!products.some((p) => p.id === productId && p.variants.some((v) => v.id === variantId)))
      return;
    setCart((current) => {
      const found = current.find((i) => i.productId === productId && i.variantId === variantId);
      return found
        ? current.map((i) =>
            i === found ? { ...i, quantity: Math.min(99, i.quantity + amount) } : i,
          )
        : [...current, { productId, variantId, quantity: Math.min(99, Math.max(1, amount)) }];
    });
    setNotice('המוצר נוסף לסל ההדגמה');
  }
  function quantity(productId: string, variantId: string, value: number) {
    setCart((items) =>
      items.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity: Math.min(99, Math.max(1, Math.floor(value))) }
          : i,
      ),
    );
  }
  function remove(productId: string, variantId: string) {
    setCart((items) =>
      items.filter((i) => !(i.productId === productId && i.variantId === variantId)),
    );
    setNotice('המוצר הוסר מהסל');
  }
  function toggleFavorite(id: string) {
    setFavorites((list) => (list.includes(id) ? list.filter((v) => v !== id) : [...list, id]));
  }
  function viewed(id: string) {
    setRecent((list) =>
      list[0] === id ? list : [id, ...list.filter((v) => v !== id)].slice(0, 8),
    );
  }
  return (
    <Context.Provider
      value={{
        cart,
        favorites,
        recent,
        notice,
        storageAvailable,
        add,
        quantity,
        remove,
        toggleFavorite,
        viewed,
      }}
    >
      {children}
      <div className={`toast ${notice ? 'visible' : ''}`} role="status" aria-live="polite">
        {notice}
      </div>
    </Context.Provider>
  );
}
export function useShop() {
  const state = useContext(Context);
  if (!state) throw new Error('ShopProvider missing');
  return state;
}
