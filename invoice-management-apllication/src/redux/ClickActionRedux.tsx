import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ClickActionState } from "../types/Types";

export const useClickActionStore = create<ClickActionState>()(
  persist(
    (set) => ({
      toggleInvoiceModal: false,
      toggleDeleteModal: false,
      toggleStatusModal: false,
      toggleTheme: "",
      set,
    }),
    {
      name: "InvoiceClickAction-storage",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
