import db from "../../public/players.json";
import PlayerCard from "./components/PlayerCard";
import { TeamComp } from "./types/playerDb";
import { randomRolePicks } from "./utils/randomRolePicks";
import { fetchPlayerData } from "./utils/fetchPlayerData";

export default async function Home() {
  const players: TeamComp = db;

  const CF = randomRolePicks(players, "GK");

  return (
    <div className="bg-red-500 flex flex-row">
      {CF.map((player) => (
        <PlayerCard
          lang="en"
          playerId={player}
          searchPlayer={fetchPlayerData}
          key={player}
        />
      ))}
    </div>
  );
}
