"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { Player } from "../../../../_types/playerData";
import { Role } from "../../../../_types/playerDb";
import PitchPlayer from "./PitchPlayer";

import PitchElement from "./PitchElement";
import { GameState } from "../../MainGame";
// "rotate-90 and -rotate-90" twcss classes are used to rotate the pitch horizontally
// pitch is vertical for lower viewports

export default function Pitch({ playerState, currentRoundRole, displayPlayerStatsFor, gameState, resetPlayer, setAllowRerolls }: { playerState: Player[]; resetRoleRound: (role: Role) => void; currentRoundRole: Role; gameState: GameState; displayPlayerStatsFor: (role: Role) => void; resetPlayer: (role: Role) => void; setAllowRerolls: (rerolls: boolean) => void }) {
  // the grid div is placed on top of the pitch to render the 11 players
  // positions on the grid are properties of each player in playerState
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      setTimeout(() => {
        setLoaded(true);
        console.log("load effect");
      }, 100);
    }
  }, []);

  return (
    <div className="self-center pt-10 sm:pt-0 sm:rotate-90 justify-center shrink-0 pb-3 top-2 relative flex sm:min-w-[400px] min-w-[320px] min-h-[550px]  md:min-h-[800px] md:min-w-[600px] lg:min-h-[900px] lg:min-w-[700px] overflow-hidden z-0">
      <div className="grow min-w-full min-h-full flex relative">
        <PitchElement className={`duration-1000 fill-background-mid absolute stroke-background-front grow shrink-0 ${loaded ? "opacity-100" : "opacity-0"}`} />
        <div className={` duration-1000 grid  grid-cols-9 grid-rows-7 sm:w-full h-full w-full absolute inset-0  ${loaded ? "opacity-100" : "opacity-0"}`}>
          {playerState.map((player, index) => (
            <PitchPlayer player={player} currentRoundRole={currentRoundRole} displayPlayerStatsFor={displayPlayerStatsFor} key={index} gameState={gameState} resetPlayer={resetPlayer} />
          ))}
        </div>
      </div>
    </div>
  );
}
