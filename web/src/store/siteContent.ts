import { create } from "zustand";
import { persist } from "zustand/middleware";

type SiteContent = {
  storeName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroCtaLabel: string;
};

type SiteContentState = SiteContent & {
  update: (patch: Partial<SiteContent>) => void;
};

export const useSiteContentStore = create<SiteContentState>()(
  persist(
    (set) => ({
      storeName: "Hooman Shop",
      heroTitle: "جشنواره تابستانه Hooman Shop",
      heroSubtitle: "تا ۴۰٪ تخفیف روی هزاران کالای متنوع + ارسال رایگان",
      heroCtaLabel: "مشاهده تخفیف‌ها",
      update: (patch) => set(patch),
    }),
    { name: "hooman-shop-site-content" }
  )
);
