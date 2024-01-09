import db from "../../public/players.json";
import PlayerCard from "./components/PlayerCard";
import { TeamComp } from "./types/playerDb";
import { randomRolePicks } from "./utils/randomRolePicks";
import { fetchPlayerData } from "./utils/fetchPlayerData";
import Pitch from "./components/Pitch";

export default async function Home() {
  const players: TeamComp = db;

  const CF = randomRolePicks(players, "CF");
  const data = await fetchPlayerData(3333, "en");
  const testpic = data.playerProfile.playerImage;

  return (
    <div className="bg-red-500 flex flex-col justify-center">
      <Pitch prova={testpic} />
    </div>
  );
}
{
  /* {CF.map((player) => (
        <PlayerCard
          lang="en"
          playerId={player}
          searchPlayer={fetchPlayerData}
          key={player}
        />
      ))}
      */
}
