import { FC, ReactElement, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAuthContext } from "./contexts/AuthContext";
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
      data: {
        grant_type: "client_credentials",
        client_id: "john",
        client_secret: "doe"
      },
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
    return null;
  }

  if (error) {
    return null;
  }

  return (
    <div>
      {children}
    </div>
  );
};
