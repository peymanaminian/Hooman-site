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

### GitHub Pages

این پروژه با ورک‌فلو `.github/workflows/deploy-pages.yml` به‌صورت خودکار در هر push به شاخه `main` روی GitHub Pages منتشر می‌شود (به آدرس `https://<username>.github.io/Hooman-site/`). این ورک‌فلو یک static export می‌سازد (`next build` با `DEPLOY_TARGET=github-pages` که `basePath`/`assetPrefix` را روی `/Hooman-site` تنظیم می‌کند، چون GitHub Pages این مخزن را از یک زیرمسیر سرو می‌کند نه ریشه دامنه).

**یک‌بار قبل از اولین اجرا** باید در تنظیمات مخزن، Pages را فعال کنید:
Settings → Pages → Build and deployment → Source: **GitHub Actions**

برای تست local همین حالت:

```bash
DEPLOY_TARGET=github-pages npm run build
npx serve out
```

### Vercel / Netlify

اگر بعداً به Vercel یا Netlify برگردید، نیازی به `DEPLOY_TARGET` نیست — چون این متغیر تنظیم نمی‌شود، برنامه به‌صورت کامل با سرور Next.js (نه static export) اجرا می‌شود؛ پیکربندی Netlify از پیش در `../netlify.toml` آماده است.

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
