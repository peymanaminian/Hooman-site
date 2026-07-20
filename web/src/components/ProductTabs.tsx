"use client";

import { useState } from "react";
import type { Product, Review } from "@/lib/data";

const TABS = ["توضیحات محصول", "مشخصات فنی", "نظرات کاربران"] as const;

export function ProductTabs({ product, reviews }: { product: Product; reviews: Review[] }) {
  const [active, setActive] = useState<(typeof TABS)[number]>(TABS[0]);

  return (
    <div className="mt-10">
      <div className="flex gap-6 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`border-b-2 px-1 py-3 text-sm ${
              active === tab
                ? "border-primary font-bold text-primary"
                : "border-transparent text-muted"
            }`}
          >
            {tab === "نظرات کاربران" ? `${tab} (${reviews.length.toLocaleString("fa-IR")})` : tab}
          </button>
        ))}
      </div>

      <div className="py-5">
        {active === "توضیحات محصول" && <p className="text-muted">{product.description}</p>}
        {active === "مشخصات فنی" && (
          <ul className="space-y-2 text-sm text-muted">
            <li>برند: {product.brand}</li>
            <li>موجودی: {product.stock.toLocaleString("fa-IR")} عدد</li>
            <li>
              تنوع‌های موجود: {product.variants.map((variant) => variant.color).join("، ")}
            </li>
          </ul>
        )}
        {active === "نظرات کاربران" && (
          <div>
            {reviews.map((review) => (
              <div key={review.author} className="border-b border-border py-4">
                <div className="text-sm font-bold">
                  {review.author} — {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>
                <p className="mt-1 text-muted">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
