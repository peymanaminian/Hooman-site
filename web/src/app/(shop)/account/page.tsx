import Link from "next/link";

const recentOrders = [
  { id: "#10231", date: "۱۴۰۵/۰۴/۲۸", amount: "۶,۲۷۰,۰۰۰ تومان", status: "در حال پردازش", tone: "processing" },
  { id: "#10198", date: "۱۴۰۵/۰۴/۱۵", amount: "۱,۲۵۰,۰۰۰ تومان", status: "تحویل شده", tone: "delivered" },
  { id: "#10142", date: "۱۴۰۵/۰۳/۲۲", amount: "۸۹۰,۰۰۰ تومان", status: "لغو شده", tone: "cancelled" },
] as const;

const statusStyles: Record<(typeof recentOrders)[number]["tone"], string> = {
  processing: "bg-amber-100 text-amber-800",
  delivered: "bg-green-100 text-success",
  cancelled: "bg-red-100 text-red-700",
};

export default function AccountPage() {
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
              پ.ا
            </div>
            <div className="font-bold">پیمان امینیان</div>
            <div className="text-xs text-muted">عضو از دی ۱۴۰۳</div>
            <span className="mt-2 inline-block rounded-full bg-gold px-3.5 py-1 text-xs font-bold text-white">
              سطح طلایی
            </span>
          </div>
          <ul className="mt-5 space-y-1 text-[13.5px]">
            <li className="rounded-lg bg-primary px-3.5 py-2.5 text-white">پروفایل و امتیازات</li>
            <li className="rounded-lg px-3.5 py-2.5">سفارش‌های من</li>
            <li className="rounded-lg px-3.5 py-2.5">آدرس‌ها</li>
            <li className="rounded-lg px-3.5 py-2.5">کیف پول</li>
            <li className="rounded-lg px-3.5 py-2.5">حساب‌های متصل (گوگل، تلگرام، اینستاگرام)</li>
            <li className="rounded-lg px-3.5 py-2.5">خروج از حساب</li>
          </ul>
        </aside>

        <div>
          <div className="mb-5 flex gap-4">
            <div className="flex-1 rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">۲,۴۸۰</div>
              <div className="mt-1 text-xs text-muted">امتیاز فعلی</div>
            </div>
            <div className="flex-1 rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">۱۸</div>
              <div className="mt-1 text-xs text-muted">تعداد سفارش موفق</div>
            </div>
            <div className="flex-1 rounded-2xl bg-surface p-4 text-center shadow-sm">
              <div className="text-2xl font-extrabold text-primary">۳۲۰,۰۰۰</div>
              <div className="mt-1 text-xs text-muted">موجودی کیف پول (تومان)</div>
            </div>
          </div>

          <div className="mb-4 rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">پیشرفت تا سطح بعدی</h3>
            <div className="flex justify-between text-[12.5px]">
              <span>سطح طلایی (فعلی)</span>
              <span className="text-muted">۲,۴۸۰ / ۳,۰۰۰ امتیاز</span>
            </div>
            <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-border">
              <div className="h-full w-[82%] bg-primary" />
            </div>
            <p className="mt-2.5 text-[12.5px] text-muted">
              با ۵۲۰ امتیاز دیگر به سطح الماسی می‌رسید و از ۱۵٪ تخفیف دائم برخوردار می‌شوید.
            </p>
          </div>

          <div className="mb-4 rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">سفارش‌های اخیر</h3>
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
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="border-b border-border p-2.5">{order.id}</td>
                    <td className="border-b border-border p-2.5">{order.date}</td>
                    <td className="border-b border-border p-2.5">{order.amount}</td>
                    <td className="border-b border-border p-2.5">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusStyles[order.tone]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="border-b border-border p-2.5">
                      <Link href="#" className="text-primary">
                        جزئیات
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
