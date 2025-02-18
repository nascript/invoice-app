

export const getLocalInvoices = () => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("invoices");
  return data ? JSON.parse(data) : [];
};

export const setLocalInvoices = (invoices: unknown[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("invoices", JSON.stringify(invoices));
};
