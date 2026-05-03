import { generateId } from "../utils/generateId";
import { useInvoiceStore } from "../redux/ItemRedux";
import { useClickActionStore } from "../redux/ClickActionRedux";
import {
  useFieldArray,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  invoiceSchema,
  type InvoiceValues,
} from "../lib/schema/invoice";
import type { UseInvoiceForm } from "../types/Types";

const useInvoiceForm = (id: string, status: string): UseInvoiceForm => {
  const { addInvoice, invoices } = useInvoiceStore();
  const set = useClickActionStore((state) => state.set);
  const getInvoice = invoices.find((i) => i.id === id);

  const items = [
    {
      name: "",
      quantity: 0,
      price: 0,
      id: generateId(),
    },
  ];

  const defaultInvoice = {
    invoiceDate: "",
    paymentTerms: undefined,
    projectDescription: "",
    toCountry: "",
    toPostCode: "",
    toCity: "",
    toStreetAddress: "",
    clientEmail: "",
    clientName: "",
    fromCountry: "",
    fromPostCode: "",
    fromCity: "",
    fromStreetAddress: "",
    items: items,
  };

  const updateDefault = id ? getInvoice : defaultInvoice;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
  } = useForm<InvoiceValues>({
    defaultValues: updateDefault,
    resolver: zodResolver(invoiceSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");

  const controlledItems = fields.map((field, index) => {
    return {
      ...field,
      ...watchItems[index],
    };
  });

  const onValid: SubmitHandler<InvoiceValues> = (data, e) => {
    const updatedItems = data.items.map((i) => {
      const total = i.price * i.quantity;
      return { ...i, total };
    });

    const updatedInvoice = { ...data, items: updatedItems };

    const itemtotal = updatedItems.reduce((sum, i) => sum + i.total, 0);

    const buttonId =
      (e?.nativeEvent as any).submitter?.id === "draft" ? "Draft" : "Pending";

    if (!id) {
      const invoice = {
        ...updatedInvoice,
        id: generateId().toUpperCase(),
        status: buttonId,
        total: itemtotal,
      };
      addInvoice(invoice);
    } else {
      const invoice = {
        ...updatedInvoice,
        id,
        status: status!,
        total: itemtotal,
      };
      addInvoice(invoice);
    }

    set({ toggleInvoiceModal: false });
  };

  return {
    onValid,
    controlledItems,
    register,
    errors,
    handleSubmit,
    append,
    remove,
    items,
  };
};

export default useInvoiceForm;
