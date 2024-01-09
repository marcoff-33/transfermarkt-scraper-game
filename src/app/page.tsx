import db from "../../public/players.json";
import PlayerCard from "./components/PlayerCard";
import { TeamComp } from "./types/playerDb";
import { randomRolePicks } from "./utils/randomRolePicks";
import { fetchPlayerData } from "./utils/fetchPlayerData";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";
import Pitch from "./components/Pitch";

export default async function Home() {
  const players: TeamComp = db;

  const CF = randomRolePicks(players, "CF");

  return (
    <div className="bg-red-500 flex flex-col justify-between">
      {CF.map((player) => (
        <PlayerCard
          lang="en"
          playerId={player}
          searchPlayer={fetchPlayerData}
          key={player}
        />
      ))}
      <Pitch />
    </div>
  );
}
