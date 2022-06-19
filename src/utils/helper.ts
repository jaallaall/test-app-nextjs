import { Options } from "interfaces";

export const isDuplicate = (data: Options[] | undefined, values: Options) =>
  data?.some((itm: Options) => {
    return JSON.stringify(itm.type) === JSON.stringify(values.type);
  });
