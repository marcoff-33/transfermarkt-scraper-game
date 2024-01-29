"use client";

import React, { use, useState } from "react";
import { saGetPlayerData } from "../utils/saGetPlayerData";
import { Role } from "../types/playerDb";
import Image from "next/image";

export default function PlayerCard({
  playerId,
  confirmPlayer,
  role,
}: {
  playerId: number;
  confirmPlayer: (
    role: Role,
    name: string,
    url: string,
    playerValue: number
  ) => void;
  role: Role;
}) {
  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState(["?"]);

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
          className="animate-pulse bg-black text-white duration-1000 transition-all rounded-lg"
        >
          <Image
            src="https://placehold.co/333x186.png?text=?"
            alt="Closed Card"
            width={300}
            height={100}
            className="self-center"
          />
        </button>
      )}
      {open && (
        <button
          className="bg-transparent"
          onClick={() => {
            confirmPlayer(role, playerData[0], playerImg[5], playerImg[6]);
          }}
        >
          <div className="flex flex-col justify-center  items-center relative">
            <div className="relative">
              <p className="text-white z-50 absolute bottom-1 self-center text-center w-full bg-black/50 backdrop-blur-sm">
                {playerData[0]}
              </p>
              <Image
                src={playerImg[1]}
                alt={playerData[0]}
                width={300}
                height={100}
                className="self-center rounded-lg "
              />
              <Image
                src={playerImg[3]}
                alt={playerData[0]}
                width={70}
                height={70}
                className="self-center absolute top-0 right-0 hidden md:block"
              />
              <p className="absolute top-0 z-50 text-white font-extrabold bg-black/50 px-1 backdrop-blur-lg rounded-lg">
                {playerImg[2]}
              </p>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
// {playerData[0]}, {role}, {playerImg[2]}
