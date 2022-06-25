import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Create rtl cache
export function cacheRtl(rtl?: boolean) {
  return createCache({
    key: rtl ? "muirtl" : "muiltr",
    prepend: true,
    stylisPlugins: rtl ? [prefixer, rtlPlugin] : [prefixer],
  });
}
