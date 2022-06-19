import { i18n } from "next-i18next";
import { object, string } from "yup";

export const validationSchema = () => {
  return object({
    type: object()
      .shape({
        value: string(),
      })
      .nullable()
      .required(i18n?.t("required")),
    link: string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        i18n?.t("requiredURLs")
      )
      .required(i18n?.t("required")),
  });
};
