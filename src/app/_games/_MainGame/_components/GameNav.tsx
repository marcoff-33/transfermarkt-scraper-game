import React from "react";

import Link from "next/link";
import { GiSoccerKick } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

import { GrMoney } from "react-icons/gr";
import { GameState } from "../MainGame";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/app/_ui/hover-card";

import { Player } from "@/app/_types/playerData";
import ThemeToggler from "@/app/_components/_navbar/ThemeToggler";
import RestartGameDialog from "./RestartGameDialog";
import PlayBar from "@/app/_components/_navbar/PlayBar";
import SwapModalDialog from "./SwapPlayersDialog";

// custom navbar that replaces the global one with added functionality for the main game

export default function GameNavbar({ rerolls, budget, gameState, restartGame, players, setPlayers, tierSets, setTierSets }: { rerolls: number; budget: number; gameState: GameState; restartGame: () => void; players: Player[]; setPlayers: (newPlayerState: Player[]) => void; tierSets: number[][]; setTierSets: (newSet: number[][]) => void }) {
  const dots = [1, 2, 3, 4, 5];

  return (
    <div className="w-full bg-background-deep/10 backdrop-blur-lg top-0 sticky z-[1000] text-text-950 font-semibold py-4 transition-colors duration-500 border-b border-background-deep ">
      <div className="container flex flex-row justify-between relative items-center">
        <Link className="flex flex-row justify-center text-center gap-2" href={"/"}>
          <GiSoccerKick className="self-center text-primary" size={25} />

          <div className="text-lg hidden lg:block self-center text-text-primary">Team Builder</div>
        </Link>
        {/*rerolls display widget*/}
        <div className={`md:absolute md:left-[30%] md:translate-x-[-50%] left-[50%] translate-x-[-50%] absolute text-center top-9 md:top-1 self-center flex items-center gap-2 bg-background-mid px-3 rounded-lg shadow-md transition-colors duration-100 ${gameState == "initial" ? "bg-transparent text-transparent shadow-transparent" : "block"}`}>
          <p className="hidden md:block">Rerolls : </p>
          {dots.map((dot, index) => (
            <div key={index} className={`transition-all duration-100  ${index < rerolls ? "text-accent" : "text-background-front"} ${gameState == "initial" ? "text-transparent" : ""}`}>
              <p style={index < rerolls && gameState !== "initial" ? { textShadow: "0px 0px 5px cyan" } : {}} className="transition-all duration-500 delay-100">
                •
              </p>
            </div>
          ))}
        </div>
        {/*rerolls display widget*/}
        <div className="bottom-[-300%] left-[5%] md:left-[20%] absolute">
          <RestartGameDialog gameState={gameState} restartGame={restartGame} />
        </div>

        <div className="absolute -translate-y-1 left-[50%] translate-x-[-50%] md:block hidden mt-1">
          <PlayBar />
        </div>

        <HoverCard openDelay={100}>
          <HoverCardTrigger className="bottom-[-300%] right-[5%]  md:right-[20%] absolute">
            <SwapModalDialog gameState={gameState} players={players} setPlayers={setPlayers} setTierSets={setTierSets} tierSets={tierSets} currentPlayers={players} />
            {gameState == "in progress" ? <HoverCardContent className="font-medium relative">You can swap a Player's position once every role has been filled</HoverCardContent> : null}
          </HoverCardTrigger>
        </HoverCard>
        {/* money counter element */}
        <div className={`md:absolute md:left-[70%] shadow-accent md:translate-x-[-50%] left-[50%] translate-x-[-50%] absolute md:top-0 top text-center items-center flex bg-background-mid px-5 py-[0.12rem] rounded-lg shadow-sm transition-colors duration-1000 delay-1000 text-xl ${gameState == "initial" ? "text-transparent bg-transparent shadow-transparent" : ""}`}>{budget / 1000000}m € </div>
        {/* money counter element */}
        <div className="flex flex-row gap-5">
          <a target="_blank" className="flex flex-row gap-1" href={"https://github.com/marcoff-33/transfermarkt-scraper-game"}>
            <FaGithub className="self-center hidden sm:block text-text-primary" size={25} />
          </a>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
