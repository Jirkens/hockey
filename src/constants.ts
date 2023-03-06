import { IMetricsRecord } from "./types";

export const BASE_API_URL = "http://private-anon-765e562050-logiq.apiary-proxy.com/api/v1";

export const DEFAULT_METRICS: IMetricsRecord = {
  xg60: {
    name: "xg60",
    isChecked: true,
  },
  c60: {
    name: "c60",
    isChecked: true,
  },
  sogc_pct: {
    name: "sogc_pct",
    isChecked: true,
  },
};

export const TEST_CREDENTIALS = {
  grant_type: "client_credentials",
  client_id: "john",
  client_secret: "doe"
};
