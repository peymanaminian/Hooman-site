"use client";

import { useState } from "react";
import type { Product } from "@/lib/data";
import { formatToman } from "@/lib/data";
import { useCartStore } from "@/store/cart";

export function BuyBox({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const discountPercent = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <aside className="sticky top-[92px] h-fit rounded-2xl bg-surface p-5 shadow-sm">
      {product.compareAtPrice && (
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-muted line-through">
            {product.compareAtPrice.toLocaleString("fa-IR")}
          </span>
          <span className="rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-white">
            {discountPercent.toLocaleString("fa-IR")}٪-
          </span>
        </div>
      )}
      <div className="text-[22px] font-extrabold">{formatToman(product.price)}</div>
      <div className="mt-1.5 text-xs text-muted">موجودی: {product.stock.toLocaleString("fa-IR")} عدد</div>

      <div className="my-3.5 flex w-fit items-center rounded-lg border border-border">
        <button
          onClick={() => setQuantity((qty) => Math.max(1, qty - 1))}
          className="h-9 w-9 text-base"
          aria-label="کاهش تعداد"
        >
          −
        </button>
        <span className="w-9 text-center">{quantity.toLocaleString("fa-IR")}</span>
        <button
          onClick={() => setQuantity((qty) => Math.min(product.stock, qty + 1))}
          className="h-9 w-9 text-base"
          aria-label="افزایش تعداد"
        >
          +
        </button>
      </div>

      <button
        onClick={() => addItem(product.slug, variantId, quantity)}
        className="w-full rounded-[10px] bg-primary py-3 text-[15px] font-bold text-white"
      >
        افزودن به سبد خرید
      </button>

      <div className="mt-2.5 flex flex-wrap gap-1.5">
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => setVariantId(variant.id)}
            className={`rounded-full border px-3.5 py-1.5 text-xs ${
              variantId === variant.id ? "border-primary font-bold text-primary" : "border-border"
            }`}
          >
            {variant.color}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-1.5 text-xs text-muted [&>div]:before:ml-1.5 [&>div]:before:text-border [&>div]:before:content-['—']">
        <div>ضمانت اصالت کالا</div>
        <div>امکان بازگشت تا ۷ روز</div>
        <div>پرداخت امن با درگاه زرین‌پال</div>
        <div>ارسال از انبار مرکزی</div>
      </div>
    </aside>
  );
}
