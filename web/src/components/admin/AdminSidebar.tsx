"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuthStore } from "@/store/adminAuth";
import { useSiteContentStore } from "@/store/siteContent";

const NAV_ITEMS = [
  { href: "/admin", label: "داشبورد" },
  { href: "/admin/appearance", label: "ظاهر فروشگاه" },
  { href: "/admin/products", label: "محصولات" },
  { href: "/admin/categories", label: "دسته‌بندی‌ها" },
  { href: "/admin/orders", label: "سفارش‌ها" },
  { href: "/admin/customers", label: "مشتریان" },
  { href: "/admin/coupons", label: "تخفیف‌ها و کوپن‌ها" },
  { href: "/admin/loyalty", label: "باشگاه مشتریان" },
  { href: "/admin/payments", label: "تراکنش‌ها و پرداخت" },
  { href: "/admin/staff", label: "کارمندان و دسترسی‌ها" },
  { href: "/admin/settings", label: "تنظیمات" },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const storeName = useSiteContentStore((state) => state.storeName);
  const logout = useAdminAuthStore((state) => state.logout);

  return (
    <aside className="flex w-[230px] shrink-0 flex-col bg-[#1b1d27] p-5 text-[#e5e7eb]">
      <div className="mb-6 px-2 text-lg font-extrabold text-white">{storeName} — مدیریت</div>
      <ul className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname?.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-lg px-3 py-2.5 text-[13.5px] ${
                  active ? "bg-primary text-white" : "text-[#b7bccb] hover:bg-primary hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        onClick={logout}
        className="mt-4 rounded-lg px-3 py-2.5 text-right text-[13.5px] text-[#b7bccb] hover:bg-primary hover:text-white"
      >
        خروج از پنل مدیریت
      </button>
    </aside>
  );
}
