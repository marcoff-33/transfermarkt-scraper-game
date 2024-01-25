"use client";
import React from "react";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";
import { playerGameState } from "../types/playerData";

export default function Pitch({
  playerState,
}: {
  playerState: playerGameState[];
}) {
  return (
    <div className="self-center shrink-0">
      <div className="relative">
        <Image
          alt="Pitch"
          className=" bg-green-500"
          src={pitchSvg}
          width={500}
          height={500}
        />
        {playerState.map((player) => (
          <div
            key={player.role}
            className={`h-[80px] w-[70px] z-50 absolute ${player.position}`}
          >
            <Image
              alt={player.role}
              src={player.url}
              fill
              className="border border-black rounded-md relative"
            />
            <div className="absolute top-full z-50 text-sm font-semibold">
              {player.playerName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
