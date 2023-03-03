import { useQuery } from "@tanstack/react-query";

import { ICompetitionsSet } from "./types";
import { axiosInstance } from "./WithAxios";

export const MainPage = () => {
  const { isLoading, error, data } = useQuery<ICompetitionsSet[], Error>(
    ["competition"],
    () => axiosInstance.get(`/competition`).then(response => response.data),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  console.log("MainPageData", data);

  return (
    <div>
      
    </div>
  );
};
