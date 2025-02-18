"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Card, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { invoiceSchema, InvoiceFormData } from "@/lib/schemas/invoiceSchema";
import { useInvoices } from "@/hooks/useInvoices";
import { Invoice } from "@/lib/types/invoice";
import InvoiceForm from "@/components/invoices/InvoiceForm"; 

export default function AddInvoicePage() {
  const { addInvoice } = useInvoices();
  const [showSuccess, setShowSuccess] = useState(false);

  
  const formProps = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: "",
      number: "",
      dueDate: "",
      amount: 0,
      status: undefined,
    },
  });

  const { reset, setValue } = formProps;

  
  useEffect(() => {
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    setValue("number", `INV${randomNumber}`);
  }, [setValue]);

  
  const onSubmit = (data: InvoiceFormData) => {
    const newInvoice: Invoice = {
      id: uuidv4(),
      ...data,
    };
    addInvoice(newInvoice);
    reset();
    setShowSuccess(true);
  };

  return (
    <Box sx={{ margin: "0 auto" }}>
      <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
        Add Invoice
      </Typography>

    
      <Card sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mx: 4, my: 1, fontWeight: 500 }}>
          Invoice Form
        </Typography>
        <Divider />

        <Card sx={{ p: 4, borderRadius: 2, boxShadow: "0", mb: 3 }}>
          
          <InvoiceForm formProps={formProps} onSubmit={onSubmit} />
        </Card>
      </Card>

    
      {showSuccess && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            p: 3,
            backgroundColor: "#ECFDF5",
            color: "#34D399",
            position: "relative",
            borderLeft: "5px solid #34D399",
          }}
        >
          <CheckCircleIcon sx={{ mt: "2px" }} />
          <Box>
            <Typography
              variant="body1"
              sx={{ fontWeight: 600, color: "#004434" }}
            >
              Invoice added successfully!
            </Typography>
            <Typography variant="body2" sx={{ color: "#637381" }}>
              You can view and manage your invoice in the &quot;My
              Invoices&quot; section.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
