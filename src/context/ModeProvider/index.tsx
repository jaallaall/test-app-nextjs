import { ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { customTheme } from "theme";
import { getDesignTokens } from "theme/palette";

export interface Mode {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "dark",
});

export const ColorModeProvider: React.FC<{
  locale?: string;
  children: React.ReactNode;
}> = ({ locale, children }): React.ReactElement => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [cookie, setCookie] = useCookies(["theme"]);

  useEffect(() => {
    if (cookie.theme) {
      setMode(cookie.theme.mode);
    }
  }, []);

  useEffect(() => {
    setCookie("theme", JSON.stringify({ mode }));
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () => customTheme(getDesignTokens(cookie.theme?.mode), locale),
    [cookie.theme, locale]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
