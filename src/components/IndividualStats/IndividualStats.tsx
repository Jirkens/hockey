import { FC, FormEvent, useMemo, useState } from "react";
import { Alert, Button, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { DEFAULT_METRICS } from "../../constants";
import { useMetricsContext } from "../../contexts";
import { EmptyDataWrapper } from "../EmptyDataWrapper";
import { MetricsCheckboxes } from "../MetricsCheckboxes";
import { StatsTable, StatsTableSkeleton } from "../StatsTable";
import { ICompetitionsSet, IMetricsRecord, IPlayer } from "../../types";
import { parseIndividualStatsData, transformMetrics } from "../../utils";
import { axiosInstance } from "../../WithAxios";

const FormControlContainer = styled('div')(({ theme }) => ({
  height: 60,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 0, 2),
}));

const IndividualStatsContainer = styled('div')(({ theme }) => ({
  maxHeight: '100vh',
  padding: theme.spacing(2),
}));

const StyledButton = styled(Button)({
  height: 40,
  width: 250,
});

export interface IIndividualStatsProps {
  competitionsSet: ICompetitionsSet | undefined;
}

export const IndividualStats: FC<IIndividualStatsProps> = ({
  competitionsSet,
}) => {
  const [metricsCheckboxes, setMetricsCheckboxes] = useState<IMetricsRecord>(DEFAULT_METRICS);

  const { setMetrics } = useMetricsContext();

  const competitionsUuids = useMemo(() => (
    competitionsSet && competitionsSet.competitions.length > 0
      ? competitionsSet.competitions.map(competiton => competiton.uuid)
      : []
  ), [competitionsSet]);

  const { isLoading, error, data, refetch } = useQuery<IPlayer[], Error>(
    ["individualStats"],
    () => axiosInstance({
      method: 'post',
      url: `/individual/${competitionsUuids}`,
      data: {
        gameState: "5:5",
        timeOnIce: 600,
        metrics: transformMetrics(metricsCheckboxes),
      },
    }).then(response => response.data),
    {
      refetchOnWindowFocus: false,
      select: parseIndividualStatsData,
    },
  );

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMetrics({...metricsCheckboxes});
    refetch();
  };

  if (isLoading) {
    return <StatsTableSkeleton />;
  }

  if (error) {
    return (
      <EmptyDataWrapper>
        <Alert severity="error">An error has occurred: {error.message}</Alert>
      </EmptyDataWrapper>
    );
  }

  const noMetricIsChecked =
    !metricsCheckboxes.xg60.isChecked &&
    !metricsCheckboxes.c60.isChecked &&
    !metricsCheckboxes.sogc_pct.isChecked;

  return (
    <IndividualStatsContainer>
      <form onSubmit={handleOnSubmit}>
        <FormControlContainer>
          <StyledButton type="submit" variant="contained" disabled={noMetricIsChecked}>Load data</StyledButton>
          {noMetricIsChecked &&
            <Alert severity="warning">Please choose at least one metric!</Alert>
          }
          <MetricsCheckboxes {...{metricsCheckboxes, setMetricsCheckboxes}} />
        </FormControlContainer>
      </form>
      <StatsTable playerStatsRows={data}/>
    </IndividualStatsContainer>
  );
};
