import { createContext, Dispatch, FC, ReactElement, SetStateAction, useContext, useMemo, useState } from "react";

import { IAuthToken } from "../types";

export interface AuthContextValues {
  auth: IAuthToken | undefined;
  setAuth: Dispatch<SetStateAction<IAuthToken | undefined>>;
}

export const AuthContext = createContext<AuthContextValues | undefined>(undefined);

export const AuthProvider: FC<{children: ReactElement}>  = ({ children }) => {
    const [auth, setAuth] = useState<IAuthToken | undefined>(undefined);

    const value = useMemo(
      () => ({
        auth,
        setAuth,
      }),
      [auth, setAuth],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextValues => {
  const context = useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error('AuthContext value must be set.');
};
