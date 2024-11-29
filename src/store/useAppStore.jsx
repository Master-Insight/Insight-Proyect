import { create } from "zustand";
import { persist } from "zustand/middleware";
import createAuthSlice from "./AuthSlice";

export const useAppStore = create(
  persist((set, get) => ({
    ...createAuthSlice(set, get),
  }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);