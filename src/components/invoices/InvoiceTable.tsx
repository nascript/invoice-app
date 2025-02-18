"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Invoice } from "@/lib/types/invoice";
import Image from "next/image"
import { morePathIcon } from "@/assets/icons"

interface InvoiceTableProps {
  invoices: Invoice[];
  onDelete: (id: string) => void;
  onEdit?: (invoice: Invoice) => void;
}

export default function InvoiceTable({
  invoices,
  onDelete,
  onEdit,
}: InvoiceTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    invoice: Invoice
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoice(invoice);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoice(null);
  };

  const handleEditClick = () => {
    if (selectedInvoice && onEdit) {
      onEdit(selectedInvoice);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    if (selectedInvoice) {
      onDelete(selectedInvoice.id);
    }
    handleMenuClose();
  };


  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };


  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };


  const getStatusChip = (status: string) => {
    switch (status) {
      case "Paid":
        return (
          <Chip
            label="Paid"
            sx={{ bgcolor: "#ECFDF5", color: "#027A48", fontWeight: 500 }}
          />
        );
      case "Unpaid":
        return (
          <Chip
            label="Unpaid"
            sx={{ bgcolor: "#FEE4E2", color: "#B42318", fontWeight: 500 }}
          />
        );
      case "Pending":
        return (
          <Chip
            label="Pending"
            sx={{ bgcolor: "#FEFCE8", color: "#9A6E03", fontWeight: 500 }}
          />
        );
      default:
        return <Chip label={status} />;
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
      }}
    >
      <Table
        sx={{ minWidth: 650, borderCollapse: "separate", borderSpacing: 0 }}
      >
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F8FAFB",
            }}
          >
            <TableCell sx={{ fontWeight: 600 }}>Invoice</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
            <TableCell sx={{ fontWeight: 600, textAlign: "center" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {invoices.map((inv) => (
            <TableRow key={inv.id} hover>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {inv.name}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {inv.number}
                </Typography>
              </TableCell>

              <TableCell>{formatDate(inv.dueDate)}</TableCell>

              <TableCell>{getStatusChip(inv.status)}</TableCell>

              <TableCell>{formatRupiah(inv.amount)}</TableCell>

              <TableCell align="center">
                <IconButton onClick={(e) => handleMenuOpen(e, inv)}>
                  <Image
                    src={morePathIcon}
                    alt="InvoiceHub Logo"
                    width={20}
                    height={20}
                  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {invoices.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No invoices found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: "error.main" }}>
          Delete
        </MenuItem>
      </Menu>
    </TableContainer>
  );
}
