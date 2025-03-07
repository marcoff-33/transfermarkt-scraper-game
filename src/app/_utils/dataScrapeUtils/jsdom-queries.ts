import { scrapedData } from "@/app/_types/playerData";
import { fetchPlayerFifaStats, fetchPlayerHeroImg } from "./api-fetches";
import { FifaPlayerStats } from "@/app/_types/FifaApiData";

// if adding more data to this, make sure to update the "updatePlayerState.ts" function,
// so that the player state in the main game receives the new data

// path > @/app/_games/_MainGame/_utils/updatePlayerState

export const getPlayerData = async (document: Document, playerId: number, playerName: string): Promise<scrapedData> => {
  const PlayerBirthDay = getPlayerBirthDay(document);
  //playerDetails = Dominant foot, Height, Citizenship
  const playerDetails = getPlayerDetails(document);
  const { playerFoot, playerHeight, playerPosition } = playerDetails;
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
  const playerAgeNumber = getAge(PlayerBirthDay);
  const playerHeightNumber = getHeight(playerHeight);
  const { playerNationality, playerNationalFlag, marketValueUpdateDate } = getPlayerInfo(document);
  const playerFifaStats = await fetchPlayerFifaStats(fullPlayerName.split(" ")[0], "en", PlayerBirthDay);

  return {
    clubLogoUrl: clubLogo,
    clubName: clubName || "",
    fullPlayerName: fullPlayerName,
    marketValueNumber: marketValueNumber,
    playerAge: PlayerBirthDay,
    playerCountry: playerNationality,
    playerFoot: playerFoot,
    playerHeight: playerHeight,
    playerHeroImg: playerHeroImg,
    playerLeague: playerLeague,
    playerProfileImgUrl: playerProfileImgUrl,
    playerValue: playerValue,
    shortPlayerName: shortPlayerName,
    playerAgeNumber: playerAgeNumber,
    playerHeightNumber: playerHeightNumber,
    playerPosition: playerPosition,
    playerNationalFlag: playerNationalFlag,
    marketValueUpdateDate: marketValueUpdateDate,
    playerfifaStats: playerFifaStats,
  };
};

// helper functions
const getClubLogoImgUrl = (document: Document) => {
  const clubLogoElement = document.querySelector(".data-header__box__club-link img") as HTMLImageElement;
  // clubLogoSources is one long string with one or more links. ex: "  link1, link2   "
  const clubLogoSources = clubLogoElement?.srcset;
  // so we have to trim it and return the first imageUrl
  const clubLogo = clubLogoSources?.split(",")[0].trim().split(" ")[0];
  return clubLogo;
};

export const getPlayerBirthDay = (document: Document) => {
  const playerAgeElement = document.querySelector(".info-table__content--bold a");
  if (playerAgeElement && playerAgeElement.textContent) {
    return playerAgeElement.textContent.trim();
  }
  return "unknown";
};

export type playerDetails = {
  playerFoot: string;
  playerHeight: string;
  playerCitizenship: string;
  playerPosition: string;
};

export const getPlayerDetails = (document: Document): playerDetails => {
  // function to scrape some details from the player data table on transfermarkt
  // the TableTitles variable is to select the various titles of each table row ex: "Height:"
  const allTableTitles = document.querySelectorAll(".info-table__content.info-table__content--regular");
  // the TableData is the data in each title ex: "1.89m"
  const allTableData = document.querySelectorAll(".info-table__content.info-table__content--bold");

  const targetTitles = ["Foot:", "Height:", "Citizenship:", "Position:"];

  let playerFoot = "";
  let playerHeight = "";
  let playerCitizenship = "";
  let playerPosition = "";

  targetTitles.forEach((label) => {
    const index = Array.from(allTableTitles).findIndex((element) => element.textContent === label);

    if (index !== -1 && allTableData[index].textContent) {
      let content = allTableData[index].textContent;
      if (label === "Citizenship:" && content) {
        content = content
          .split(",")
          .map((country) => country.trim())
          .join(", ");
      }

      switch (label) {
        case "Foot:":
          playerFoot = content || "";
          break;
        case "Height:":
          playerHeight = content || "";
          break;
        case "Citizenship:":
          playerCitizenship = content || "";
          break;
        case "Position:":
          playerPosition = content || "";
          break;
      }
    }
  });
  return {
    playerFoot: capitalizeFirstLetter(playerFoot),
    playerHeight: playerHeight,
    playerCitizenship: playerCitizenship,
    playerPosition: playerPosition,
  };
};

export const getPlayerLeague = (document: Document) => {
  const leagueElement = document.querySelector(".data-header__league-link");
  let playerLeague = "";
  if (leagueElement && leagueElement.textContent) {
    playerLeague = leagueElement.textContent.trim();
  }
  return playerLeague;
};

export interface playerNationality {
  marketValueUpdateDate: string;
  playerNationalFlag: string;
  playerNationality: string;
}
// this also gets the market value last update string for convenience(nested in same box)
export const getPlayerInfo = (document: Document): playerNationality => {
  const nationalityElement = document.querySelector('span[itemprop="nationality"]');
  const flagElement = nationalityElement?.querySelector("img");
  const infoBox = document.querySelector(".data-header__market-value-wrapper");
  const updateElement = infoBox?.querySelector(".data-header__last-update");

  return {
    marketValueUpdateDate: updateElement?.textContent?.trim() || "",
    playerNationalFlag: flagElement?.src.trim() || "",
    playerNationality: nationalityElement?.textContent || "",
  };
};

export const getPlayerProfileImg = (document: Document) => {
  const playerProfileImgElement = document.querySelector(".data-header__profile-image") as HTMLImageElement;
  const playerProfileImgUrl = playerProfileImgElement.src;
  return playerProfileImgUrl;
};

export const getPlayerValue = (document: Document) => {
  // getting the market value. ex: "€50.00m Last update: Dec 20, 2023"
  const MarketValueString = document.querySelector(".data-header__market-value-wrapper")?.textContent?.replace(/\s+/g, " ");
  // trimmed example : "€90.00m"
  const playerValue = trimMarketValueString(MarketValueString || "000");
  return playerValue;
};

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

// converts the playerName string to an abbreviated & capitalized version.
// ex: from "gianluigi-donnarumma" to "G. Donnarumma"
function formatShortPlayerName(name: string): string {
  const parts = name.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1));
  return parts.length > 1 ? `${parts[0].charAt(0)}. ${parts.slice(1).join(" ")}` : parts[0];
}

// formats the playerName data. ex: "gianluigi-donnarumma" to "Gianluigi Donnarumma"
function formatFullPlayerName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

// formats the date of birth string ex : "Aug 17 1999 (24)"
// returns a number with the player's age ex : 24
function getAge(birthdayString: string): number {
  const match = birthdayString.match(/\((\d+)\)/);
  return match ? parseInt(match[1]) : 0;
}

function getHeight(heightString: string): number {
  const match = heightString.match(/(\d+,\d+)/);
  if (match) {
    const height = match[1].replace(",", "");
    return parseInt(height);
  }
  return 0;
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
