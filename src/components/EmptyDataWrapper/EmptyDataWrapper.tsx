import { FC, ReactElement } from "react";
import { styled } from "@mui/material";

const EmptyDataContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
});

export const EmptyDataWrapper: FC<{children: ReactElement}> = ({ children }) => (
  <EmptyDataContainer>
    {children}
  </EmptyDataContainer>
);
