"use server";

import { time } from "console";
import { Player, PlayerData } from "../types/playerData";
import { JSDOM } from "jsdom";
// takes a player ID from local db
export async function testFetch(playerId: number): Promise<any> {
  //
  const res = await fetch(
    `https://www.transfermarkt.us/ceapi/marketValueDevelopment/graph/${playerId}`
  );
  const data = await res.json();
  console.log("fetched open api data", Date.now());
  const detailsString = data.details_url;
  const stringParts = detailsString.split("/");
  const playerName = stringParts[1];
  const test = await fetchPlayerPage(playerId, playerName);
  return [playerName, playerId];
}

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
