"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import lightTheme from "@/theme/lightTheme";
import darkTheme from "@/theme/darkTheme";

type ThemeMode = "light" | "dark";

interface ThemeContextProps {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: "light",
  toggleTheme: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("light");

  
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode === "dark") {
      setMode("dark");
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const nextMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", nextMode);
      return nextMode;
    });
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
