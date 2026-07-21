const CONDITIONS = [
  "کالا باید حداکثر تا ۷ روز پس از تحویل، بدون استفاده و با بسته‌بندی اصلی بازگردانده شود.",
  "برای کالاهای دارای ضمانت اصالت، اصل فاکتور خرید باید همراه کالا ارسال شود.",
  "هزینه ارسال مرسوله مرجوعی در صورت وجود عیب یا مغایرت با سفارش، بر عهده فروشگاه است.",
  "لباس‌های زیر، محصولات بهداشتی و کالاهای بهم‌ریخته پس از استفاده قابل مرجوع کردن نیستند.",
  "وجه کالای مرجوعی حداکثر تا ۷۲ ساعت پس از تأیید بازگشت، به کیف پول یا حساب بانکی شما واریز می‌شود.",
];

export default function ReturnPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl py-10">
      <h1 className="mb-2 text-2xl font-bold">شرایط بازگشت کالا</h1>
      <p className="mb-8 text-sm leading-7 text-muted">
        رضایت شما برای ما اهمیت دارد. در صورتی که از خرید خود راضی نیستید، می‌توانید طبق شرایط زیر کالا را بازگردانید.
      </p>

      <ul className="flex flex-col gap-3">
        {CONDITIONS.map((condition) => (
          <li key={condition} className="flex gap-3 rounded-2xl bg-surface p-4 text-sm text-muted shadow-sm">
            <span className="text-primary">•</span>
            <span>{condition}</span>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-muted">
        برای ثبت درخواست بازگشت کالا، از طریق صفحه «پیگیری سفارش» یا با پشتیبانی فروشگاه در تماس باشید.
      </p>
    </div>
  );
}
