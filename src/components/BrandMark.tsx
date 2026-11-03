import { findBrand } from '../data/brands';
import { asset } from '../config/store';

export function BrandMark({
  name,
  width = 130,
  height = 50,
  className,
}: {
  name: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const brand = findBrand(name);
  return brand?.logo ? (
    <img
      className={className}
      src={asset(brand.logo)}
      alt={name}
      width={width}
      height={height}
      loading="lazy"
    />
  ) : (
    <span className={`brand-name ${className || ''}`} dir="ltr">
      {name}
    </span>
  );
}
