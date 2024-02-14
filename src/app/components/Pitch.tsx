"use client";
import React from "react";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";
import { Player } from "../types/playerData";
import { Role } from "../types/playerDb";
import { convertValueStringToNumber } from "../utils/dataScrapeUtils/getPlayerValue";
import PitchPlayer from "./PitchPlayer";
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
  playerState: Player[];
  resetRoleRound: (role: Role) => void;
  currentRoundRole: Role;
  hasGameEnded: boolean;
  openPlayerModal: (open: boolean) => void;
  displayPlayerStatsFor: (role: Role) => void;
}) {
  return (
    <div className="self-center rotate-90 flex shrink-0 pb-3 top-2 relative min-w-[300px] min-h-[500px] sm:min-h-[700px] sm:min-w-[500px] 2xl:min-h-[800px] 2xl:min-w-[600px] overflow-hidden">
      <Image
        alt="Pitch"
        className=" bg-emerald-950/50 absolute grow"
        src={pitchSvg}
        fill
        objectFit="scale-down"
      />

      <div className="grid  grid-cols-7 grid-rows-6 w-[250px] sm:w-[415px] h-full 2xl:w-[505px] left-7 sm:left-12  top-0 z-50 absolute o">
        {playerState.map((player) => (
          <PitchPlayer
            player={player}
            currentRoundRole={currentRoundRole}
            displayPlayerStatsFor={displayPlayerStatsFor}
            openPlayerModal={openPlayerModal}
            key={player.playerName}
          />
        ))}
      </div>
    </div>
  );
}
