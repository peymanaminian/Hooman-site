"use client";

import Link from "next/link";
import { loyaltyTiers, orderStatusLabels, orderStatusStyles } from "@/lib/admin-data";
import type { CurrentUser } from "@/lib/auth";
import { logoutAction } from "@/lib/auth-actions";
import { useAdminOrdersStore } from "@/store/adminOrders";
import { useHydrated } from "@/store/useHydrated";

const tierBadgeColors: Record<string, string> = {
  برنزی: "bg-bronze",
  "نقره‌ای": "bg-silver",
  طلایی: "bg-gold",
  الماسی: "bg-diamond",
};

export function AccountView({ user }: { user: CurrentUser }) {
  const orders = useAdminOrdersStore((state) => state.orders);
  const hydrated = useHydrated(useAdminOrdersStore.persist);

  if (!hydrated) return null;

  const successfulOrders = orders.filter((order) => order.status !== "cancelled");
  const totalPoints = successfulOrders.reduce((sum, order) => sum + Math.floor(order.amount / 100000), 0);
  const totalSpent = successfulOrders.reduce((sum, order) => sum + order.amount, 0);

  let currentTier: (typeof loyaltyTiers)[number] = loyaltyTiers[0];
  for (const tier of loyaltyTiers) {
    if (totalPoints >= tier.minPoints) currentTier = tier;
  }
  const nextTier = loyaltyTiers.find((tier) => tier.minPoints > currentTier.minPoints);
  const progressPercent = nextTier
    ? Math.min(100, Math.round((totalPoints / nextTier.minPoints) * 100))
    : 100;

  const initials = user.fullName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join(".");

  return (
    <>
      <div className="my-4 flex gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-primary">
          خانه
        </Link>
        / حساب کاربری
      </div>

      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-[260px_1fr]">
        <aside>
          <div className="rounded-2xl bg-surface p-5 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-[74px] w-[74px] items-center justify-center rounded-full bg-background text-lg font-bold text-primary">
              {initials || "؟"}
            </div>
            <div className="font-bold">{user.fullName}</div>
            <div className="text-xs text-muted">{user.email}</div>
            <span
              className={`mt-2 inline-block rounded-full px-3.5 py-1 text-xs font-bold text-white ${tierBadgeColors[currentTier.name]}`}
            >
              سطح {currentTier.name}
            </span>
          </div>
          <ul className="mt-5 space-y-1 text-[13.5px]">
            <li className="rounded-lg bg-primary px-3.5 py-2.5 text-white">پروفایل و امتیازات</li>
            <li className="rounded-lg px-3.5 py-2.5">سفارش‌های من</li>
            <li className="rounded-lg px-3.5 py-2.5">آدرس‌ها</li>
            <li className="rounded-lg px-3.5 py-2.5">کیف پول</li>
            <li className="rounded-lg px-3.5 py-2.5">حساب‌های متصل (گوگل، تلگرام، اینستاگرام)</li>
            <li>
              <form action={logoutAction}>
                <button type="submit" className="w-full rounded-lg px-3.5 py-2.5 text-right">
                  خروج از حساب
                </button>
              </form>
            </li>
          </ul>
        </aside>

        <div>
          <div className="mb-5 flex gap-4">
            <div className="flex-1 rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">{totalPoints.toLocaleString("fa-IR")}</div>
              <div className="mt-1 text-xs text-muted">امتیاز فعلی</div>
            </div>
            <div className="flex-1 rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">{successfulOrders.length.toLocaleString("fa-IR")}</div>
              <div className="mt-1 text-xs text-muted">تعداد سفارش موفق</div>
            </div>
            <div className="flex-1 rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">{totalSpent.toLocaleString("fa-IR")}</div>
              <div className="mt-1 text-xs text-muted">مجموع خرید (تومان)</div>
            </div>
          </div>

          <div className="mb-4 rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">پیشرفت تا سطح بعدی</h3>
            <div className="flex justify-between text-[12.5px]">
              <span>سطح {currentTier.name} (فعلی)</span>
              {nextTier && (
                <span className="text-muted">
                  {totalPoints.toLocaleString("fa-IR")} / {nextTier.minPoints.toLocaleString("fa-IR")} امتیاز
                </span>
              )}
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-border">
              <div className="h-full bg-primary" style={{ width: `${progressPercent}%` }} />
            </div>
            <p className="mt-2.5 text-[12.5px] text-muted">
              {nextTier
                ? `با ${(nextTier.minPoints - totalPoints).toLocaleString("fa-IR")} امتیاز دیگر به سطح ${nextTier.name} می‌رسید و از «${nextTier.perk}» برخوردار می‌شوید.`
                : "شما به بالاترین سطح باشگاه مشتریان رسیده‌اید."}
            </p>
          </div>

          <div className="mb-4 rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">سفارش‌های اخیر</h3>
            {orders.length === 0 ? (
              <p className="text-sm text-muted">هنوز سفارشی ثبت نکرده‌اید.</p>
            ) : (
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="text-right">
                    <th className="border-b border-border p-2.5">شماره سفارش</th>
                    <th className="border-b border-border p-2.5">تاریخ</th>
                    <th className="border-b border-border p-2.5">مبلغ</th>
                    <th className="border-b border-border p-2.5">وضعیت</th>
                    <th className="border-b border-border p-2.5" />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="border-b border-border p-2.5">{order.id}</td>
                      <td className="border-b border-border p-2.5">{order.date}</td>
                      <td className="border-b border-border p-2.5">{order.amount.toLocaleString("fa-IR")} تومان</td>
                      <td className="border-b border-border p-2.5">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${orderStatusStyles[order.status]}`}
                        >
                          {orderStatusLabels[order.status]}
                        </span>
                      </td>
                      <td className="border-b border-border p-2.5">
                        <Link href="/order-tracking" className="text-primary">
                          جزئیات
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">حساب‌های متصل</h3>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-primary px-4 py-1.5 text-sm font-bold text-primary">
                Google — متصل
              </span>
              <span className="rounded-full border border-primary px-4 py-1.5 text-sm font-bold text-primary">
                Telegram — متصل
              </span>
              <span className="rounded-full border border-border px-4 py-1.5 text-sm">Instagram — اتصال</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
