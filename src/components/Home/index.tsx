import { Breadcrumbs } from "@mui";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Options, RouteKey } from "interfaces";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { useSocials } from "services";
import AddSocial from "./AddSocial";
import Search from "./Search";
import Social from "./Social";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import Header from "components/Header";

const bread = [
  { id: 1, title: "home", href: RouteKey.Home },
  { id: 1, title: "setting", href: RouteKey.Setting },
  { id: 1, title: "user", href: RouteKey.User },
];

const Home: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  const { data } = useSocials();
  const res = data?.sort((a: any, b: any) => b.id - a.id);
  const [open, setOpen] = useState<boolean>(false);
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Options[]>([]);

  const handleClickAdd = () => {
    setOpen(!open);
  };

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const filter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;

    if (keyword !== "") {
      const results = res?.filter((item: Options) => {
        return (
          item.type.value.toLowerCase().startsWith(keyword.toLowerCase()) ||
          item.type.faValue.toLowerCase().startsWith(keyword.toLowerCase())
        );
      });
      setResult(results);
    } else {
      setResult([]);
    }

    setValue(keyword);
  };

  const clearSearch = () => {
    setResult([]);
    setValue("");
  };

  const dataResult = result.length > 0 ? result : res;

  const elm =
    !dataResult?.length && !open ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 250,
        }}
      >
        <AddRoadIcon sx={{ fontSize: 150 }} />
      </Box>
    ) : (
      dataResult?.map((item: Options) => {
        return <Social key={item.id} data={item} clearSearch={clearSearch} />;
      })
    );

  return (
    <>
      <Header />
      <Stack component="section" sx={{ pb: 4 }}>
        <Container maxWidth="sm">
          <Breadcrumbs breadcrumbs={bread} />

          <Paper elevation={0} sx={{ mt: { md: 5 } }}>
            <Typography component="h6" variant="h6" color="inherit" mb={2}>
              {t("path")}
            </Typography>
            {dataResult?.length > 0 && (
              <Search handleChange={filter} value={value} />
            )}
            <Button
              variant="text"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={handleClickAdd}
              disabled={open}
            >
              {t("addPath")}
            </Button>
            <AddSocial
              open={open}
              setOpen={() => setOpen(false)}
              data={dataResult}
              setOpenSnack={setOpenSnack}
            />

            {elm}
          </Paper>
        </Container>
      </Stack>
      {openSnack && (
        <Snackbar
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          message={t("duplicate")}
          sx={{
            "& .MuiPaper-root": {
              bgcolor: "warning.main",
              color: "text.secondary",
            },
          }}
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
      )}
    </>
  );
};

export default Home;
