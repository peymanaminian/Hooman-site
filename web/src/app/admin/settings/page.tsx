"use client";

import { useState } from "react";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Hooman Shop");
  const [supportEmail, setSupportEmail] = useState("support@hoomanshop.ir");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("500000");
  const [savedAt, setSavedAt] = useState<string | null>(null);

  function handleSave() {
    setSavedAt(new Date().toLocaleTimeString("fa-IR"));
  }

  return (
    <>
      <AdminTopbar title="تنظیمات" />
      <div className="p-6">
        <div className="max-w-lg rounded-2xl bg-surface p-5 shadow-sm">
          <h3 className="mb-3.5 text-[15px] font-bold">تنظیمات عمومی فروشگاه</h3>
          <div className="flex flex-col gap-3">
            <label className="text-[13px] text-muted">
              نام فروشگاه
              <input
                value={storeName}
                onChange={(event) => setStoreName(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
              />
            </label>
            <label className="text-[13px] text-muted">
              ایمیل پشتیبانی
              <input
                value={supportEmail}
                onChange={(event) => setSupportEmail(event.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
              />
            </label>
            <label className="text-[13px] text-muted">
              حداقل مبلغ ارسال رایگان (تومان)
              <input
                value={freeShippingThreshold}
                onChange={(event) => setFreeShippingThreshold(event.target.value)}
                type="number"
                className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
              />
            </label>
          </div>
          <button onClick={handleSave} className="mt-4 rounded-lg bg-primary px-5 py-2.5 font-bold text-white">
            ذخیره تغییرات
          </button>
          {savedAt && <p className="mt-2.5 text-[12.5px] text-success">تغییرات در ساعت {savedAt} ذخیره شد.</p>}
        </div>
      </div>
    </>
  );
}
