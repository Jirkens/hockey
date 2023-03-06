import { FC, MouseEvent } from 'react';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';

import { useMetricsContext } from '../../contexts';
import { IMetricsRecord, IPlayer, OrderType } from "../../types";

interface HeadCell {
  id: keyof IPlayer;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'teamId',
    label: 'Team',
  },
  {
    id: 'playerId',
    label: 'Player',
  },
  {
    id: 'toi',
    label: 'toi',
  },
  {
    id: 'gp',
    label: 'gp',
  },
  {
    id: 'xg60',
    label: 'xg60',
  },
  {
    id: 'c60',
    label: 'c60',
  },
  {
    id: 'sogc_pct',
    label: 'sogc_pct',
  },
];

interface StatsTableHeadProps {
  onRequestSort: (event: MouseEvent<unknown>, property: keyof IPlayer) => void;
  order: OrderType | undefined;
  orderBy: string | undefined;
  data: IPlayer[];
}

export const StatsTableHead: FC<StatsTableHeadProps> = ({
  order,
  orderBy,
  onRequestSort,
}) => {
  const { metrics } = useMetricsContext();
  
  const createSortHandler =
    (property: keyof IPlayer) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          const key = headCell.id as keyof IMetricsRecord;

          if (metrics[key] && !metrics[key].isChecked) {
            return null;
          }

          return (
            <TableCell key={headCell.id} align='left'>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : OrderType.ascending}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
