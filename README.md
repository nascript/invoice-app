# Project Documentation

## Overview

This project implements an **Add Invoice Page** and a **My Invoices Page** based on a **Figma design** and the initial challenge requirements. It uses **Next.js (App Router) v14**, **React Hook Form** + **Zod** for validation, **MUI** for UI components, and **TypeScript** in strict mode. Invoice data is stored in **localStorage** so that it persists upon page refresh.

---

## Project Structure

```
src/
  app/
    invoices/
      add/
        page.tsx
      list/
        page.tsx
    layout.tsx
    globals.css
    page.tsx
  components/
    invoices/
      InvoiceForm.tsx
      InvoiceTable.tsx
      FormField.tsx
    layout/
      Sidebar.tsx
      Topbar.tsx
  constants/
    fieldstyles.ts
  lib/
    schemas/
      invoiceSchema.ts
    types/
      invoice.ts
  hooks/
    useInvoices.ts
  utils/
    localStorage.ts
    amountFormat.ts
```

---

## Pages and Key Features

### 1. Add Invoice Page (`/invoices/add`)

- **`page.tsx`**:
  - Initializes `useForm` (Zod + React Hook Form).
  - Generates an invoice number automatically (`INVxxxxxx`).
  - Calls **`InvoiceForm`** and shows a success banner after successful submission.

- **`InvoiceForm.tsx`**:
  - Fields:
    1. **Name** (required, min length = 1)
    2. **Number** (read-only, auto-generated)
    3. **Due Date** (date input)
    4. **Amount** (with `formatRupiah` and `parseRupiah`)
    5. **Status** (Paid, Unpaid, Pending)
  - Uses **Zod** for validation (`invoiceSchema`).
  - On submit, it calls `addInvoice()` from **`useInvoices()`**.

- **Success Notification**: A green banner below the form, showing “Invoice added successfully!” and extra info.

### 2. My Invoices Page (`/invoices/list`)

- **`page.tsx`**:
  - Displays the **title** “My Invoices.”
  - **Search** (rounded) and **Filter** (rounded) on the right, using MUI `<Select>`.
  - Wraps **`InvoiceTable`** in a card.
  - Filters invoices by `searchValue` (name/number) and `statusValue` (Paid/Unpaid/Pending).
  - Passes the filtered list to `<InvoiceTable />`.

- **`InvoiceTable.tsx`**:
  - Columns: Invoice (name + number), Due Date, Status (colored chips), Amount (Rupiah), and Actions (3-dot menu).
  - **Delete**: Calls `deleteInvoice(id)` from `useInvoices`.
  - **Edit**: Optional (shows an alert “Edit invoice ID …”).
  - **Search & Filter** states are stored in query params (`?search=xxx&status=Paid`) so users can share the link.

---

## Supporting Components

### **`Sidebar.tsx`**

- Displays the “InvoiceHub” logo (Passion One font), plus “Add Invoice” and “My Invoices” menu items.
- Uses `usePathname()` to detect active menu and highlight it (e.g., gray text).
- **Fixed** on the left (`position: "fixed"`, `width: 280px`).

### **`Topbar.tsx`**

- A header bar showing user info (avatar, name, verified icon), plus optional icons (home, chat).
- Some icons are circular with a mild background.

### **`FormField.tsx`**

- A reusable component for label + `<TextField>`.
- Takes `labelText`, an optional `required` prop, etc.

### **`useInvoices.ts`**

- Loads invoice data from localStorage on mount.
- Provides `addInvoice`, `deleteInvoice`, `updateInvoice`.
- Data is stored in React state to be shared among pages.

---

## Zod Schema (`invoiceSchema.ts`)

```ts
import { z } from "zod";

export const invoiceSchema = z.object({
  name: z.string().min(1, "Invoice name is required"),
  number: z.string().min(1, "Invoice number is required"),
  dueDate: z.string().min(1, "Due date is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  status: z.enum(["Paid", "Unpaid", "Pending"], {
    errorMap: () => ({ message: "Status is required" }),
  }),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
```

---

## Technical Decisions

1. **Next.js 14 App Router**: Facilitates nested routing in `app/` and a global `layout.tsx`.
2. **React Hook Form + Zod**: Simplifies form validation, integrates strongly with TypeScript.
3. **MUI**: Provides a robust set of UI components (TextField, Table, Select, etc.) plus theming.
4. **Local Storage**: Keeps invoice data persisted across refreshes without needing a backend.
5. **TypeScript**: Ensures type safety and fewer runtime errors.
6. **Responsive**: MUI’s Grid (`xs={12} md={6}` etc.) handles different screen sizes well.

---

## Setup Instructions

1. **Clone** the repository.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run** the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser. You’ll be redirected to `/invoices/list`.

---

## Challenge Requirements & How They Are Met

1. **Add Invoice Page**:
   - A clean form with name, number (auto “INV...”), due date, amount (formatted “Rp x,xxx”), status.
   - **Success banner** after submission.
   - Zod validation + React Hook Form.

2. **My Invoices Page**:
   - **Table**: columns for name & number, due date, status (colored chips), amount (rupiah), actions (3-dot).
   - **Search & status filter** → updates URL query params.
   - **Delete** invoice.
   - **Optional** edit (shows alert).
   - Pastel chip colors for Paid, Unpaid, Pending.

3. **Data Persistence**: localStorage prevents data loss on refresh.
4. **Loading & Error**: Minimal loading in the custom hook, Zod form errors.
5. **Responsive**: Uses MUI grid for layout.
6. **UI**: Matches the Figma design with rounded search, filter, status chips, etc.

---

## Conclusion

This project fulfills the challenge by:

- Providing **two main pages** (Add Invoice & My Invoices).
- **Form** with auto-generated invoice number, currency formatting, and validations.
- **Table** with searching, filtering, status chips, delete, optional edit.
- Using **Next.js 14**, **React Hook Form + Zod**, **MUI**, and **TypeScript**.
- Storing data in **localStorage** for persistence.
- Ensuring a **responsive** layout that closely follows the Figma design.

