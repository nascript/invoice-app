import React from "react";
import {
  Typography,
  TextField,
  StandardTextFieldProps,
  Box,
} from "@mui/material";

interface FormFieldProps extends StandardTextFieldProps {
  labelText: string;
  required?: boolean;
}

export function FormField({ labelText, required, ...props }: FormFieldProps) {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
        {labelText}
        {required && <span style={{ color: "red" }}> *</span>}
      </Typography>
     
      <TextField fullWidth {...props} />
    </Box>
  );
}
