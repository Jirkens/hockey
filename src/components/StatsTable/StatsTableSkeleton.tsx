import { Skeleton, styled } from "@mui/material";

const StatsTableSkeletonContainer = styled('div')(({ theme }) => ({
  maxHeight: '100vh',
  padding: theme.spacing(2),
}));

const TableFormContainer = styled('div')(({ theme }) => ({
  height: 60,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(0, 0, 2),
}));

const CheckboxesSkeletonContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
});

export const StatsTableSkeleton = () => (
  <StatsTableSkeletonContainer>
    <TableFormContainer>
      <Skeleton variant="rounded" width={250} height={40} />
      <CheckboxesSkeletonContainer>
        <Skeleton variant="rounded" width={40} height={40} />
        <Skeleton variant="rounded" width={40} height={40} />
        <Skeleton variant="rounded" width={40} height={40} />
      </CheckboxesSkeletonContainer>
    </TableFormContainer>
    <Skeleton variant="rounded" width={'100%'} height={640} />
  </StatsTableSkeletonContainer>
);
