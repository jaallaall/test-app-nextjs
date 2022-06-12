import { createTheme } from "@mui/material/styles";
import { defaultStyles, fontFamily } from "./styles";
import { faIR, enUS } from "@mui/material/locale";
import { PaletteOptions } from "@mui/material";

export const customTheme = (palette?: PaletteOptions, dir?: "rtl" | "ltr") => {
  const locale = dir === "rtl" ? faIR : enUS;
  return createTheme(
    {
      // direction: dir,
      typography: {
        htmlFontSize: 16,
        fontSize: 14,
        ...(dir === "rtl" && {
          fontFamily: "dana",
        }),
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            fontFamily,
            defaultStyles,
            body: {
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              padding: 0,
              margin: 0,
              scrollBehavior: "smooth",
            },
            "#__next": {
              display: "inherit",
              flexDirection: "inherit",
              minHeight: "inherit",
            },
          },
        },
        MuiContainer: {
          styleOverrides: {
            root: {
              "&.MuiContainer-maxWidthSm": {
                maxWidth: 900,
              },
            },
          },
        },
        MuiTypography: {
          styleOverrides: {
            h4: ({ theme }) => ({
              fontSize: "1.5rem",
              fontWeight: 500,
              color: theme.palette.text.secondary,
            }),
            h5: ({ theme }) => ({
              fontSize: "1.25rem",
              fontWeight: 500,
              color: theme.palette.text.secondary,
            }),
            h6: ({ theme }) => ({
              fontSize: ".875rem",
              fontWeight: 500,
              color: theme.palette.text.secondary,
            }),
            caption: ({ theme }) => ({
              color: theme.palette.grey["500"],
            }),
            root: {
              textDecoration: "none",
              // fontSize: "0.875rem",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              direction: "inherit",
              boxShadow: "none",
              borderRadius: 16,
              position: "relative",
            },
            elevation0: ({ theme }) => ({
              backgroundColor: theme.palette.primary.light,
              color: "inherit",
              padding: 24,
              ...(palette?.mode === "light" && {
                boxShadow:
                  "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px",
              }),
            }),
            elevation1: ({ theme }) => ({
              backgroundColor: theme.palette.grey[200],
              color: theme.palette.text.secondary,
              padding: 16,
            }),
          },
        },
        MuiAlert: {
          styleOverrides: {
            filledSuccess: ({ theme }) => ({
              backgroundColor: theme.palette.info.main,
            }),
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: ({ theme }) => ({
              borderRadius: 6,
              color: theme.palette.text.secondary,
              direction: dir === "rtl" ? "ltr" : "ltr",
              "& .MuiSvgIcon-root": {
                color: "inherit",
              },
              "& .MuiIconButton-root": {
                color: "inherit",
              },
              "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.grey["100"] + "!important",
                color: theme.palette.grey["100"] + "!important",
              },
            }),
            notchedOutline: ({ theme }) => ({
              borderWidth: 1,
              borderColor: theme.palette.grey["100"],
            }),
          },
        },
        MuiInputBase: {
          styleOverrides: {
            input: {
              direction: "inherit",
            },
            root: ({ theme }) => ({
              direction: dir,
              "&.MuiInputBase-colorPrimary:not(.Mui-error)": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              },
              "&.MuiInputBase-colorSecondary:not(.Mui-error)": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.text.secondary + "!important",
                },
              },
              "&.MuiInputBase-colorInfo:not(.Mui-error)": {
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.info.main,
                },
              },
            }),
          },
        },
        MuiButton: {
          styleOverrides: {
            textSecondary: ({ theme }) => ({
              "&.Mui-disabled": {
                color: theme.palette.grey[100],
              },
            }),
            outlinedSecondary: ({ theme }) => ({
              "&.Mui-disabled": {
                color: theme.palette.grey[100],
                backgroundColor: theme.palette.grey[300],
                borderColor: theme.palette.grey[300],
              },
            }),
          },
        },
        MuiToolbar: {
          styleOverrides: {
            root: ({ theme }) => ({
              justifyContent: "space-between",
              alignItems: "flex-end",
              width: "100%",
              [theme.breakpoints.up("xs")]: {
                minHeight: "auto",
                paddingLeft: 0,
                paddingRight: 0,
              },
            }),
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: ({ theme }) => ({
              direction: dir === "rtl" ? "ltr" : "ltr",
              width: "100%",
              overflowY: "inherit",
              margin: 16,
              [theme.breakpoints.up("md")]: {
                margin: 0,
              },
              [theme.breakpoints.up("xs")]: {
                padding: 0,
              },
            }),
            root: {
              "& .MuiBox-root": {
                paddingTop: 0,
              },
            },
          },
        },
        MuiDialogContent: {
          styleOverrides: {
            root: {
              padding: 16,
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: ({ theme }) => ({
              color: theme.palette.grey[100],
            }),
          },
        },
      },
      palette,
    },
    locale
  );
};
