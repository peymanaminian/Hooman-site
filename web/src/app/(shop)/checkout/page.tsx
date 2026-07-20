"use client";

import { cartSubtotal, useCartHydrated, useCartStore } from "@/store/cart";
import { useShopProductsStore } from "@/store/shopProducts";

const STEPS = ["سبد خرید", "آدرس و ارسال", "پرداخت", "ثبت سفارش"];

export default function CheckoutPage() {
  const lines = useCartStore((state) => state.lines);
  const products = useShopProductsStore((state) => state.items);
  const hydrated = useCartHydrated();

  const subtotal = hydrated ? cartSubtotal(lines, products) : 0;
  const earnedPoints = Math.round(subtotal / 100000);

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
                <div className="mt-1 text-xs text-muted">گیرنده: پیمان امینیان | ۰۹۱۲۱۲۳۴۵۶۷</div>
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
            <span>{subtotal.toLocaleString("fa-IR")} تومان</span>
          </div>
          <button className="mt-3.5 w-full rounded-[10px] bg-primary py-3.5 font-bold text-white">
            پرداخت و ثبت نهایی سفارش
          </button>
          <div className="mt-4 text-xs text-muted">اتصال امن SSL و رمزنگاری اطلاعات پرداخت</div>
        </aside>
      </div>
    </div>
  );
}
