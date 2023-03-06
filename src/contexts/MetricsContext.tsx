import { createContext, Dispatch, FC, ReactElement, SetStateAction, useContext, useMemo, useState } from "react";

import { DEFAULT_METRICS } from "../constants";
import { IMetricsRecord } from "../types";

export interface IMetricsContextValues {
  metrics: IMetricsRecord;
  setMetrics: Dispatch<SetStateAction<IMetricsRecord>>;
}

export const MetricsContext = createContext<IMetricsContextValues | undefined>(undefined);

export const MetricsProvider: FC<{children: ReactElement}>  = ({ children }) => {
  const [metrics, setMetrics] = useState<IMetricsRecord>(DEFAULT_METRICS);

    const value = useMemo(
      () => ({
        metrics,
        setMetrics,
      }),
      [metrics, setMetrics],
    );

    return <MetricsContext.Provider value={value}>{children}</MetricsContext.Provider>;
};

export const useMetricsContext = (): IMetricsContextValues => {
  const context = useContext(MetricsContext);

  if (context) {
    return context;
  }

  throw new Error('MetricsContext value must be set.');
};
