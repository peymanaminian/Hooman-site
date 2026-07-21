"use client";

import { useState } from "react";
import { useAdminAuthStore } from "@/store/adminAuth";
import { useHydrated } from "@/store/useHydrated";

export function AdminLoginGate({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAdminAuthStore((state) => state.isAuthenticated);
  const login = useAdminAuthStore((state) => state.login);
  const hydrated = useHydrated(useAdminAuthStore.persist);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setError(!login(username, password));
          }}
          className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-sm"
        >
          <h1 className="mb-1 text-lg font-bold">ورود به پنل مدیریت</h1>
          <p className="mb-5 text-[13px] text-muted">برای دسترسی به پنل مدیریت، نام کاربری و رمز عبور را وارد کنید.</p>

          <label className="mb-3 block text-[13px] text-muted">
            نام کاربری
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoFocus
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
            />
          </label>
          <label className="mb-1 block text-[13px] text-muted">
            رمز عبور
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
            />
          </label>

          {error && <p className="mt-2 text-[12.5px] text-red-600">نام کاربری یا رمز عبور اشتباه است.</p>}

          <button type="submit" className="mt-4 w-full rounded-lg bg-primary py-2.5 font-bold text-white">
            ورود
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
