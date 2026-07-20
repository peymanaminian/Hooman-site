import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProductBySlug } from "@/lib/data";

export type CartLine = {
  productSlug: string;
  variantId: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  addItem: (productSlug: string, variantId: string, quantity?: number) => void;
  removeItem: (productSlug: string, variantId: string) => void;
  setQuantity: (productSlug: string, variantId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
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
      clear: () => set({ lines: [] }),
    }),
    { name: "hooman-shop-cart" }
  )
);

// Persisted cart state only exists in the browser; this reports whether the
// store has finished reading localStorage so components can avoid a
// hydration mismatch between the server-rendered and client-rendered markup.
export function useCartHydrated(): boolean {
  return useSyncExternalStore(
    (callback) => useCartStore.persist.onFinishHydration(callback),
    () => useCartStore.persist.hasHydrated(),
    () => false
  );
}

export function cartLineCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.quantity, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => {
    const product = getProductBySlug(line.productSlug);
    return sum + (product ? product.price * line.quantity : 0);
  }, 0);
}
