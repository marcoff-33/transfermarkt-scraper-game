"use client";

import React, { useState } from "react";
import Pitch from "../Pitch";
import { playerGameState } from "@/app/types/playerData";
import { updatePlayerState } from "@/app/utils/updatePlayerState";
import { PlayersDb, Role } from "@/app/types/playerDb";
import starterGameState from "@/app/utils/newGameState";
import db from "../../../../public/players.json";
import { drawPlayerFromEachTier } from "@/app/utils/randomRolePicks";
import PlayerCard from "../PlayerCard";

export default function MainGame() {
  const [budget, setBudget] = useState(150000);

  const [currentPlayers, setCurrentPlayers] =
    useState<playerGameState[]>(starterGameState);

  const [currentRound, setCurrentRound] = useState(0);

  const playersDb: PlayersDb = db;

  const roles: Role[] = [
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

  const rolesTierSets = roles.map((role) =>
    drawPlayerFromEachTier(playersDb, role)
  );

  // used by <PlayerCard> to update the currentPlayers state with the selected player.
  const selectPlayer = (role: Role, name: string, imageURL: string) => {
    const newPlayersState = updatePlayerState(
      role,
      name,
      imageURL,
      currentPlayers
    );
    setCurrentPlayers(newPlayersState);
    setCurrentRound(currentRound + 1);
    console.log(currentPlayers);
  };

  return (
    <div className="flex justify-center flex-col">
      <Pitch playerState={currentPlayers} />
      <div className=" flex flex-row w-screen justify-around fixed bottom-0 py-10 bg-zinc-700/50 z-50 backdrop-blur-sm">
        {rolesTierSets[currentRound].map((playerId) => (
          <PlayerCard
            playerId={playerId}
            key={playerId}
            confirmPlayer={selectPlayer}
            role={roles[currentRound]}
          />
        ))}
      </div>
    </div>
  );
}
