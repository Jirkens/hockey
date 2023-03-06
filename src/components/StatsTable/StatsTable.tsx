import {
  FC,
  ChangeEvent,
  MouseEvent,
  useState,
} from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
} from '@mui/material';

import { StatsTableHead } from './StatsTableHead';
import { StatsTableRow } from './StatsTableRow';
import { IPlayer, OrderType } from '../../types';
import { sortArray } from '../../utils';

const ROWS_PER_PAGE_OPTIONS = [10, 20, 50];

export interface IStatsTableProps {
  playerStatsRows: IPlayer[];
}

export const StatsTable: FC<IStatsTableProps> = ({ playerStatsRows }) => {
  const [order, setOrder] = useState<OrderType | undefined>(undefined);
  const [orderBy, setOrderBy] = useState<keyof IPlayer | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE_OPTIONS[0]);

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
        <Table sx={{ minWidth: 750 }} stickyHeader>
          <StatsTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            data={playerStatsRows}
          />
          <TableBody>
            {sortArray(playerStatsRows, order, orderBy)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => (
                <StatsTableRow key={`${row.playerId}_${row.teamId}`} {...{ row }} />
              )
            )}
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
