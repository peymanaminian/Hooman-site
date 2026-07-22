"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction, type AuthFormState } from "@/lib/auth-actions";

const initialState: AuthFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-lg bg-primary py-2.5 font-bold text-white disabled:opacity-60"
    >
      {pending ? "در حال ورود..." : "ورود"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <div className="mx-auto max-w-sm py-10">
      <h1 className="mb-1 text-xl font-bold">ورود به حساب کاربری</h1>
      <p className="mb-6 text-[13px] text-muted">با ایمیل و رمز عبور خود وارد شوید.</p>

      <form action={formAction} className="rounded-2xl bg-surface p-6 shadow-sm">
        <label className="mb-3 block text-[13px] text-muted">
          ایمیل
          <input
            name="email"
            type="email"
            dir="ltr"
            required
            autoFocus
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-left text-foreground"
          />
        </label>

        <label className="mb-1 block text-[13px] text-muted">
          رمز عبور
          <input
            name="password"
            type="password"
            required
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
          />
        </label>

        {state.formError && <p className="mt-2 text-[12.5px] text-red-600">{state.formError}</p>}

        <SubmitButton />

        <p className="mt-4 text-center text-[13px] text-muted">
          حساب کاربری ندارید؟{" "}
          <Link href="/register" className="text-primary">
            ثبت‌نام
          </Link>
        </p>
      </form>
    </div>
  );
}
