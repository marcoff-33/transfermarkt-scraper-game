import React from "react";
import ThemeToggler from "../_navbar/ThemeToggler";
import Link from "next/link";
import { GiSoccerKick } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";

import { GrMoney } from "react-icons/gr";
import { GameState } from "../games/MainGame";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { LuRefreshCw } from "react-icons/lu";
import { GiPlayerNext } from "react-icons/gi";
import AlertDialogButton from "../RestartGameDialog";
import SwapModalDialog from "../SwapPlayersDialog";
import { Player } from "@/app/types/playerData";

export default function GameNavbar({
  rerolls,
  budget,
  gameState,
  restartGame,
  players,
  setPlayers,
  tierSets,
  setTierSets,
}: {
  rerolls: number;
  budget: number;
  gameState: GameState;
  restartGame: () => void;
  players: Player[];
  setPlayers: (newPlayerState: Player[]) => void;
  tierSets: number[][];
  setTierSets: (newSet: number[][]) => void;
}) {
  const dots = [1, 2, 3, 4, 5];

  return (
    <div className="w-full bg-background/50 backdrop-blur-md top-0 sticky z-[1000] text-text-950 font-semibold py-3 transition-colors duration-500 border-b border-front">
      <div className="container flex flex-row justify-between relative items-center">
        <Link
          className="flex flex-row justify-center text-center gap-2"
          href={"/"}
        >
          <GiSoccerKick className="self-center text-accent" size={25} />

          <div className="text-lg hidden lg:block self-center text-text-primary">
            Team Builder
          </div>
        </Link>
        <div
          className={`md:absolute md:left-[30%] md:translate-x-[-50%] text-center self-center flex items-center gap-2 bg-background-mid px-3 rounded-lg shadow-md transition-all duration-1000 ${
            gameState == "initial"
              ? "bg-transparent text-transparent shadow-transparent"
              : "block"
          }`}
        >
          <p className="hidden md:block">Rerolls : </p>
          {dots.map((dot, index) => (
            <div
              key={index}
              className={`transition-all duration-500 delay-100 ${
                index < rerolls ? "text-primary" : "text-background-front"
              } ${gameState == "initial" ? "text-transparent" : ""}`}
            >
              <p
                style={
                  index < rerolls && gameState !== "initial"
                    ? { textShadow: "0px 0px 5px orange" }
                    : {}
                }
                className="transition-all duration-1000 delay-100"
              >
                •
              </p>
            </div>
          ))}
        </div>

        <div className="bottom-[-300%] left-[5%]  md:left-[20%] absolute">
          <AlertDialogButton gameState={gameState} restartGame={restartGame} />
        </div>

        <HoverCard openDelay={100}>
          <HoverCardTrigger className="bottom-[-300%] right-[5%]  md:right-[20%] absolute">
            <SwapModalDialog
              gameState={gameState}
              players={players}
              setPlayers={setPlayers}
              setTierSets={setTierSets}
              tierSets={tierSets}
              currentPlayers={players}
            />
            {gameState == "in progress" ? (
              <HoverCardContent className="font-medium relative">
                You can swap and sell players only when you've picked a player
                for every position.
              </HoverCardContent>
            ) : null}
          </HoverCardTrigger>
        </HoverCard>
        <div
          className={`md:absolute md:left-[70%] md:translate-x-[-50%] text-center items-center flex bg-background-mid px-5 py-[0.12rem] rounded-lg shadow-md transition-all duration-1000 delay-1000 ${
            gameState == "initial"
              ? "text-transparent bg-transparent shadow-transparent"
              : ""
          }`}
        >
          <GrMoney
            className={`text-primary mx-2 transition-colors duration-1000 delay-1000 hidden md:block self-center  ${
              gameState == "initial" ? "text-transparent bg-transparent" : ""
            }`}
            size={30}
          />{" "}
          {budget / 1000000}m €{" "}
        </div>
        <div className="flex flex-row gap-5">
          <a
            target="_blank"
            className="flex flex-row gap-1"
            href={"https://github.com/marcoff-33/transfermarkt-scraper-game"}
          >
            <FaGithub
              className="self-center hidden sm:block text-text-primary"
              size={25}
            />
          </a>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
