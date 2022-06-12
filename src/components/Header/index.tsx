import { AppBar, Container, Stack, Toolbar, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import Mode from "./Mode";

const Header: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <AppBar sx={{ pt: 10, pb: 1, background: "none" }} position="relative">
      <Container maxWidth="sm">
        <Toolbar sx={{ mb: 2, flexWrap: "wrap" }}>
          <Typography component="h5" variant="h5">
            {t("setting")}
          </Typography>
          <Mode />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
