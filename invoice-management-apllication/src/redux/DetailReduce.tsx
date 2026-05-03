import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { DetailState } from "../types/Types";

export const useDetailStore = create<DetailState>()(
  persist(
    (set) => ({
      id: "",
      set,
    }),
    {
      name: "InvoiceID-storage",
      partialize: (state) => ({ id: state.id }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
