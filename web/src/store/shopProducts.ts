import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as seedProducts, type Product } from "@/lib/data";

export type ShopProduct = Product & { sortOrder: number };

const seed: ShopProduct[] = seedProducts.map((product, index) => ({ ...product, sortOrder: index }));

function slugify(title: string): string {
  const base = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .replace(/\s+/g, "-");
  return `${base || "product"}-${Date.now().toString(36)}`;
}

type NewProductInput = {
  title: string;
  categorySlug: string;
  price: number;
  stock: number;
};

type ShopProductsState = {
  items: ShopProduct[];
  addProduct: (input: NewProductInput) => void;
  updateProduct: (slug: string, patch: Partial<Omit<ShopProduct, "slug">>) => void;
  deleteProduct: (slug: string) => void;
  reorder: (orderedSlugs: string[]) => void;
};

export const useShopProductsStore = create<ShopProductsState>()(
  persist(
    (set) => ({
      items: seed,
      addProduct: (input) =>
        set((state) => {
          const minOrder = state.items.length ? Math.min(...state.items.map((item) => item.sortOrder)) : 0;
          return {
            items: [
              {
                slug: slugify(input.title),
                title: input.title,
                shortTitle: input.title,
                brand: "-",
                categorySlug: input.categorySlug,
                price: input.price,
                rating: 0,
                reviewCount: 0,
                stock: input.stock,
                description: "توضیحاتی برای این محصول ثبت نشده است.",
                variants: [{ id: "default", color: "استاندارد", warranty: "-" }],
                sortOrder: minOrder - 1,
              },
              ...state.items,
            ],
          };
        }),
      updateProduct: (slug, patch) =>
        set((state) => ({
          items: state.items.map((item) => (item.slug === slug ? { ...item, ...patch } : item)),
        })),
      deleteProduct: (slug) =>
        set((state) => ({ items: state.items.filter((item) => item.slug !== slug) })),
      reorder: (orderedSlugs) =>
        set((state) => {
          const order = new Map(orderedSlugs.map((slug, index) => [slug, index]));
          return {
            items: state.items.map((item) =>
              order.has(item.slug) ? { ...item, sortOrder: order.get(item.slug)! } : item
            ),
          };
        }),
    }),
    { name: "hooman-shop-products" }
  )
);

export function sortedProducts(items: ShopProduct[]): ShopProduct[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}
