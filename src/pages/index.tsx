import { nextDynamic } from "components";
import Layout from "layouts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, DehydratedState, QueryClient } from "react-query";
import { socials } from "services";

const HomePage = () => {
  const Home = nextDynamic("Home");
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export async function getServerSideProps({
  locale,
}: {
  locale: string;
}): Promise<{
  props: {
    dehydratedState: DehydratedState;
  };
}> {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("socials", socials);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default HomePage;
