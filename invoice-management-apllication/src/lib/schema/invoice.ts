// src/lib/schemas/invoice.ts
import { z } from "zod";

const addressSchema = {
  streetAddress: z
    .string()
    .trim()
    .min(1, "Can't be empty")
    .max(200, "Too long"),
  city: z.string().trim().min(1, "Fill").max(100),
  postCode: z.string().trim().min(1, "Fill").max(20),
  country: z.string().trim().min(1, "Fill").max(100),
};


export const invoiceItemSchema = z.object({
  name: z.string().trim().min(1).max(100),
  quantity: z.number().min(1, "QTY must be greater than 1").max(10, "QTY must not be greater than 10"),
  price: z.number().min(1),
  id: z.string()
});

export const invoiceSchema = z.object({

  fromStreetAddress: addressSchema.streetAddress,
  fromCity: addressSchema.city,
  fromPostCode: addressSchema.postCode,
  fromCountry: addressSchema.country,


  clientName: z.string().trim().min(1, "Can't be empty").max(100),
  clientEmail: z
    .email("Invalid email address")
    .trim()
    .min(1, "Can't be empty")
    .max(255),
  toStreetAddress: addressSchema.streetAddress,
  toCity: addressSchema.city,
  toPostCode: addressSchema.postCode,
  toCountry: addressSchema.country,


  invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  paymentTerms: z.enum(
    ["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"],
    { message: "Pick one" },
  ),
  projectDescription: z.string().trim().min(1, "Can't be empty").max(500),


  items: z.array(invoiceItemSchema).min(1, "Add an item"),
});

export type InvoiceValues = z.infer<typeof invoiceSchema>;
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;
