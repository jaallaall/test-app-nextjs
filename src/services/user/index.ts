import { useQuery } from "react-query";
import { user } from "./api";

export const useUser = () => {
  return useQuery("user", () => user(), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
