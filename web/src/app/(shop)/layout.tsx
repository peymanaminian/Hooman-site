import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getCurrentUser } from "@/lib/auth";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader currentUser={currentUser} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-5">{children}</main>
      <SiteFooter />
    </div>
  );
}
