import { loyaltyTiers } from "@/lib/admin-data";

export default function LoyaltyTiersPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-2 text-2xl font-bold">سطح‌بندی و امتیازات باشگاه مشتریان</h1>
      <p className="mb-8 text-sm leading-7 text-muted">
        به ازای هر خرید از فروشگاه، امتیاز کسب می‌کنید و با رسیدن به هر سطح، از مزایای بیشتری برخوردار خواهید شد.
        امتیاز شما و سطح فعلی‌تان را می‌توانید از صفحه «حساب کاربری» ببینید.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {loyaltyTiers.map((tier) => (
          <div key={tier.name} className="rounded-2xl bg-surface p-5 shadow-sm">
            <div className="text-lg font-extrabold text-primary">{tier.name}</div>
            <div className="mt-1 text-xs text-muted">حداقل {tier.minPoints.toLocaleString("fa-IR")} امتیاز</div>
            <p className="mt-3 text-sm">{tier.perk}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted">
        به ازای هر ۱۰۰,۰۰۰ تومان خرید موفق، ۱ امتیاز به حساب شما اضافه می‌شود. امتیازها هیچ‌گاه منقضی نمی‌شوند.
      </p>
    </div>
  );
}
