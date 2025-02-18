"use client";

import { Box, Avatar, Typography, IconButton, Badge, FormControlLabel, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useThemeContext } from "@/context/ThemeContext";

const CircleIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#EEF2F6" : "#3A3A3A",
  borderRadius: "50%",
  width: 40,
  height: 40,
  "&:hover": {
    backgroundColor: theme.palette.mode === "light" ? "#E2E8F0" : "#4A4A4A",
  },
}));

export default function Topbar() {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Box
      component="header"
      sx={{
        height: 80,
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        bgcolor: "background.paper",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        gap: 2,
      }}
    >
    
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 3 }}>
        <FormControlLabel
          label=""
          control={
            <Switch
              checked={mode === "dark"}
              onChange={toggleTheme}
              color="primary"
            />
          }
          sx={{ m: 0 }}
        />

    
        <CircleIconButton>
          <NotificationsNoneIcon sx={{ color: "text.secondary" }} />
        </CircleIconButton>

    
        <Badge
          variant="dot"
          color="error"
          overlap="circular"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <CircleIconButton>
            <ChatBubbleOutlineIcon sx={{ color: "text.secondary" }} />
          </CircleIconButton>
        </Badge>
      </Box>

      
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
    
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            John Doe
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <CheckCircleIcon sx={{ fontSize: 14, color: "primary.main" }} />
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              Verified Member
            </Typography>
          </Box>
        </Box>

    
        <Avatar
          src="https://i.pravatar.cc/300"
          alt="User Avatar"
          sx={{ width: 40, height: 40 }}
        />

    
        <KeyboardArrowDownIcon sx={{ color: "text.secondary" }} />
      </Box>
    </Box>
    
  );
}
