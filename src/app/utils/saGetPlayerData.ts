"use server";
// Next server action function

import { JSDOM } from "jsdom";
import { PlayerData, scrapedData } from "../types/playerData";
import { HeroImgData } from "../types/playerDb";
// takes a player ID from local db
export async function saGetPlayerData(playerId: number): Promise<PlayerData> {
  // getting player name with Transfermarkt undocumented api.
  const res = await fetch(
    `https://www.transfermarkt.us/ceapi/marketValueDevelopment/graph/${playerId}`
  );
  const data = await res.json();
  // getting the player's name from the "details_url" key in json res
  const detailsString = data.details_url;
  const stringParts = detailsString.split("/");
  const playerName = stringParts[1];
  const scrapedPlayerData = await fetchPlayerPage(playerId, playerName);

  return {
    playerName: playerName,
    playerId: playerId,
    scrapedPlayerData: scrapedPlayerData,
  };
}

// used to scrape data from the player's transfermarkt profile
async function fetchPlayerPage(
  playerId: number,
  playerName: string
): Promise<scrapedData> {
  const res = await fetch(
    `https://www.transfermarkt.us/${playerName}/profil/spieler/${playerId}`
  );
  const html = await res.text();
  // turning raw html text into a DOM with JSDOM
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // getting the market value. ex: "€50.00m Last update: Dec 20, 2023"
  const MarketValueString = document
    .querySelector(".data-header__market-value-wrapper")
    ?.textContent?.replace(/\s+/g, " ");
  // trimmed example : "€90.00m"
  const playerValue = trimMarketValueString(MarketValueString || "000");

  const clubLogoElement = document.querySelector(
    ".data-header__box__club-link img"
  ) as HTMLImageElement;
  // clubLogoSources is one long string with one or more links. ex: "  link1, link2   "
  const clubLogoSources = clubLogoElement?.srcset;
  // so we have to trim it and return the first imageUrl
  const clubLogo = clubLogoSources?.split(",")[0].trim().split(" ")[0];

  const clubName = document.querySelector(".data-header__club a")?.textContent;

  // another undocumented transfermarkt api
  const playerHeroImg = await fetch(
    `https://www.transfermarkt.us/ceapi/player/${playerId}/images`
  );

  const heroImgSrc: HeroImgData[] = await playerHeroImg.json();

  const firstPlayerHeroImgUrl =
    heroImgSrc[0]?.url ||
    "https://placehold.co/333x186.png?text=no%20image%20available";

  const playerProfileImgElement = document.querySelector(
    ".data-header__profile-image"
  ) as HTMLImageElement;
  const playerProfileImgUrl = playerProfileImgElement?.src;
  console.log(playerProfileImgUrl);
  const marketValueNumber = convertValueStringToNumber(playerValue);

  return {
    playerHeroImg: firstPlayerHeroImgUrl,
    playerValue: playerValue,
    clubLogoUrl: clubLogo,
    clubName: clubName,
    playerProfileImgUrl: playerProfileImgUrl,
    marketValueNumber: marketValueNumber,
  } as scrapedData;
}

function trimMarketValueString(MarketValueString: string) {
  const parts = MarketValueString.split("Last update: ");

  return parts[0].trim();
}

// turns a playerValue string(ex: "$40.00m / $300k") to a full unabbreviated Number
function convertValueStringToNumber(playerValue: string) {
  const multipliers: { [key: string]: number } = { k: 1000, m: 1000000 };
  const unit = playerValue.slice(-1);
  const value = parseFloat(playerValue.substring(1, playerValue.length - 1));

  return value * multipliers[unit];
}
