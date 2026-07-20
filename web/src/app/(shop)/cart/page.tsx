"use client";

import Link from "next/link";
import { useState } from "react";
import { cartSubtotal, useCartHydrated, useCartStore } from "@/store/cart";
import { useShopProductsStore } from "@/store/shopProducts";

export default function CartPage() {
  const lines = useCartStore((state) => state.lines);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const products = useShopProductsStore((state) => state.items);
  const [couponCode, setCouponCode] = useState("");
  const hydrated = useCartHydrated();

  if (!hydrated) return null;

  const subtotal = cartSubtotal(lines, products);
  const total = subtotal;

  if (lines.length === 0) {
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
    <>
      <div className="my-4 flex gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-primary">
          خانه
        </Link>
        / سبد خرید
      </div>
      <h1 className="mb-5 text-xl font-bold">
        سبد خرید شما ({lines.length.toLocaleString("fa-IR")} کالا)
      </h1>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_340px]">
        <div>
          {lines.map((line) => {
            const product = products.find((item) => item.slug === line.productSlug);
            if (!product) return null;
            const variant = product.variants.find((v) => v.id === line.variantId);
            return (
              <div
                key={`${line.productSlug}-${line.variantId}`}
                className="mb-3 grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 rounded-2xl bg-surface p-3.5 shadow-sm"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-[10px] bg-background p-1 text-center text-[11px] text-muted">
                  تصویر محصول
                </div>
                <div>
                  <div>{product.shortTitle}</div>
                  <div className="text-xs text-muted">
                    رنگ: {variant?.color} | گارانتی: {variant?.warranty}
                  </div>
                  <button
                    onClick={() => removeItem(line.productSlug, line.variantId)}
                    className="mt-1.5 text-xs text-primary"
                  >
                    حذف از سبد
                  </button>
                </div>
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQuantity(line.productSlug, line.variantId, line.quantity - 1)}
                    className="h-9 w-9"
                  >
                    −
                  </button>
                  <span className="w-9 text-center">{line.quantity.toLocaleString("fa-IR")}</span>
                  <button
                    onClick={() => setQuantity(line.productSlug, line.variantId, line.quantity + 1)}
                    className="h-9 w-9"
                  >
                    +
                  </button>
                </div>
                <div className="font-extrabold">{(product.price * line.quantity).toLocaleString("fa-IR")} تومان</div>
              </div>
            );
          })}
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

          <div className="my-3.5 flex gap-2">
            <input
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              type="text"
              placeholder="کد تخفیف را وارد کنید"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2"
            />
            <button className="rounded-lg border border-primary px-4 text-primary">اعمال</button>
          </div>

          <div className="flex justify-between border-t border-border pt-3 text-base font-extrabold">
            <span>مبلغ قابل پرداخت</span>
            <span>{total.toLocaleString("fa-IR")} تومان</span>
          </div>
          <Link
            href="/checkout"
            className="mt-3.5 block rounded-[10px] bg-primary py-3.5 text-center font-bold text-white"
          >
            ادامه فرآیند خرید
          </Link>
        </aside>
      </div>
    </>
  );
}
