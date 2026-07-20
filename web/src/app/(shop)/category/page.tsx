"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { useShopCategoriesStore } from "@/store/shopCategories";
import { useShopProductsStore, sortedProducts } from "@/store/shopProducts";

function CategoryPageContent() {
  const slug = useSearchParams().get("slug") ?? "";
  const categories = useShopCategoriesStore((state) => state.items);
  const products = useShopProductsStore((state) => state.items);

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-muted">این دسته‌بندی یافت نشد.</p>
        <Link href="/" className="rounded-full bg-primary px-6 py-2.5 font-bold text-white">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const categoryProducts = sortedProducts(products).filter((product) => product.categorySlug === slug);

  return (
    <>
      <div className="my-4 flex gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-primary">
          خانه
        </Link>
        / {category.name}
      </div>
      <h1 className="mb-5 text-xl font-bold">{category.name}</h1>
      {categoryProducts.length > 0 ? (
        <div className="mb-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mb-10 text-sm text-muted">فعلاً محصولی در این دسته ثبت نشده است.</p>
      )}
    </>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={null}>
      <CategoryPageContent />
    </Suspense>
  );
}
