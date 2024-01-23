"use client";

import React, { useState } from "react";
import Pitch from "../Pitch";
import { playerGameState } from "@/app/types/playerData";
import { updatePlayerState } from "@/app/utils/updatePlayerState";
import { Roles, TeamComp } from "@/app/types/playerDb";
import newGameState from "@/app/utils/newGameState";
import SelectPlayer from "../playerSelect/Select";
import db from "../../../../public/players.json";
import { generateRoleTiers } from "@/app/utils/randomRolePicks";
import PlayerCard from "../PlayerCard";

export default function MainGame() {
  const [players, setPlayers] = useState<playerGameState[]>(newGameState);
  const [budget, setBudget] = useState(150000);
  const [round, setRound] = useState(0);
  const [currentSelection, setCurrentSelection] = useState<number[]>([]);

  const playerIds: TeamComp = db;
  const roles: Roles[] = [
    "GK",
    "DMF",
    "CF",
    "LB",
    "RCM",
    "LCM",
    "LWF",
    "RWF",
    "RCB",
    "LCB",
    "RB",
  ];

  const generatedRoleTiers = roles.map((role) =>
    generateRoleTiers(playerIds, role)
  );

  const handleClick = (key: Roles, name: string, url: string) => {
    const updatedState = updatePlayerState(key, name, url, players);
    setPlayers(updatedState);
    setRound(round + 1);
  };

  console.log(generatedRoleTiers);
  return (
    <div className="flex justify-center flex-col">
      <Pitch playerState={players} />
      {generatedRoleTiers[round].map((playerId) => (
        <PlayerCard
          playerId={playerId}
          key={playerId}
          confirmPlayer={handleClick}
          role={roles[round]}
        />
      ))}
    </div>
  );
}
