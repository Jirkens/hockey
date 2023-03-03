import { FC } from "react";
import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { StatsTable } from "./components";
import { ICompetition, IPlayer } from "./types";
import { parseIndividualStatsData } from "./utils";
import { axiosInstance } from "./WithAxios";

export interface IIndividualStatsPageProps {
  competitions: ICompetition[];
}

export const IndividualStatsPage: FC<IIndividualStatsPageProps> = ({
  competitions = [],
}) => {
  const competitionsUuids = competitions.length > 0 ? competitions.map(competiton => competiton.uuid) : undefined;

  const { isLoading, error, data, refetch } = useQuery<IPlayer[], Error>(
    ["individualStats"],
    () => axiosInstance({
      method: 'post',
      url: `/individual/${competitionsUuids ? competitionsUuids[0] : ""}`,
      data: {
        gameState: "5:5",
        timeOnIce: 600,
        metrics: [
          "xg60",
          "c60",
          "sogc_pct",
        ]
      },
    }).then(response => response.data),
    {
      refetchOnWindowFocus: false,
      select: parseIndividualStatsData,
    },
  );

  const handleLoadData = () => {
    refetch();
  };

  if (isLoading) {
    return null;
  }

  if (error) {
    return null;
  }

  console.log("IndividualStatsPage", data);

  return (
    <>
      <Button variant="contained" onClick={handleLoadData}>Load data</Button>
      <StatsTable playerIndividualStats={data}/>
    </>
  );
};
