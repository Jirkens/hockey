import { Alert, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { IndividualStats } from "./components";
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
    return <CircularProgress size={80} />;
  }

  if (error) {
    return <Alert severity="error">An error has occurred: {error.message}</Alert>;;
  }

  const competitionsUuids = data[0].competitions.length > 0 ? data[0].competitions.map(competiton => competiton.uuid) : [];
  
  return (
    <IndividualStats competitionsUuids={competitionsUuids} />
  );
};
