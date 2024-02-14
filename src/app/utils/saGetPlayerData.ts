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

  // Age
  const playerAge = getPLayerAge(document);
  // Dominant foot, Height, Citizenship
  const playerDetails = getPlayerDetails(document);
  const { playerFoot, playerHeight, playerCitizenship } = playerDetails;
  // League
  const playerLeague = getPlayerLeague(document);
  // Player Value string, ex: "€7.00m"
  const playerValue = getPlayerValue(document);
  // Club Logo
  const clubLogo = getClubLogoImgUrl(document);
  // Club Name
  const clubName = document.querySelector(".data-header__club a")?.textContent;
  // Hero Images, using undocumented transfermarkt api
  const playerHeroImg = await fetchPlayerHeroImg(playerId);
  // Profile Img
  const playerProfileImgUrl = getPlayerProfileImg(document);
  // full playerValue number ex: from "5.00m" to 5000000
  const marketValueNumber = convertValueStringToNumber(playerValue);

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
  } as scrapedData;
}

// turns a playerValue string(ex: "$40.00m / $300k") to a full unabbreviated Number
function convertValueStringToNumber(playerValue: string) {
  const multipliers: { [key: string]: number } = { k: 1000, m: 1000000 };
  const unit = playerValue.slice(-1);
  const value = parseFloat(playerValue.substring(1, playerValue.length - 1));

  return value * multipliers[unit];
}
