import { EmotionCache } from "@emotion/react";
import { cacheRtl } from "@mui";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeProvider } from "context";
import type { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const clientSideEmotionCache = cacheRtl();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = MyAppProps & {
  Component: NextPageWithLayout;
};

function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  const [queryClient] = useState(() => new QueryClient());

  return (
    // <CacheProvider value={emotionCache}>
    <ColorModeProvider>
      <Head>
        <title>{"ecomerce"}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <NextNProgress height={5} color={"rgb(255, 168, 46)"} />
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ColorModeProvider>
    // </CacheProvider>
  );
}

export default appWithTranslation(MyApp);
