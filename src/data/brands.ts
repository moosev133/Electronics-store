export interface Brand {
  name: string;
  slug: string;
  logo: string;
}

// Add the authentic logo path here; no filename convention is required.
export const brandCatalog: Brand[] = [
  { name: 'Samsung', slug: 'samsung', logo: 'assets/brands/samsung.svg' },
  { name: 'LG', slug: 'lg', logo: 'assets/brands/lg.svg' },
  { name: 'Bosch', slug: 'bosch', logo: 'assets/brands/bosch.svg' },
  { name: 'Sony', slug: 'sony', logo: 'assets/brands/sony.svg' },
  { name: 'Hisense', slug: 'hisense', logo: 'assets/brands/hisense.svg' },
  { name: 'Electra', slug: 'electra', logo: 'assets/brands/electra.png' },
  { name: 'Philips', slug: 'philips', logo: 'assets/brands/philips.svg' },
  { name: 'TCL', slug: 'tcl', logo: 'assets/brands/tcl.svg' },
  { name: 'Xiaomi', slug: 'xiaomi', logo: 'assets/brands/xiaomi.svg' },
  { name: 'Siemens', slug: 'siemens', logo: 'assets/brands/siemens.svg' },
];
export const brands = brandCatalog.map((brand) => brand.name);
export const findBrand = (name: string) => brandCatalog.find((brand) => brand.name === name);
