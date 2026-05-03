import {
  type FieldError,
  type UseFormRegister,
  type FieldErrors,
  type SubmitHandler,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormHandleSubmit,
} from "react-hook-form";
import type { InvoiceItem, InvoiceValues } from "../lib/schema/invoice";

// invoicemodal types
export type InvoiceModalProps = {
  id?: string;
  status?: string;
};

export type InputFieldProps = {
  id:
    | "items"
    | "projectDescription"
    | "paymentTerms"
    | "invoiceDate"
    | "toCountry"
    | "toPostCode"
    | "toCity"
    | "toStreetAddress"
    | "clientEmail"
    | "clientName"
    | "fromCountry"
    | "fromPostCode"
    | "fromCity"
    | "fromStreetAddress";
  name: string;
  mBottom?: string;
  register: UseFormRegister<InvoiceValues>;
  type?: string;
  error: FieldError;
};

// useform hook type
export type UseInvoiceForm = {
  onValid: SubmitHandler<InvoiceValues>;
  register: UseFormRegister<InvoiceValues>;
  errors: FieldErrors<InvoiceValues>;
  handleSubmit: UseFormHandleSubmit<InvoiceValues>;
  append: UseFieldArrayAppend<InvoiceValues>;
  remove: UseFieldArrayRemove;
  items: InvoiceItem[];
  controlledItems: InvoiceItem[];
};

// detail button type
export type DetailButtonProps = {
  status: string;
  id: string;
};

// invoice store types
export type InvoiceItems = {
  name: string;
  quantity: number;
  price: number;
  total: number;
  id: string;
};

export type Invoice = {
  id: string;
  invoiceDate: string;
  paymentTerms: "Net 1 Day" | "Net 7 Days" | "Net 14 Days" | "Net 30 Days";
  total: number;
  status: string;
  fromStreetAddress: string;
  fromCity: string;
  fromPostCode: string;
  fromCountry: string;
  clientName: string;
  clientEmail: string;
  toStreetAddress: string;
  toCity: string;
  toPostCode: string;
  toCountry: string;
  projectDescription: string;
  items: InvoiceItems[];
};

export type InvoiceState = {
  invoices: Invoice[];

  addInvoice: (item: Invoice) => void;
  deleteInvoice: (item: string) => void;
  updateStatus: (id: string) => void;
};

// detail store type
export type DetailState = {
  id: string;
  set: (partial: Partial<DetailState>) => void;
};

// click action store type
export type ClickActionState = {
  toggleInvoiceModal: boolean;
  toggleDeleteModal: boolean;
  toggleStatusModal: boolean;
  toggleTheme: "" | "dark";

  set: (partial: Partial<ClickActionState>) => void;
};