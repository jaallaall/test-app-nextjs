import { Breadcrumbs } from "@mui";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { RouteKey } from "interfaces";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import AddSocial from "./AddSocial";
import Social from "./Social";

const bread = [
  { id: 1, title: "home", href: RouteKey.Home },
  { id: 1, title: "setting", href: RouteKey.Setting },
  { id: 1, title: "user", href: RouteKey.User },
];

const Home: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickAdd = () => {
    setOpen(!open);
  };

  return (
    <>
      <Stack component="section" sx={{ pb: 4 }}>
        <Container maxWidth="sm">
          <Breadcrumbs breadcrumbs={bread} />
          <Paper elevation={0} sx={{ mt: 5 }}>
            <Typography component="h6" variant="h6" color="inherit" mb={2}>
              {t("path")}
            </Typography>
            <Button
              variant="text"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleClickAdd}
              disabled={open}
            >
              {t("addPath")}
            </Button>
            <AddSocial open={open} setOpen={() => setOpen(false)} />
            <Social />
          </Paper>
        </Container>
      </Stack>
      {/* {Boolean(value) && (
        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={value}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      )} */}
    </>
  );
};

export default Home;
