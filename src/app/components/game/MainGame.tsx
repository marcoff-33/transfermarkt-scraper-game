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
    "LCB",
    "RCB",
    "RB",
    "LB",
    "DMF",
    "CF",
    "RCM",
    "LCM",
    "LWF",
    "RWF",
  ];
  const [currentBudget, setCurrentBudget] = useState(300000000);
  const [hasGameEnded, setHasGameEnded] = useState(false);
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
    if (hasGameEnded) {
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
    }
  };
  const checkForPickedPlayer = (role: Role) => {
    const oldPlayer = currentPlayers.find((player) => player.role === role);
    return oldPlayer?.playerValue;
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
      setCurrentRound(currentRound < 10 ? (prevRound) => prevRound + 1 : 0);
      setHasGameEnded(currentRound === 10 ? true : hasGameEnded);
      setCurrentBudget(
        hasGameEnded
          ? (prevBudget) => prevBudget + checkForPickedPlayer(role)
          : currentBudget
      );
      setCurrentBudget((prevBudget) => prevBudget - playerValue);
      console.log(currentPlayers);
    } else return;
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="w-screen fixed   gap-5 z-50 top-0 backdrop-blur-sm bg-zinc-500/50 justify-center flex">
        <p>Budget: {currentBudget.toLocaleString()}</p>
        {currentRound}
      </div>
      <Pitch
        playerState={currentPlayers}
        resetRoleRound={resetRoundByRole}
        currentRoundRole={roles[currentRound]}
        hasGameEnded={hasGameEnded}
      />
      <div className="flex flex-row w-screen px-5 justify-around fixed bottom-0 sm:py-2 bg-zinc-700/50 z-50 backdrop-blur-sm">
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
