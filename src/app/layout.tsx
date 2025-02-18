"use client";

import { ReactNode } from "react";
import ThemeContextProvider from "@/context/ThemeContext";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeContextProvider>
          <CssBaseline />
          <Box
            sx={{
              ml: "280px", 
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Sidebar />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <Topbar />
              <Box component="main" sx={{ px: "136px", py: "52px", flex: 1 }}>
                {children}
              </Box>
            </Box>
          </Box>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
