import type { Product } from '../types/catalog';
import { categories } from './categories';

// All specifications below are SYNTHETIC demo data, never specifications of an actual branded model.
// Brand is an illustrative catalog association only, clearly labelled throughout the UI.
const brandsByCategory: Record<string, string[]> = {
  tvs: ['Samsung', 'LG', 'Sony', 'TCL', 'Hisense', 'Philips'],
  smartphones: ['Samsung', 'Xiaomi', 'Sony', 'Samsung'],
  'air-conditioners': ['Electra', 'LG', 'Samsung', 'Electra'],
  'washing-machines': ['Bosch', 'LG', 'Siemens', 'Samsung'],
  refrigerators: ['Samsung', 'LG', 'Bosch', 'Hisense'],
  kitchen: ['Bosch', 'Siemens', 'Electra', 'Samsung'],
  'small-appliances': ['Philips', 'Bosch', 'Siemens', 'Philips'],
  'vacuum-cleaners': ['Xiaomi', 'Philips', 'Bosch', 'Samsung'],
  computers: ['Samsung', 'LG', 'Xiaomi', 'Samsung'],
  'smart-home': ['Xiaomi', 'Philips', 'Electra', 'Xiaomi'],
  heating: ['Electra', 'Philips', 'Xiaomi', 'Electra'],
};
const names: Record<string, string[]> = {
  tvs: [
    'מסך חכם לחוויית קולנוע',
    'טלוויזיה בעיצוב דק',
    'מסך חכם לסלון',
    'מסך לתמונה עשירה',
    'טלוויזיה לחדר השינה',
    'מסך חכם רחב',
  ],
  smartphones: [
    'סמארטפון בעיצוב מתקדם',
    'סמארטפון למסך מלא',
    'טלפון חכם ליום־יום',
    'סמארטפון בגימור גרפיט',
  ],
  'air-conditioners': [
    'מזגן עילי לחלל הבית',
    'מזגן אינוורטר שקט',
    'מזגן עילי קומפקטי',
    'מזגן לחלל מרכזי',
  ],
  'washing-machines': [
    'מכונת כביסה פתח קדמי',
    'מכונת כביסה לבית',
    'מכונת כביסה בעיצוב נקי',
    'מכונת כביסה קיבולת גדולה',
  ],
  refrigerators: [
    'מקרר בעיצוב מודרני',
    'מקרר למטבח המשפחתי',
    'מקרר עם חלוקה חכמה',
    'מקרר בגימור נירוסטה',
  ],
  kitchen: ['תנור בנוי למטבח', 'תנור אפייה רב־תכליתי', 'תנור בעיצוב נקי', 'תנור בגימור גרפיט'],
  'small-appliances': [
    'מכונת קפה לבית',
    'מכונת אספרסו קומפקטית',
    'מכונת קפה בעיצוב מודרני',
    'מכונת קפה לבריסטה הביתי',
  ],
  'vacuum-cleaners': [
    'שואב אבק לבית',
    'שואב אבק קומפקטי',
    'שואב אבק לניקוי יומיומי',
    'שואב אבק רב־תכליתי',
  ],
  computers: [
    'מחשב נייד לעבודה וליצירה',
    'מחשב נייד דק',
    'מחשב נייד ללימודים',
    'מחשב נייד בגימור כסוף',
  ],
  'smart-home': ['מצלמה לבית חכם', 'מצלמת פנים חכמה', 'מצלמה עם שליטה מרחוק', 'מצלמת אבטחה לבית'],
  heating: ['רדיאטור לחימום הבית', 'רדיאטור קומפקטי', 'רדיאטור לחדר העבודה', 'רדיאטור לחלל המרכזי'],
};
const specsFor = (category: string, i: number): Record<string, string> => {
  switch (category) {
    case 'tvs':
      return {
        size: ['55″', '65″', '75″', '50″', '43″', '85″'][i],
        technology: ['OLED', 'QLED', 'Mini LED', 'LED', 'QLED', 'OLED'][i],
        resolution: '4K UHD',
        refresh: i % 2 ? '60Hz' : '120Hz',
        smart: i % 2 ? 'Wi-Fi' : 'Wi-Fi + Bluetooth',
        os: 'מערכת הדגמה',
        connectivity: 'Wi-Fi / Bluetooth',
        ports: '4 × HDMI · 2 × USB',
        dimensions: 'מידות יעודכנו לאחר אימות',
        weight: 'משקל יעודכן לאחר אימות',
        energy: 'טרם אומת',
      };
    case 'washing-machines':
      return {
        capacity: ['8 ק״ג', '9 ק״ג', '10 ק״ג', '12 ק״ג'][i],
        loading: 'פתח קדמי',
        spin: i % 2 ? '1,400 סל״ד' : '1,200 סל״ד',
        energy: i % 2 ? 'A (המחשה)' : 'B (המחשה)',
      };
    case 'air-conditioners':
      return {
        capacity: ['9,000 BTU', '12,000 BTU', '18,000 BTU', '24,000 BTU'][i],
        inverter: i % 2 ? 'כן' : 'לא',
        room: i % 2 ? '20–30 מ״ר' : '10–20 מ״ר',
        energy: i % 2 ? 'A (המחשה)' : 'B (המחשה)',
      };
    case 'refrigerators':
      return {
        capacity: ['400 ליטר', '500 ליטר', '600 ליטר', '650 ליטר'][i],
        doors: i % 2 ? '4' : '2',
        type: i % 2 ? 'מקפיא תחתון' : 'מקפיא עליון',
        dimensions: i % 2 ? '180 × 90 × 70 ס״מ' : '175 × 70 × 65 ס״מ',
        energy: i % 2 ? 'A (המחשה)' : 'B (המחשה)',
      };
    case 'smartphones':
      return {
        storage: i % 2 ? '256GB' : '128GB',
        ram: i % 2 ? '8GB' : '6GB',
        size: i % 2 ? '6.7″' : '6.1″',
        os: 'Android (המחשה)',
      };
    case 'computers':
      return {
        storage: i % 2 ? '512GB' : '256GB',
        ram: i % 2 ? '16GB' : '8GB',
        size: i % 2 ? '15.6″' : '14″',
      };
    case 'smart-home':
      return {
        features: i % 2 ? 'שליטה מרחוק' : 'תזמון',
        connectivity: i % 2 ? 'Wi-Fi' : 'Bluetooth',
      };
    case 'heating':
      return { power: i % 2 ? '2,000W' : '1,500W', room: i % 2 ? '20–30 מ״ר' : '10–20 מ״ר' };
    default:
      return {
        capacity: i % 2 ? 'קיבולת גדולה' : 'קיבולת רגילה',
        power: i % 2 ? '1,200W' : '900W',
        features: i % 2 ? 'בקרה דיגיטלית' : 'בקרה ידנית',
        energy: 'טרם אומת',
      };
  }
};
export const products: Product[] = categories
  .filter((c) => c.slug !== 'offers')
  .flatMap((category, ci) =>
    names[category.slug].map((name, i) => {
      const id = `${category.slug}-${i + 1}`;
      const specs = specsFor(category.slug, i);
      const image = {
        src: `assets/products/${category.image}.webp`,
        alt: `${name} — תמונת המחשה כללית, אינה מציגה דגם מסחרי מאומת`,
        demo: true,
      };
      const sizes = category.slug === 'tvs' ? [...new Set([specs.size, '55″', '65″', '75″'])] : [];
      return {
        id,
        slug: `demo-${id}`,
        name,
        brand: brandsByCategory[category.slug][i],
        model: `DEMO-${String(ci + 1).padStart(2, '0')}${String(i + 1).padStart(2, '0')}`,
        category: category.slug,
        subcategory:
          category.subcategories[
            category.slug === 'smart-home'
              ? 2
              : category.slug === 'vacuum-cleaners'
                ? 1
                : category.slug === 'tvs' && i % 2 === 1
                  ? 1
                  : 0
          ],
        description: `${name} מתוך קטלוג ההמחשה. עמוד זה מדגים בחירת אפשרויות, מפרט ומידע לפני רכישה. התמונה כללית, שיוך המותג להמחשה בלבד, וכל הנתונים דורשים אימות מול המוצר האמיתי לפני פרסום מסחרי.`,
        specs,
        images: [
          image,
          ...(category.slug === 'tvs'
            ? [
                {
                  src: 'assets/products/tv-front.webp',
                  alt: 'מבט קדמי של מסך הדגמה, תמונת AI כללית',
                  demo: true,
                },
                {
                  src: 'assets/hero-living.webp',
                  alt: 'הדמיית מסך בסלון — תמונת אווירה שנוצרה ב-AI',
                  demo: true,
                },
              ]
            : [
                {
                  src: `assets/products/${category.image}-detail.webp`,
                  alt: `${name} — מבט נוסף של הדמיית המוצר`,
                  demo: true,
                },
              ]),
        ],
        variants: sizes.length
          ? sizes.map((size, vi) => ({ id: `${id}-${vi}`, label: size, specs: { size }, image }))
          : [{ id: `${id}-default`, label: 'דגם המחשה', specs: {} }],
        availability: 'unknown' as const,
        isNew: i < 2,
        featured: i === 0,
        sale: i === 0 || i === 2,
        demoBestSeller: i === 1,
        demo: true,
        verified: false,
        addedAt: `2026-10-${String(28 - i * 3 - ci).padStart(2, '0')}`,
      };
    }),
  );
export const findProduct = (id: string) => products.find((p) => p.id === id);
export const specLabels: Record<string, string> = {
  size: 'גודל מסך',
  technology: 'טכנולוגיית תצוגה',
  resolution: 'רזולוציה',
  refresh: 'קצב רענון',
  smart: 'תכונות חכמות',
  os: 'מערכת הפעלה',
  connectivity: 'קישוריות',
  ports: 'חיבורים',
  dimensions: 'מידות',
  weight: 'משקל',
  energy: 'דירוג אנרגטי',
  capacity: 'קיבולת / נפח',
  loading: 'סוג פתח',
  spin: 'מהירות סחיטה',
  inverter: 'אינוורטר',
  room: 'גודל חדר',
  doors: 'מספר דלתות',
  type: 'סוג',
  storage: 'אחסון',
  ram: 'זיכרון RAM',
  power: 'הספק',
  features: 'תכונות',
};
export const brands = [
  'Samsung',
  'LG',
  'Bosch',
  'Sony',
  'Hisense',
  'Electra',
  'Philips',
  'TCL',
  'Xiaomi',
  'Siemens',
];
