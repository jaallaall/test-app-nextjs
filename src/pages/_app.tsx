import { CacheProvider, EmotionCache } from "@emotion/react";
import { useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeProvider } from "context";
import type { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useMemo, useState } from "react";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { cacheRtl } from "theme/cacheRtl";

const clientSideEmotionCache = cacheRtl();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
};

function MyApp(props: AppPropsWithLayout) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
    router,
  } = props;
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  const [queryClient] = useState(() => new QueryClient());
  const { palette } = useTheme();
  const color = palette.secondary.main;

  const memoizedEmotionCache = useMemo(() => {
    if (router.locale === "fa") {
      return cacheRtl(true);
    }
    if (router.locale === "en") {
      return cacheRtl(false);
    }
    return emotionCache;
  }, [router, emotionCache]);

  useEffect(() => {
    document.dir = router.locale === "fa" ? "rtl" : "ltr";
  }, [router.locale]);

  return (
    <CacheProvider value={memoizedEmotionCache}>
      <CookiesProvider>
        <ColorModeProvider locale={router.locale}>
          <Head>
            <title>{"test"}</title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <NextNProgress height={3} color={color} />
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ColorModeProvider>
      </CookiesProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
