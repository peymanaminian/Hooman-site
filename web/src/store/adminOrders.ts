import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type AdminOrder, type OrderStatus, initialOrders } from "@/lib/admin-data";

type AdminOrdersState = {
  orders: AdminOrder[];
  setStatus: (id: string, status: OrderStatus) => void;
  addOrder: (input: { customer: string; amount: number }) => AdminOrder;
};

export const useAdminOrdersStore = create<AdminOrdersState>()(
  persist(
    (set, get) => ({
      orders: initialOrders,
      setStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
        })),
      addOrder: (input) => {
        const nextNumber =
          get().orders.reduce((max, order) => Math.max(max, Number(order.id.replace("#", "")) || 0), 10000) + 1;
        const newOrder: AdminOrder = {
          id: `#${nextNumber}`,
          customer: input.customer,
          amount: input.amount,
          status: "processing",
          date: new Date().toLocaleDateString("fa-IR"),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },
    }),
    { name: "hooman-shop-admin-orders" }
  )
);
