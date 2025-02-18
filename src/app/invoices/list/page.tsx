"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";
import { searchPathIcon} from "../../../assets/icons/index";
import { styled } from "@mui/material/styles";

import { useInvoices } from "@/hooks/useInvoices";
import { Invoice } from "@/lib/types/invoice";
import InvoiceTable from "@/components/invoices/InvoiceTable";


import { TextField, Select } from "@mui/material";
import Image from "next/image"

const StyledSearchField = styled(TextField)(() => ({
  width: 240,
  borderRadius: "7px",
  backgroundColor: "#FFFFFF",
  border: "0px solid #E2E8F0",
  
  "& .MuiOutlinedInput-root": {
    borderRadius: "7px",
    border: "0px solid #E2E8F0",
    "&:hover fieldset": {
      borderColor: "#E2E8F0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E2E8F0",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E2E8F0",
  },
  
  "& .MuiInputBase-input::placeholder": {
    color: "#9CA3AF",
    opacity: 1,
  },
  
  "& .MuiSvgIcon-root": {
    color: "#9CA3AF",
  },
  
  "& .MuiInputBase-input": {
    color: "#6B7280",
  },
}));


const StyledSelect = styled(Select)(() => ({
  width: 160,
  backgroundColor: "#FFFFFF",
  "& .MuiOutlinedInput-root": {
    borderRadius: 20,
    border: "1px solid #E2E8F0",
    "&:hover fieldset": {
      borderColor: "#E2E8F0",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#E2E8F0",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E2E8F0",
  },
  
  "& .MuiSvgIcon-root": {
    color: "#9CA3AF",
  },
  
  "& .MuiInputBase-input": {
    color: "#6B7280",
    padding: "6px 10px", 
  },
}));

export default function InvoiceListPage() {
  const { invoices, deleteInvoice } = useInvoices();
  const router = useRouter();
  const searchParams = useSearchParams();

  
  const searchQuery = searchParams.get("search") || "";
  const statusQuery = searchParams.get("status") || "";

  const [searchValue, setSearchValue] = useState(searchQuery);
  const [statusValue, setStatusValue] = useState(statusQuery);

  
  const updateQueryParams = (paramName: string, value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      current.set(paramName, value);
    } else {
      current.delete(paramName);
    }
    router.replace(`?${current.toString()}`);
  };

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    updateQueryParams("search", e.target.value);
  };

  
  const handleStatusChange = (e: SelectChangeEvent<unknown>) => {
    setStatusValue(e.target.value as string);
    updateQueryParams("status", e.target.value as string);
  };

  
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchSearch =
        inv.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        inv.number.toLowerCase().includes(searchValue.toLowerCase());
      const matchStatus = statusValue
        ? inv.status.toLowerCase() === statusValue.toLowerCase()
        : true;
      return matchSearch && matchStatus;
    });
  }, [invoices, searchValue, statusValue]);

  const handleDelete = (id: string) => {
    deleteInvoice(id);
  };
  const handleEdit = (invoice: Invoice) => {
    alert(`Edit invoice ID: ${invoice.id}`);
  };

  return (
    <Box>
      
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          My Invoices
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          
          <StyledSearchField
            placeholder="Search"
            variant="outlined"
            size="small"
            value={searchValue}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Image
                    src={searchPathIcon}
                    alt="Search Icon"
                    width={20}
                    height={20}
                  />
                </InputAdornment>
              ),
            }}
          />

          
          <StyledSelect
            value={statusValue}
            onChange={handleStatusChange}
            displayEmpty
            size="small"
            
            renderValue={(selected: unknown) => {
              if (!selected) {
                return <span style={{ color: "#9CA3AF" }}>All Status</span>;
              }
              return selected as string;
            }}
          >
            <MenuItem value="">All Status</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </StyledSelect>
        </Box>
      </Box>

      
      <Card
        sx={{
          p: 3,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <InvoiceTable
          invoices={filteredInvoices}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </Card>
    </Box>
  );
}
