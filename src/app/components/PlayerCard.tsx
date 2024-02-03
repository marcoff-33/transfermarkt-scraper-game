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
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [imgageUrl, setImageUrl] = useState(
    "https://placehold.co/333x186/black/white.png?text=?"
  );

  return (
    <div className="border border-yellow-400 flex flex-row">
      <button
        className={` ${loadingImg ? "animate-pulse" : ""}`}
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
            setLoadingImg(true);
            setLoadingText(true);
            const newData = await saGetPlayerData(playerId);
            setPlayerData(newData);
            setOpen(true);
            // timeouts for card animations
            setTimeout(() => {
              setImageUrl(newData.scrapedPlayerData.playerHeroImg);
            }, 800);
            setTimeout(() => {
              setLoadingText(false);
            }, 500);
            setTimeout(() => {
              setLoadingImg(false);
            }, 2000);
          }
        }}
      >
        <div className="flex flex-col justify-center  items-center relative overflow-hidden">
          <div className="relative">
            <p
              className={`z-50 absolute bottom-1 self-center text-center w-full transition-colors duration-1000 bg-black/50 backdrop-blur-sm ${
                loadingImg ? "invisible text-gray-800" : "block text-white"
              }`}
            >
              {playerData.playerName}
            </p>
            <Image
              src={imgageUrl}
              alt={playerData.playerName || ""}
              width={300}
              height={100}
              className={`self-center rounded-lg transition-all duration-1000 ${
                loadingImg ? "blur-lg" : "blur-none"
              }`}
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
            <p
              className={`absolute top-0 z-50 text-white font-extrabold px-1 transition-all duration-300 ${
                loadingText
                  ? "blur-lg rounded-none invisible"
                  : "blur-none rounded-lg block bg-black"
              }`}
            >
              {playerData.scrapedPlayerData.playerValue}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
