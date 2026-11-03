import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../config/store';
import { Icon } from './Icon';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { heroSlides, homepage } from '../data/homepage';
import { getCategory } from '../data/categories';
const slides = heroSlides.filter((slide) => getCategory(slide.category));
export function HeroCarousel() {
  const [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false),
    [hover, setHover] = useState(false),
    [focused, setFocused] = useState(false);
  const reduced = useReducedMotion(),
    touch = useRef(0);
  const slide = slides[index];
  useEffect(() => {
    if (paused || hover || focused || reduced || slides.length < 2) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
    }, homepage.rotationMilliseconds);
    return () => clearInterval(timer);
  }, [paused, hover, focused, reduced]);
  function change(i: number) {
    setPaused(true);
    setIndex((i + slides.length) % slides.length);
  }
  if (!slide) return null;
  return (
    <section
      className={`hero ${slide.scene ? 'hero-scene' : 'hero-product'}`}
      aria-label="מבחר המחלקות"
      aria-roledescription="קרוסלה"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onTouchStart={(e) => {
        touch.current = e.touches[0].clientX;
        setPaused(true);
      }}
      onTouchEnd={(e) => {
        const delta = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(delta) > 45) change(index + (delta > 0 ? 1 : -1));
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          change(index + 1);
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          change(index - 1);
        }
      }}
    >
      <img
        key={slide.image}
        className="hero-image"
        src={asset(slide.image)}
        srcSet={
          slide.smallImage
            ? `${asset(slide.smallImage)} 900w, ${asset(slide.image)} 1672w`
            : undefined
        }
        sizes={slide.scene ? '(max-width: 640px) 100vw, 1400px' : undefined}
        width="1672"
        height="941"
        alt={slide.alt}
        fetchPriority={index === 0 ? 'high' : 'auto'}
      />
      <div className="hero-shade" />
      <div className="hero-copy" key={index}>
        <span className="eyebrow">
          <i />
          {slide.eyebrow}
        </span>
        <h1>
          {slide.title}
          <br />
          <em>{slide.accent}</em>
        </h1>
        <p>{slide.description}</p>
        <Link className="button gold" to={`/category/${slide.category}`}>
          {slide.cta}
          <Icon name="arrowLeft" size={18} />
        </Link>
        <span className="hero-note">תמונות ומוצרים להמחשה</span>
      </div>
      <div className="hero-controls">
        <div className="hero-dots">
          {slides.map((s, i) => (
            <button
              key={s.category}
              className={i === index ? 'active' : ''}
              aria-label={`מעבר לשקופית ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => change(i)}
            />
          ))}
        </div>
        <div className="hero-count">
          <span dir="ltr">
            {String(index + 1).padStart(2, '0')} <b>/ {String(slides.length).padStart(2, '0')}</b>
          </span>
          <span className="control-divider" />
          <button
            className="icon-button"
            aria-label="שקופית קודמת"
            onClick={() => change(index - 1)}
          >
            <Icon name="right" size={19} />
          </button>
          <button
            className="icon-button"
            aria-label="שקופית הבאה"
            onClick={() => change(index + 1)}
          >
            <Icon name="left" size={19} />
          </button>
          <button
            className="icon-button"
            aria-label={paused || reduced ? 'הפעלת סבב השקופיות' : 'השהיית סבב השקופיות'}
            disabled={reduced}
            onClick={() => setPaused((v) => !v)}
          >
            <Icon name={paused || reduced ? 'play' : 'pause'} size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
