import { StaticImageData } from "next/image";
import { Roles } from "./playerDb";
import { FifaPlayerStats } from "./FifaApiData";

export interface Player {
  role: Roles;
  playerRow?: number;
  playerCol?: number;
  profileImgUrl: string | StaticImageData;
  playerName: string;
  playerValue: number;
  playerAge: string;
  playerFoot: string;
  clubName: string;
  playerLeague: string;
  playerCountry: string;
  playerHeight: string;
  shortPlayerName: string;
  fullPlayerName: string;
  playerNationalFlag: string;
  playerValueDate: string;
  playerPosition: string;
  playerClubLogoUrl: string;
  playerId: number;
  playerFifaStats: FifaPlayerStats;
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
  playerAge: string;
  playerFoot: string;
  playerLeague: string;
  playerHeight: string;
  playerCountry: string;
  shortPlayerName: string;
  fullPlayerName: string;
  playerAgeNumber: number;
  playerHeightNumber: number;
  playerPosition: string;
  playerNationalFlag: string;
  marketValueUpdateDate: string;
  playerPosition: string;
  playerfifaStats: FifaPlayerStats;
}
