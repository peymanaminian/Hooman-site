"use client";

import { useState } from "react";
import { orderStatusLabels, orderStatusStyles } from "@/lib/admin-data";
import { useAdminOrdersStore } from "@/store/adminOrders";
import { useHydrated } from "@/store/useHydrated";

export default function OrderTrackingPage() {
  const orders = useAdminOrdersStore((state) => state.orders);
  const hydrated = useHydrated(useAdminOrdersStore.persist);
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);

  const normalizedInput = orderId.trim().replace(/^#?/, "#");
  const found = searched ? orders.find((order) => order.id === normalizedInput) : undefined;

  if (!hydrated) return null;

  return (
    <div className="mx-auto max-w-xl py-10">
      <h1 className="mb-2 text-2xl font-bold">پیگیری سفارش</h1>
      <p className="mb-6 text-sm text-muted">شماره سفارش خود را وارد کنید تا آخرین وضعیت آن را مشاهده کنید.</p>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSearched(true);
        }}
        className="mb-6 flex gap-2"
      >
        <input
          value={orderId}
          onChange={(event) => {
            setOrderId(event.target.value);
            setSearched(false);
          }}
          placeholder="مثلاً 10231#"
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5"
        />
        <button type="submit" className="rounded-lg bg-primary px-6 py-2.5 font-bold text-white">
          پیگیری
        </button>
      </form>

      {searched && (
        <div className="rounded-2xl bg-surface p-5 shadow-sm">
          {found ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-bold">{found.id}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${orderStatusStyles[found.status]}`}>
                  {orderStatusLabels[found.status]}
                </span>
              </div>
              <div className="text-sm text-muted">مشتری: {found.customer}</div>
              <div className="mt-1 text-sm text-muted">تاریخ ثبت: {found.date}</div>
              <div className="mt-1 text-sm text-muted">مبلغ: {found.amount.toLocaleString("fa-IR")} تومان</div>
            </>
          ) : (
            <p className="text-sm text-muted">سفارشی با این شماره پیدا نشد. لطفاً شماره سفارش را بررسی کنید.</p>
          )}
        </div>
      )}
    </div>
  );
}
