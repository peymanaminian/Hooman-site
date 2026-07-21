"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/data";
import { formatToman } from "@/lib/data";
import { useCartStore } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [imageFailed, setImageFailed] = useState(false);
  const discountPercent = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        href={`/product?slug=${product.slug}`}
        className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 px-3 text-center text-xs font-semibold text-muted dark:from-neutral-800 dark:to-neutral-700"
      >
        {product.imageUrl && !imageFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.shortTitle}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          "تصویر محصول"
        )}
        {discountPercent > 0 && (
          <span className="absolute top-2 right-2 rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold text-white">
            {discountPercent.toLocaleString("fa-IR")}٪-
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5 pb-4">
        <Link href={`/product?slug=${product.slug}`} className="min-h-[38px] text-[13.5px]">
          {product.shortTitle}
        </Link>
        <div className="text-xs text-accent">
          {"★".repeat(Math.round(product.rating))}
          {"☆".repeat(5 - Math.round(product.rating))} ({product.reviewCount.toLocaleString("fa-IR")})
        </div>
        <div className="mt-auto flex items-baseline gap-2">
          {product.compareAtPrice && (
            <span className="text-xs text-muted line-through">
              {product.compareAtPrice.toLocaleString("fa-IR")}
            </span>
          )}
          <span className="text-[15px] font-extrabold">{formatToman(product.price)}</span>
        </div>
        <button
          onClick={() => addItem(product.slug, product.variants[0].id)}
          className="mt-2 w-full rounded-lg border border-primary py-1.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
        >
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  );
}
