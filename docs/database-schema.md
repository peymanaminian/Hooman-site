# ساختار دیتابیس پیشنهادی

دیتابیس: **PostgreSQL**. فایل DDL کامل در `database/schema.sql` قرار دارد. در ادامه توضیح جداول به تفکیک حوزه آمده است.

## ۱. کاربران و احراز هویت
- **users**: اطلاعات پایه کاربر (نام، ایمیل، شماره موبایل، رمز عبور هش‌شده، وضعیت).
- **social_accounts**: اتصال حساب‌های اجتماعی (google/telegram/instagram) به `users` برای Social Login.
- **addresses**: آدرس‌های چندگانه هر کاربر برای ارسال.
- **admin_roles** / **admin_users**: نقش‌ها و سطوح دسترسی کارکنان پنل مدیریت (مدیر کل، مدیر محصول، پشتیبانی، انباردار).

## ۲. محصولات و دسته‌بندی
- **categories**: دسته‌بندی درختی (self-referencing `parent_id`) برای پشتیبانی از چندین دسته کالا.
- **products**: اطلاعات اصلی محصول (عنوان، توضیحات، قیمت پایه، دسته، برند، وضعیت انتشار).
- **product_variants**: تنوع محصول (رنگ/سایز) با قیمت و SKU مجزا.
- **product_images**: تصاویر محصول با ترتیب نمایش (برای آپلود Drag & Drop در پنل).
- **inventory**: موجودی هر تنوع محصول در انبار.
- **product_reviews**: نظرات و امتیاز کاربران روی محصول.
- **product_views**: تاریخچه بازدید کاربر از محصول (ورودی الگوریتم پیشنهاد).

## ۳. سبد خرید و سفارش
- **carts**: سبد خرید (برای کاربر مهمان با `session_id`، برای کاربر عضو با `user_id`).
- **cart_items**: اقلام داخل سبد خرید با تعداد.
- **coupons**: کدهای تخفیف (درصدی/مبلغ ثابت، تاریخ انقضا، حداقل سفارش، سقف استفاده).
- **orders**: سفارش نهایی (مبلغ کل، تخفیف، هزینه ارسال، وضعیت، آدرس ارسال).
- **order_items**: اقلام سفارش (کپی قیمت لحظه خرید).
- **payments**: تراکنش‌های پرداخت مرتبط با سفارش (درگاه، شناسه تراکنش، وضعیت).
- **wallet_transactions**: تراکنش‌های کیف پول داخلی کاربر (شارژ/برداشت/بازگشت وجه).

## ۴. باشگاه مشتریان
- **loyalty_tiers**: تعریف سطوح (برنزی/نقره‌ای/طلایی) و آستانه امتیاز هر سطح.
- **loyalty_points**: تراز امتیاز فعلی هر کاربر و سطح فعلی.
- **loyalty_point_transactions**: ریز تراکنش‌های کسب/مصرف امتیاز (لینک به سفارش).

## ۵. پیشنهاد محصول
- **product_recommendations**: نتایج پیش‌محاسبه‌شده "محصولات مشابه" و "خریداران این را هم خریده‌اند" (به‌روزرسانی دوره‌ای توسط job).

---

## دیاگرام رابطه‌ای (ساده‌شده)

```
users ──< addresses
users ──< social_accounts
users ──< carts ──< cart_items >── products/product_variants
users ──< orders ──< order_items >── products/product_variants
orders ──< payments
users ──< wallet_transactions
users ──1:1── loyalty_points ──< loyalty_point_transactions
loyalty_tiers ──< loyalty_points
categories ──< categories (self-ref)
categories ──< products ──< product_variants ──< inventory
products ──< product_images
products ──< product_reviews >── users
products ──< product_views >── users
products ──< product_recommendations >── products (related_product_id)
orders ──< coupons (many-to-many via order.coupon_id)
```

جزئیات ستون‌ها، کلیدها و ایندکس‌ها در `database/schema.sql` به‌صورت DDL اجرایی نوشته شده است.
