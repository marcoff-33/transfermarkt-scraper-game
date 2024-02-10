import { PlayerId } from "@/app/types/playerDb";

export const fetchPlayerName = async (playerId: PlayerId) => {
  const res = await fetch(
    `https://www.transfermarkt.us/ceapi/marketValueDevelopment/graph/${playerId}`
  );
  const data = await res.json();
  // getting the player's name from the "details_url" key in json res
  const detailsString = data.details_url;
  const stringParts = detailsString.split("/");
  const playerName = stringParts[1];
  return playerName;
};
