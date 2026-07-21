import { create } from "zustand";
import { persist } from "zustand/middleware";
import { categories as seedCategories } from "@/lib/data";

export type ShopCategory = {
  slug: string;
  name: string;
  sortOrder: number;
};

const seed: ShopCategory[] = seedCategories.map((category, index) => ({ ...category, sortOrder: index }));

function slugify(name: string): string {
  const base = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9؀-ۿ\s-]/g, "")
    .replace(/\s+/g, "-");
  return `${base || "category"}-${Date.now().toString(36)}`;
}

type ShopCategoriesState = {
  items: ShopCategory[];
  addCategory: (input: { name: string }) => void;
  updateCategory: (slug: string, patch: Partial<Omit<ShopCategory, "slug">>) => void;
  deleteCategory: (slug: string) => void;
  reorder: (orderedSlugs: string[]) => void;
};

export const useShopCategoriesStore = create<ShopCategoriesState>()(
  persist(
    (set) => ({
      items: seed,
      addCategory: (input) =>
        set((state) => ({
          items: [
            ...state.items,
            { slug: slugify(input.name), name: input.name, sortOrder: state.items.length },
          ],
        })),
      updateCategory: (slug, patch) =>
        set((state) => ({
          items: state.items.map((item) => (item.slug === slug ? { ...item, ...patch } : item)),
        })),
      deleteCategory: (slug) =>
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
    { name: "hooman-shop-categories" }
  )
);

export function sortedCategories(items: ShopCategory[]): ShopCategory[] {
  return [...items].sort((a, b) => a.sortOrder - b.sortOrder);
}
