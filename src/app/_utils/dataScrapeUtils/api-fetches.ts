import { EAApiResponse, FifaPlayerStats } from "@/app/_types/FifaApiData";
import { HeroImgData, PlayerId } from "@/app/_types/playerDb";
import { cache } from "react";
// using Transfermarkt undocumented APIs

// Transfermarkt rejects requests that don't look like they come from a browser
// (Node's default fetch user-agent gets an HTML block page instead of data).
export const TRANSFERMARKT_HEADERS: HeadersInit = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,application/json;q=0.8,*/*;q=0.7",
  "Accept-Language": "en-US,en;q=0.9",
};

const NO_HERO_IMG = "https://placehold.co/333x186.png?text=no%20image%20available";

export const fetchPlayerHeroImg = async (playerId: PlayerId) => {
  try {
    const res = await fetch(`https://www.transfermarkt.us/ceapi/player/${playerId}/images`, {
      headers: TRANSFERMARKT_HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("json")) return NO_HERO_IMG;

    const heroImgSrc: HeroImgData[] = await res.json();
    return heroImgSrc[0]?.url || NO_HERO_IMG;
  } catch (error) {
    console.error("Couldn't get player hero image", error);
    return NO_HERO_IMG;
  }
};

export async function fetchPlayerFifaStats(playerFirstName: string, locale: "it" | "en", PlayerBirthDay: string): Promise<FifaPlayerStats> {
  // this requires full player first name eg: "Vinicius"
  // team and birthday to find the correct player when api returns multiple
  // formats: playerCountry = "Italy" ✅ - "Italian" ❌

  const res = await fetch(`https://drop-api.ea.com/rating/ea-sports-fc?search=${playerFirstName}&locale=${locale}`);
  if (!res.ok) {
    console.error("Couldn't get fifa stats from api", res.statusText);
    return emptyStatsFallback;
  }

  try {
    const data: EAApiResponse = await res.json();

    const correctPlayer = data.items.find((player) => {
      const matchingBirthDay = formatApiBirthDay(player.birthdate);

      return matchingBirthDay == formatScrapedBirthDay(PlayerBirthDay);
    });

    if (!correctPlayer) {
      return emptyStatsFallback;
    }

    return correctPlayer;
  } catch (error) {
    console.error("Couldn't get player Fifa stats ", error);
    return emptyStatsFallback;
  }
}

// both formatting functions turn birthdays into a string with the format "MM/DD/YYYY"
function formatApiBirthDay(birthDay: string) {
  const datePart = birthDay.split(" ")[0];
  const [month, day, year] = datePart.split("/");

  const formattedDate = [month.padStart(2, "0"), day.padStart(2, "0"), year].join("/");

  return formattedDate;
}

const emptyStatsFallback: FifaPlayerStats = {
  overallRating: 0,
  stats: [],
  birthdate: "",
};

function formatScrapedBirthDay(birthDay: string) {
  const datePart = birthDay.split(" (")[0];
  const dateObject = new Date(datePart);

  const formattedDate = [String(dateObject.getMonth() + 1).padStart(2, "0"), String(dateObject.getDate()).padStart(2, "0"), dateObject.getFullYear()].join("/");
  return formattedDate;
}
