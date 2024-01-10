import { Player, PlayerData } from "../types/playerData";
// takes a player id and a language localization tag and returns the data for the player as PlayerData type.
export async function fetchPlayerData(playerId: number): Promise<Player> {
  const res = await fetch(
    `https://transfermarkt-api.vercel.app/players/${playerId}/profile`
  );
  const data = await res.json();
  return data as Player;
}
