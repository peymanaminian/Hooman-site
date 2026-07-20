export type OrderStatus = "processing" | "delivered" | "cancelled";

export type AdminOrder = {
  id: string;
  customer: string;
  amount: number;
  status: OrderStatus;
  date: string;
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  processing: "در حال پردازش",
  delivered: "تحویل شده",
  cancelled: "لغو شده",
};

export const orderStatusStyles: Record<OrderStatus, string> = {
  processing: "bg-amber-100 text-amber-800",
  delivered: "bg-green-100 text-success",
  cancelled: "bg-red-100 text-red-700",
};

export const initialOrders: AdminOrder[] = [
  { id: "#10231", customer: "پیمان امینیان", amount: 6270000, status: "processing", date: "۱۴۰۵/۰۴/۲۸" },
  { id: "#10230", customer: "نگار کریمی", amount: 1900000, status: "delivered", date: "۱۴۰۵/۰۴/۲۷" },
  { id: "#10229", customer: "حسین قاسمی", amount: 450000, status: "cancelled", date: "۱۴۰۵/۰۴/۲۶" },
];

export type AdminCoupon = {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number;
  minOrderTotal: number;
  usedCount: number;
};

export const initialCoupons: AdminCoupon[] = [
  { code: "SUMMER40", discountType: "percent", discountValue: 40, minOrderTotal: 500000, usedCount: 812 },
  { code: "WELCOME50K", discountType: "fixed", discountValue: 50000, minOrderTotal: 300000, usedCount: 214 },
];

export type Customer = {
  name: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  tier: "برنزی" | "نقره‌ای" | "طلایی";
};

export const customers: Customer[] = [
  { name: "پیمان امینیان", phone: "۰۹۱۲۱۲۳۴۵۶۷", ordersCount: 18, totalSpent: 42500000, tier: "طلایی" },
  { name: "نگار کریمی", phone: "۰۹۱۳۴۵۶۷۸۹۰", ordersCount: 6, totalSpent: 9800000, tier: "نقره‌ای" },
  { name: "حسین قاسمی", phone: "۰۹۳۵۱۱۲۲۳۳۴", ordersCount: 2, totalSpent: 1200000, tier: "برنزی" },
];

export type Payment = {
  orderId: string;
  gateway: string;
  amount: number;
  status: "success" | "pending" | "failed";
  date: string;
};

export const paymentStatusLabels: Record<Payment["status"], string> = {
  success: "موفق",
  pending: "در انتظار",
  failed: "ناموفق",
};

export const paymentStatusStyles: Record<Payment["status"], string> = {
  success: "bg-green-100 text-success",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-700",
};

export const payments: Payment[] = [
  { orderId: "#10231", gateway: "زرین‌پال", amount: 6270000, status: "success", date: "۱۴۰۵/۰۴/۲۸" },
  { orderId: "#10230", gateway: "کیف پول", amount: 1900000, status: "success", date: "۱۴۰۵/۰۴/۲۷" },
  { orderId: "#10229", gateway: "زرین‌پال", amount: 450000, status: "failed", date: "۱۴۰۵/۰۴/۲۶" },
];

export type StaffMember = {
  name: string;
  email: string;
  role: "مدیر کل" | "مدیر محصول" | "پشتیبانی" | "انباردار";
};

export const staff: StaffMember[] = [
  { name: "مریم صادقی", email: "maryam@hoomanshop.ir", role: "مدیر کل" },
  { name: "علی رستمی", email: "ali@hoomanshop.ir", role: "مدیر محصول" },
  { name: "زهرا نوری", email: "zahra@hoomanshop.ir", role: "پشتیبانی" },
];

export const loyaltyTiers = [
  { name: "برنزی", minPoints: 0, perk: "بدون تخفیف اضافه" },
  { name: "نقره‌ای", minPoints: 1000, perk: "۵٪ تخفیف دائم روی خرید بعدی" },
  { name: "طلایی", minPoints: 3000, perk: "۱۰٪ تخفیف دائم + ارسال رایگان" },
  { name: "الماسی", minPoints: 3000 + 520, perk: "۱۵٪ تخفیف دائم + پشتیبانی اختصاصی" },
] as const;
