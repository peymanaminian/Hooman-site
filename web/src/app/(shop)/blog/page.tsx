const POSTS = [
  {
    title: "۵ نکته برای انتخاب هدفون بی‌سیم مناسب",
    excerpt: "قبل از خرید هدفون بی‌سیم به این نکات مهم درباره کیفیت صدا، باتری و اتصال بلوتوث توجه کنید.",
    date: "۱۴۰۵/۰۴/۱۰",
    category: "دیجیتال",
  },
  {
    title: "راهنمای انتخاب کفش مناسب برای دویدن",
    excerpt: "چطور کفش ورزشی مناسب پای خودتان را پیدا کنید تا از آسیب‌های رایج دویدن جلوگیری شود.",
    date: "۱۴۰۵/۰۳/۲۲",
    category: "ورزش",
  },
  {
    title: "چیدمان و دکوراسیون خانه با بودجه محدود",
    excerpt: "با چند تغییر کوچک و کم‌هزینه می‌توانید فضای خانه خود را کاملاً متحول کنید.",
    date: "۱۴۰۵/۰۳/۰۵",
    category: "لوازم خانه",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-2 text-2xl font-bold">وبلاگ</h1>
      <p className="mb-8 text-sm text-muted">مقالات، راهنماها و اخبار تازه از دنیای محصولات {`Hooman Shop`}.</p>

      <div className="flex flex-col gap-4">
        {POSTS.map((post) => (
          <article key={post.title} className="rounded-2xl bg-surface p-5 shadow-sm">
            <div className="mb-2 flex items-center gap-2 text-xs text-muted">
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-bold text-primary">{post.category}</span>
              <span>{post.date}</span>
            </div>
            <h2 className="mb-1.5 text-base font-bold">{post.title}</h2>
            <p className="text-sm text-muted">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
