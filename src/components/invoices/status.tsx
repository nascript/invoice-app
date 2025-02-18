import { Chip } from "@mui/material"

export const getStatusChip = (status: string) => {
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
