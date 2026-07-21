"use client";

import Link from "next/link";
import { useSiteContentStore } from "@/store/siteContent";

export function SiteFooter() {
  const storeName = useSiteContentStore((state) => state.storeName);

  return (
    <footer className="mt-12 border-t border-border bg-surface py-9">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 md:grid-cols-3 lg:grid-cols-5">
        <div>
          <h4 className="mb-3 text-sm font-bold">درباره {storeName}</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li>
              <Link href="/about" className="hover:text-primary">
                درباره ما
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-primary">
                فرصت‌های شغلی
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-primary">
                وبلاگ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">خدمات مشتریان</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li>
              <Link href="/order-tracking" className="hover:text-primary">
                پیگیری سفارش
              </Link>
            </li>
            <li>
              <Link href="/shopping-guide" className="hover:text-primary">
                راهنمای خرید
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:text-primary">
                شرایط بازگشت کالا
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">باشگاه مشتریان</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li>
              <Link href="/loyalty-tiers" className="hover:text-primary">
                سطح‌بندی و امتیازات
              </Link>
            </li>
            <li>
              <Link href="/coupons" className="hover:text-primary">
                تخفیف برای اولین خرید
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">پشتیبانی</h4>
          <ul className="space-y-2 text-xs text-muted">
            <li>
              <a
                href="https://t.me/Hooman120_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                گفتگو با پشتیبانی در تلگرام
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-bold">ما را دنبال کنید</h4>
          <div className="mt-2 flex gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-xs">
              IG
            </span>
            <a
              href="https://t.me/Hooman120_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-xs hover:border-primary hover:text-primary"
            >
              TG
            </a>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-xs">
              G
            </span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-2 border-t border-border px-5 pt-4 text-xs text-muted">
        <span>© ۱۴۰۵ {storeName} — تمامی حقوق محفوظ است.</span>
        <Link href="/admin" className="hover:text-primary">
          پنل مدیریت
        </Link>
      </div>
    </footer>
  );
}
