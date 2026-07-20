import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { customers } from "@/lib/admin-data";

export default function AdminCustomersPage() {
  return (
    <>
      <AdminTopbar title="مشتریان" />
      <div className="p-6">
        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">نام</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">شماره تماس</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">تعداد سفارش</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">مجموع خرید</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">سطح باشگاه</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.phone}>
                <td className="border-t border-border p-3">{customer.name}</td>
                <td className="border-t border-border p-3">{customer.phone}</td>
                <td className="border-t border-border p-3">{customer.ordersCount.toLocaleString("fa-IR")}</td>
                <td className="border-t border-border p-3">{customer.totalSpent.toLocaleString("fa-IR")} تومان</td>
                <td className="border-t border-border p-3">{customer.tier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
