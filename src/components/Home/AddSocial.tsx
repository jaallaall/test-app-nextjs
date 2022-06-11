import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Collapse,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { Options } from "interfaces";
import { validationSchema } from "utils";

interface Props {
  open: boolean;
  setOpen: () => void;
  title?: string;
  btnTitle?: string;
}

const options = [
  { id: 1, value: "twitter", icon: <TwitterIcon /> },
  { id: 2, value: "instagram", icon: <InstagramIcon /> },
  { id: 3, value: "facebook", icon: <FacebookIcon /> },
  { id: 4, value: "telegram", icon: <TelegramIcon /> },
  { id: 5, value: "linkedIn", icon: <LinkedInIcon /> },
  { id: 6, value: "website", icon: <WebAssetIcon /> },
];

const AddSocial: React.FC<Props> = ({
  open,
  setOpen,
  title,
  btnTitle,
}): React.ReactElement => {
  const { t } = useTranslation();
  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    touched,
    isValid,
    setFieldValue,
    dirty,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      type: "",
      link: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
          <Grid item md={4}>
            <Autocomplete
              id="type"
              value={(values as any).type}
              onChange={(_, newValue) => setFieldValue("type", newValue)}
              getOptionLabel={(option: Options) =>
                option.value ? option.value : ""
              }
              options={options}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("type")}
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}
            />
            {errors.type && (
              <FormHelperText error>{errors.type}</FormHelperText>
            )}
          </Grid>
          <Grid item md={8}>
            <TextField
              autoComplete="off"
              name="link"
              label={t("link")}
              fullWidth
              variant="outlined"
              onChange={handleChange}
              value={values.link}
              color="secondary"
            />
            {errors.link && (
              <FormHelperText error>{errors.link}</FormHelperText>
            )}
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            color="secondary"
            variant="outlined"
            sx={{ mr: 1.5 }}
            onClick={handleClickCancle}
          >
            {t("cancel")}
          </Button>
          <LoadingButton
            type="submit"
            color="secondary"
            variant="outlined"
            disabled={!(isValid && dirty)}
          >
            {btnTitle ? btnTitle : t("registerAddPath")}
          </LoadingButton>
        </Box>
      </Stack>
    </Collapse>
  );
};

export default AddSocial;
