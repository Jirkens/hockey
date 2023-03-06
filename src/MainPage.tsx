import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { EmptyDataWrapper, IndividualStats, LoadingData } from "./components";
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
    return (
      <EmptyDataWrapper>
        <LoadingData loadingMessage={'Loading competition data...'} />
      </EmptyDataWrapper>
    );
  }

  if (error) {
    return (
      <EmptyDataWrapper>
        <Alert severity="error">An error has occurred: {error.message}</Alert>
      </EmptyDataWrapper>
    );
  }

  const competitionsSet = data.length > 0 ? data[0] : undefined;
  
  return (
    <IndividualStats {...{ competitionsSet }} />
  );
};
