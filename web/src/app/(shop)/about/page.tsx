"use client";

import { useSiteContentStore } from "@/store/siteContent";

export default function AboutPage() {
  const storeName = useSiteContentStore((state) => state.storeName);

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-2 text-2xl font-bold">درباره {storeName}</h1>
      <p className="mb-8 text-sm text-muted">فروشگاهی برای همه نیازهای روزمره شما، در یک‌جا.</p>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { value: "+۵۰۰", label: "برند معتبر" },
          { value: "+۱۲۰,۰۰۰", label: "مشتری راضی" },
          { value: "۸", label: "دسته‌بندی کالا" },
          { value: "۲۴/۷", label: "پشتیبانی آنلاین" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-surface p-4 text-center shadow-sm">
            <div className="text-xl font-extrabold text-primary">{stat.value}</div>
            <div className="mt-1 text-xs text-muted">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 text-sm leading-8 text-muted">
        <p>
          {storeName} یک فروشگاه اینترنتی چندمنظوره است که با هدف ساده‌کردن تجربه خرید آنلاین راه‌اندازی شده است. از
          کالای دیجیتال و پوشاک گرفته تا لوازم خانه و محصولات کودک، تلاش می‌کنیم مجموعه‌ای متنوع و باکیفیت را با
          قیمتی منصفانه و ارسال سریع در اختیار شما قرار دهیم.
        </p>
        <p>
          تیم ما متشکل از افرادی است که هر روز روی بهبود کیفیت محصولات، سرعت ارسال و تجربه کاربری سایت کار می‌کنند تا
          خرید از {storeName} برای شما ساده، مطمئن و لذت‌بخش باشد.
        </p>
        <p>
          اگر سوال، پیشنهاد یا انتقادی دارید، خوشحال می‌شویم از طریق بخش «تماس با ما» یا شبکه‌های اجتماعی با ما در
          ارتباط باشید.
        </p>
      </div>
    </div>
  );
}
