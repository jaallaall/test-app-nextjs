import { useMutation, useQuery } from "react-query";
import { addSocials, socials, deleteSocials, updateSocials } from "./api";

export const useSocials = () => {
  return useQuery("socials", () => socials(), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};

export const useAddSocials = () => useMutation(addSocials);
export const useDeleteSocials = () => useMutation(deleteSocials);
export const useUpdateSocials = () => useMutation(updateSocials);
