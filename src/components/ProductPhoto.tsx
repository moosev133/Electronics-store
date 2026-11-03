import type { ProductImage } from '../types/catalog';
import { asset, productImageSet } from '../config/store';

// Supplier sheets stay byte-for-byte intact. A bounded SVG viewport displays only
// the original product photograph, including in thumbnails, search, cart and zoom.
export function ProductPhoto({
  image,
  width,
  height,
  sizes,
  alt = image.alt,
  loading,
}: {
  image: ProductImage;
  width: number;
  height: number;
  sizes?: string;
  alt?: string;
  loading?: 'lazy' | 'eager';
}) {
  const frame = image.frame;
  if (!frame)
    return (
      <img
        className="product-photo"
        src={asset(image.src)}
        srcSet={productImageSet(image.src)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
      />
    );
  return (
    <svg
      className="product-photo"
      width={width}
      height={height}
      viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`}
      preserveAspectRatio="xMidYMid meet"
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      focusable="false"
      style={{ overflow: 'hidden' }}
    >
      <svg
        x={frame.x}
        y={frame.y}
        width={frame.width}
        height={frame.height}
        viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`}
        overflow="hidden"
      >
        <image href={asset(image.src)} width={frame.sourceWidth} height={frame.sourceHeight} />
      </svg>
    </svg>
  );
}
