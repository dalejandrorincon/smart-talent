import { AuthState } from "@types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        if (password.length >= 6) {
          const isAdmin = email.toLocaleLowerCase().includes("admin");
          const user = {
            id: uuidv4(),
            name: email.split("@")[0],
            email,
            isAdmin,
          };
          set({
            user,
            isAuthenticated: true,
          });
          return true;
        }
        return false;
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      checkIsAdmin: () => {
        const { user } = get();
        return user?.isAdmin || false;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
