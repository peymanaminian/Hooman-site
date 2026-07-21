import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data";
import { useHydrated } from "@/store/useHydrated";

export type CartLine = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  couponCode: string | null;
  addItem: (productSlug: string, variantId: string, quantity?: number) => void;
  removeItem: (productSlug: string, variantId: string) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  setCoupon: (code: string | null) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      couponCode: null,
      addItem: (productSlug, variantId, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find(
            (line) => line.productSlug === productSlug && line.variantId === variantId
          );
          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line === existing ? { ...line, quantity: line.quantity + quantity } : line
              ),
            };
          }
          return { lines: [...state.lines, { productSlug, variantId, quantity }] };
        }),
      removeItem: (productSlug, variantId) =>
        set((state) => ({
          lines: state.lines.filter(
            (line) => !(line.productSlug === productSlug && line.variantId === variantId)
          ),
        })),
      setQuantity: (productSlug, variantId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((line) =>
              line.productSlug === productSlug && line.variantId === variantId
                ? { ...line, quantity }
                : line
            )
            .filter((line) => line.quantity > 0),
        })),
      setCoupon: (code) => set({ couponCode: code }),
      clear: () => set({ lines: [], couponCode: null }),
    }),
    { name: "hooman-shop-cart" }
  )
);

export function useCartHydrated(): boolean {
  return useHydrated(useCartStore.persist);
}

export function cartLineCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartSubtotal(lines: CartLine[], products: Product[]): number {
  return lines.reduce((sum, line) => {
    const product = products.find((item) => item.slug === line.productSlug);
    return sum + (product ? product.price * line.quantity : 0);
  }, 0);
}
