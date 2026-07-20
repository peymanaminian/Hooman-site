"use client";

import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { categories } from "@/lib/data";
import { categoryName, useAdminProductsStore, type AdminProduct } from "@/store/adminProducts";
import { useHydrated } from "@/store/useHydrated";

export default function AdminProductsPage() {
  const items = useAdminProductsStore((state) => state.items);
  const addProduct = useAdminProductsStore((state) => state.addProduct);
  const updateProduct = useAdminProductsStore((state) => state.updateProduct);
  const deleteProduct = useAdminProductsStore((state) => state.deleteProduct);
  const hydrated = useHydrated(useAdminProductsStore.persist);

  const [title, setTitle] = useState("");
  const [categorySlug, setCategorySlug] = useState(categories[0].slug);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Pick<AdminProduct, "title" | "price" | "stock">>({
    title: "",
    price: 0,
    stock: 0,
  });

  function handleAdd() {
    if (!title.trim() || !price) return;
    addProduct({ title: title.trim(), categorySlug, price: Number(price), stock: Number(stock) || 0 });
    setTitle("");
    setPrice("");
    setStock("");
  }

  function startEdit(product: AdminProduct) {
    setEditingId(product.id);
    setEditValues({ title: product.title, price: product.price, stock: product.stock });
  }

  function saveEdit(id: string) {
    updateProduct(id, editValues);
    setEditingId(null);
  }

  if (!hydrated) return null;

  return (
    <>
      <AdminTopbar title="مدیریت محصولات" />
      <div className="p-6">
        <div className="mb-6 rounded-2xl bg-surface p-5 shadow-sm">
          <h3 className="mb-3.5 text-[15px] font-bold">افزودن محصول جدید</h3>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-4">
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="نام محصول"
              className="rounded-lg border border-border bg-background px-3 py-2.5"
            />
            <select
              value={categorySlug}
              onChange={(event) => setCategorySlug(event.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2.5"
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              type="number"
              placeholder="قیمت (تومان)"
              className="rounded-lg border border-border bg-background px-3 py-2.5"
            />
            <input
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              type="number"
              placeholder="موجودی"
              className="rounded-lg border border-border bg-background px-3 py-2.5"
            />
          </div>
          <button onClick={handleAdd} className="mt-3 rounded-lg bg-primary px-5 py-2.5 font-bold text-white">
            ثبت محصول
          </button>
        </div>

        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">محصول</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">دسته</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">قیمت</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">موجودی</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.id}>
                {editingId === product.id ? (
                  <>
                    <td className="border-t border-border p-3">
                      <input
                        value={editValues.title}
                        onChange={(event) => setEditValues((prev) => ({ ...prev, title: event.target.value }))}
                        className="w-full rounded-md border border-border bg-background px-2 py-1"
                      />
                    </td>
                    <td className="border-t border-border p-3">{categoryName(product.categorySlug)}</td>
                    <td className="border-t border-border p-3">
                      <input
                        value={editValues.price}
                        onChange={(event) =>
                          setEditValues((prev) => ({ ...prev, price: Number(event.target.value) }))
                        }
                        type="number"
                        className="w-28 rounded-md border border-border bg-background px-2 py-1"
                      />
                    </td>
                    <td className="border-t border-border p-3">
                      <input
                        value={editValues.stock}
                        onChange={(event) =>
                          setEditValues((prev) => ({ ...prev, stock: Number(event.target.value) }))
                        }
                        type="number"
                        className="w-20 rounded-md border border-border bg-background px-2 py-1"
                      />
                    </td>
                    <td className="border-t border-border p-3">
                      <button
                        onClick={() => saveEdit(product.id)}
                        className="ml-1 rounded-md bg-primary px-2.5 py-1 text-[11.5px] text-white"
                      >
                        ذخیره
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="rounded-md bg-background px-2.5 py-1 text-[11.5px]"
                      >
                        انصراف
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border-t border-border p-3">{product.title}</td>
                    <td className="border-t border-border p-3">{categoryName(product.categorySlug)}</td>
                    <td className="border-t border-border p-3">{product.price.toLocaleString("fa-IR")}</td>
                    <td className="border-t border-border p-3">{product.stock.toLocaleString("fa-IR")}</td>
                    <td className="border-t border-border p-3">
                      <button
                        onClick={() => startEdit(product)}
                        className="ml-1 rounded-md bg-indigo-100 px-2.5 py-1 text-[11.5px] text-indigo-800"
                      >
                        ویرایش
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-md bg-red-100 px-2.5 py-1 text-[11.5px] text-red-700"
                      >
                        حذف
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
