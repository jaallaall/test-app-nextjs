import CacheProviderRtl from "@mui/CacheProvider";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { customTheme } from "theme";
import { getDesignTokens } from "theme/palette";

export interface Mode {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export interface Dir {
  toggleDirectionModeRtl: () => void;
  toggleDirectionModeLtr: () => void;
  dir: "rtl" | "ltr";
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "dark",
});

export const DirectionModeContext = createContext({
  toggleDirectionModeRtl: () => {},
  toggleDirectionModeLtr: () => {},
  dir: "rtl",
});

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactElement => {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [dir, setDir] = useState<"rtl" | "ltr">("rtl");
  const [cookie, setCookie] = useCookies(["theme"]);

  useEffect(() => {
    if (cookie.theme) {
      setMode(cookie.theme.mode);
      setDir(cookie.theme.dir);
    }
  }, []);

  useEffect(() => {
    setCookie("theme", JSON.stringify({ mode, dir }));
  }, [mode, dir]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
      },
      mode,
    }),
    [mode]
  );

  const directionMode = useMemo(
    () => ({
      toggleDirectionModeRtl: () => {
        // i18n?.changeLanguage("fa");
        setDir("rtl");
      },
      toggleDirectionModeLtr: () => {
        setDir("ltr");
      },
      dir,
    }),
    [dir]
  );

  const theme = useMemo(
    () => customTheme(getDesignTokens(cookie.theme?.mode), cookie.theme?.dir),
    [cookie.theme]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <DirectionModeContext.Provider value={directionMode}>
        <CacheProviderRtl direction={dir}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProviderRtl>
      </DirectionModeContext.Provider>
    </ColorModeContext.Provider>
  );
};
