"use client";

import { useState } from "react";

const RESUME_PHONE = "09945707865";

const OPEN_POSITIONS = [
  { title: "کارشناس پشتیبانی مشتریان", type: "تمام‌وقت", location: "تهران" },
  { title: "توسعه‌دهنده فرانت‌اند", type: "تمام‌وقت", location: "دورکار" },
  { title: "کارشناس انبار و لجستیک", type: "تمام‌وقت", location: "تهران" },
  { title: "کارشناس محتوا و شبکه‌های اجتماعی", type: "پاره‌وقت", location: "دورکار" },
];

export default function CareersPage() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(OPEN_POSITIONS[0].title);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  function handleSelectPosition(title: string) {
    setPosition(title);
    setSent(false);
    document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setError("لطفاً نام و شماره تماس خود را وارد کنید.");
      return;
    }
    setError(null);

    const body = [
      "درخواست همکاری - Hooman Shop",
      `موقعیت شغلی: ${position}`,
      `نام: ${fullName.trim()}`,
      `شماره تماس: ${phone.trim()}`,
      message.trim() ? `توضیحات: ${message.trim()}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`sms:${RESUME_PHONE}?body=${encodeURIComponent(body)}`, "_blank");
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="mb-2 text-2xl font-bold">فرصت‌های شغلی</h1>
      <p className="mb-8 text-sm leading-7 text-muted">
        اگر به کار در فضایی پویا و رو به رشد علاقه دارید، فرصت‌های شغلی فعلی ما را بررسی کنید و فرم زیر را تکمیل کنید.
        با ارسال فرم، برنامه پیام‌رسان دستگاه شما باز می‌شود و یک پیامک آماده برای شماره{" "}
        <bdi dir="ltr">{RESUME_PHONE}</bdi> ایجاد می‌کند تا آن را ارسال کنید.
      </p>

      <div className="mb-8 flex flex-col gap-3">
        {OPEN_POSITIONS.map((pos) => (
          <div key={pos.title} className="flex items-center justify-between rounded-2xl bg-surface p-4 shadow-sm">
            <div>
              <div className="font-bold">{pos.title}</div>
              <div className="mt-1 text-xs text-muted">
                {pos.type} — {pos.location}
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSelectPosition(pos.title)}
              className="rounded-full border border-primary px-4 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-white"
            >
              ارسال رزومه
            </button>
          </div>
        ))}
      </div>

      <form
        id="apply-form"
        onSubmit={handleSubmit}
        className="scroll-mt-24 rounded-2xl bg-surface p-5 shadow-sm"
      >
        <h2 className="mb-4 text-base font-bold">فرم ارسال رزومه</h2>

        <label className="mb-3 block text-[13px] text-muted">
          موقعیت شغلی
          <select
            value={position}
            onChange={(event) => setPosition(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
          >
            {OPEN_POSITIONS.map((pos) => (
              <option key={pos.title} value={pos.title}>
                {pos.title}
              </option>
            ))}
          </select>
        </label>

        <label className="mb-3 block text-[13px] text-muted">
          نام و نام خانوادگی
          <input
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
          />
        </label>

        <label className="mb-3 block text-[13px] text-muted">
          شماره تماس
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            type="tel"
            dir="ltr"
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-left text-foreground"
          />
        </label>

        <label className="mb-1 block text-[13px] text-muted">
          توضیحات تکمیلی (اختیاری)
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground"
          />
        </label>

        {error && <p className="mt-2 text-[12.5px] text-red-600">{error}</p>}
        {sent && (
          <p className="mt-2 text-[12.5px] text-success">
            برنامه پیام‌رسان شما باز شد. لطفاً پیامک آماده‌شده را ارسال کنید تا رزومه شما ثبت شود.
          </p>
        )}

        <button type="submit" className="mt-4 w-full rounded-lg bg-primary py-2.5 font-bold text-white">
          ارسال رزومه به صورت پیامک
        </button>
      </form>
    </div>
  );
}
