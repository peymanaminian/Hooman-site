"use client";

import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { useAdminCategoriesStore } from "@/store/adminCategories";
import { useHydrated } from "@/store/useHydrated";

export default function AdminCategoriesPage() {
  const items = useAdminCategoriesStore((state) => state.items);
  const addCategory = useAdminCategoriesStore((state) => state.addCategory);
  const deleteCategory = useAdminCategoriesStore((state) => state.deleteCategory);
  const hydrated = useHydrated(useAdminCategoriesStore.persist);
  const [name, setName] = useState("");

  function handleAdd() {
    if (!name.trim()) return;
    addCategory(name.trim());
    setName("");
  }

  if (!hydrated) return null;

  return (
    <>
      <AdminTopbar title="مدیریت دسته‌بندی‌ها" />
      <div className="p-6">
        <div className="mb-6 rounded-2xl bg-surface p-5 shadow-sm">
          <h3 className="mb-3.5 text-[15px] font-bold">افزودن دسته‌بندی جدید</h3>
          <div className="flex gap-2.5">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="نام دسته‌بندی"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5"
            />
            <button onClick={handleAdd} className="rounded-lg bg-primary px-5 py-2.5 font-bold text-white">
              افزودن
            </button>
          </div>
        </div>

        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">نام دسته</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {items.map((category) => (
              <tr key={category.slug}>
                <td className="border-t border-border p-3">{category.name}</td>
                <td className="border-t border-border p-3">
                  <button
                    onClick={() => deleteCategory(category.slug)}
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
