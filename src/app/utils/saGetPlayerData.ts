"use server";

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
  console.log(test);
  return [playerName, playerId, test];
}

// used to scrape data from the player's transfermarkt profile
async function fetchPlayerPage(playerId: number, playerName: string) {
  const res = await fetch(
    `https://www.transfermarkt.us/${playerName}/profil/spieler/${playerId}`
  );
  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const nameClass = document.querySelector(
    ".data-header__headline-container"
  )?.textContent;
  const playerValue = document.querySelector(
    ".data-header__market-value-wrapper"
  )?.textContent;

  return nameClass;
}
