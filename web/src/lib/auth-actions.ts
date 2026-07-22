"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS } from "@/lib/session";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthFormState = {
  formError?: string;
  fieldErrors?: Partial<Record<"fullName" | "email" | "phone" | "password" | "confirmPassword", string>>;
};

async function setSessionCookie(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionToken(userId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function registerAction(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const fieldErrors: AuthFormState["fieldErrors"] = {};
  if (fullName.length < 2) fieldErrors.fullName = "نام باید حداقل ۲ حرف باشد.";
  if (!EMAIL_PATTERN.test(email)) fieldErrors.email = "ایمیل معتبر نیست.";
  if (password.length < 8) fieldErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد.";
  if (password !== confirmPassword) fieldErrors.confirmPassword = "رمز عبور و تکرار آن یکسان نیستند.";

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, ...(phone ? [{ phone }] : [])] },
  });
  if (existing) {
    return {
      fieldErrors: existing.email === email ? { email: "این ایمیل قبلاً ثبت شده است." } : { phone: "این شماره قبلاً ثبت شده است." },
    };
  }

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      phone: phone || null,
      passwordHash: hashPassword(password),
    },
  });

  await setSessionCookie(user.id.toString());
  redirect("/account");
}

export async function loginAction(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { formError: "ایمیل و رمز عبور را وارد کنید." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash)) {
    return { formError: "ایمیل یا رمز عبور اشتباه است." };
  }
  if (user.status !== "active") {
    return { formError: "این حساب کاربری غیرفعال است." };
  }

  await setSessionCookie(user.id.toString());
  redirect("/account");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/");
}
