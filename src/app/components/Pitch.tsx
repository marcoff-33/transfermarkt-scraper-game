"use client";
import React from "react";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";
import { Player } from "../types/playerData";
import { Role } from "../types/playerDb";
import PitchPlayer from "./PitchPlayer";
import { GameState } from "./games/MainGame";
// "rotate-90 and -rotate-90" twcss classes are used to rotate the pitch horizontally
// pitch is vertical for lower viewports

export default function Pitch({
  playerState,
  currentRoundRole,
  openPlayerModal,
  displayPlayerStatsFor,
}: {
  playerState: Player[];
  resetRoleRound: (role: Role) => void;
  currentRoundRole: Role;
  hasGameEnded: GameState;
  openPlayerModal: (open: boolean) => void;
  displayPlayerStatsFor: (role: Role) => void;
}) {
  // the grid div is placed on top of the pitch to render the 11 players
  // positions on the grid are properties of each player in playerState
  return (
    <div className="self-center md:rotate-90  flex shrink-0 pb-3 top-2 relative min-w-[400px] min-h-[650px]  md:min-h-[800px] md:min-w-[600px] overflow-hidden">
      <Image
        alt="Pitch"
        className=" absolute grow"
        src={pitchSvg}
        fill
        objectFit="fill"
      />
      <div className="grid  grid-cols-9 grid-rows-7 w-full h-full md:w-full z-50 absolute">
        {playerState.map((player, index) => (
          <PitchPlayer
            player={player}
            currentRoundRole={currentRoundRole}
            displayPlayerStatsFor={displayPlayerStatsFor}
            openPlayerModal={openPlayerModal}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
