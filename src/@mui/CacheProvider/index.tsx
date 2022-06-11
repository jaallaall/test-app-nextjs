import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Stack from "@mui/material/Stack";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Create rtl cache
export function cacheRtl() {
  return createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
}

const CacheProviderRtl: React.FC<{
  direction?: "rtl" | "ltr";
  children: React.ReactNode;
}> = ({ children, direction }): React.ReactElement => {
  const cache = cacheRtl();
  if (direction === "rtl") {
    return (
      <CacheProvider value={cache}>
        <Stack dir="rtl" sx={{ minHeight: "100vh" }}>
          {children}
        </Stack>
      </CacheProvider>
    );
  }
  return children as React.ReactElement;
};

export default CacheProviderRtl;
