import { IAuthToken, IPlayer } from "../types";

export const parseTokenData = (data: any): IAuthToken => (
  {
    accessToken: String(data.access_token),
    expiresIn: Number(data.expires_in),
    tokenType: String(data.token_type),
  }
); 

export const parseIndividualStatsData = (data: any): IPlayer[] => {
  const players: IPlayer[] = data.reduce((prev: IPlayer[], value: any) => {
    const playerArray: IPlayer[] = value.players.map((player: any) => {
      return {
        teamId: value.team,
        playerId: player.player,
        toi: player.stats.toi,
        gp: player.stats.gp,
        xg60: player.stats.xg60,
        c60: player.stats.c60,
        sogc_pct: player.stats.sogc_pct,
      }
    });

    return prev.concat(playerArray);
  }, [])

  return players;
};
