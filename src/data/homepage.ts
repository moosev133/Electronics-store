// Edit banners and featured department order here; the components handle the layout.
export interface HeroSlide {
  category: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  cta: string;
  image: string;
  alt: string;
}

export const heroSlides: HeroSlide[] = [
  {
    category: 'tvs',
    eyebrow: 'חוויה גדולה. עד הפרט הקטן.',
    title: 'לראות מעבר.',
    accent: 'להרגיש יותר.',
    description: 'הכניסו הביתה תמונה, צליל ועיצוב שמרגשים בכל פעם מחדש.',
    cta: 'לגלות את עולם הטלוויזיות',
    image: 'assets/products/tv-front.webp',
    alt: 'הדמיית טלוויזיה עם מסך בגווני גרפיט וזהב',
  },
  {
    category: 'offers',
    eyebrow: 'הבחירות של השבוע',
    title: 'הטכנולוגיה שתאהבו.',
    accent: 'במקום אחד.',
    description: 'מבחר מוצרי ההמחשה שלנו, מהסלון ועד המטבח. מחירים יעודכנו בקרוב.',
    cta: 'למבחר השבוע',
    image: 'assets/products/laptop.webp',
    alt: 'הדמיית מחשב נייד בגוון גרפיט',
  },
  {
    category: 'air-conditioners',
    eyebrow: 'הנוחות מתחילה כאן',
    title: 'האווירה הנכונה.',
    accent: 'בכל עונה.',
    description: 'גלו פתרונות מיזוג שמשתלבים בחיים ובחלל שלכם.',
    cta: 'למחלקת מיזוג אוויר',
    image: 'assets/products/ac.webp',
    alt: 'הדמיית מזגן עילי לבן',
  },
  {
    category: 'washing-machines',
    eyebrow: 'חושבים על השגרה שלכם',
    title: 'פחות מטלות.',
    accent: 'יותר רגעים.',
    description: 'גלו את מחלקת מכונות הכביסה והמייבשים.',
    cta: 'לעולם הכביסה',
    image: 'assets/products/washer.webp',
    alt: 'הדמיית מכונת כביסה פתח קדמי',
  },
  {
    category: 'refrigerators',
    eyebrow: 'עיצוב פוגש שימושיות',
    title: 'מקום לכל מה שטוב.',
    accent: 'בית לכל הטעמים.',
    description: 'מקררים ומקפיאים למטבח שאתם מדמיינים.',
    cta: 'למבחר המקררים',
    image: 'assets/products/fridge.webp',
    alt: 'הדמיית מקרר ארבע דלתות בגוון גרפיט',
  },
  {
    category: 'smartphones',
    eyebrow: 'מחוברים לדברים החשובים',
    title: 'העולם שלכם.',
    accent: 'בכף היד.',
    description: 'סמארטפונים, גיימינג וכל מה שמחבר ביניהם.',
    cta: 'לסלולר וגיימינג',
    image: 'assets/products/phone.webp',
    alt: 'הדמיית סמארטפון מלפנים ומאחור',
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
