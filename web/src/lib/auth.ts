import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

export type CurrentUser = {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const userId = verifySessionToken(token);
  if (!userId) return null;

  let user;
  try {
    user = await prisma.user.findUnique({ where: { id: BigInt(userId) } });
  } catch {
    return null;
  }
  if (!user || user.status !== "active") return null;

  return {
    id: user.id.toString(),
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
  };
}
