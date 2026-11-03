// Edit banners and featured department order here; the components handle the layout.
export interface HeroSlide {
  category: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  cta: string;
  image: string;
  smallImage?: string;
  alt: string;
  scene: boolean;
}

export const heroSlides: HeroSlide[] = [
  {
    category: 'tvs',
    eyebrow: 'חוויה גדולה. עד הפרט הקטן.',
    title: 'לראות מעבר.',
    accent: 'להרגיש יותר.',
    description: 'הכניסו הביתה תמונה, צליל ועיצוב שמרגשים בכל פעם מחדש.',
    cta: 'לגלות את עולם הטלוויזיות',
    image: 'assets/hero-living.webp',
    scene: true,
    smallImage: 'assets/hero-living-900.webp',
    alt: 'הדמיית מסך רחב בחלל מגורים בגווני גרפיט וזהב',
  },
  {
    category: 'offers',
    eyebrow: 'הבחירות של השבוע',
    title: 'הטכנולוגיה שתאהבו.',
    accent: 'במקום אחד.',
    description: 'מבחר מוצרי ההמחשה שלנו, מהסלון ועד המטבח. מחירים יעודכנו בקרוב.',
    cta: 'למבחר השבוע',
    image: 'assets/products/laptop.webp',
    scene: false,
    alt: 'מוצר להמחשת המחלקה',
  },
  {
    category: 'air-conditioners',
    eyebrow: 'הנוחות מתחילה כאן',
    title: 'האווירה הנכונה.',
    accent: 'בכל עונה.',
    description: 'גלו פתרונות מיזוג שמשתלבים בחיים ובחלל שלכם.',
    cta: 'למחלקת מיזוג אוויר',
    image: 'assets/products/ac.webp',
    scene: false,
    alt: 'מוצר להמחשת המחלקה',
  },
  {
    category: 'washing-machines',
    eyebrow: 'חושבים על השגרה שלכם',
    title: 'פחות מטלות.',
    accent: 'יותר רגעים.',
    description: 'גלו את מחלקת מכונות הכביסה והמייבשים.',
    cta: 'לעולם הכביסה',
    image: 'assets/products/washer.webp',
    scene: false,
    alt: 'מוצר להמחשת המחלקה',
  },
  {
    category: 'refrigerators',
    eyebrow: 'עיצוב פוגש שימושיות',
    title: 'מקום לכל מה שטוב.',
    accent: 'בית לכל הטעמים.',
    description: 'מקררים ומקפיאים למטבח שאתם מדמיינים.',
    cta: 'למבחר המקררים',
    image: 'assets/products/fridge.webp',
    scene: false,
    alt: 'מוצר להמחשת המחלקה',
  },
  {
    category: 'smartphones',
    eyebrow: 'מחוברים לדברים החשובים',
    title: 'העולם שלכם.',
    accent: 'בכף היד.',
    description: 'סמארטפונים, גיימינג וכל מה שמחבר ביניהם.',
    cta: 'לסלולר וגיימינג',
    image: 'assets/products/phone.webp',
    scene: false,
    alt: 'מוצר להמחשת המחלקה',
  },
];

export const homepage = {
  rotationMilliseconds: 5000,
  categoryTiles: [
    'tvs',
    'smartphones',
    'air-conditioners',
    'washing-machines',
    'refrigerators',
    'kitchen',
    'small-appliances',
    'vacuum-cleaners',
  ],
  secondaryPromotions: ['air-conditioners', 'washing-machines', 'refrigerators'],
  featuredDepartments: [
    'tvs',
    'washing-machines',
    'kitchen',
    'air-conditioners',
    'small-appliances',
  ],
  productsPerRail: 8,
  editorial: {
    image: 'assets/hero-living.webp',
    alt: 'סלון בהדמיה עם טלוויזיה רחבה — תמונת אווירה',
    eyebrow: 'הבית. בגרסה הבאה שלו.',
    title: 'עיצוב שמרגישים.',
    accent: 'טכנולוגיה שחיים.',
    description: 'גלו את המוצרים שמשתלבים בחלל שלכם',
    descriptionSecondLine: 'והופכים כל יום לקצת יותר מיוחד.',
    category: 'smart-home',
    cta: 'להכיר את הבית החכם',
  },
};
export const serviceHighlights = [
  { icon: 'truck', title: 'משלוחים ואיסוף', text: 'כל המידע, במקום אחד', route: 'delivery' },
  {
    icon: 'shield',
    title: 'קונים עם כל המידע',
    text: 'מפרטים, אפשרויות ואחריות',
    route: 'warranty',
  },
  { icon: 'headphones', title: 'יש עם מי לדבר', text: 'הכירו את ערוצי השירות', route: 'service' },
  { icon: 'heart', title: 'הבחירות שלכם נשמרות', text: 'מועדפים וסל אישי במכשיר', route: 'demo' },
];
