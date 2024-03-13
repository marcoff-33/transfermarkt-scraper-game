"use client";

import React, { useEffect, useState } from "react";
import { drawRandomPlayer } from "../utils/randomRolePicks";
import playerDb from "../../../public/players.json";
import { saGetPlayerData } from "../utils/saGetPlayerData";
import { PlayerData } from "../types/playerData";
import Image from "next/image";

export default function InfoCard() {
  const [playerData, setPlayerData] = useState<PlayerData>();
  const [isHovering, setIsHovering] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = async (playerId: number) => {
    setShow(false);
    const newPlayer = await saGetPlayerData(playerId);
    setTimeout(() => {
      setPlayerData(newPlayer);
      setShow(true);
    }, 800);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovering) {
        const playerId = drawRandomPlayer(playerDb);
        handleClick(playerId);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className="w-[400px] h-[180px] flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative grow group">
        <Image
          src={playerData?.scrapedPlayerData.playerHeroImg || ""}
          alt={"player picture"}
          fill
          className={`absolute -z-20 rounded-xl border-background-200 transition-all duration-1000 contrast-100 border-[2px] saturate-50  ${
            show
              ? " brightness-75 opacity-100 blur-none shadow-zinc-950 shadow-lg"
              : " brightness-50 opacity-0 blur-sm  shadow-background-50 shadow-sm"
          }`}
          objectFit="cover"
          objectPosition="center"
        />
        {playerData?.playerName && (
          <div className="absolute w-full h-full group hover:bg-black/70 top-0 hover:backdrop-blur-lg duration-500 transition-all rounded-xl border hover:border-background-500 border-transparent">
            <div className="p-5 group-hover:text-white text-transparent duration-500 delay-500 transition-colors z-50 flex flex-col">
              <div className="self-center flex flex-row gap-5">
                {playerData?.scrapedPlayerData.fullPlayerName}
                <Image
                  src={playerData.scrapedPlayerData.clubLogoUrl}
                  alt={playerData.scrapedPlayerData.clubName}
                  height={20}
                  width={15}
                  className="group-hover:visible invisible delay-500"
                />
              </div>
              <div className="">{playerData.scrapedPlayerData.playerAge}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
