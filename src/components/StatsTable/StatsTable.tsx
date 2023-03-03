import { FC } from "react";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableContainerProps,
  TableHead,
  TableRow,
} from "@mui/material";
import { IPlayer } from "../../types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2, 4),

  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1, 1),
  },
}));

const BoldStyledTableCell = styled(StyledTableCell)({
  fontWeight: 'bold',
});

const StyledTableContainer = styled(TableContainer)<TableContainerProps<React.ElementType>>(({ theme }) => ({
  width: '100%',
  maxHeight: '100%',

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

const StyledTableRow = styled(TableRow)({
  '&:last-child td, &:last-child th': { border: 0 }
});

export interface IStatsTableProps {
  playerIndividualStats: IPlayer[]
}

export const StatsTable: FC<IStatsTableProps> = ({ playerIndividualStats }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <BoldStyledTableCell>Team</BoldStyledTableCell>
            <BoldStyledTableCell>Player</BoldStyledTableCell>
            <BoldStyledTableCell>toi</BoldStyledTableCell>
            <BoldStyledTableCell>gp</BoldStyledTableCell>
            <BoldStyledTableCell>xg60</BoldStyledTableCell>
            <BoldStyledTableCell>c60</BoldStyledTableCell>
            <BoldStyledTableCell>sogc_pct</BoldStyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playerIndividualStats.map((playerStats) => (
            <StyledTableRow key={`${playerStats.playerId}_${playerStats.teamId}`}>
              <StyledTableCell component="th" scope="row">
                {playerStats.teamId}
              </StyledTableCell>
              <StyledTableCell>{playerStats.playerId}</StyledTableCell>
              <StyledTableCell>{playerStats.stats.toi}</StyledTableCell>
              <StyledTableCell>{playerStats.stats.gp}</StyledTableCell>
              <StyledTableCell>{playerStats.stats.xg60}</StyledTableCell>
              <StyledTableCell>{playerStats.stats.c60}</StyledTableCell>
              <StyledTableCell>{playerStats.stats.sogc_pct}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};
