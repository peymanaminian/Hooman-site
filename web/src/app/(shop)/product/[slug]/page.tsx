import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getProductBySlug, getRelatedProducts, products, reviews } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { BuyBox } from "@/components/BuyBox";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categories.find((item) => item.slug === product.categorySlug);
  const relatedProducts = getRelatedProducts(slug);

  return (
    <>
      <div className="my-4 flex gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-primary">
          خانه
        </Link>
        /{" "}
        {category && (
          <Link href={`/category/${category.slug}`} className="hover:text-primary">
            {category.name}
          </Link>
        )}{" "}
        / {product.shortTitle}
      </div>

      <div className="grid grid-cols-1 gap-7 items-start lg:grid-cols-[460px_1fr_300px]">
        <div>
          <div className="flex aspect-square items-center justify-center rounded-2xl bg-surface text-sm font-semibold text-muted shadow-sm">
            تصویر اصلی محصول
          </div>
          <div className="mt-3 flex gap-2.5">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex h-16 w-16 items-center justify-center rounded-[10px] border border-border bg-surface text-[11px] text-muted"
              >
                تصویر {n.toLocaleString("fa-IR")}
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
