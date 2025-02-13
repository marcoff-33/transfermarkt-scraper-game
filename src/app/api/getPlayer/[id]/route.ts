import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

import { fetchPlayerName } from "@/app/_utils/dataScrapeUtils/api-fetches";
import { PlayerData, scrapedData } from "@/app/_types/playerData";
import { getPlayerData } from "@/app/_utils/dataScrapeUtils/jsdom-queries";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const playerId = Number(params.id);

    if (isNaN(playerId)) {
      return NextResponse.json({ error: "Invalid player ID" }, { status: 400 });
    }

    // Cache player name fetch for 24 hours
    const playerName = await fetchPlayerName(playerId);

    // Scrape with HTML cache (1 hour)
    const scrapedPlayerData = await scrapePlayerPage(playerId, playerName);

    const responseData: PlayerData = {
      playerName,
      playerId,
      scrapedPlayerData,
    };

    return NextResponse.json(responseData, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
        "CDN-Cache-Control": "public, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching player data:", error);
    return NextResponse.json({ error: "Failed to fetch player data" }, { status: 500 });
  }
}

async function scrapePlayerPage(playerId: number, playerName: string): Promise<scrapedData> {
  // Cache the HTML response for 1 hour
  const res = await fetch(`https://www.transfermarkt.us/${playerName}/profil/spieler/${playerId}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  return getPlayerData(document, playerId, playerName);
}
