import { FC } from "react";
import { Skeleton, TableCell, TableRow } from "@mui/material";

import { useMetricsContext } from "../../contexts";
import { IPlayer } from "../../types";
import { secondsToMinutesAndSeconds } from "../../utils";

export interface IStatsTableRowProps {
  row: IPlayer;
}

export const StatsTableRow: FC<IStatsTableRowProps> = ({ row }) => {
  const { metrics } = useMetricsContext();
  
  return (
    <TableRow hover>
      <TableCell component="th" scope="row" align="left">
        {row.teamId}
      </TableCell>
      <TableCell align="left">
        {row.playerId}
      </TableCell>
      <TableCell align="left">
        {secondsToMinutesAndSeconds(row.toi)}
      </TableCell>
      <TableCell align="left">
        {row.gp}
      </TableCell>
      {metrics.xg60.isChecked ?
        <TableCell align="left">
          {row.xg60 ?? <Skeleton />}
        </TableCell>
      : null}
      {metrics.c60.isChecked ?
        <TableCell align="left">
          {row.c60 ?? <Skeleton />}
        </TableCell>
      : null}
      {metrics.sogc_pct.isChecked ?
        <TableCell align="left">
          {row.sogc_pct ?? <Skeleton />}
        </TableCell>
      : null}
    </TableRow>
  );
};
