import {
  FC,
  ChangeEvent,
  MouseEvent,
  useState,
} from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
} from '@mui/material';

import { useMetricsContext } from '../../contexts';
import { StatsTableHead } from './StatsTableHead';
import { IPlayer, OrderType } from '../../types';
import { secondsToMinutesAndSeconds, sortArray } from '../../utils';

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

export interface IStatsTableProps {
  playerStatsRows: IPlayer[];
}

export const StatsTable: FC<IStatsTableProps> = ({ playerStatsRows }) => {
  const [order, setOrder] = useState<OrderType | undefined>(undefined);
  const [orderBy, setOrderBy] = useState<keyof IPlayer | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE_OPTIONS[0]);

  const { metrics } = useMetricsContext();

  const handleRequestSort = (
    _: MouseEvent<unknown>,
    property: keyof IPlayer | undefined,
  ) => {
    if (orderBy === property) {
      if (order === OrderType.ascending) {
        setOrder(OrderType.descending);
      } else if (order === OrderType.descending) {
        setOrder(undefined);
        setOrderBy(undefined);
      } else {
        setOrder(OrderType.ascending);
      }
    } else {
      setOrder(OrderType.ascending);
      setOrderBy(property);
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', maxHeight: 'calc(100vh - 140px)' }}>
      <TableContainer sx={{ maxHeight: 'inherit' }}>
        <Table
          sx={{ minWidth: 750 }}
          stickyHeader
        >
          <StatsTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            data={playerStatsRows}
          />
          <TableBody>
            {sortArray(playerStatsRows, order, orderBy)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    key={`${row.playerId}_${row.teamId}`}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {row.teamId}
                    </TableCell>
                    <TableCell align="left">{row.playerId}</TableCell>
                    <TableCell align="left">{secondsToMinutesAndSeconds(row.toi)}</TableCell>
                    <TableCell align="left">{row.gp}</TableCell>
                    {metrics.xg60.isChecked ? <TableCell align="left">{row.xg60}</TableCell> : null}
                    {metrics.c60.isChecked ? <TableCell align="left">{row.c60}</TableCell> : null}
                    {metrics.sogc_pct.isChecked ? <TableCell align="left">{row.sogc_pct}</TableCell> : null}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
        component="div"
        count={playerStatsRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
