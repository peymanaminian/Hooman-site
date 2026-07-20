"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { orderStatusLabels, orderStatusStyles } from "@/lib/admin-data";
import { useAdminOrdersStore } from "@/store/adminOrders";
import { useShopCategoriesStore } from "@/store/shopCategories";
import { useShopProductsStore } from "@/store/shopProducts";
import { useHydrated } from "@/store/useHydrated";

const LOW_STOCK_THRESHOLD = 6;

const stats = [
  { label: "سفارش امروز", value: "۲۴۸", delta: "▲ ۱۲٪ نسبت به دیروز", tone: "success" },
  { label: "فروش امروز (تومان)", value: "۳۸۹,۲۰۰,۰۰۰", delta: "▲ ۸٪", tone: "success" },
  { label: "مشتری جدید این ماه", value: "۱,۴۲۰", delta: "▲ ۵٪", tone: "success" },
] as const;

export default function AdminDashboardPage() {
  const orders = useAdminOrdersStore((state) => state.orders);
  const products = useShopProductsStore((state) => state.items);
  const addProduct = useShopProductsStore((state) => state.addProduct);
  const deleteProduct = useShopProductsStore((state) => state.deleteProduct);
  const categories = useShopCategoriesStore((state) => state.items);
  const hydrated = useHydrated(useShopProductsStore.persist);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  function handleAdd() {
    if (!title.trim() || !price || !categories[0]) return;
    addProduct({ title: title.trim(), categorySlug: categories[0].slug, price: Number(price), stock: 0 });
    setTitle("");
    setPrice("");
  }

  function categoryName(slug: string): string {
    return categories.find((category) => category.slug === slug)?.name ?? slug;
  }

  if (!hydrated) return null;

  const lowStock = products.filter((product) => product.stock <= LOW_STOCK_THRESHOLD);

  return (
    <>
      <AdminTopbar title="داشبورد فروش" />

      <div className="p-6">
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-surface p-4 shadow-sm">
              <div className="text-[22px] font-extrabold">{stat.value}</div>
              <div className="mt-1 text-[12.5px] text-muted">{stat.label}</div>
              <div className="mt-2 text-[11px] text-success">{stat.delta}</div>
            </div>
          ))}
          <div className="rounded-2xl bg-surface p-4 shadow-sm">
            <div className="text-[22px] font-extrabold">{lowStock.length.toLocaleString("fa-IR")}</div>
            <div className="mt-1 text-[12.5px] text-muted">محصول رو به اتمام</div>
            <div className="mt-2 text-[11px] text-primary">نیازمند بررسی</div>
          </div>
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
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="نام محصول"
                className="rounded-lg border border-border bg-background px-3 py-2.5"
              />
              <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                type="number"
                placeholder="قیمت (تومان)"
                className="rounded-lg border border-border bg-background px-3 py-2.5"
              />
              <button onClick={handleAdd} className="rounded-lg bg-primary py-2.5 font-bold text-white">
                ثبت محصول
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-3.5 flex items-baseline justify-between">
          <h2 className="text-base font-bold">آخرین سفارش‌ها</h2>
          <Link href="/admin/orders" className="text-primary">
            مشاهده همه
          </Link>
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border-t border-border p-3">{order.id}</td>
                <td className="border-t border-border p-3">{order.customer}</td>
                <td className="border-t border-border p-3">{order.amount.toLocaleString("fa-IR")} تومان</td>
                <td className="border-t border-border p-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${orderStatusStyles[order.status]}`}>
                    {orderStatusLabels[order.status]}
                  </span>
                </td>
                <td className="border-t border-border p-3">
                  <Link href="/admin/orders" className="rounded-md bg-indigo-100 px-2.5 py-1 text-[11.5px] text-indigo-800">
                    مشاهده
                  </Link>
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
            {lowStock.length === 0 && (
              <tr>
                <td className="border-t border-border p-3 text-muted" colSpan={5}>
                  در حال حاضر محصول کم‌موجودی وجود ندارد.
                </td>
              </tr>
            )}
            {lowStock.map((product) => (
              <tr key={product.slug}>
                <td className="border-t border-border p-3">{product.title}</td>
                <td className="border-t border-border p-3">{categoryName(product.categorySlug)}</td>
                <td className="border-t border-border p-3">{product.stock.toLocaleString("fa-IR")} عدد</td>
                <td className="border-t border-border p-3">{product.price.toLocaleString("fa-IR")}</td>
                <td className="border-t border-border p-3">
                  <Link
                    href="/admin/products"
                    className="ml-1 rounded-md bg-indigo-100 px-2.5 py-1 text-[11.5px] text-indigo-800"
                  >
                    ویرایش
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.slug)}
                    className="rounded-md bg-red-100 px-2.5 py-1 text-[11.5px] text-red-700"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
