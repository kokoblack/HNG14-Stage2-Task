import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { invoiceData } from "../data/InvoiceData";
import type { InvoiceState } from "../types/Types";

export const useInvoiceStore = create<InvoiceState>()(
  persist(
    (set, get) => ({
      invoices: [invoiceData],

      addInvoice: (item) => {
        const { invoices } = get();

        const itemIndex = invoices.findIndex((i) => i.id === item.id);

        let updatedItem = [...invoices];

        if (itemIndex !== -1) {
          updatedItem[itemIndex] = item;
        } else {
          updatedItem = [...updatedItem, item];
        }

        set({
          invoices: updatedItem,
        });
      },

      deleteInvoice: (id) => {
        const { invoices } = get();

        const itemIndex = invoices.findIndex((i) => i.id === id);

        if (itemIndex === -1) return;

        const updatedItem = invoices.filter((item) => item.id !== id)

        set({
          invoices: updatedItem,
        });
      },

      updateStatus: (id) => {
        const { invoices } = get();

        const itemIndex = invoices.findIndex((i) => i.id === id);

        if (itemIndex === -1) return;

        const updatedInvoice = [...invoices];

        updatedInvoice[itemIndex] = {
          ...updatedInvoice[itemIndex],
          status: "Paid",
        };

        set({
          invoices: updatedInvoice,
        });
      },
    }),
    {
      name: "Invoice-storage",
      partialize: (state) => ({ invoices: state.invoices }),
      storage: createJSONStorage(() => sessionStorage), 
    },
  ),
);
