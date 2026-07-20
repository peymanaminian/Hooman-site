export function AdminTopbar({ title }: { title: string }) {
  return (
    <div className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">
      <div className="font-bold">{title}</div>
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-muted">مدیر کل — مریم صادقی</span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-[13px] font-bold text-primary">
          م.ص
        </div>
      </div>
    </div>
  );
}
