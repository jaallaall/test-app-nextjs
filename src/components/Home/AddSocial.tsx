import { useFormik } from "formik";
import { Options } from "interfaces";
import { useTranslation } from "next-i18next";
import { useQueryClient } from "react-query";
import { useAddSocials } from "services";
import { isDuplicate, validationSchema } from "utils";
import Form from "./Form";

interface Props {
  open: boolean;
  setOpen: () => void;
  data?: Options[];
  setOpenSnack: (e: any) => void;
}

const AddSocial: React.FC<Props> = ({
  open,
  setOpen,
  data,
  setOpenSnack,
}): React.ReactElement => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useAddSocials();

  const formik = useFormik({
    initialValues: {
      type: "",
      link: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (isDuplicate(data, values)) {
        setOpenSnack(true);
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
    },
  });

  return (
    <Form
      isLoading={isLoading}
      title={t("addPath")}
      btnTitle={t("registerAddPath")}
      formik={formik}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default AddSocial;
