import { Roles } from "./playerDb";

export interface playerGameState {
  role: Roles;
  playerRow: number;
  playerCol: number;
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
