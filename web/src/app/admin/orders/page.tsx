"use client";

import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { orderStatusLabels, orderStatusStyles, type OrderStatus } from "@/lib/admin-data";
import { useAdminOrdersStore } from "@/store/adminOrders";
import { useHydrated } from "@/store/useHydrated";

export default function AdminOrdersPage() {
  const orders = useAdminOrdersStore((state) => state.orders);
  const setStatus = useAdminOrdersStore((state) => state.setStatus);
  const hydrated = useHydrated(useAdminOrdersStore.persist);

  if (!hydrated) return null;

  return (
    <>
      <AdminTopbar title="مدیریت سفارش‌ها" />
      <div className="p-6">
        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">شماره</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">مشتری</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">تاریخ</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">مبلغ</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border-t border-border p-3">{order.id}</td>
                <td className="border-t border-border p-3">{order.customer}</td>
                <td className="border-t border-border p-3">{order.date}</td>
                <td className="border-t border-border p-3">{order.amount.toLocaleString("fa-IR")} تومان</td>
                <td className="border-t border-border p-3">
                  <span
                    className={`ml-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${orderStatusStyles[order.status]}`}
                  >
                    {orderStatusLabels[order.status]}
                  </span>
                  <select
                    value={order.status}
                    onChange={(event) => setStatus(order.id, event.target.value as OrderStatus)}
                    className="rounded-md border border-border bg-background px-2 py-1 text-[12px]"
                  >
                    {(Object.keys(orderStatusLabels) as OrderStatus[]).map((status) => (
                      <option key={status} value={status}>
                        {orderStatusLabels[status]}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
