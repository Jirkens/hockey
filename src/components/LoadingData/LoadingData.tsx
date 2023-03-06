import { FC } from "react";
import { CircularProgress, Typography } from "@mui/material";

export interface ILoadingDataProps {
  loadingMessage: string;
}

export const LoadingData: FC<ILoadingDataProps> = ({ loadingMessage }) => (
  <>
    <Typography variant="h6">
      {loadingMessage}
    </Typography>
    <CircularProgress sx={{ padding: 5 }} size={80} />
  </>
);
