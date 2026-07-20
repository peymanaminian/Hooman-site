import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categories, products } from "@/lib/data";

export type AdminProduct = {
  id: string;
  title: string;
  categorySlug: string;
  price: number;
  stock: number;
};

const seedProducts: AdminProduct[] = products.map((product) => ({
  id: product.slug,
  title: product.shortTitle,
  categorySlug: product.categorySlug,
  price: product.price,
  stock: product.stock,
}));

type AdminProductsState = {
  items: AdminProduct[];
  addProduct: (input: { title: string; categorySlug: string; price: number; stock: number }) => void;
  updateProduct: (id: string, patch: Partial<Omit<AdminProduct, "id">>) => void;
  deleteProduct: (id: string) => void;
};

export const useAdminProductsStore = create<AdminProductsState>()(
  persist(
    (set) => ({
      items: seedProducts,
      addProduct: (input) =>
        set((state) => ({
          items: [
            {
              id: `p-${Date.now()}`,
              title: input.title,
              categorySlug: input.categorySlug,
              price: input.price,
              stock: input.stock,
            },
            ...state.items,
          ],
        })),
      updateProduct: (id, patch) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
        })),
      deleteProduct: (id) =>
        set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    }),
    { name: "hooman-shop-admin-products" }
  )
);

export function categoryName(categorySlug: string): string {
  return categories.find((category) => category.slug === categorySlug)?.name ?? categorySlug;
}
