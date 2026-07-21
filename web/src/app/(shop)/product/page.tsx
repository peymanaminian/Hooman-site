"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { reviews } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { BuyBox } from "@/components/BuyBox";
import { useShopCategoriesStore } from "@/store/shopCategories";
import { useShopProductsStore, sortedProducts } from "@/store/shopProducts";

function ProductImage({
  src,
  alt,
  className,
  fallback,
}: {
  src: string | undefined;
  alt: string;
  className: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <>{fallback}</>;

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={className} />;
}

function ProductPageContent() {
  const slug = useSearchParams().get("slug") ?? "";
  const items = useShopProductsStore((state) => state.items);
  const categories = useShopCategoriesStore((state) => state.items);

  const product = items.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-muted">این محصول یافت نشد یا حذف شده است.</p>
        <Link href="/" className="rounded-full bg-primary px-6 py-2.5 font-bold text-white">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const category = categories.find((item) => item.slug === product.categorySlug);
  const sameCategory = sortedProducts(items).filter(
    (item) => item.slug !== slug && item.categorySlug === product.categorySlug
  );
  const relatedProducts = (sameCategory.length > 0 ? sameCategory : items.filter((item) => item.slug !== slug)).slice(
    0,
    4
  );

  return (
    <>
      <div className="my-4 flex gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-primary">
          خانه
        </Link>
        /{" "}
        {category && (
          <Link href={`/category?slug=${category.slug}`} className="hover:text-primary">
            {category.name}
          </Link>
        )}{" "}
        / {product.shortTitle}
      </div>

      <div className="grid grid-cols-1 gap-7 items-start lg:grid-cols-[460px_1fr_300px]">
        <div>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-surface text-sm font-semibold text-muted shadow-sm">
            <ProductImage
              key={`${product.slug}-main`}
              src={product.imageUrl}
              alt={product.title}
              className="h-full w-full object-cover"
              fallback="تصویر اصلی محصول"
            />
          </div>
          <div className="mt-3 flex gap-2.5">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[10px] border border-border bg-surface text-[11px] text-muted"
              >
                <ProductImage
                  key={`${product.slug}-thumb-${n}`}
                  src={product.imageUrl}
                  alt={product.title}
                  className="h-full w-full object-cover"
                  fallback={`تصویر ${n.toLocaleString("fa-IR")}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="mb-1.5 text-[22px] font-bold">{product.title}</h1>
          <div className="mb-3.5 text-sm text-muted">
            برند: {product.brand} &nbsp;|&nbsp; {"★".repeat(Math.round(product.rating))}
            {"☆".repeat(5 - Math.round(product.rating))} {product.rating.toLocaleString("fa-IR")} از ۵ (
            {product.reviewCount.toLocaleString("fa-IR")} نظر)
          </div>

          <div className="mb-4">
            <div className="mb-2 text-sm text-muted">رنگ و گارانتی</div>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <span key={variant.id} className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm">
                  {variant.color} — {variant.warranty}
                </span>
              ))}
            </div>
          </div>

          <ProductTabs product={product} reviews={reviews} />
        </div>

        <BuyBox product={product} />
      </div>

      {relatedProducts.length > 0 && (
        <>
          <div className="mt-10 mb-3.5">
            <h2 className="text-base font-bold">کالاهای مشابه</h2>
          </div>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.slug} product={related} />
            ))}
          </div>

          <div className="mt-10 mb-3.5">
            <h2 className="text-base font-bold">کاربران این را هم خریده‌اند</h2>
          </div>
          <div className="mb-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[...relatedProducts].reverse().map((related) => (
              <ProductCard key={`${related.slug}-also`} product={related} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={null}>
      <ProductPageContent />
    </Suspense>
  );
}
