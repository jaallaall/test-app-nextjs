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
} from "@mui/material";
import { FormikValues } from "formik";
import { Options } from "interfaces";
import { useTranslation } from "next-i18next";
import { icons, options } from "./data";

interface Props {
  isLoading: boolean;
  open: boolean;
  setOpen: (e?: boolean) => void;
  title?: string;
  btnTitle?: string;
  data?: Options[];
  idEddit?: number | string;
  handleClickCancle?: (e: any) => void;
  formik: FormikValues;
}

const Form: React.FC<Props> = ({
  isLoading,
  open,
  title,
  btnTitle,
  setOpen,
  formik,
}): React.ReactElement => {
  const { t } = useTranslation();
  const handleClickCancle = () => {
    setOpen();
    formik.resetForm();
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
      <Stack component="form" onSubmit={formik?.handleSubmit}>
        <Typography component="h6" variant="h6" mb={2}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={4} xs={12}>
            <Autocomplete
              onChange={(_, newValue: Options) => {
                formik?.setFieldValue("type", newValue);
              }}
              value={formik?.values["type"]}
              getOptionLabel={(option: Options) => {
                return option.value ? t(option.value) : "";
              }}
              renderOption={(props, option: any) => {
                const Icon = icons[option.icon as keyof typeof icons];
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
                  sx={({ direction }) => ({
                    p: 0,
                    direction: direction === "rtl" ? "ltr" : "ltr",
                  })}
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
                  //   focused={open}
                />
              )}
            />
            {formik?.errors.type && (
              <FormHelperText error>{formik?.errors.type}</FormHelperText>
            )}
          </Grid>
          <Grid item md={8} xs={12}>
            <TextField
              autoComplete="off"
              name="link"
              label={t("link")}
              fullWidth
              variant="outlined"
              onChange={formik?.handleChange}
              value={formik?.values.link}
              color="secondary"
              InputProps={{
                className: "en ltr",
              }}
            />
            {Boolean(formik?.errors.link) && (
              <FormHelperText error>{formik?.errors?.link}</FormHelperText>
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
            disabled={!(formik?.isValid && formik?.dirty)}
            loading={isLoading}
            sx={{ width: { md: "auto", xs: "100%" }, mt: { md: 0, xs: 2 } }}
          >
            {btnTitle}
          </LoadingButton>
        </Box>
      </Stack>
    </Collapse>
  );
};

export default Form;
