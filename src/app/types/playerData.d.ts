import { Roles } from "./playerDb";

export interface playerGameState {
  role: Roles;
  position: string;
  profileImgUrl: string;
  playerName: string;
  playerValue: number;
}

export interface PlayerData {
  playerName: string;
  playerId: number;
  scrapedPlayerData: scrapedData;
}

export interface scrapedData {
  playerHeroImg: string;
  playerValue: string;
  clubLogoUrl: string;
  clubName: string;
  playerProfileImgUrl: string;
  marketValueNumber: number;
}
