"use client";

import React, { useState } from "react";
import Pitch from "../Pitch";
import { playerGameState } from "@/app/types/playerData";
import { updatePlayerState } from "@/app/utils/updatePlayerState";
import { Roles, TeamComp } from "@/app/types/playerDb";
import newGameState from "@/app/utils/newGameState";
import SelectPlayer from "../playerSelect/Select";
import db from "../../../../public/players.json";
import { randomRolePicks } from "@/app/utils/randomRolePicks";

export default function MainGame() {
  const [players, setPlayers] = useState<playerGameState[]>(newGameState);
  const [budget, setBudget] = useState(150000);
  const [round, setRound] = useState(0);
  const [currentSelection, setCurrentSelection] = useState<number[]>([]);

  const playerIds: TeamComp = db;

  const newRound = (role: Roles, round: number) => {
    const roleIds = randomRolePicks(playerIds, role);
    setRound(round + 1);
    setCurrentSelection(roleIds);
  };

  // updatePlayerState() maps over the the current state of the players and checks for an object with the same key.
  // it returns a new array with the updated object's player name and image src url(by default empty strings).
  const handleClick = (key: Roles, name: string, url: string) => {
    const updatedState = updatePlayerState(key, name, url, players);
    // sets the new array as state.
    setPlayers(updatedState);
  };

  return (
    <div className="flex justify-center flex-col">
      <Pitch playerState={players} />
      <button onClick={() => newRound("CF", 0)}>round</button>
      <SelectPlayer ids={currentSelection} round={round} />
    </div>
  );
}

{
  /* <button
        onClick={() =>
          handleClick(
            "LCM",
            "lil sneed",
            "https://img.a.transfermarkt.technology/portrait/header/3333-1662621121.jpg?lm=1"
          )
        }
      >
        test
      </button> */
}
