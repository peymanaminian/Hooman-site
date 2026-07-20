"use client";

import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { DragHandle } from "@/components/admin/DragHandle";
import { sortedCategories, useShopCategoriesStore } from "@/store/shopCategories";
import { useHydrated } from "@/store/useHydrated";

export default function AdminCategoriesPage() {
  const items = useShopCategoriesStore((state) => state.items);
  const addCategory = useShopCategoriesStore((state) => state.addCategory);
  const deleteCategory = useShopCategoriesStore((state) => state.deleteCategory);
  const reorder = useShopCategoriesStore((state) => state.reorder);
  const hydrated = useHydrated(useShopCategoriesStore.persist);
  const [name, setName] = useState("");
  const [draggedSlug, setDraggedSlug] = useState<string | null>(null);

  function handleAdd() {
    if (!name.trim()) return;
    addCategory({ name: name.trim(), initial: name.trim().slice(0, 2) });
    setName("");
  }

  function handleDrop(targetSlug: string) {
    if (!draggedSlug || draggedSlug === targetSlug) return;
    const ordered = sortedCategories(items).map((item) => item.slug);
    const from = ordered.indexOf(draggedSlug);
    const to = ordered.indexOf(targetSlug);
    ordered.splice(from, 1);
    ordered.splice(to, 0, draggedSlug);
    reorder(ordered);
    setDraggedSlug(null);
  }

  if (!hydrated) return null;

  const orderedItems = sortedCategories(items);

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

        <p className="mb-2.5 text-xs text-muted">
          برای تغییر ترتیب نمایش در منو و صفحه اصلی، ردیف‌ها را از دستگیره جابه‌جا کنید.
        </p>
        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3" />
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">نام دسته</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((category) => (
              <tr
                key={category.slug}
                draggable
                onDragStart={() => setDraggedSlug(category.slug)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => handleDrop(category.slug)}
                className={draggedSlug === category.slug ? "opacity-40" : ""}
              >
                <td className="cursor-grab border-t border-border p-3 active:cursor-grabbing">
                  <DragHandle />
                </td>
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
