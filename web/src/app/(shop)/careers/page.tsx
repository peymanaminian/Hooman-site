const OPEN_POSITIONS = [
  { title: "کارشناس پشتیبانی مشتریان", type: "تمام‌وقت", location: "تهران" },
  { title: "توسعه‌دهنده فرانت‌اند", type: "تمام‌وقت", location: "دورکار" },
  { title: "کارشناس انبار و لجستیک", type: "تمام‌وقت", location: "تهران" },
  { title: "کارشناس محتوا و شبکه‌های اجتماعی", type: "پاره‌وقت", location: "دورکار" },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-2 text-2xl font-bold">فرصت‌های شغلی</h1>
      <p className="mb-8 text-sm leading-7 text-muted">
        اگر به کار در فضایی پویا و رو به رشد علاقه دارید، فرصت‌های شغلی فعلی ما را بررسی کنید. برای ارسال رزومه،
        عنوان موقعیت شغلی مورد نظر را در ایمیل خود ذکر کرده و به آدرس <bdi dir="ltr">careers@hoomanshop.ir</bdi>{" "}
        ارسال کنید.
      </p>

      <div className="flex flex-col gap-3">
        {OPEN_POSITIONS.map((position) => (
          <div key={position.title} className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm">
            <div>
              <div className="font-bold">{position.title}</div>
              <div className="mt-1 text-xs text-muted">
                {position.type} — {position.location}
              </div>
            </div>
            <span className="rounded-full border border-primary px-4 py-1.5 text-xs font-bold text-primary">
              ارسال رزومه
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
