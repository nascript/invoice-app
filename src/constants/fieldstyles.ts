export const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 1.5,
        height: 50,
    width: "100%",
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

export const selectFieldSx = {
  borderRadius: 1.5,
  width: "100%",
  "& fieldset": {
    borderColor: "#E2E8F0",
  },
  "&:hover fieldset": {
    borderColor: "#E2E8F0 !important",
  },
  "&.Mui-focused fieldset": {
    borderColor: "#E2E8F0 !important",
  },
};
