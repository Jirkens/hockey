export interface IAuthToken {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

export interface ICompetition {
  name: string;
  part: string;
  uuid: string;
}

export interface ICompetitionsSet {
  competitions: ICompetition[];
  name: string;
}

export interface IStats {
  toi: number;
  gp: number;
  xg60: number;
  c60: number;
  sogc_pct: number;
}

interface IBasePlayer {
  teamId: string;
  playerId: string;
}

export interface IPlayer extends IBasePlayer, IStats {}

export enum OrderType {
  ascending = 'asc',
  descending = 'desc',
}

interface IMetrics {
  name: string;
  isChecked: boolean;
}

type MetricsName = "xg60" | "c60" | "sogc_pct";

export type IMetricsRecord = Record<MetricsName, IMetrics>;
