// The storefront reads this single catalog entry point. Future imports/API adapters can replace
// the data source without changing shopping components or page layouts.
import { products } from './catalog';
export { products };
export { brands } from './brands';
export { specLabels } from './specifications';
export const findProduct = (id: string) => products.find((product) => product.id === id);
