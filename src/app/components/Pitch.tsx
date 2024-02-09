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
  hasGameEnded,
  openPlayerModal,
  displayPlayerStatsFor,
}: {
  playerState: playerGameState[];
  resetRoleRound: (role: Role) => void;
  currentRoundRole: Role;
  hasGameEnded: boolean;
  openPlayerModal: (open: boolean) => void;
  displayPlayerStatsFor: (role: Role) => void;
}) {
  return (
    <div className="self-center rotate-90 flex shrink-0 pb-3 top-2 relative min-w-[300px] min-h-[500px] sm:min-h-[700px] sm:min-w-[500px] 2xl:min-h-[800px] 2xl:min-w-[600px]">
      <Image
        alt="Pitch"
        className=" bg-emerald-950/50 absolute grow"
        src={pitchSvg}
        fill
        objectFit="scale-down"
      />

      <div className="grid  grid-cols-7 grid-rows-6 w-[250px] sm:w-[415px] h-full 2xl:w-[505px] left-7 sm:left-12  top-0 z-50 absolute">
        {playerState.map((player) => (
          <button
            key={player.role}
            className={`z-50 max-h-[70%] rounded-md -rotate-90  ${
              currentRoundRole == player.role
                ? "animate-pulse border-black border-[5px] rounded-lg"
                : ""
            }`}
            style={{
              gridRow: player.playerRow,
              gridColumn: player.playerCol,
            }}
            onClick={() => {
              openPlayerModal(true), displayPlayerStatsFor(player.role);
            }}
          >
            <Image
              alt={player.role}
              src={player.profileImgUrl}
              width={300}
              height={500}
              objectFit="scale-down"
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
