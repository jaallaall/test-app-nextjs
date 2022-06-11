import { object, string } from "yup";

export const validationSchema = () => {
  return object({
    type: object()
      .shape({
        value: string(),
      })
      .nullable()
      .required("وارد کردن این فیلد اجباری است"),
    link: string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "محتویات این فیلد باید از جنس آدرس اینترنتی باشد"
      )
      .required("وارد کردن این فیلد اجباری است"),
  });
};
