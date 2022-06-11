import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export const useMediaQury = () => {
  const matchsSm = useMediaQuery(({ breakpoints }: Theme) =>
    breakpoints.up("sm")
  );
  const matchsMd = useMediaQuery(({ breakpoints }: Theme) =>
    breakpoints.up("md")
  );
  const matchsLg = useMediaQuery(({ breakpoints }: Theme) =>
    breakpoints.up("lg")
  );

  return { matchsSm, matchsMd, matchsLg };
};
