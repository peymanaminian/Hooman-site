import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { loyaltyTiers } from "@/lib/admin-data";

export default function AdminLoyaltyPage() {
  return (
    <>
      <AdminTopbar title="باشگاه مشتریان" />
      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {loyaltyTiers.map((tier) => (
            <div key={tier.name} className="rounded-2xl bg-surface p-5 shadow-sm">
              <div className="text-lg font-extrabold text-primary">{tier.name}</div>
              <div className="mt-1 text-[12.5px] text-muted">حداقل {tier.minPoints.toLocaleString("fa-IR")} امتیاز</div>
              <p className="mt-3 text-[13px]">{tier.perk}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
