"use client";

import { useState, useEffect } from "react";
import { Invoice } from "@/lib/types/invoice";
import { getLocalInvoices, setLocalInvoices } from "@/utils/localStorage";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
   
    const localData = getLocalInvoices();
    setInvoices(localData);
  }, []);

  const addInvoice = (invoice: Invoice) => {
    const updated = [...invoices, invoice];
    setInvoices(updated);
    setLocalInvoices(updated);
  };

  const updateInvoice = (updatedInvoice: Invoice) => {
    const updatedList = invoices.map((inv) =>
      inv.id === updatedInvoice.id ? updatedInvoice : inv
    );
    setInvoices(updatedList);
    setLocalInvoices(updatedList);
  };

  const deleteInvoice = (id: string) => {
    const filtered = invoices.filter((inv) => inv.id !== id);
    setInvoices(filtered);
    setLocalInvoices(filtered);
  };

  return {
    invoices,
    addInvoice,
    updateInvoice,
    deleteInvoice,
  };
};
