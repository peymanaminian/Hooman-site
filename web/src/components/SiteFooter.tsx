import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-surface py-9">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 sm:grid-cols-4">
        <div>
          <h4 className="mb-3 text-sm font-bold">درباره Hooman Shop</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li>درباره ما</li>
            <li>فرصت‌های شغلی</li>
            <li>وبلاگ</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">خدمات مشتریان</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li>پیگیری سفارش</li>
            <li>راهنمای خرید</li>
            <li>شرایط بازگشت کالا</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">باشگاه مشتریان</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li>سطح‌بندی و امتیازات</li>
            <li>کدهای تخفیف اختصاصی</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">ما را دنبال کنید</h4>
          <div className="mt-2 flex gap-2">
            {["IG", "TG", "G"].map((label) => (
              <span
                key={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-xs"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-border px-5 pt-4 text-xs text-muted">
        <span>© ۱۴۰۵ Hooman Shop — تمامی حقوق محفوظ است.</span>
        <Link href="/admin" className="hover:text-primary">
          پنل مدیریت
        </Link>
      </div>
    </footer>
  );
}
