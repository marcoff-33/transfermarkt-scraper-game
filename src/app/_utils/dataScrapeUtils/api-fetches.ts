import { HeroImgData, PlayerId } from "@/app/_types/playerDb";
// using Transfermarkt undocumented APIs

export const fetchPlayerHeroImg = async (playerId: PlayerId) => {
  const playerHeroImages = await fetch(
    `https://www.transfermarkt.us/ceapi/player/${playerId}/images`
  );

  const heroImgSrc: HeroImgData[] = await playerHeroImages.json();

  const firstPlayerHeroImgUrl =
    heroImgSrc[0]?.url ||
    "https://placehold.co/333x186.png?text=no%20image%20available";

  return firstPlayerHeroImgUrl;
};

// function to get the "raw" player name,
// retun string needed in combination with a playerId to generate a player's transfermarkt URL
export const fetchPlayerName = async (playerId: PlayerId) => {
  const res = await fetch(
    `https://www.transfermarkt.us/ceapi/marketValueDevelopment/graph/${playerId}`
  );
  const data = await res.json();
  // getting the player's name from the "details_url" key in json res
  // ex : details_url: '/jason-steele/marktwertverlauf/spieler/73564',
  const detailsString = data.details_url;
  const stringParts = detailsString.split("/");
  const playerName = stringParts[1];
  // ex: "jason-steele"
  return playerName;
};
