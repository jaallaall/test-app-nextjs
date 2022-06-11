import { PaletteMode } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";

export const getDesignTokens = (mode?: PaletteMode) => {
  return {
    mode,
    ...(mode !== "light"
      ? {
          primary: {
            light: "rgb(33, 43, 53)",
            main: "rgb(22, 27, 37)",
            dark: "rgb(52, 61, 72)",
            contrastText: "#fff",
          },
          secondary: {
            light: "rgba(255, 168, 46, 0.08)",
            main: "rgb(255, 168, 46)",
            dark: "rgb(251, 147, 0)",
          },
          warning: {
            main: "rgb(244, 67, 54)",
            dark: "#fe6c6c",
          },
          error: {
            main: "#fe6c6c",
          },
          grey: {
            "100": "rgb(121, 131, 142)",
            "200": "rgb(52, 61, 72)",
            "300": "rgba(255, 255, 255, 0.12)",
          },
          background: {
            default: "rgb(22, 27, 37)",
            paper: "#fff",
          },
          divider: "rgba(0, 0, 0, 0.04)",
          text: {
            primary: "rgb(121, 131, 142)",
            secondary: "#fff",
          },
        }
      : {
          primary: {
            light: "#fff",
            main: "#fff",
            dark: "#fff",
            contrastText: "rgb(221, 221, 221)",
          },
          secondary: {
            light: "rgba(255, 168, 46, 0.08)",
            main: "rgb(255, 168, 46)",
            dark: "rgb(251, 147, 0)",
          },
          warning: {
            main: "rgb(244, 67, 54)",
            dark: "#fe6c6c",
          },
          error: {
            main: "#fe6c6c",
          },
          grey: {
            "100": "rgb(121, 131, 142)",
            "200": "rgb(52, 61, 72)",
            "300": "rgba(255, 255, 255, 0.12)",
          },
          background: {
            default: "#fff",
            paper: "#fff",
          },
          divider: "rgba(0, 0, 0, 0.04)",
          text: {
            primary: "rgb(121, 131, 142)",
            secondary: "rgb(221, 221, 221)",
          },
        }),
  };
};
