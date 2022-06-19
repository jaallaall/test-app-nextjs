import { useFormik } from "formik";
import { Options } from "interfaces";
import { useTranslation } from "next-i18next";
import { useQueryClient } from "react-query";
import { useUpdateSocials } from "services";
import { isDuplicate, validationSchema } from "utils";
import Form from "./Form";

interface Props {
  open: boolean;
  setOpen: () => void;
  item?: Options;
  setOpenSnack: (e: any) => void;
  data?: Options[];
}

const EdditSocial: React.FC<Props> = ({
  open,
  setOpen,
  item,
  setOpenSnack,
  data,
}): React.ReactElement => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useUpdateSocials();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: item?.type,
      link: item?.link,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (isDuplicate(data, values)) {
        setOpenSnack(true);
      } else {
        mutate(
          { ...values, type: values.type, id: item?.id },
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
      title={t("editAddPath") + " " + t(item?.type.value)}
      btnTitle={t("editAddPath") + " " + t(item?.type.value)}
      formik={formik}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default EdditSocial;
