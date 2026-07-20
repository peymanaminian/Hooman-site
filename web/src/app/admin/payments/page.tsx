import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { payments, paymentStatusLabels, paymentStatusStyles } from "@/lib/admin-data";

export default function AdminPaymentsPage() {
  return (
    <>
      <AdminTopbar title="تراکنش‌ها و پرداخت" />
      <div className="p-6">
        <table className="w-full overflow-hidden rounded-2xl bg-surface text-[13px] shadow-sm">
          <thead>
            <tr>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">شماره سفارش</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">درگاه</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">مبلغ</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">تاریخ</th>
              <th className="bg-background p-3 text-right text-[12.5px] text-muted">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.orderId}>
                <td className="border-t border-border p-3">{payment.orderId}</td>
                <td className="border-t border-border p-3">{payment.gateway}</td>
                <td className="border-t border-border p-3">{payment.amount.toLocaleString("fa-IR")} تومان</td>
                <td className="border-t border-border p-3">{payment.date}</td>
                <td className="border-t border-border p-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${paymentStatusStyles[payment.status]}`}
                  >
                    {paymentStatusLabels[payment.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
