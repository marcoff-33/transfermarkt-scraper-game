"use server";
// Next server action function

import { JSDOM } from "jsdom";
// takes a player ID from local db
export async function saGetPlayerData(playerId: number): Promise<any> {
  // getting player name with Transfermarkt undocumented api.
  const res = await fetch(
    `https://www.transfermarkt.us/ceapi/marketValueDevelopment/graph/${playerId}`
  );
  const data = await res.json();
  // getting the player's name from the "details_url" key in json res
  const detailsString = data.details_url;
  const stringParts = detailsString.split("/");
  const playerName = stringParts[1];
  const test = await fetchPlayerPage(playerId, playerName);

  return [playerName, playerId, test];
}

// used to scrape data from the player's transfermarkt profile
// to be re-written later to look less disgusting
async function fetchPlayerPage(playerId: number, playerName: string) {
  const res = await fetch(
    `https://www.transfermarkt.us/${playerName}/profil/spieler/${playerId}`
  );
  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const nameClass = document
    .querySelector(".data-header__headline-container")
    ?.textContent?.replace(/\s+/g, " ");
  const playerValueRaw = document
    .querySelector(".data-header__market-value-wrapper")
    ?.textContent?.replace(/\s+/g, " ");
  const playerValue = formatString(playerValueRaw);
  const clubImg = document.querySelector(".data-header__box__club-link img");
  const clubImgSrcSet = clubImg?.srcset;
  const clubImgSrc = clubImgSrcSet?.split(",")[0].trim().split(" ")[0];
  const clubName = document.querySelector(".data-header__club a")?.textContent;
  const heroImg = await fetch(
    `https://www.transfermarkt.us/ceapi/player/${playerId}/images`
  );
  const heroImgSrc = await heroImg.json();
  const imgUrl =
    heroImgSrc[0]?.url ||
    "https://placehold.co/333x186.png?text=no%20image%20available";
  console.log(playerValue);
  const profileImg = document.querySelector(".data-header__profile-image");
  const profileImgSrc = profileImg?.src;
  const marketValueNumber = valueToNumber(playerValue);

  return [
    nameClass,
    imgUrl,
    playerValue,
    clubImgSrc,
    clubName,
    profileImgSrc,
    marketValueNumber,
  ];
}

// used to format the scraped market value data
function formatString(s: string) {
  const parts = s.split("Last update: ");

  return parts[0].trim();
}

function valueToNumber(playerValue: string) {
  const multipliers: { [key: string]: number } = { k: 1000, m: 1000000 };
  const unit = playerValue.slice(-1);
  const value = parseFloat(playerValue.substring(1, playerValue.length - 1));

  return value * (multipliers[unit] || 1);
}
