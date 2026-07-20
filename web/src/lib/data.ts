export type Category = {
  slug: string;
  name: string;
  initial: string;
};

export type ProductVariant = {
  id: string;
  color: string;
  warranty: string;
};

export type Product = {
  slug: string;
  title: string;
  shortTitle: string;
  brand: string;
  categorySlug: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  variants: ProductVariant[];
};

export type Review = {
  author: string;
  rating: number;
  comment: string;
};

export const categories: Category[] = [
  { slug: "mobile", name: "موبایل و تبلت", initial: "مو" },
  { slug: "digital", name: "دیجیتال", initial: "دی" },
  { slug: "fashion", name: "پوشاک", initial: "پو" },
  { slug: "home", name: "لوازم خانه", initial: "خا" },
  { slug: "beauty", name: "زیبایی و سلامت", initial: "زی" },
  { slug: "kids", name: "کودک و اسباب‌بازی", initial: "کو" },
  { slug: "sport", name: "ورزش و سفر", initial: "ور" },
  { slug: "books", name: "کتاب", initial: "کت" },
];

export const products: Product[] = [
  {
    slug: "wireless-headphone-x100",
    title: "هدفون بی‌سیم روی‌گوشی مدل X100 با نویزکنسلینگ فعال",
    shortTitle: "هدفون بی‌سیم X100",
    brand: "SoundPro",
    categorySlug: "digital",
    price: 2540000,
    compareAtPrice: 2990000,
    rating: 4.5,
    reviewCount: 328,
    stock: 12,
    description:
      "هدفون بی‌سیم X100 با فناوری حذف نویز فعال، ۳۰ ساعت پخش موسیقی روی یک بار شارژ و اتصال بلوتوث ۵.۳، تجربه‌ای بی‌نقص از شنیدن موسیقی و تماس را برای شما فراهم می‌کند.",
    variants: [
      { id: "black-18m", color: "مشکی", warranty: "۱۸ ماهه شرکتی" },
      { id: "white-18m", color: "سفید", warranty: "۱۸ ماهه شرکتی" },
      { id: "navy-none", color: "آبی نفتی", warranty: "بدون گارانتی" },
    ],
  },
  {
    slug: "running-shoes-airflow",
    title: "کفش ورزشی رانینگ مدل ایرفلو",
    shortTitle: "کفش ورزشی ایرفلو",
    brand: "RunFit",
    categorySlug: "sport",
    price: 1890000,
    rating: 4.2,
    reviewCount: 156,
    stock: 5,
    description: "کفش رانینگ سبک با کفی طبی و تهویه هوا، مناسب دویدن روزانه.",
    variants: [{ id: "gray-42", color: "طوسی", warranty: "۶ ماهه" }],
  },
  {
    slug: "ceramic-mug-set",
    title: "ماگ سرامیکی طرح‌دار (بسته ۲ عددی)",
    shortTitle: "ماگ سرامیکی طرح‌دار",
    brand: "HomeCraft",
    categorySlug: "home",
    price: 350000,
    rating: 4.7,
    reviewCount: 42,
    stock: 40,
    description: "ست ماگ سرامیکی دست‌ساز، مناسب هدیه و استفاده روزمره.",
    variants: [{ id: "white", color: "سفید", warranty: "-" }],
  },
];

export const reviews: Review[] = [
  {
    author: "علی رضایی",
    rating: 5,
    comment: "کیفیت صدا فوق‌العاده‌ست و حذف نویز واقعاً کار می‌کنه. راضی‌ام.",
  },
  {
    author: "سارا محمدی",
    rating: 4,
    comment: "باتری خوبه ولی جعبه کمی آسیب دیده بود موقع تحویل.",
  },
];

export function formatToman(amount: number): string {
  return `${amount.toLocaleString("fa-IR")} تومان`;
}
