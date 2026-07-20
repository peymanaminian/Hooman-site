const stats = [
  { label: "سفارش امروز", value: "۲۴۸", delta: "▲ ۱۲٪ نسبت به دیروز", tone: "success" },
  { label: "فروش امروز (تومان)", value: "۳۸۹,۲۰۰,۰۰۰", delta: "▲ ۸٪", tone: "success" },
  { label: "مشتری جدید این ماه", value: "۱,۴۲۰", delta: "▲ ۵٪", tone: "success" },
  { label: "محصول رو به اتمام", value: "۱۸", delta: "نیازمند بررسی", tone: "primary" },
] as const;

const recentOrders = [
  { id: "#10231", customer: "پیمان امینیان", amount: "۶,۲۷۰,۰۰۰ تومان", status: "در حال پردازش", tone: "processing" },
  { id: "#10230", customer: "نگار کریمی", amount: "۱,۹۰۰,۰۰۰ تومان", status: "تحویل شده", tone: "delivered" },
  { id: "#10229", customer: "حسین قاسمی", amount: "۴۵۰,۰۰۰ تومان", status: "لغو شده", tone: "cancelled" },
] as const;

const lowStock = [
  { name: "هدفون بی‌سیم X100", category: "دیجیتال", stock: "۳ عدد", price: "۲,۵۴۰,۰۰۰" },
  { name: "کفش ورزشی ایرفلو", category: "پوشاک", stock: "۵ عدد", price: "۱,۸۹۰,۰۰۰" },
] as const;

const statusStyles: Record<string, string> = {
  processing: "bg-amber-100 text-amber-800",
  delivered: "bg-green-100 text-success",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">
        <div className="font-bold">داشبورد فروش</div>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-muted">مدیر کل — مریم صادقی</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-[13px] font-bold text-primary">
            م.ص
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-surface p-4 shadow-sm">
              <div className="text-[22px] font-extrabold">{stat.value}</div>
              <div className="mt-1 text-[12.5px] text-muted">{stat.label}</div>
              <div className={`mt-2 text-[11px] ${stat.tone === "primary" ? "text-primary" : "text-success"}`}>
                {stat.delta}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">روند فروش هفتگی</h3>
            <div className="flex h-56 items-center justify-center rounded-lg bg-[repeating-linear-gradient(45deg,var(--color-background),var(--color-background)_10px,var(--color-border)_10px,var(--color-border)_11px)] text-[13px] text-muted">
              نمودار فروش (Chart Placeholder)
            </div>
          </div>
          <div className="rounded-2xl bg-surface p-5 shadow-sm">
            <h3 className="mb-3.5 text-[15px] font-bold">افزودن محصول جدید</h3>
            <div className="rounded-2xl border-2 border-dashed border-border p-8 text-center text-[13px] text-muted">
              تصاویر محصول را اینجا رها کنید یا برای انتخاب کلیک کنید
            </div>
            <div className="mt-6 flex flex-col gap-2.5">
              <input placeholder="نام محصول" className="rounded-lg border border-border bg-background px-3 py-2.5" />
              <input placeholder="قیمت (تومان)" className="rounded-lg border border-border bg-background px-3 py-2.5" />
              <button className="rounded-lg bg-primary py-2.5 font-bold text-white">ثبت محصول</button>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-3.5 flex items-baseline justify-between">
          <h2 className="text-base font-bold">آخرین سفارش‌ها</h2>
          <a href="#" className="text-primary">
            مشاهده همه
          </a>
        </div>
        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">شماره</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">مشتری</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">مبلغ</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">وضعیت</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="border-t border-border p-3">{order.id}</td>
                <td className="border-t border-border p-3">{order.customer}</td>
                <td className="border-t border-border p-3">{order.amount}</td>
                <td className="border-t border-border p-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${statusStyles[order.tone]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="border-t border-border p-3">
                  <button className="rounded-md bg-indigo-100 px-2.5 py-1 text-[11.5px] text-indigo-800">مشاهده</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 mb-3.5">
          <h2 className="text-base font-bold">محصولات کم‌موجودی</h2>
        </div>
        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">محصول</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">دسته</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">موجودی</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">قیمت</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {lowStock.map((item) => (
              <tr key={item.name}>
                <td className="border-t border-border p-3">{item.name}</td>
                <td className="border-t border-border p-3">{item.category}</td>
                <td className="border-t border-border p-3">{item.stock}</td>
                <td className="border-t border-border p-3">{item.price}</td>
                <td className="border-t border-border p-3">
                  <button className="ml-1 rounded-md bg-indigo-100 px-2.5 py-1 text-[11.5px] text-indigo-800">ویرایش</button>
                  <button className="rounded-md bg-red-100 px-2.5 py-1 text-[11.5px] text-red-700">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
