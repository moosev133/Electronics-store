import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { asset } from '../config/store';
import { Icon } from './Icon';
import { useReducedMotion } from '../hooks/useReducedMotion';
const slides = [
  {
    category: 'tvs',
    eyebrow: 'חוויה גדולה. עד הפרט הקטן.',
    title: (
      <>
        לראות מעבר.
        <br />
        <em>להרגיש יותר.</em>
      </>
    ),
    description: 'הכניסו הביתה תמונה, צליל ועיצוב שמרגשים בכל פעם מחדש.',
    cta: 'לגלות את עולם הטלוויזיות',
    image: 'hero-living.webp',
    scene: true,
  },
  {
    category: 'offers',
    eyebrow: 'הבחירות של השבוע',
    title: (
      <>
        הטכנולוגיה שתאהבו.
        <br />
        <em>במקום אחד.</em>
      </>
    ),
    description: 'מבחר מוצרי ההמחשה שלנו, מהסלון ועד המטבח. מחירים יעודכנו בקרוב.',
    cta: 'למבחר השבוע',
    image: 'products/laptop.webp',
    scene: false,
  },
  {
    category: 'air-conditioners',
    eyebrow: 'הנוחות מתחילה כאן',
    title: (
      <>
        האווירה הנכונה.
        <br />
        <em>בכל עונה.</em>
      </>
    ),
    description: 'גלו פתרונות מיזוג שמשתלבים בחיים ובחלל שלכם.',
    cta: 'למחלקת מיזוג אוויר',
    image: 'products/ac.webp',
    scene: false,
  },
  {
    category: 'washing-machines',
    eyebrow: 'חושבים על השגרה שלכם',
    title: (
      <>
        פחות מטלות.
        <br />
        <em>יותר רגעים.</em>
      </>
    ),
    description: 'גלו את מחלקת מכונות הכביסה והמייבשים.',
    cta: 'לעולם הכביסה',
    image: 'products/washer.webp',
    scene: false,
  },
  {
    category: 'refrigerators',
    eyebrow: 'עיצוב פוגש שימושיות',
    title: (
      <>
        מקום לכל מה שטוב.
        <br />
        <em>בית לכל הטעמים.</em>
      </>
    ),
    description: 'מקררים ומקפיאים למטבח שאתם מדמיינים.',
    cta: 'למבחר המקררים',
    image: 'products/fridge.webp',
    scene: false,
  },
  {
    category: 'smartphones',
    eyebrow: 'מחוברים לדברים החשובים',
    title: (
      <>
        העולם שלכם.
        <br />
        <em>בכף היד.</em>
      </>
    ),
    description: 'סמארטפונים, גיימינג וכל מה שמחבר ביניהם.',
    cta: 'לסלולר וגיימינג',
    image: 'products/phone.webp',
    scene: false,
  },
];
export function HeroCarousel() {
  const [index, setIndex] = useState(0),
    [paused, setPaused] = useState(false),
    [hover, setHover] = useState(false),
    [focused, setFocused] = useState(false);
  const reduced = useReducedMotion(),
    touch = useRef(0);
  const slide = slides[index];
  useEffect(() => {
    if (paused || hover || focused || reduced) return;
    const timer = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, hover, focused, reduced]);
  function change(i: number) {
    setPaused(true);
    setIndex((i + slides.length) % slides.length);
  }
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
        src={asset(`assets/${slide.image}`)}
        srcSet={
          slide.scene
            ? `${asset('assets/hero-living-900.webp')} 900w, ${asset('assets/hero-living.webp')} 1672w`
            : undefined
        }
        sizes={slide.scene ? '(max-width: 640px) 100vw, 1400px' : undefined}
        width="1672"
        height="941"
        alt={slide.scene ? 'הדמיית מסך רחב בחלל מגורים בגווני גרפיט וזהב' : 'מוצר להמחשת המחלקה'}
        fetchPriority={index === 0 ? 'high' : 'auto'}
      />
      <div className="hero-shade" />
      <div className="hero-copy" key={index}>
        <span className="eyebrow">
          <i />
          {slide.eyebrow}
        </span>
        <h1>{slide.title}</h1>
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
            0{index + 1} <b>/ 06</b>
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
