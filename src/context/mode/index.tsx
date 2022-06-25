import { PaletteMode, useMediaQuery } from "@mui/material";
import { responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { customTheme } from "theme";
import { dark } from "theme/palette/dark";
import { light } from "theme/palette/light";

export interface Mode {
  toggleColorMode: Dispatch<SetStateAction<PaletteMode>>;
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const ColorModeProvider: React.FC<{
  locale?: string;
  children: React.ReactNode;
}> = ({ locale, children }): React.ReactElement => {
  const [cookie, setCookie] = useCookies();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode);

  useEffect(() => {
    if (cookie.mode) setMode(cookie.mode);
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
        setCookie("mode", mode === "light" ? "dark" : "light", {
          path: "/",
        });
      },
    }),
    [mode, setMode, setCookie]
  );

  let theme = useMemo(
    () =>
      customTheme(
        {
          mode: mode,
          ...(mode === "dark" ? light : dark),
        },
        locale
      ),
    [mode, locale]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
