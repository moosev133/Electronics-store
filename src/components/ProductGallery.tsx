import { useRef, useState } from 'react';
import type { ProductImage } from '../types/catalog';
import { asset, productImageSet } from '../config/store';
import { Modal } from './Modal';
import { Icon } from './Icon';
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [index, setIndex] = useState(0),
    [zoom, setZoom] = useState(false);
  const touch = useRef(0);
  const selected = images[index] || images[0];
  return (
    <div className="product-gallery">
      <div
        className="gallery-main"
        onTouchStart={(e) => {
          touch.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(delta) > 45)
            setIndex((i) => (i + (delta > 0 ? 1 : images.length - 1)) % images.length);
        }}
      >
        <span className="gallery-note">צילום להמחשה בלבד</span>
        <button
          className="gallery-zoom"
          onClick={() => setZoom(true)}
          aria-label="לחצו להגדלה — הגדלת תמונת המוצר"
        >
          <img src={asset(selected.src)} alt={selected.alt} width="800" height="680" />
          <span>
            <Icon name="zoom" size={19} />
            לחצו להגדלה
          </span>
        </button>
      </div>
      <div className="gallery-thumbnails" aria-label="תמונות מוצר">
        {images.map((im, i) => (
          <button
            key={`${im.src}-${i}`}
            className={index === i ? 'selected' : ''}
            aria-label={`הצגת תמונה ${i + 1}`}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
          >
            <img
              src={asset(im.src)}
              srcSet={productImageSet(im.src)}
              sizes="90px"
              alt={im.alt}
              width="85"
              height="70"
              loading="lazy"
            />
          </button>
        ))}
      </div>
      {zoom && (
        <Modal title="תמונת המוצר — להמחשה" onClose={() => setZoom(false)} className="zoom-modal">
          <img src={asset(selected.src)} alt={selected.alt} width="1200" height="1000" />
          <div className="zoom-controls">
            <button
              className="button outline"
              onClick={() => setIndex((i) => (i + images.length - 1) % images.length)}
              disabled={images.length < 2}
            >
              תמונה קודמת
            </button>
            <span>
              {index + 1} / {images.length}
            </span>
            <button
              className="button outline"
              onClick={() => setIndex((i) => (i + 1) % images.length)}
              disabled={images.length < 2}
            >
              תמונה הבאה
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
