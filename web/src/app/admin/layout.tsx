const NAV_ITEMS = [
  "داشبورد",
  "محصولات",
  "دسته‌بندی‌ها",
  "سفارش‌ها",
  "مشتریان",
  "تخفیف‌ها و کوپن‌ها",
  "باشگاه مشتریان",
  "تراکنش‌ها و پرداخت",
  "کارمندان و دسترسی‌ها",
  "تنظیمات",
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[230px] shrink-0 bg-[#1b1d27] p-5 text-[#e5e7eb]">
        <div className="mb-6 px-2 text-lg font-extrabold text-white">Hooman Shop — مدیریت</div>
        <ul className="space-y-1">
          {NAV_ITEMS.map((item, index) => (
            <li
              key={item}
              className={`cursor-pointer rounded-lg px-3 py-2.5 text-[13.5px] ${
                index === 0 ? "bg-primary text-white" : "text-[#b7bccb] hover:bg-primary hover:text-white"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
}
