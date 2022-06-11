import { instance } from "../fetchClient";

export const user = async () => {
  const { data } = await instance().get("user");
  return data;
};
