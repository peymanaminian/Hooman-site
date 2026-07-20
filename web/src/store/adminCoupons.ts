import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type AdminCoupon, initialCoupons } from "@/lib/admin-data";

type AdminCouponsState = {
  items: AdminCoupon[];
  addCoupon: (coupon: AdminCoupon) => void;
  deleteCoupon: (code: string) => void;
};

export const useAdminCouponsStore = create<AdminCouponsState>()(
  persist(
    (set) => ({
      items: initialCoupons,
      addCoupon: (coupon) => set((state) => ({ items: [coupon, ...state.items] })),
      deleteCoupon: (code) =>
        set((state) => ({ items: state.items.filter((item) => item.code !== code) })),
    }),
    { name: "hooman-shop-admin-coupons" }
  )
);
