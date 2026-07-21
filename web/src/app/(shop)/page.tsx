"use client";

import Link from "next/link";
import { DiamondIcon } from "@/components/DiamondIcon";
import { ProductCard } from "@/components/ProductCard";
import { sortedCategories, useShopCategoriesStore } from "@/store/shopCategories";
import { sortedProducts, useShopProductsStore } from "@/store/shopProducts";
import { useSiteContentStore } from "@/store/siteContent";

export default function HomePage() {
  const categories = sortedCategories(useShopCategoriesStore((state) => state.items));
  const products = sortedProducts(useShopProductsStore((state) => state.items));
  const { heroTitle, heroSubtitle, heroCtaLabel } = useSiteContentStore();

  const bestsellers = [...products].reverse();

  return (
    <>
      <section className="my-6 flex items-center justify-between gap-5 rounded-2xl bg-gradient-to-l from-primary to-primary-dark p-10 text-white">
        <div>
          <h1 className="mb-2.5 flex items-center gap-2.5 text-2xl font-bold sm:text-3xl">
            <DiamondIcon className="text-accent" />
            {heroTitle}
          </h1>
          <p className="mb-4 opacity-95">{heroSubtitle}</p>
          <Link href="/coupons" className="rounded-full bg-white px-5 py-2.5 font-bold text-primary-dark">
            {heroCtaLabel}
          </Link>
        </div>
      </section>

      <div className="flex gap-4 overflow-x-auto pt-1.5 pb-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category?slug=${category.slug}`}
            className="min-w-[92px] shrink-0 rounded-2xl bg-surface p-3.5 text-center text-[13px] shadow-sm"
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div id="deals" className="mt-7 mb-3.5 flex items-baseline justify-between scroll-mt-24">
        <h2 className="text-lg font-bold">پیشنهاد ویژه برای شما</h2>
        <Link href="#" className="text-xs text-primary">
          مشاهده همه
        </Link>
      </div>
      <p className="-mt-2 mb-3 text-xs text-muted">بر اساس تاریخچه بازدید و خرید شما انتخاب شده است</p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-7 mb-3.5 flex items-baseline justify-between">
        <h2 className="text-lg font-bold">پرفروش‌ترین‌ها</h2>
        <Link href="#" className="text-xs text-primary">
          مشاهده همه
        </Link>
      </div>
      <div className="mb-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
        {bestsellers.slice(0, 8).map((product) => (
          <ProductCard key={`${product.slug}-b`} product={product} />
        ))}
      </div>
    </>
  );
}
