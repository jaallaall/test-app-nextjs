import { Options } from "interfaces";

export const isDuplicate = (data: Options[] | undefined, values: Options) => {
  return data?.some((item) => {
    return JSON.stringify(item) === JSON.stringify(values);
  });
};

// export const isDuplicate = (data: Options[] | undefined, values: Options) => {
//   console.log(data);
//   console.log(values);
//   return data?.every((itm: Options) => {
//     const result = Object.values(itm).some((key) => itm[key] === values[key]);
//     return result;
//   });
// };
