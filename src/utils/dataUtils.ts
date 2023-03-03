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
        playerId: player.player,
        stats: player.stats,
        teamId: value.team,
      }
    });

    return prev.concat(playerArray);
  }, [])

  return players;
};
