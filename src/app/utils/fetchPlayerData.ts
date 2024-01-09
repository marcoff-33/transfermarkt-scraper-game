import { PlayerData } from "../types/playerData";
// takes a player id and a language localization tag and returns the data for the player as PlayerData type.
export async function fetchPlayerData(
  playerId: number,
  lang: string
): Promise<PlayerData> {
  const res = await fetch(
    `https://transfermarket.p.rapidapi.com/players/get-profile?id=${playerId}&domain=${lang}`,
    {
      headers: {
        "X-RapidAPI-Key": `${process.env.API_KEY}`,
        "X-RapidAPI-Host": `${process.env.API_HOST}`,
      },
    }
  );
  const data = await res.json();
  return data as PlayerData;
}
