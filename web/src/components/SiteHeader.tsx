"use client";

import Link from "next/link";
import { cartLineCount, useCartHydrated, useCartStore } from "@/store/cart";
import { sortedCategories, useShopCategoriesStore } from "@/store/shopCategories";
import { useSiteContentStore } from "@/store/siteContent";

export function SiteHeader() {
  const lines = useCartStore((state) => state.lines);
  const hydrated = useCartHydrated();
  const categories = useShopCategoriesStore((state) => state.items);
  const storeName = useSiteContentStore((state) => state.storeName);

  const itemCount = hydrated ? cartLineCount(lines) : 0;
  const orderedCategories = sortedCategories(categories);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface">
      <div className="bg-primary-dark text-xs text-white">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-between px-5">
          <span>ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان</span>
          <div className="flex gap-3">
            <span>اینستاگرام</span>
            <a href="https://t.me/Hooman120_bot" target="_blank" rel="noopener noreferrer" className="hover:underline">
              تلگرام
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-5 px-5 py-3">
        <Link href="/" className="shrink-0 text-xl font-extrabold text-primary">
          {storeName}
        </Link>
        <div className="flex flex-1 overflow-hidden rounded-full border border-border bg-background">
          <input
            type="text"
            placeholder="جستجوی محصول، برند یا دسته‌بندی..."
            className="flex-1 bg-transparent px-4 py-2 outline-none"
          />
          <button className="bg-primary px-5 font-bold text-white">جستجو</button>
        </div>
        <div className="flex shrink-0 items-center gap-4 whitespace-nowrap text-xs text-muted">
          <Link href="/account" className="flex flex-col items-center gap-1">
            <span>حساب من</span>
          </Link>
          <Link href="/account" className="flex flex-col items-center gap-1">
            <span>باشگاه مشتریان</span>
          </Link>
          <Link href="/cart" className="relative flex flex-col items-center gap-1">
            <span>سبد خرید</span>
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -left-2.5 rounded-full bg-primary px-1.5 text-[10px] text-white">
                {itemCount.toLocaleString("fa-IR")}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="border-t border-border">
        <ul className="mx-auto flex h-11 max-w-6xl items-center gap-6 overflow-x-auto px-5 text-sm whitespace-nowrap">
          <li>
            <Link href="/" className="hover:text-primary">
              همه دسته‌ها
            </Link>
          </li>
          {orderedCategories.map((category) => (
            <li key={category.slug}>
              <Link href={`/category?slug=${category.slug}`} className="hover:text-primary">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
