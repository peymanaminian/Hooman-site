import { AdminLoginGate } from "@/components/admin/AdminLoginGate";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLoginGate>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 bg-background">{children}</main>
      </div>
    </AdminLoginGate>
  );
}
