import { instance } from "../fetchClient";

export const socials = async () => {
  const { data } = await instance().get("socials");
  return data;
};

export const addSocials = async (body: {
  type: string;
  link: string;
  id?: string | number;
}) => {
  const id = body.id ? body.id : "";
  const { data } = await instance().post("socials", {
    type: body.type,
    link: body.link,
    id: Math.floor(Math.random() * 100),
  });
  return data;
};

export const deleteSocials = async (id: string | number) => {
  const { data } = await instance().delete("socials/" + id);
  return data;
};

export const updateSocials = async (body: {
  type: string;
  link: string;
  id: string | number;
}) => {
  const { data } = await instance().patch("socials/" + body.id, {
    type: body.type,
    link: body.link,
    id: body.id,
  });
  return data;
};
