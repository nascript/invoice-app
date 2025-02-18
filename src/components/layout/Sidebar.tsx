"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import {
  capitalLetterPathIcon,
  logoInvoiceHub,
  myInvoicePathIcon,
} from "@/assets/icons";

export default function Sidebar() {
  
  const pathname = usePathname();


  const isAddActive = pathname === "/invoices/add";
  const isListActive = pathname === "/invoices/list";

  return (
    <Box
      sx={{
        width: 280,
        position: "fixed", 
        top: 0,
        left: 0,
        bottom: 0, 
        bgcolor: "#1B1F2A",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        py: "29px",
        px: "38.5px",
      }}
    >
      
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Box
          sx={{
            width: 42,
            height: 44,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            src={logoInvoiceHub}
            alt="InvoiceHub Logo"
            width={42}
            height={42}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "#F4F4F4",
            fontFamily: "'Passion One', cursive",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "20px",
          }}
        >
          InvoiceHub
        </Typography>
      </Box>

      <Typography
        variant="subtitle2"
        sx={{ mb: 1, color: "#9CA3AF", mt: "30px" }}
      >
        MENU
      </Typography>

      <List sx={{ flex: 1, ml: "-15px" }}>
        
        <Link href="/invoices/add" style={{ textDecoration: "none" }}>
          <ListItemButton
            sx={{
              borderRadius: 1,
              mb: 1,

              color: !isAddActive ? "#9CA3AF" : "#FFFFFF",
            }}
          >
            <ListItemIcon
              sx={{
                color: !isAddActive ? "#9CA3AF" : "#FFFFFF",
                minWidth: 36,
              }}
            >
              <Image
                src={capitalLetterPathIcon}
                alt="Add Invoice Icon"
                width={20}
                height={20}
              />
            </ListItemIcon>
            <ListItemText primary="Add Invoice" />
          </ListItemButton>
        </Link>

        
        <Link href="/invoices/list" style={{ textDecoration: "none" }}>
          <ListItemButton
            sx={{
              borderRadius: 1,
              color: !isListActive ? "#9CA3AF" : "#FFFFFF",
            }}
          >
            <ListItemIcon
              sx={{
                color: !isListActive ? "#9CA3AF" : "#FFFFFF",
                minWidth: 36,
              }}
            >
              <Image
                src={myInvoicePathIcon}
                alt="My Invoices Icon"
                width={20}
                height={20}
              />
            </ListItemIcon>
            <ListItemText primary="My Invoices" />
          </ListItemButton>
        </Link>
      </List>
    </Box>
  );
}
