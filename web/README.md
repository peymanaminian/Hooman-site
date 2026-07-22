# Hooman Shop — Web App

پیاده‌سازی اولیه فروشگاه آنلاین چندمنظوره Hooman Shop، مطابق پیشنهاد پشته فناوری در `../docs/tech-stack.md`.

## پشته فناوری

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- Zustand برای وضعیت سبد خرید (persist شده در localStorage)
- Prisma ORM + PostgreSQL (`prisma/schema.prisma`، معادل `../database/schema.sql`)

## اجرا

```bash
npm install
npm run dev
```

سپس http://localhost:3000 را باز کنید.

## استقرار (Deploy)

این اپلیکیشن یک سرور واقعی Next.js لازم دارد (نه static export) چون ثبت‌نام/ورود از Server Actions و کوکی استفاده می‌کنند. میزبان فعلی **ParsPack PaaS** است.

متغیرهای محیطی لازم روی هاست:

```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
SESSION_SECRET=<با openssl rand -hex 32 بسازید>
# NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=<اختیاری، برای چند نمونه/ری‌استارت مکرر>
```

فایل نمونه: `.env.example`.

قبل از اولین اجرا روی هاست، مایگریشن‌های Prisma را روی دیتابیس واقعی اعمال کنید:

```bash
npx prisma migrate deploy
```

برای توسعه local:

```bash
npm install
npm run dev
```

سپس http://localhost:3000 را باز کنید.

فعلاً داده‌های محصولات/دسته‌بندی‌ها و سبد خرید به‌صورت mock در `src/lib/data.ts` و Zustand (`localStorage`) هستند؛ فقط احراز هویت (ثبت‌نام/ورود/خروج) به دیتابیس واقعی وصل است (`src/lib/auth.ts`, `src/lib/auth-actions.ts`). برای وصل کردن باقی داده‌ها به Prisma، توابع `src/lib/data.ts` و استورهای `src/store/*` را با کوئری‌های Prisma (`src/lib/prisma.ts`) جایگزین کنید.

## ساختار صفحات

| مسیر | توضیح |
|---|---|
| `/` | صفحه اصلی، دسته‌بندی‌ها، پیشنهاد ویژه، پرفروش‌ترین‌ها |
| `/category/[slug]` | لیست محصولات یک دسته |
| `/product/[slug]` | صفحه محصول، انتخاب تنوع، افزودن به سبد، محصولات مشابه |
| `/cart` | سبد خرید با مدیریت تعداد و کد تخفیف |
| `/checkout` | مراحل آدرس، ارسال و پرداخت |
| `/account` | پروفایل، امتیاز و سطح باشگاه مشتریان، سفارش‌های اخیر |
| `/admin` | داشبورد پنل مدیریت |
