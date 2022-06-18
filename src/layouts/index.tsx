import { Header } from "components";
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
