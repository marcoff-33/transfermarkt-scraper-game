"use client";

import React, { useState } from "react";
import { saGetPlayerData } from "../utils/saGetPlayerData";
import { Role } from "../types/playerDb";
import Image from "next/image";
import { PlayerData } from "../types/playerData";

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
  // used to fill the playerData state before fetching any real data
  // to avoid type errors, no idea how to do it properly otherwise
  const emptyPlayerData: PlayerData = {
    playerName: "",
    playerId: 0,
    scrapedPlayerData: {
      playerHeroImg: "",
      playerValue: "",
      clubLogoUrl: "",
      clubName: "",
      playerProfileImgUrl: "",
      marketValueNumber: 0,
    },
  };

  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerData>(emptyPlayerData);

  return (
    <div className="border border-yellow-400 flex flex-row">
      <button
        className="bg-transparent"
        onClick={async () => {
          if (open) {
            confirmPlayer(
              role,
              playerData.playerName,
              playerData.scrapedPlayerData.playerProfileImgUrl,
              playerData.scrapedPlayerData.marketValueNumber
            );
          } else {
            // Next server action
            const newData = await saGetPlayerData(playerId);
            setPlayerData(newData);
            setOpen(true);
          }
        }}
      >
        <div className="flex flex-col justify-center  items-center relative">
          <div className="relative">
            <p className="text-white z-50 absolute bottom-1 self-center text-center w-full bg-black/50 backdrop-blur-sm">
              {playerData.playerName}
            </p>
            <Image
              src={
                playerData.scrapedPlayerData.playerHeroImg ||
                "https://placehold.co/333x186.png?text=?"
              }
              alt={playerData.playerName || ""}
              width={300}
              height={100}
              className="self-center rounded-lg "
            />
            {open && (
              <Image
                src={playerData.scrapedPlayerData.clubLogoUrl}
                alt={playerData.scrapedPlayerData.clubName}
                width={70}
                height={70}
                className="self-center absolute top-0 right-0 hidden md:block"
              />
            )}
            <p className="absolute top-0 z-50 text-white font-extrabold bg-black/50 px-1 backdrop-blur-lg rounded-lg">
              {playerData.scrapedPlayerData.playerValue}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
