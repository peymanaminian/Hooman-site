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

فعلاً داده‌های محصولات/دسته‌بندی‌ها به‌صورت mock در `src/lib/data.ts` تعریف شده‌اند تا رابط کاربری بدون نیاز به دیتابیس واقعی قابل اجرا باشد. برای اتصال به دیتابیس واقعی:

1. یک دیتابیس PostgreSQL راه‌اندازی کنید و `DATABASE_URL` را در `.env` تنظیم کنید.
2. `npx prisma migrate dev` را اجرا کنید تا جداول بر اساس `prisma/schema.prisma` ساخته شوند.
3. توابع `src/lib/data.ts` را با کوئری‌های Prisma (`src/lib/prisma.ts`) جایگزین کنید.

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
