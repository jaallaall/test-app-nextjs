import { nextDynamic } from "components";
import Layout from "layouts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const HomePage = () => {
  const Home = nextDynamic("Home");
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: { ...(await serverSideTranslations(locale, ["common"])) },
  };
}

export default HomePage;
