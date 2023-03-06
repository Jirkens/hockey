import { FC, ReactElement, useEffect } from "react";
import { Alert } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { EmptyDataWrapper, LoadingData } from "./components";
import { TEST_CREDENTIALS } from "./constants";
import { useAuthContext } from "./contexts";
import { IAuthToken } from "./types";
import { parseTokenData } from "./utils";
import { axiosInstance } from "./WithAxios";

export const AuthWrapper: FC<{children: ReactElement}> = ({ children }) => {
  const { setAuth } = useAuthContext();

  const { isLoading, error, data } = useQuery<IAuthToken, Error>(
    ["authToken"],
    () => axiosInstance({
      method: 'post',
      url: `/token`,
      data: TEST_CREDENTIALS,
    }).then(response => response.data),
    {
      refetchOnWindowFocus: false,
      select: parseTokenData,
    },
  );

  useEffect(() => {
    if (data) {
      setAuth(data);
    }
  }, [data, setAuth]);

  if (isLoading) {
    return (
      <EmptyDataWrapper>
        <LoadingData loadingMessage={'Loading authentication data...'} />
      </EmptyDataWrapper>
    );
  }

  if (error) {
    return (
      <EmptyDataWrapper>
        <Alert severity="error">An error has occurred: {error.message}</Alert>
      </EmptyDataWrapper>
    );
  }

  return children;
};
