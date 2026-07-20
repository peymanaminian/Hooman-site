import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();

  const categoryProducts = products.filter((product) => product.categorySlug === slug);

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
