import Header from "components/Header";
import Helmet from "./Helmet";

const Layout: React.FC<{
  children: React.ReactElement;
}> = ({ children }): React.ReactElement => {
  return (
    <Helmet>
      <Header />
      {children}
    </Helmet>
  );
};

export default Layout;
