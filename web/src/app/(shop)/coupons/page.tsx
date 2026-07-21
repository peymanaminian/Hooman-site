"use client";

import { useAdminCouponsStore } from "@/store/adminCoupons";
import { useHydrated } from "@/store/useHydrated";

export default function CouponsPage() {
  const coupons = useAdminCouponsStore((state) => state.items);
  const hydrated = useHydrated(useAdminCouponsStore.persist);

  if (!hydrated) return null;

  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="mb-2 text-2xl font-bold">کدهای تخفیف اختصاصی</h1>
      <p className="mb-8 text-sm text-muted">
        این کدها را در مرحله پرداخت سبد خرید وارد کنید تا تخفیف به‌صورت خودکار اعمال شود.
      </p>

      {coupons.length === 0 ? (
        <p className="text-sm text-muted">در حال حاضر کد تخفیف فعالی وجود ندارد.</p>
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
