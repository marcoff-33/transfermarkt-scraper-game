"use client";
import React, { useState } from "react";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";
import { playerGameState } from "../types/playerData";

//  /<img src={prova} alt="" className="rounded-lg" />
export default function Pitch({
  playerState,
}: {
  playerState: playerGameState[];
}) {
  // object with the player icons position on the svg pitch. key is for assigning player
  // name and image src url later.

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
            key={player.key}
            className={`h-[80px] w-[70px] z-50 absolute ${player.position}`}
          >
            <Image
              alt={player.key}
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
