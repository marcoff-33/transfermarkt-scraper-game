import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

import { TRANSFERMARKT_HEADERS } from "@/app/_utils/dataScrapeUtils/api-fetches";
import { PlayerData, scrapedData } from "@/app/_types/playerData";
import { getPlayerData } from "@/app/_utils/dataScrapeUtils/jsdom-queries";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const playerId = Number(params.id);

    if (isNaN(playerId)) {
      return NextResponse.json({ error: "Invalid player ID" }, { status: 400 });
    }

    // Scrape with HTML cache (1 hour)
    const { playerName, scrapedPlayerData } = await scrapePlayerPage(playerId);

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

async function scrapePlayerPage(playerId: number): Promise<{ playerName: string; scrapedPlayerData: scrapedData }> {
  // the name slug in the URL can be anything, transfermarkt only cares about the id
  const res = await fetch(`https://www.transfermarkt.us/-/profil/spieler/${playerId}`, {
    headers: TRANSFERMARKT_HEADERS,
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const html = await res.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;

  if (!document.querySelector(".data-header__profile-image")) {
    throw new Error("Transfermarkt returned an unexpected page (blocked or layout changed)");
  }

  const playerName = getPlayerSlug(document, res.url, playerId);
  const scrapedPlayerData = await getPlayerData(document, playerId, playerName);
  return { playerName, scrapedPlayerData };
}

// the real name slug (ex: "jason-steele") is in the page's canonical url:
// https://www.transfermarkt.us/jason-steele/profil/spieler/73564
function getPlayerSlug(document: Document, finalUrl: string, playerId: number): string {
  const candidates = [
    document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
    document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
    finalUrl,
  ];
  for (const url of candidates) {
    const match = url?.match(/transfermarkt\.[a-z.]+\/([^/]+)\/profil\/spieler\//);
    if (match && match[1] !== "-") return match[1];
  }
  // fallback: build a slug from the page header name
  const headerName = document.querySelector(".data-header__headline-wrapper")?.textContent?.replace(/#\d+/, "").trim();
  return headerName ? headerName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") : String(playerId);
}
