"use client";

import Link from "next/link";
import { useState } from "react";
import { computeDiscount, findCoupon, hasCompletedFirstPurchase, useAdminCouponsStore } from "@/store/adminCoupons";
import { useAdminOrdersStore } from "@/store/adminOrders";
import { cartSubtotal, useCartHydrated, useCartStore } from "@/store/cart";
import { useShopProductsStore } from "@/store/shopProducts";

const CUSTOMER_NAME = "پیمان امینیان";

const STEPS = ["سبد خرید", "آدرس و ارسال", "پرداخت", "ثبت سفارش"];

export default function CheckoutPage() {
  const lines = useCartStore((state) => state.lines);
  const couponCode = useCartStore((state) => state.couponCode);
  const clearCart = useCartStore((state) => state.clear);
  const products = useShopProductsStore((state) => state.items);
  const updateProduct = useShopProductsStore((state) => state.updateProduct);
  const coupons = useAdminCouponsStore((state) => state.items);
  const incrementCouponUsage = useAdminCouponsStore((state) => state.incrementUsage);
  const addOrder = useAdminOrdersStore((state) => state.addOrder);
  const orders = useAdminOrdersStore((state) => state.orders);
  const hydrated = useCartHydrated();

  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  const isFirstPurchase = !hasCompletedFirstPurchase(orders, CUSTOMER_NAME);
  const subtotal = hydrated ? cartSubtotal(lines, products) : 0;
  const appliedCoupon = couponCode ? findCoupon(coupons, couponCode) : undefined;
  const discount = computeDiscount(appliedCoupon, subtotal, isFirstPurchase);
  const total = subtotal - discount;
  const earnedPoints = Math.floor(total / 100000);

  function handlePlaceOrder() {
    if (lines.length === 0) return;
    const order = addOrder({ customer: CUSTOMER_NAME, amount: total });
    if (appliedCoupon) incrementCouponUsage(appliedCoupon.code);
    for (const line of lines) {
      const product = products.find((item) => item.slug === line.productSlug);
      if (product) updateProduct(product.slug, { stock: Math.max(0, product.stock - line.quantity) });
    }
    clearCart();
    setPlacedOrderId(order.id);
  }

  if (placedOrderId) {
    return (
      <div className="mx-auto max-w-md py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-3xl text-success">
          ✓
        </div>
        <h1 className="mb-2 text-xl font-bold">سفارش شما با موفقیت ثبت شد</h1>
        <p className="mb-1 text-sm text-muted">
          شماره سفارش: <strong className="text-foreground">{placedOrderId}</strong>
        </p>
        <p className="mb-6 text-sm text-muted">می‌توانید وضعیت سفارش را از صفحه پیگیری سفارش دنبال کنید.</p>
        <div className="flex justify-center gap-3">
          <Link href="/order-tracking" className="rounded-full border border-primary px-5 py-2.5 font-bold text-primary">
            پیگیری سفارش
          </Link>
          <Link href="/" className="rounded-full bg-primary px-5 py-2.5 font-bold text-white">
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    );
  }

  if (hydrated && lines.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-muted">سبد خرید شما خالی است.</p>
        <Link href="/" className="rounded-full bg-primary px-6 py-2.5 font-bold text-white">
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1000px]">
      <div className="my-6 flex justify-center gap-10">
        {STEPS.map((step, index) => (
          <div key={step} className="flex flex-col items-center gap-1.5 text-xs text-muted">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-white ${
                index === 1 ? "bg-primary" : index === 0 ? "bg-primary" : "bg-border"
              }`}
            >
              {index === 0 ? "✓" : (index + 1).toLocaleString("fa-IR")}
            </div>
            <span className={index === 1 ? "font-bold text-foreground" : ""}>{step}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_340px]">
        <div>
          <div className="mb-4 rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">انتخاب آدرس تحویل</h3>
            <label className="mb-2.5 flex gap-2.5 rounded-[10px] border border-primary bg-primary/5 p-3.5 text-sm">
              <input type="radio" name="addr" defaultChecked />
              <div>
                <div>
                  <strong>خانه</strong> — تهران، خیابان ولیعصر، کوچه بهار، پلاک ۱۲
                </div>
                <div className="mt-1 text-xs text-muted">گیرنده: {CUSTOMER_NAME} | ۰۹۱۲۱۲۳۴۵۶۷</div>
              </div>
            </label>
            <label className="mb-2.5 flex gap-2.5 rounded-[10px] border border-border p-3.5 text-sm">
              <input type="radio" name="addr" />
              <div>
                <strong>محل کار</strong> — تهران، سعادت‌آباد، خیابان ۲۳ متری، پلاک ۴
              </div>
            </label>
            <button className="rounded-full border border-border px-4 py-2 text-sm">+ افزودن آدرس جدید</button>
          </div>

          <div className="mb-4 rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">روش ارسال</h3>
            <label className="mb-2.5 flex gap-2.5 rounded-[10px] border border-primary bg-primary/5 p-3.5 text-sm">
              <input type="radio" name="ship" defaultChecked />
              پست پیشتاز — رایگان (تحویل ۲ تا ۳ روز کاری)
            </label>
            <label className="flex gap-2.5 rounded-[10px] border border-border p-3.5 text-sm">
              <input type="radio" name="ship" />
              ارسال اکسپرس درون‌شهری — ۴۵,۰۰۰ تومان (همان روز)
            </label>
          </div>

          <div className="mb-4 rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">روش پرداخت</h3>
            <label className="mb-2.5 flex gap-2.5 rounded-[10px] border border-primary bg-primary/5 p-3.5 text-sm">
              <input type="radio" name="pay" defaultChecked />
              پرداخت آنلاین از طریق درگاه زرین‌پال
            </label>
            <label className="mb-2.5 flex gap-2.5 rounded-[10px] border border-border p-3.5 text-sm">
              <input type="radio" name="pay" />
              کیف پول Hooman Shop (موجودی: ۳۰۰,۰۰۰ تومان)
            </label>
            <label className="flex gap-2.5 rounded-[10px] border border-border p-3.5 text-sm">
              <input type="radio" name="pay" />
              پرداخت در محل (COD)
            </label>
          </div>
        </div>

        <aside className="rounded-2xl bg-surface p-5 shadow-sm">
          <h3 className="mb-3 text-base font-bold">خلاصه سفارش</h3>
          <div className="mb-2.5 flex justify-between text-[13.5px] text-muted">
            <span>جمع کالاها</span>
            <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
          </div>
          {appliedCoupon && (
            <div className="mb-2.5 flex justify-between text-[13.5px] text-primary">
              <span>تخفیف ({appliedCoupon.code})</span>
              <span>−{discount.toLocaleString("fa-IR")} تومان</span>
            </div>
          )}
          <div className="mb-2.5 flex justify-between text-[13.5px] text-muted">
            <span>هزینه ارسال</span>
            <span>رایگان</span>
          </div>
          <div className="mb-2.5 flex justify-between text-[13.5px] text-muted">
            <span>امتیاز قابل کسب</span>
            <span>+{earnedPoints.toLocaleString("fa-IR")} امتیاز</span>
          </div>
          <div className="flex justify-between border-t border-border pt-3 text-base font-extrabold">
            <span>مبلغ نهایی</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            className="mt-3.5 w-full rounded-[10px] bg-primary py-3.5 font-bold text-white"
          >
            پرداخت و ثبت نهایی سفارش
          </button>
          <div className="mt-4 text-xs text-muted">اتصال امن SSL و رمزنگاری اطلاعات پرداخت</div>
        </aside>
      </div>
    </div>
  );
}
