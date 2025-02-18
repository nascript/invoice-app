import { z } from "zod";

export const invoiceSchema = z.object({
  name: z
    .string()
    .min(1, "Invoice name is required")
    .max(100, "Maximum 100 characters"),
  number: z.string().min(1, "Invoice number is required"),
  dueDate: z.string().min(1, "Due date is required"), 
  amount: z.number().min(1, "Amount must be greater than 0"),
  status: z.enum(["Paid", "Unpaid", "Pending"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
