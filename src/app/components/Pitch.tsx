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
  currentRoundRole,
}: {
  playerState: playerGameState[];
  resetRoleRound: (role: Role) => void;
  currentRoundRole: Role;
}) {
  return (
    <div className="self-center shrink-0 pb-3 top-2 relative min-w-[500px] min-h-[700px]">
      <Image
        alt="Pitch"
        className=" bg-emerald-950/50 absolute"
        src={pitchSvg}
        fill
        objectFit="scale-down"
      />
      <div className="grid grid-cols-7 grid-rows-6 w-[400px] h-full left-12  top-0 z-50 absolute">
        {playerState.map((player) => (
          <button
            key={player.role}
            className={`z-50 max-h-[70%] rounded-md  ${
              currentRoundRole == player.role
                ? "animate-pulse border-black border-[2px] rounded-lg "
                : ""
            }`}
            style={{
              gridRow: player.playerRow,
              gridColumn: player.playerCol,
            }}
            onClick={() => resetRoleRound(player.role)}
          >
            <Image
              alt={player.role}
              src={player.profileImgUrl}
              width={50}
              height={50}
              className="rounded-md h-full w-full"
            />
            <div className="z-50 text-sm font-semibold overflow-x-hidden">
              <p className="animate-marquee whitespace-nowrap text-white">
                {player.playerName}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
