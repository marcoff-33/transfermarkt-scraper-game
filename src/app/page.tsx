import db from "../../public/players.json";
import { TeamComp } from "./types/playerDb";
import { randomRolePicks } from "./utils/randomRolePicks";
import { fetchPlayerData } from "./utils/fetchPlayerData";

export default async function Home() {
  const players: TeamComp = db;

  const CF = randomRolePicks(players, "CB");
  const testar = await fetchPlayerData(3333);
  console.log(testar);

  return (
    <div className="bg-red-500 flex flex-row justify-center max-w-fit"></div>
  );
}
