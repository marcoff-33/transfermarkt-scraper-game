"use client";

import React, { use, useEffect, useState } from "react";
import { drawRandomPlayer } from "../_utils/randomRolePicks";
import playerDb from "../../../public/players.json";

import { PlayerData } from "../_types/playerData";
import Image from "next/image";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { GiBodyHeight, GiPassport } from "react-icons/gi";
import { LuFootprints } from "react-icons/lu";
import { RiTeamLine } from "react-icons/ri";

export default function InfoCard() {
  const [playerData, setPlayerData] = useState<PlayerData>();
  const show = true; // used to be a state variable, leaving it here for now cus too lazy to replace conditional renders below
  const handleClick = async (playerId: number) => {
    try {
      const res = await fetch(`/api/getPlayer/${playerId}`);
      const newPlayer = await res.json();

      if (!newPlayer.scrapedPlayerData.playerHeroImg) {
        return handleClick(drawRandomPlayer(playerDb));
      }

      setPlayerData(newPlayer);
      console.log("handleclick");
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  useEffect(() => {
    const playerId = drawRandomPlayer(playerDb);
    handleClick(playerId);
  }, []);

  return (
    <div className="w-[400px] h-[200px] flex">
      <div className="relative grow group">
        {playerData?.scrapedPlayerData.playerHeroImg !== "" && playerData && <Image src={playerData.scrapedPlayerData.playerHeroImg} alt={"player picture"} fill className={`absolute object-cover rounded-2xl border-primary transition-all duration-1000 contrast-100 border-[2px] saturate-50  ${show ? " brightness-75 opacity-100 blur-none shadow-zinc-950 shadow-lg" : " brightness-50 opacity-0 blur-sm  shadow-background-front"}`} sizes="400px" />}
        {playerData?.playerName && (
          <div className="absolute w-full h-full group hover:bg-black/70 top-0 hover:backdrop-blur-lg duration-500 transition-all rounded-xl border hover:border-background-500 border-transparent">
            <div className="py-2 px-5 group-hover:text-white text-transparent duration-500 delay-500 transition-colors z-50 flex flex-col gap-1">
              <div className="self-center flex flex-row gap-5 items-center text-lg">{playerData?.scrapedPlayerData.fullPlayerName} </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <LiaBirthdayCakeSolid size={22} className="group-hover:text-primary transition-colors duration-500 delay-500" />
                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-end">{playerData.scrapedPlayerData.playerAge}</div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="flex flex-row gap-5">
                  <GiBodyHeight size={22} className="group-hover:text-primary transition-colors duration-500 delay-500" />
                  <div className=""> =</div>
                </div>
                <div className="">{playerData.scrapedPlayerData.playerHeight}</div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <GiPassport size={22} className="group-hover:text-primary transition-colors duration-500 delay-500" />

                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-end">{playerData.scrapedPlayerData.playerCountry}</div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <LuFootprints size={22} className="group-hover:text-primary transition-colors duration-500 delay-500" />

                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-end">{playerData.scrapedPlayerData.playerFoot}</div>
              </div>
              <div className="flex flex-row gap-5 text-sm">
                <div className="self-center text-center">
                  <div className="flex flex-row gap-5">
                    <RiTeamLine size={22} className="group-hover:text-primary transition-colors duration-500 delay-500" />

                    <div className="self-end">=</div>
                  </div>
                </div>
                <div className="self-center">{playerData.scrapedPlayerData.clubName}</div>
                <div className="w-[20px] h-[20px] relative">{playerData.playerName !== "" && <Image src={playerData.scrapedPlayerData.clubLogoUrl} alt={playerData.scrapedPlayerData.clubName} fill sizes="20px" className="group-hover:visible invisible delay-500 b brightness-75" />}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
