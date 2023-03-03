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
  c60: number;
  gp: number;
  sogc_pct: number;
  toi: number;
  xg60: number;
}

export interface IPlayer {
  playerId: string;
  stats: IStats;
  teamId: string;
}
