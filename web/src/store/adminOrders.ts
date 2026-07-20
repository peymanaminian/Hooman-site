import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type AdminOrder, type OrderStatus, initialOrders } from "@/lib/admin-data";

type AdminOrdersState = {
  orders: AdminOrder[];
  setStatus: (id: string, status: OrderStatus) => void;
};

export const useAdminOrdersStore = create<AdminOrdersState>()(
  persist(
    (set) => ({
      orders: initialOrders,
      setStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
        })),
    }),
    { name: "hooman-shop-admin-orders" }
  )
);
