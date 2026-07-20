"use client";

import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { useSiteContentStore } from "@/store/siteContent";

export default function AdminAppearancePage() {
  const content = useSiteContentStore();

  return (
    <>
      <AdminTopbar title="ظاهر فروشگاه" />
      <div className="grid grid-cols-1 gap-5 p-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-surface p-5 shadow-sm">
          <h3 className="mb-3.5 text-[15px] font-bold">محتوای بنر اصلی</h3>
          <div className="flex flex-col gap-3">
            <label className="text-[13px] text-muted">
              نام فروشگاه
              <input
                value={content.storeName}
                onChange={(event) => content.update({ storeName: event.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
              />
            </label>
            <label className="text-[13px] text-muted">
              عنوان بنر
              <input
                value={content.heroTitle}
                onChange={(event) => content.update({ heroTitle: event.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
              />
            </label>
            <label className="text-[13px] text-muted">
              زیرعنوان بنر
              <input
                value={content.heroSubtitle}
                onChange={(event) => content.update({ heroSubtitle: event.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
              />
            </label>
            <label className="text-[13px] text-muted">
              متن دکمه بنر
              <input
                value={content.heroCtaLabel}
                onChange={(event) => content.update({ heroCtaLabel: event.target.value })}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl bg-surface p-5 shadow-sm">
          <h3 className="mb-3.5 text-[15px] font-bold">پیش‌نمایش زنده</h3>
          <div className="rounded-2xl bg-gradient-to-l from-primary to-[#ff6b81] p-8 text-white">
            <h2 className="mb-2.5 text-xl font-bold">{content.heroTitle}</h2>
            <p className="mb-4 text-sm opacity-95">{content.heroSubtitle}</p>
            <span className="inline-block rounded-full bg-white px-5 py-2 text-sm font-bold text-primary-dark">
              {content.heroCtaLabel}
            </span>
          </div>
          <p className="mt-3 text-xs text-muted">این پیش‌نمایش هم‌زمان در صفحه اصلی فروشگاه اعمال می‌شود.</p>
        </div>
      </div>
    </>
  );
}
