"use server";
// Next server action function

import { JSDOM } from "jsdom";
import { PlayerData, scrapedData } from "../types/playerData";
import { HeroImgData } from "../types/playerDb";
import test from "node:test";
// takes a player ID from local db
// to be refactored later for readability
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

  const playerAgeElement = document.querySelector(
    ".info-table__content--bold a"
  );
  const playerAge = playerAgeElement.textContent.trim();

  const regularContents = document.querySelectorAll(
    ".info-table__content.info-table__content--regular"
  );
  const boldContents = document.querySelectorAll(
    ".info-table__content.info-table__content--bold"
  );

  let playerDetails = {};
  const labels = ["Foot:", "Height:", "Citizenship:"];

  // Loop through all labels
  let playerFoot, playerHeight, playerCitizenship;

  // Loop through all labels
  labels.forEach((label) => {
    // Find the index of the label in the regular contents
    const index = Array.from(regularContents).findIndex(
      (element) => element.textContent === label
    );

    if (index !== -1) {
      let content = boldContents[index]?.textContent;
      if (label === "Citizenship:") {
        content = content
          .split(",")
          .map((country) => country.trim())
          .join(", ");
      }

      switch (label) {
        case "Foot:":
          playerFoot = content;
          break;
        case "Height:":
          playerHeight = content;
          break;
        case "Citizenship:":
          playerCitizenship = content;
          break;
      }
    }
  });
  console.log(playerFoot, playerHeight, playerCitizenship);

  const leagueElement = document.querySelector(".data-header__league-link");

  const playerLeague = leagueElement.textContent?.trim();

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

  const marketValueNumber = convertValueStringToNumber(playerValue);

  return {
    playerHeroImg: firstPlayerHeroImgUrl,
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
