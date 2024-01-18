"use client";

import React, { useState } from "react";
import Pitch from "../Pitch";
import { playerGameState } from "@/app/types/playerData";
import { updatePlayerState } from "@/app/utils/updatePlayerState";
import { Roles } from "@/app/types/playerDb";

export default function MainGame() {
  const [players, setPlayers] = useState<playerGameState[]>([
    {
      key: "RB",
      position: "top-[31rem] left-[24.5rem]",
      playerName: "",
      url: "",
    },
    {
      key: "LCB",
      position: "top-[33rem] left-[10rem]",
      playerName: "",
      url: "",
    },
    {
      key: "RCB",
      position: "top-[33rem] left-[17rem]",
      playerName: "",
      url: "",
    },
    { key: "LB", position: "top-[31rem] left-10", playerName: "", url: "" },
    {
      key: "LCM",
      position: "top-[20rem] left-[7rem]",
      playerName: "",
      url: "",
    },
    {
      key: "RCM",
      position: "top-[20rem] left-[20rem]",
      playerName: "",
      url: "",
    },
    {
      key: "DMF",
      position: "top-[25rem] left-[13.5rem]",
      playerName: "",
      url: "",
    },
    {
      key: "CF",
      position: "top-[5rem] left-[13.5rem]",
      playerName: "",
      url: "",
    },
    {
      key: "LWF",
      position: "top-[10rem] left-[4rem]",
      playerName: "",
      url: "",
    },
    {
      key: "RWF",
      position: "top-[10rem] left-[23rem]",
      playerName: "",
      url: "",
    },
    {
      key: "GK",
      position: "top-[41rem] left-[13.5rem]",
      playerName: "",
      url: "",
    },
  ]);

  const [budget, setBudget] = useState(150000);

  const handleClick = (key: Roles, name: string, url: string) => {
    const updatedState = updatePlayerState(key, name, url, players);
    setPlayers(updatedState);
  };

  return (
    <div>
      <Pitch playerState={players} />
      <button
        onClick={() =>
          handleClick(
            "LCM",
            "lil sneed",
            "https://img.a.transfermarkt.technology/portrait/header/3333-1662621121.jpg?lm=1"
          )
        }
      >
        test
      </button>
    </div>
  );
}
