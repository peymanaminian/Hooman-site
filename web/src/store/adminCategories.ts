import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categories as storefrontCategories } from "@/lib/data";

export type AdminCategory = {
  slug: string;
  name: string;
};

type AdminCategoriesState = {
  items: AdminCategory[];
  addCategory: (name: string) => void;
  deleteCategory: (slug: string) => void;
};

export const useAdminCategoriesStore = create<AdminCategoriesState>()(
  persist(
    (set) => ({
      items: storefrontCategories.map((category) => ({ slug: category.slug, name: category.name })),
      addCategory: (name) =>
        set((state) => ({
          items: [...state.items, { slug: `c-${Date.now()}`, name }],
        })),
      deleteCategory: (slug) =>
        set((state) => ({ items: state.items.filter((item) => item.slug !== slug) })),
    }),
    { name: "hooman-shop-admin-categories" }
  )
);
