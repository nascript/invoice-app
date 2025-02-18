"use client";

import React from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { InvoiceFormData } from "@/lib/schemas/invoiceSchema";
import { formatRupiah, parseRupiah } from "@/utils/amountFormat";

/**
 * Props yang dibutuhkan:
 * - formProps: object berisi register, control, errors, handleSubmit, dsb. dari react-hook-form
 * - onSubmit: function untuk handle submission (dipanggil di handleSubmit)
 */
interface InvoiceFormProps {
  formProps: UseFormReturn<InvoiceFormData>;
  onSubmit: (data: InvoiceFormData) => void;
}

export default function InvoiceForm({ formProps, onSubmit }: InvoiceFormProps) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = formProps;

  
  const textFieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1.5,
      height: 50,
      outline: "none",
      "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E2E8F0",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E2E8F0 !important",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#E2E8F0 !important",
      },
    },
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexGrow: 1 }}
    >
      <Grid container spacing={3}>
    
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Name <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your invoice name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={textFieldSx}
          />
        </Grid>

    
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Number <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter your invoice number"
            {...register("number")}
            error={!!errors.number}
            helperText={errors.number?.message}
            InputProps={{ readOnly: true }}
            sx={textFieldSx}
          />
        </Grid>

    
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Due Date <span style={{ color: "red" }}>*</span>
          </Typography>
          <TextField
            fullWidth
            placeholder="DD/MM/YYYY"
            type="date"
            {...register("dueDate")}
            error={!!errors.dueDate}
            helperText={errors.dueDate?.message}
            InputLabelProps={{ shrink: true }}
            sx={textFieldSx}
          />
        </Grid>

    
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Amount <span style={{ color: "red" }}>*</span>
          </Typography>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => {
              const displayValue = field.value ? formatRupiah(field.value) : "";
              const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                const parsed = parseRupiah(e.target.value);
                field.onChange(parsed);
              };

              return (
                <TextField
                  fullWidth
                  placeholder="Enter your invoice amount"
                  variant="outlined"
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  value={displayValue}
                  onChange={handleChange}
                  sx={textFieldSx}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{
                          backgroundColor: "#F3F4F6",
                          p: 3.3,
                          mr: 1,
                          ml: -1.6,
                          borderRight: "1px solid #E5E7EB",
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#6B7280",
                            fontWeight: 600,
                            fontSize: 16,
                          }}
                        >
                          Rp
                        </Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />
        </Grid>

    
        <Grid item xs={12} md={6}>
          <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
            Status <span style={{ color: "red" }}>*</span>
          </Typography>
          <FormControl fullWidth error={!!errors.status} variant="outlined">
            <Select
              {...register("status")}
              defaultValue=""
              displayEmpty
              sx={{
                borderRadius: 1.5,
                "& fieldset": {
                  borderColor: "#E2E8F0",
                },
                "&:hover fieldset": {
                  borderColor: "#E2E8F0 !important",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#E2E8F0 !important",
                },
              }}
              renderValue={(value) => {
                if (!value) {
                  return (
                    <span style={{ color: "#9CA3AF" }}>Choose the status</span>
                  );
                }
                return value as string;
              }}
            >
              <MenuItem value="" disabled>
                Choose the status
              </MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
            {!!errors.status && (
              <Typography variant="caption" color="error">
                {errors.status.message}
              </Typography>
            )}
          </FormControl>
        </Grid>
      </Grid>

    
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button
          variant="contained"
          type="submit"
          sx={{
            textTransform: "none",
            fontWeight: 600,
            width: 259,
            height: 50,
            borderRadius: 1.5,
            marginTop: 3,
          }}
        >
          + Add Invoice
        </Button>
      </Grid>
    </Box>
  );
}
