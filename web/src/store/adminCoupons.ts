import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type AdminCoupon, type AdminOrder, initialCoupons } from "@/lib/admin-data";

type AdminCouponsState = {
  items: AdminCoupon[];
  addCoupon: (coupon: AdminCoupon) => void;
  deleteCoupon: (code: string) => void;
  incrementUsage: (code: string) => void;
};

export const useAdminCouponsStore = create<AdminCouponsState>()(
  persist(
    (set) => ({
      items: initialCoupons,
      addCoupon: (coupon) => set((state) => ({ items: [coupon, ...state.items] })),
      deleteCoupon: (code) =>
        set((state) => ({ items: state.items.filter((item) => item.code !== code) })),
      incrementUsage: (code) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.code === code ? { ...item, usedCount: item.usedCount + 1 } : item
          ),
        })),
    }),
    { name: "hooman-shop-admin-coupons" }
  )
);

export function findCoupon(coupons: AdminCoupon[], code: string): AdminCoupon | undefined {
  const normalized = code.trim().toUpperCase();
  return coupons.find((coupon) => coupon.code.toUpperCase() === normalized);
}

export function hasCompletedFirstPurchase(orders: AdminOrder[], customerName: string): boolean {
  return orders.some((order) => order.customer === customerName && order.status !== "cancelled");
}

export function computeDiscount(coupon: AdminCoupon | undefined, subtotal: number, isEligible: boolean): number {
  if (!coupon || !isEligible || subtotal < coupon.minOrderTotal) return 0;
  const raw = coupon.discountType === "percent" ? (subtotal * coupon.discountValue) / 100 : coupon.discountValue;
  return Math.min(Math.round(raw), subtotal);
}
