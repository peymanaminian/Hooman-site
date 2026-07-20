import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { staff } from "@/lib/admin-data";

export default function AdminStaffPage() {
  return (
    <>
      <AdminTopbar title="کارمندان و دسترسی‌ها" />
      <div className="p-6">
        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">نام</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">ایمیل</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">نقش</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.email}>
                <td className="border-t border-border p-3">{member.name}</td>
                <td className="border-t border-border p-3">{member.email}</td>
                <td className="border-t border-border p-3">{member.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
