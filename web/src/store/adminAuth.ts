import { create } from "zustand";
import { persist } from "zustand/middleware";

const ADMIN_USERNAME = "hooman12";
const ADMIN_PASSWORD = "hooman1391";

type AdminAuthState = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

export const useAdminAuthStore = create<AdminAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username, password) => {
        const ok = username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
        if (ok) set({ isAuthenticated: true });
        return ok;
      },
      logout: () => set({ isAuthenticated: false }),
    }),
    { name: "hooman-shop-admin-auth" }
  )
);
