# Hooman-site

فروشگاه آنلاین چندمنظوره (Multi-category E-commerce)

این مخزن شامل خروجی‌های طراحی و پیاده‌سازی اولیه پروژه است:

- **`web/`** — پیاده‌سازی واقعی و اجراشدنی فروشگاه با Next.js + TypeScript + Tailwind CSS + Prisma (جزئیات در `web/README.md`).
- **`wireframes/`** — وایرفریم/UI اولیه و قابل مشاهده در مرورگر برای صفحات اصلی سایت: صفحه اول (`index.html`)، صفحه محصول (`product.html`)، سبد خرید (`cart.html`)، تسویه حساب (`checkout.html`)، پنل کاربری و باشگاه مشتریان (`account.html`) و پنل مدیریت (`admin.html`). برای مشاهده، فایل‌ها را با یک سرور استاتیک (مثلاً `python3 -m http.server`) داخل پوشه `wireframes` اجرا کنید.
- **`docs/tech-stack.md`** — پیشنهاد پشته فناوری برای پیاده‌سازی پروژه.
- **`docs/database-schema.md`** — توضیح ساختار دیتابیس پیشنهادی.
- **`database/schema.sql`** — DDL کامل و اجرایی دیتابیس (PostgreSQL) شامل جداول کاربران، محصولات، سفارش‌ها، پرداخت، باشگاه مشتریان و پیشنهاد محصول (معادل `web/prisma/schema.prisma`).

## استقرار

سایت به‌صورت خودکار روی **GitHub Pages** منتشر می‌شود (`.github/workflows/deploy-pages.yml`، آدرس: `https://<username>.github.io/Hooman-site/`). جزئیات و نحوه فعال‌سازی یک‌باره Pages در `web/README.md` آمده است.
