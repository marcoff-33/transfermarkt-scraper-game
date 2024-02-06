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
  const [currentBudget, setCurrentBudget] = useState(300000000);

  // sets a selection of 1 player from each tier for each role.
  const [rolesTierSets, setRolesTierSets] = useState(
    roles.map((role) => drawPlayerFromEachTier(playersDb, role))
  );

  const [currentPlayers, setCurrentPlayers] =
    useState<playerGameState[]>(starterGameState);

  const [currentRound, setCurrentRound] = useState(0);

  const resetRoundByRole = (role: Role) => {
    // used by pitch component
    // reset the round when a position/role is clicked.
    const player = currentPlayers.find((player) => player.role === role);

    if (player && player.playerValue) {
      setCurrentBudget((prevBudget) => prevBudget + player.playerValue);
    }
    setCurrentRound(roles.indexOf(role));
    // reset the given role in currentPlayers state to default
    const defaultRoleState = updatePlayerState(
      role,
      "",
      "https://placehold.co/80x70/png?text=?",
      currentPlayers,
      0
    );
    setCurrentPlayers(defaultRoleState);
  };

  // used by <PlayerCard> to update the currentPlayers state with the selected player.
  const selectPlayer = (
    role: Role,
    name: string,
    imageURL: string,
    playerValue: number
  ) => {
    if (playerValue <= currentBudget) {
      const newPlayersState = updatePlayerState(
        role,
        name,
        imageURL,
        currentPlayers,
        playerValue
      );
      setCurrentPlayers(newPlayersState);
      setCurrentRound(
        currentRound < 10 ? (prevRound) => prevRound + 1 : currentRound
      );
      setCurrentBudget((prevBudget) => prevBudget - playerValue);
      console.log(currentPlayers);
    } else return;
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="w-screen fixed   gap-5 z-50 top-0 backdrop-blur-sm bg-zinc-500/50 justify-center flex">
        <p>Budget: {currentBudget.toLocaleString()}</p>
      </div>
      <Pitch
        playerState={currentPlayers}
        resetRoleRound={resetRoundByRole}
        currentRoundRole={roles[currentRound]}
      />
      <div className=" flex flex-row w-screen px-5 justify-around fixed bottom-0 py-2 bg-zinc-700/50 z-50 backdrop-blur-sm">
        {rolesTierSets[currentRound].map((playerId) => (
          <PlayerCard
            playerId={playerId}
            key={playerId}
            confirmPlayer={selectPlayer}
            role={roles[currentRound]}
            currentBudget={currentBudget}
          />
        ))}
      </div>
    </div>
  );
}
