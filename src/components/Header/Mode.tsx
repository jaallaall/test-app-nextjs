import { Link } from "@mui";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box, Button } from "@mui/material";
import { useColorMode } from "hooks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const Mode: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { locale, asPath } = useRouter();
  const [cookie] = useCookies(["theme"]);
  const { toggleColorMode } = useColorMode();

  return (
    <Box>
      <Button
        color={locale === "fa" ? "secondary" : "inherit"}
        sx={{
          ...(locale === "en" && {
            fontFamily: "dana",
          }),
          "&:hover": {
            color: "text.secondary",
          },
        }}
        component={Link}
        href={asPath}
        locale="fa"
      >
        {t("persian")}
      </Button>
      <Button
        color={locale === "en" ? "secondary" : "inherit"}
        component={Link}
        href={asPath}
        locale="en"
        sx={{
          "&:hover": {
            color: "text.secondary",
          },
        }}
      >
        {t("english")}
      </Button>
      <Button
        color="primary"
        sx={{ color: "text.secondary" }}
        onClick={toggleColorMode}
      >
        {cookie?.theme && cookie?.theme?.mode !== "dark" ? (
          <WbSunnyIcon />
        ) : (
          <DarkModeIcon />
        )}
      </Button>
    </Box>
  );
};

export default Mode;
