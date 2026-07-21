"use client";

import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { useAdminCouponsStore } from "@/store/adminCoupons";
import { useHydrated } from "@/store/useHydrated";

export default function AdminCouponsPage() {
  const items = useAdminCouponsStore((state) => state.items);
  const addCoupon = useAdminCouponsStore((state) => state.addCoupon);
  const deleteCoupon = useAdminCouponsStore((state) => state.deleteCoupon);
  const hydrated = useHydrated(useAdminCouponsStore.persist);

  const [code, setCode] = useState("");
  const [discountValue, setDiscountValue] = useState("");

  function handleAdd() {
    if (!code.trim() || !discountValue) return;
    addCoupon({
      code: code.trim().toUpperCase(),
      discountType: "percent",
      discountValue: Number(discountValue),
      minOrderTotal: 0,
      usedCount: 0,
    });
    setCode("");
    setDiscountValue("");
  }

  if (!hydrated) return null;

  return (
    <>
      <AdminTopbar title="تخفیف‌ها و کوپن‌ها" />
      <div className="p-6">
        <p className="mb-4 text-[13px] text-muted">
          همه کدهای این بخش تحت عنوان «تخفیف برای اولین خرید» به مشتریان نمایش داده می‌شوند و فقط برای مشتریانی که
          هنوز هیچ سفارشی ثبت نکرده‌اند قابل استفاده هستند.
        </p>
        <div className="mb-6 rounded-2xl bg-surface p-5 shadow-sm">
          <h3 className="mb-3.5 text-[15px] font-bold">افزودن کد تخفیف جدید</h3>
          <div className="flex gap-2.5">
            <input
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="کد تخفیف"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5"
            />
            <input
              value={discountValue}
              onChange={(event) => setDiscountValue(event.target.value)}
              type="number"
              placeholder="درصد تخفیف"
              className="w-40 rounded-lg border border-border bg-background px-3 py-2.5"
            />
            <button onClick={handleAdd} className="rounded-lg bg-primary px-5 py-2.5 font-bold text-white">
              افزودن
            </button>
          </div>
        </div>

        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">کد</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">میزان تخفیف</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">حداقل سفارش</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">تعداد استفاده</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((coupon) => (
              <tr key={coupon.code}>
                <td className="border-t border-border p-3 font-bold">{coupon.code}</td>
                <td className="border-t border-border p-3">
                  {coupon.discountType === "percent"
                    ? `${coupon.discountValue.toLocaleString("fa-IR")}٪`
                    : `${coupon.discountValue.toLocaleString("fa-IR")} تومان`}
                </td>
                <td className="border-t border-border p-3">{coupon.minOrderTotal.toLocaleString("fa-IR")} تومان</td>
                <td className="border-t border-border p-3">{coupon.usedCount.toLocaleString("fa-IR")}</td>
                <td className="border-t border-border p-3">
                  <button
                    onClick={() => deleteCoupon(coupon.code)}
                    className="rounded-md bg-red-100 px-2.5 py-1 text-[11.5px] text-red-700"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
