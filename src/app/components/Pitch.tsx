"use client";
import React from "react";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";
import { playerGameState } from "../types/playerData";
import { Role } from "../types/playerDb";
// "rotate-90 and -rotate-90" twcss classes are used to rotate the pitch horizontally
// pitch is vertical for lower viewports

export default function Pitch({
  playerState,
  resetRoleRound,
}: {
  playerState: playerGameState[];
  resetRoleRound: (role: Role) => void;
}) {
  return (
    <div className="self-center shrink-0 md:rotate-90">
      <div className="relative">
        <Image
          alt="Pitch"
          className=" bg-green-500"
          src={pitchSvg}
          width={500}
          height={500}
        />
        {playerState.map((player) => (
          <button
            key={player.role}
            className={`h-[80px] w-[70px] z-50 absolute ${player.position} md:-rotate-90`}
            onClick={() => resetRoleRound(player.role)}
          >
            <Image
              alt={player.role}
              src={player.profileImgUrl}
              fill
              className="border border-black rounded-md relative"
            />
            <div className="absolute top-full z-50 text-sm font-semibold overflow-x-hidden">
              <p className="animate-marquee whitespace-nowrap">
                {player.playerName}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
