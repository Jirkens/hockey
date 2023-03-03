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
