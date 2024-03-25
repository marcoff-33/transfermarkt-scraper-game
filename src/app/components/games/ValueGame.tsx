"use client";

import { drawRandomPlayer } from "@/app/utils/randomRolePicks";
import React, { useEffect, useState } from "react";
import playerDb from "../../../../public/players.json";
import { saGetPlayerData } from "@/app/utils/saGetPlayerData";
import { PlayerData } from "@/app/types/playerData";
import Image from "next/image";
import ValueQuestion from "../_valueGameQuestions/ValueQuestion";
import AgeQuestion from "../_valueGameQuestions/AgeQuestion";
import HeightQuestion from "../_valueGameQuestions/HeightQuestion";
import PreGameModal from "../PreGameModal";

type GameState = "pending" | "in progress" | "failed";
export type Solution = "pending" | "correct" | "wrong";
type QuestionIndex = 1 | 2;

export default function ValueGame() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionIndex>(1);
  const [gameState, setGameState] = useState<GameState>("pending");
  const playersArray = [1, 2, 3];
  const drawThreePlayers = playersArray.map((player) =>
    drawRandomPlayer(playerDb)
  );

  const handleClick = async () => {
    const playerPromises = drawThreePlayers.map(async (player) => {
      const playerData = await saGetPlayerData(player);
      return playerData;
    });
    const allPlayersData = await Promise.all(playerPromises);
    setPlayers(allPlayersData);
    setGameState("in progress");
  };

  const firstPlayer = players[0];
  const secondPlayer = players[1];

  const updatePlayers = async () => {
    const [playerOne, playerTwo, playerThree] = [...players];
    const newPlayer = await saGetPlayerData(drawRandomPlayer(playerDb));
    setPlayers([playerTwo, playerThree, newPlayer]);
  };

  const handleSolution = async (solution: Solution) => {
    const [playerOne, playerTwo, playerThree] = [...players];
    const newPlayer = await saGetPlayerData(drawRandomPlayer(playerDb));
    solution == "correct"
      ? (setGameState("in progress"),
        setPlayers([playerTwo, playerThree, newPlayer]),
        setCurrentQuestion(
          (Math.floor(Math.random() * 3) + 1) as QuestionIndex
        ))
      : setGameState("failed");
  };

  return (
    <div className="flex justify-center py-20 bg-background-50">
      <div className="text-center relative flex flex-col md:flex-row gap-1 bg-background-50 w-[50vw] h-[50vh]">
        <button onClick={() => handleClick()} className="fixed z-50">
          ValueGame
        </button>
        <button
          onClickCapture={() => updatePlayers()}
          className="fixed z-50 my-10"
        >
          players
        </button>
        {players.slice(0, 2).map((player) => (
          <div className="relative grow">
            <Image
              alt={player.playerName}
              src={player.scrapedPlayerData.playerHeroImg}
              fill
              objectFit="cover"
              objectPosition="center"
              className="min-w-full min-h-full animate-in grayscale"
            />
            <Image
              src={player.scrapedPlayerData.clubLogoUrl}
              alt={player.scrapedPlayerData.clubName}
              width={70}
              height={70}
              className="absolute inset-5 z-50"
            />
            <div className="bg-white/70 w-full h-full absolute"></div>
          </div>
        ))}
        <p className="inset-0 mx-auto text-white absolute bg-blue-900 px-5 rounded-full self-center flex justify-center max-w-fit text-sm">
          VS
        </p>
        {gameState == "in progress" && (
          <div className="absolute w-full h-full items-center flex flex-col justify-center">
            <div className="md:hidden block grow absolute">{gameState}</div>
            {currentQuestion == 1 ? (
              <AgeQuestion
                playerOne={firstPlayer}
                playerTwo={secondPlayer}
                handleSolution={handleSolution}
              />
            ) : currentQuestion == 2 ? (
              <ValueQuestion
                handleSolution={handleSolution}
                playerOne={firstPlayer}
                playerTwo={secondPlayer}
              />
            ) : (
              <HeightQuestion
                handleSolution={handleSolution}
                playerOne={firstPlayer}
                playerTwo={secondPlayer}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
