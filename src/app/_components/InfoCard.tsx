"use client";

import React, { use, useEffect, useState } from "react";
import { drawRandomPlayer } from "../_utils/randomRolePicks";
import playerDb from "../../../public/players.json";
import { saGetPlayerData } from "../_utils/saGetPlayerData";
import { PlayerData } from "../_types/playerData";
import Image from "next/image";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GiBodyHeight, GiPassport } from "react-icons/gi";
import { LuFootprints } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";

export default function InfoCard() {
  const [playerData, setPlayerData] = useState<PlayerData>();
  const [isHovering, setIsHovering] = useState(false);
  const [isFirstrender, setIsFirstRender] = useState(true);

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
    if (isFirstrender) {
      const playerId = drawRandomPlayer(playerDb);
      handleClick(playerId);
      setIsFirstRender(false);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovering && !isFirstrender) {
        const playerId = drawRandomPlayer(playerDb);
        handleClick(playerId);
      }
    }, 8000);

    return () => clearInterval(intervalId);
  }, [isHovering, isFirstrender]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className="w-[400px] h-[200px] flex "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative grow group">
        <Image
          src={playerData?.scrapedPlayerData.playerHeroImg || ""}
          alt={"player picture"}
          fill
          className={`absolute -z-20 rounded-xl border-primary transition-all duration-1000 contrast-100 border-[2px] saturate-50  ${
            show
              ? " brightness-75 opacity-100 blur-none shadow-zinc-950 shadow-lg"
              : " brightness-50 opacity-0 blur-sm  shadow-background-50 shadow-sm"
          }`}
          objectFit="cover"
          objectPosition="center"
        />
        {playerData?.playerName && (
          <div className="absolute w-full h-full group hover:bg-black/70 top-0 hover:backdrop-blur-lg duration-500 transition-all rounded-xl border hover:border-background-500 border-transparent">
            <div className="py-2 px-5 group-hover:text-white text-transparent duration-500 delay-500 transition-colors z-50 flex flex-col gap-1">
              <div className="self-center flex flex-row gap-5 items-center text-lg">
                {playerData?.scrapedPlayerData.fullPlayerName}{" "}
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <LiaBirthdayCakeSolid
                      size={22}
                      className="group-hover:text-primary transition-colors duration-500 delay-500"
                    />
                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-end">
                  {playerData.scrapedPlayerData.playerAge}
                </div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="flex flex-row gap-5">
                  <GiBodyHeight
                    size={22}
                    className="group-hover:text-primary transition-colors duration-500 delay-500"
                  />
                  <div className=""> =</div>
                </div>
                <div className="">
                  {playerData.scrapedPlayerData.playerHeight}
                </div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <GiPassport
                      size={22}
                      className="group-hover:text-primary transition-colors duration-500 delay-500"
                    />

                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-end">
                  {playerData.scrapedPlayerData.playerCountry}
                </div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <LuFootprints
                      size={22}
                      className="group-hover:text-primary transition-colors duration-500 delay-500"
                    />

                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-end">
                  {playerData.scrapedPlayerData.playerFoot}
                </div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <RiTeamLine
                      size={22}
                      className="group-hover:text-primary transition-colors duration-500 delay-500"
                    />

                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-center">
                  {playerData.scrapedPlayerData.clubName}
                </div>
                <Image
                  src={playerData.scrapedPlayerData.clubLogoUrl}
                  alt={playerData.scrapedPlayerData.clubName}
                  height={25}
                  width={30}
                  className="group-hover:visible invisible delay-500 b brightness-75"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
