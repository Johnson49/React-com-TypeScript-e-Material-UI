import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "../themes";
import { Box } from '@mui/system'


interface IThemeContextDate {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

interface IProps {
  children: React.ReactNode;
}

const themeContext = createContext({} as IThemeContextDate);

export const useAppThemeContext = () =>{
    return useContext(themeContext);
}

export const AppThemeProvider: React.FC<IProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

    const toggleTheme = useCallback(() =>{
        setThemeName(oldThemeName => oldThemeName === "light" ? "dark" : "light")
    }, [])
    
    const theme = useMemo(() =>{
        if (themeName === "light") return LightTheme;

        return DarkTheme;
    }, [themeName])

  return (
    <themeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
            {children}
        </Box>
        </ThemeProvider>
    </themeContext.Provider>
  );
};
