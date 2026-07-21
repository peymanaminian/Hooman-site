const STEPS = [
  {
    title: "انتخاب محصول",
    description: "با استفاده از جستجو یا مرور دسته‌بندی‌ها، محصول مورد نظر خود را پیدا کنید و آن را به سبد خرید اضافه کنید.",
  },
  {
    title: "بررسی سبد خرید",
    description: "در صفحه سبد خرید می‌توانید تعداد کالاها را تغییر دهید، کد تخفیف اعمال کنید و مجموع مبلغ را ببینید.",
  },
  {
    title: "ثبت آدرس و روش ارسال",
    description: "آدرس تحویل و روش ارسال دلخواه (پست پیشتاز یا اکسپرس درون‌شهری) را انتخاب کنید.",
  },
  {
    title: "پرداخت",
    description: "پرداخت را از طریق درگاه زرین‌پال، کیف پول داخلی سایت یا به‌صورت پرداخت در محل انجام دهید.",
  },
  {
    title: "پیگیری سفارش",
    description: "پس از ثبت سفارش، می‌توانید از صفحه «پیگیری سفارش» وضعیت ارسال آن را بررسی کنید.",
  },
];

export default function ShoppingGuidePage() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="mb-2 text-2xl font-bold">راهنمای خرید</h1>
      <p className="mb-8 text-sm text-muted">خرید از فروشگاه در ۵ مرحله ساده.</p>

      <ol className="flex flex-col gap-4">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4 rounded-2xl bg-surface p-5 shadow-sm">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
              {(index + 1).toLocaleString("fa-IR")}
            </span>
            <div>
              <div className="font-bold">{step.title}</div>
              <p className="mt-1 text-sm text-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
