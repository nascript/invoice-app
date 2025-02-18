"use client";

import React from "react";
import {
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  Typography,
  TextField,
} from "@mui/material";
import { Controller, UseFormReturn } from "react-hook-form";
import { InvoiceFormData } from "@/lib/schemas/invoiceSchema";
import { formatRupiah, parseRupiah } from "@/utils/amountFormat";
import { FormField } from "./FormField"; 
import { selectFieldSx, textFieldSx } from "@/constants/fieldstyles"

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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ flexGrow: 1 }}
    >
      <Grid container spacing={3}>
        
        <Grid item xs={12} md={6}>
          <FormField
            labelText="Name"
            required
            placeholder="Enter your invoice name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={textFieldSx}
          />
        </Grid>

        
        <Grid item xs={12} md={6}>
          <FormField
            labelText="Number"
            required
            placeholder="Enter your invoice number"
            {...register("number")}
            error={!!errors.number}
            helperText={errors.number?.message}
            InputProps={{ readOnly: true }}
            sx={textFieldSx}
          />
        </Grid>

        
        <Grid item xs={12} md={6}>
          <FormField
            labelText="Due Date"
            required
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
                field.onChange(parseRupiah(e.target.value));
              };

              return (
                <Box>
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
                </Box>
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
              sx={selectFieldSx}
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
