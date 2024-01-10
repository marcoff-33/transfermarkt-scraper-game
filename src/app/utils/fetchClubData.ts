import { Club } from "../types/clubData";
// takes a player id and a language localization tag and returns the data for the player as PlayerData type.
export async function fetchClubData(clubID: number): Promise<Club> {
  const res = await fetch(
    `https://transfermarkt-api.vercel.app/clubs/${clubID}/profile`
  );
  const data = await res.json();
  return data as Club;
}
