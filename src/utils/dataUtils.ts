import { IAuthToken } from "../types";

export const parseTokenData = (data: any): IAuthToken => (
  {
    accessToken: String(data.access_token),
    expiresIn: Number(data.expires_in),
    tokenType: String(data.token_type),
  }
); 
