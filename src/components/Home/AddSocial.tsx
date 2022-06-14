import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  FormHelperText,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { Options } from "interfaces";
import { useTranslation } from "next-i18next";
import { useQueryClient } from "react-query";
import { useAddSocials, useUpdateSocials } from "services";
import { validationSchema } from "utils";

interface Props {
  open: boolean;
  setOpen: () => void;
  title?: string;
  btnTitle?: string;
  item?: Options;
  data?: Options[];
  idEddit?: number | string;
  setOpenSnack?: (e: any) => void;
}

export const icons = {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  TelegramIcon,
  LinkedInIcon,
  LanguageIcon,
};

const options = [
  { id: 1, value: "twitter", faValue: "توییتر", icon: "TwitterIcon" },
  { id: 2, value: "instagram", faValue: "اینستاگرام", icon: "InstagramIcon" },
  { id: 3, value: "facebook", faValue: "فیس بوک", icon: "FacebookIcon" },
  { id: 4, value: "telegram", faValue: "تلگرام", icon: "TelegramIcon" },
  { id: 5, value: "linkedIn", faValue: "لینکدین", icon: "LinkedInIcon" },
  { id: 6, value: "website", faValue: "وبسایت", icon: "LanguageIcon" },
];

const AddSocial: React.FC<Props> = ({
  open,
  setOpen,
  title,
  btnTitle,
  item,
  data,
  idEddit,
  setOpenSnack,
}): React.ReactElement => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { direction } = useTheme();
  const { mutate, isLoading } = useAddSocials();
  const { mutate: mutateUpdate, isLoading: loading } = useUpdateSocials();

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    isValid,
    setFieldValue,
    dirty,
    resetForm,
  }: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: item?.type ?? "",
      link: item?.link ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      const isDuplicate = data?.some((itm) => {
        return JSON.stringify(itm.type) === JSON.stringify(values.type);
      });
      if (isDuplicate) {
        if (setOpenSnack) setOpenSnack(true);
      } else {
        if (idEddit) {
          mutateUpdate(
            { ...values, type: values.type, id: idEddit },
            {
              onSuccess: () => {
                resetForm();
                setOpen();
                queryClient.fetchInfiniteQuery("socials");
              },
            }
          );
        } else {
          mutate(
            { ...values, type: values.type },
            {
              onSuccess: () => {
                resetForm();
                setOpen();
                queryClient.fetchInfiniteQuery("socials");
              },
            }
          );
        }
      }
    },
  });

  const handleClickCancle = () => {
    setOpen();
    resetForm();
  };

  return (
    <Collapse
      in={open}
      timeout="auto"
      unmountOnExit
      sx={{
        bgcolor: "grey.200",
        color: "text.secondary",
        padding: 2,
        borderRadius: 3,
        mt: 2,
      }}
    >
      <Stack component="form" onSubmit={handleSubmit}>
        <Typography component="h6" variant="h6" mb={2}>
          {title ? title : t("addPath")}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Autocomplete
              onChange={(_, newValue: Options) => {
                setFieldValue("type", newValue);
              }}
              value={item?.type}
              getOptionLabel={(option: Options) => {
                return option.value ? t(option.value) : "";
              }}
              renderOption={(props, option: any) => {
                const Icon = (icons as any)[option.icon];
                return (
                  <li {...props}>
                    <Icon sx={{ mr: 1 }} />
                    {t(option.value)}
                  </li>
                );
              }}
              options={options}
              PaperComponent={({ children }) => (
                <Paper
                  sx={{
                    p: 0,
                    direction: direction === "rtl" ? "ltr" : "ltr",
                  }}
                >
                  {children}
                </Paper>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("type")}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                />
              )}
            />
            {errors.type && (
              <FormHelperText error>{errors.type}</FormHelperText>
            )}
          </Grid>
          <Grid item md={8} xs={12}>
            <TextField
              autoComplete="off"
              name="link"
              label={t("link")}
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={values.link}
              color="secondary"
              sx={{
                "& .MuiOutlinedInput-root": {
                  direction: "rtl",
                  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
                },
              }}
            />
            {Boolean(errors.link) && (
              <FormHelperText error>{errors?.link}</FormHelperText>
            )}
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 3,
            flexWrap: "wrap",
          }}
        >
          <Button
            color="secondary"
            variant="outlined"
            sx={{ mr: { md: 1.5 }, width: { md: "auto", xs: "100%" } }}
            onClick={handleClickCancle}
          >
            {t("cancel")}
          </Button>
          <LoadingButton
            type="submit"
            color="secondary"
            variant="outlined"
            disabled={!(isValid && dirty)}
            loading={isLoading ? isLoading : loading}
            sx={{ width: { md: "auto", xs: "100%" }, mt: { md: 0, xs: 2 } }}
          >
            {btnTitle ? btnTitle : t("registerAddPath")}
          </LoadingButton>
        </Box>
      </Stack>
    </Collapse>
  );
};

export default AddSocial;
