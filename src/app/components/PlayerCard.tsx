"use client";

import React, { useState } from "react";
import { saGetPlayerData } from "../utils/saGetPlayerData";
import { Role } from "../types/playerDb";
import Image from "next/image";

export default function PlayerCard({
  playerId,
  confirmPlayer,
  role,
}: {
  playerId: number;
  confirmPlayer: (role: Role, name: string, url: string) => void;
  role: Role;
}) {
  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState(["?"]);
  console.log(playerData, "playerdata");
  const playerImg = playerData[2];

  return (
    <div className="border border-yellow-400 flex flex-row">
      {!open && (
        <button
          onClick={async () => {
            // server action
            const newData = await saGetPlayerData(playerId);
            setPlayerData(newData);
            setOpen(true);
          }}
          className="animate-pulse bg-black text-white duration-1000 transition-all"
        >
          {playerData[0]}
        </button>
      )}
      {open && (
        <button
          className="bg-transparent"
          onClick={() => confirmPlayer(role, playerData[0], playerImg[1])}
        >
          <div className="flex flex-col justify-center  items-center">
            <p>{playerData[0]}</p>
            <Image
              src={playerImg[1]}
              alt={playerData[0]}
              width={100}
              height={100}
              className="self-center"
            />
          </div>

          <p>value: {playerImg[2]}</p>
        </button>
      )}
    </div>
  );
}
// {playerData[0]}, {role}, {playerImg[2]}
