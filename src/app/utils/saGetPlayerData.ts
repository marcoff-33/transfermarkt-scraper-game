"use server";
// Next server action function

import { JSDOM } from "jsdom";
import { PlayerData, scrapedData } from "../types/playerData";
import { fetchPlayerName } from "./dataScrapeUtils/api-fetches";
import { getPlayerData } from "./dataScrapeUtils/jsdom-queries";

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
  const dom = new JSDOM(html);
  const document = dom.window.document;

  const scrapedData: scrapedData = await getPlayerData(
    document,
    playerId,
    playerName
  );

  return scrapedData;
}
