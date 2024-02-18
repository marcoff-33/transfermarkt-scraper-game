"use server";
// Next server action function

import { JSDOM } from "jsdom";
import { PlayerData, scrapedData } from "../types/playerData";
import { getPlayerLeague } from "./dataScrapeUtils/getPlayerLeague";
import { getPlayerDetails } from "./dataScrapeUtils/getPlayerDetails";
import { getPLayerAge } from "./dataScrapeUtils/getPlayerAge";
import { getPlayerValue } from "./dataScrapeUtils/getPlayerValue";
import { getClubLogoImgUrl } from "./dataScrapeUtils/getClubLogo";
import { fetchPlayerHeroImg } from "./dataScrapeUtils/fetchPlayerHeroImg";
import { getPlayerProfileImg } from "./dataScrapeUtils/getPlayerProfileImg";
import { fetchPlayerName } from "./dataScrapeUtils/fetchPlayerName";

// takes a player ID from local db
export async function saGetPlayerData(playerId: number): Promise<PlayerData> {
  // getting player name with Transfermarkt undocumented api.
  const playerName = await fetchPlayerName(playerId);
  const scrapedPlayerData = await scrapePlayerPage(playerId, playerName);

  return {
    playerName: playerName,
    playerId: playerId,
    scrapedPlayerData: scrapedPlayerData,
  };
}

// used to scrape data from the player's transfermarkt profile
async function scrapePlayerPage(
  playerId: number,
  playerName: string
): Promise<scrapedData> {
  const res = await fetch(
    `https://www.transfermarkt.us/${playerName}/profil/spieler/${playerId}`
  );
  const html = await res.text();
  // turning raw html text into DOM with JSDOM
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const playerAge = getPLayerAge(document);
  //playerDetails = Dominant foot, Height, Citizenship
  const playerDetails = getPlayerDetails(document);
  const { playerFoot, playerHeight, playerCitizenship } = playerDetails;
  const playerLeague = getPlayerLeague(document);
  // Player Value string, ex: "€7.00m"
  const playerValue = getPlayerValue(document);
  const clubLogo = getClubLogoImgUrl(document);
  const clubName = document.querySelector(".data-header__club a")?.textContent;
  // Hero Images, using undocumented transfermarkt api
  const playerHeroImg = await fetchPlayerHeroImg(playerId);
  const playerProfileImgUrl = getPlayerProfileImg(document);
  // full playerValue number ex: from "5.00m" to 5000000
  const marketValueNumber = convertValueStringToNumber(playerValue);
  const shortPlayerName = formatShortPlayerName(playerName);
  const fullPlayerName = formatFullPlayerName(playerName);

  return {
    playerHeroImg: playerHeroImg,
    playerValue: playerValue,
    clubLogoUrl: clubLogo,
    clubName: clubName,
    playerProfileImgUrl: playerProfileImgUrl,
    marketValueNumber: marketValueNumber,
    playerAge: playerAge,
    playerFoot: playerFoot,
    playerLeague: playerLeague,
    playerCountry: playerCitizenship,
    playerHeight: playerHeight,
    shortPlayerName: shortPlayerName,
    fullPlayerName: fullPlayerName,
  } as scrapedData;
}

// turns a playerValue string(ex: "$40.00m / $300k") to a full unabbreviated Number
function convertValueStringToNumber(playerValue: string) {
  const multipliers: { [key: string]: number } = { k: 1000, m: 1000000 };
  const unit = playerValue.slice(-1);
  const value = parseFloat(playerValue.substring(1, playerValue.length - 1));

  return value * multipliers[unit];
}

// converts the playerName string to an abbreviated & capitalized version.
// ex: from "gianluigi-donnarumma" to "G. Donnarumma"
function formatShortPlayerName(name: string): string {
  const parts = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return parts.length > 1
    ? `${parts[0].charAt(0)}. ${parts.slice(1).join(" ")}`
    : parts[0];
}

// formats the playerName data. ex: "gianluigi-donnarumma" to "Gianluigi Donnarumma"
function formatFullPlayerName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
