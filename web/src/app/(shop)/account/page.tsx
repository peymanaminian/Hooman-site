import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { AccountView } from "./AccountView";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return <AccountView user={user} />;
}
