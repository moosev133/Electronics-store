export type Locale = 'he' | 'ar' | 'en';
export type Availability = 'unknown' | 'in-stock' | 'out-of-stock';
export interface ProductImage {
  src: string;
  alt: string;
  demo: boolean;
}
export interface Variant {
  id: string;
  label: string;
  specs: Record<string, string>;
  image?: ProductImage;
  price?: number;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  subcategory: string;
  description: string;
  specs: Record<string, string>;
  images: ProductImage[];
  variants: Variant[];
  price?: number;
  previousPrice?: number;
  discount?: number;
  availability: Availability;
  isNew: boolean;
  featured: boolean;
  sale: boolean;
  demoBestSeller: boolean;
  demo: boolean;
  verified: boolean;
  addedAt: string;
}
export interface FilterDefinition {
  key: string;
  label: string;
}
export interface Category {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  headline: string;
  description: string;
  image: string;
  icon: string;
  subcategories: string[];
  filters: FilterDefinition[];
}
export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}
export interface CheckoutProvider {
  // A future server adapter must validate inventory, prices and totals. Never accept browser totals.
  createCheckout(items: CartItem[]): Promise<{ redirectUrl: string }>;
}
