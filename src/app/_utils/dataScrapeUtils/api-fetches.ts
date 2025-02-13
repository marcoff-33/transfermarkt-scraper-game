import { EAApiResponse, FifaPlayerStats } from "@/app/_types/FifaApiData";
import { HeroImgData, PlayerId } from "@/app/_types/playerDb";
import { cache } from "react";
// using Transfermarkt undocumented APIs

export const fetchPlayerHeroImg = async (playerId: PlayerId) => {
  const playerHeroImages = await fetch(`https://www.transfermarkt.us/ceapi/player/${playerId}/images`, { cache: "force-cache" });

  const heroImgSrc: HeroImgData[] = await playerHeroImages.json();

  const firstPlayerHeroImgUrl = heroImgSrc[0]?.url || "https://placehold.co/333x186.png?text=no%20image%20available";

  return firstPlayerHeroImgUrl;
};

// DEPRECATED: this extra step is worthless as you only need playerId to navigate to a player's transfermarkt page
// https://www.transfermarkt.com/youcanputanywordhere/profil/spieler/73564
// raw name is needed in combination with a playerId to form a player's complete transfermarkt page URL
export const fetchPlayerName = async (playerId: PlayerId) => {
  const res = await fetch(`https://www.transfermarkt.us/ceapi/marketValueDevelopment/graph/${playerId}`);
  const data = await res.json();
  // getting the player's name from "details_url"
  // ex : details_url: '/jason-steele/marktwertverlauf/spieler/73564',
  const detailsString = data.details_url;
  const stringParts = detailsString.split("/");
  const playerName = stringParts[1];

  // ex: "jason-steele"
  return playerName;
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
