"use client";

import { hasCompletedFirstPurchase, useAdminCouponsStore } from "@/store/adminCoupons";
import { useAdminOrdersStore } from "@/store/adminOrders";
import { useHydrated } from "@/store/useHydrated";

const CUSTOMER_NAME = "پیمان امینیان";

export default function CouponsPage() {
  const coupons = useAdminCouponsStore((state) => state.items);
  const orders = useAdminOrdersStore((state) => state.orders);
  const hydrated = useHydrated(useAdminCouponsStore.persist);

  if (!hydrated) return null;

  const isFirstPurchase = !hasCompletedFirstPurchase(orders, CUSTOMER_NAME);

  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="mb-2 text-2xl font-bold">تخفیف برای اولین خرید</h1>
      <p className="mb-3 text-sm text-muted">
        این کدها فقط برای مشتریانی که هنوز هیچ خریدی ثبت نکرده‌اند قابل استفاده است. در مرحله پرداخت سبد خرید کد را
        وارد کنید تا تخفیف به‌صورت خودکار اعمال شود.
      </p>
      {!isFirstPurchase && (
        <p className="mb-8 rounded-lg bg-primary/5 p-3 text-[13px] text-primary">
          شما پیش‌تر خرید ثبت کرده‌اید، بنابراین این کدها برای حساب شما قابل استفاده نیستند.
        </p>
      )}

      {coupons.length === 0 ? (
        <p className="text-sm text-muted">در حال حاضر کد تخفیفی فعال نیست.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="flex items-center justify-between rounded-2xl border-2 border-dashed border-primary/40 bg-surface p-5 shadow-sm"
            >
              <div>
                <div className="text-lg font-extrabold tracking-wide text-primary">{coupon.code}</div>
                <div className="mt-1 text-xs text-muted">
                  حداقل خرید: {coupon.minOrderTotal.toLocaleString("fa-IR")} تومان
                </div>
              </div>
              <div className="text-left text-sm font-bold">
                {coupon.discountType === "percent"
                  ? `${coupon.discountValue.toLocaleString("fa-IR")}٪ تخفیف`
                  : `${coupon.discountValue.toLocaleString("fa-IR")} تومان تخفیف`}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
