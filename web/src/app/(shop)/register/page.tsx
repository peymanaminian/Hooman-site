"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registerAction, type AuthFormState } from "@/lib/auth-actions";

const initialState: AuthFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-lg bg-primary py-2.5 font-bold text-white disabled:opacity-60"
    >
      {pending ? "در حال ثبت‌نام..." : "ثبت‌نام"}
    </button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-1 text-xl font-bold">ثبت‌نام در Hooman Shop</h1>
      <p className="mb-6 text-[13px] text-muted">برای خرید و پیگیری سفارش‌ها یک حساب کاربری بسازید.</p>

      <form action={formAction} className="rounded-2xl bg-surface p-6 shadow-sm">
        <label className="mb-3 block text-[13px] text-muted">
          نام و نام خانوادگی
          <input
            name="fullName"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
          />
          {state.fieldErrors?.fullName && <p className="mt-1 text-[12px] text-red-600">{state.fieldErrors.fullName}</p>}
        </label>

        <label className="mb-3 block text-[13px] text-muted">
          ایمیل
          <input
            name="email"
            type="email"
            dir="ltr"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-left text-foreground"
          />
          {state.fieldErrors?.email && <p className="mt-1 text-[12px] text-red-600">{state.fieldErrors.email}</p>}
        </label>

        <label className="mb-3 block text-[13px] text-muted">
          شماره موبایل (اختیاری)
          <input
            name="phone"
            type="tel"
            dir="ltr"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-left text-foreground"
          />
          {state.fieldErrors?.phone && <p className="mt-1 text-[12px] text-red-600">{state.fieldErrors.phone}</p>}
        </label>

        <label className="mb-3 block text-[13px] text-muted">
          رمز عبور
          <input
            name="password"
            type="password"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
          />
          {state.fieldErrors?.password && <p className="mt-1 text-[12px] text-red-600">{state.fieldErrors.password}</p>}
        </label>

        <label className="mb-1 block text-[13px] text-muted">
          تکرار رمز عبور
          <input
            name="confirmPassword"
            type="password"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
          />
          {state.fieldErrors?.confirmPassword && (
            <p className="mt-1 text-[12px] text-red-600">{state.fieldErrors.confirmPassword}</p>
          )}
        </label>

        {state.formError && <p className="mt-2 text-[12.5px] text-red-600">{state.formError}</p>}

        <SubmitButton />

        <p className="mt-4 text-center text-[13px] text-muted">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="text-primary">
            ورود
          </Link>
        </p>
      </form>
    </div>
  );
}
