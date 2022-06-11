import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box, Button } from "@mui/material";
import { useColorMode, useDirMode } from "hooks";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const Mode: React.FC = (): React.ReactElement => {
  const { t, i18n } = useTranslation();
  const { push, pathname, locale } = useRouter();
  const [cookie] = useCookies(["theme"]);

  const { toggleDirectionModeRtl, toggleDirectionModeLtr } = useDirMode();
  const { toggleColorMode } = useColorMode();

  const handleClickRtl = () => {
    toggleDirectionModeRtl();
    i18n?.changeLanguage("fa");
    push(pathname, pathname, { locale: "fa" });
  };
  const handleClickLtr = () => {
    toggleDirectionModeLtr();
    i18n?.changeLanguage("en");
    push(pathname, pathname, { locale: "en" });
  };

  return (
    <Box>
      <Button
        color={locale === "fa" ? "secondary" : "inherit"}
        onClick={handleClickRtl}
        sx={{
          ...(locale === "en" && {
            fontFamily: "dana",
          }),
        }}
      >
        {t("persian")}
      </Button>
      <Button
        color={locale === "en" ? "secondary" : "inherit"}
        onClick={handleClickLtr}
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
