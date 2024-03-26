"use client";

import { drawRandomPlayer } from "@/app/utils/randomRolePicks";
import React, { useEffect, useRef, useState } from "react";
import playerDb from "../../../../public/players.json";
import { saGetPlayerData } from "@/app/utils/saGetPlayerData";
import { PlayerData } from "@/app/types/playerData";
import Image from "next/image";
import ValueQuestion from "../_valueGameQuestions/ValueQuestion";
import AgeQuestion from "../_valueGameQuestions/AgeQuestion";
import HeightQuestion from "../_valueGameQuestions/HeightQuestion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useEmblaCarousel from "embla-carousel-react";

type GameState = "pending" | "in progress" | "failed";
export type Solution = "pending" | "correct" | "wrong";
type QuestionIndex = 1 | 2;

export default function ValueGame() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionIndex>(1);
  const [gameState, setGameState] = useState<GameState>("pending");
  const [score, setScore] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questionIndexOne, setQuestionIndexOne] = useState(0);
  const [questionIndexTwo, setQuestionIndexTwo] = useState(1);
  const [newPlayerIndex, setNewPlayerIndex] = useState(3);
  const playersArray = [1, 2, 3, 4];
  const drawFourPlayers = playersArray.map((player) =>
    drawRandomPlayer(playerDb)
  );
  const [api, setApi] = React.useState<CarouselApi>();

  const handleClick = async () => {
    api?.scrollTo(0);
    const playerPromises = drawFourPlayers.map(async (player) => {
      const playerData = await saGetPlayerData(player);
      return playerData;
    });
    const allPlayersData = await Promise.all(playerPromises);
    setPlayers(allPlayersData);
    setQuestionIndexOne(0);
    setQuestionIndexTwo(1);
    setGameState("in progress");
    setScore(0);
  };

  const lastPlayerIndex = players.length - 1;
  const firstPlayer = players[2];
  const secondPlayer = players[3];

  const updatePlayers = async () => {
    const [playerOne, playerTwo, playerThree, playerFour] = [...players];
    const newPlayer = await saGetPlayerData(drawRandomPlayer(playerDb));
    setPlayers([playerTwo, playerThree, playerFour, newPlayer, playerOne]);
  };

  const handleSolution = async (solution: Solution) => {
    setIsLoaded(false);
    const currentPlayers = [...players];
    const newPlayer = await saGetPlayerData(drawRandomPlayer(playerDb));

    if (solution === "correct") {
      setGameState("in progress");
      setTimeout(() => {
        api?.scrollNext();
      }, 1000);

      const updatedPlayers = [...currentPlayers];
      updatedPlayers[newPlayerIndex] = newPlayer;

      setCurrentQuestion((Math.floor(Math.random() * 3) + 1) as QuestionIndex);
      setScore((prevState) => prevState + 1);

      setQuestionIndexOne((prevState) => (prevState < 3 ? prevState + 1 : 0));
      setQuestionIndexTwo((prevState) => (prevState < 3 ? prevState + 1 : 0));
      setNewPlayerIndex((prevState) => (prevState < 3 ? prevState + 1 : 0));

      setPlayers(updatedPlayers);
    } else {
      setGameState("failed");
    }
  };

  return (
    <div className="flex justify-center py-20 bg-background-deep h-screen flex-col">
      <div className="w-[50vw] self-center">
        Score : {score} {isLoaded ? <p>true</p> : <p>false</p>}
      </div>
      <div className="text-center self-center relative flex flex-col md:flex-row gap-1 w-[50vw] h-[50vh] justify-center">
        <button onClick={() => handleClick()} className="fixed z-50">
          ValueGame
        </button>
        <button
          onClickCapture={() => console.log(players)}
          className="fixed z-50 my-10"
        >
          log {players.length} {questionIndexTwo}
        </button>
        <Carousel
          className="w-full min-h-full grow flex"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="min-h-full min">
            {players.map((player, index) => (
              <CarouselItem
                className="basis-1/2 h-[50vh] w-[50vw] relative mr-5 pl-0"
                key={index}
              >
                <div className="">
                  <Image
                    alt={player.playerName}
                    src={player.scrapedPlayerData.playerHeroImg}
                    fill
                    objectFit="cover"
                    objectPosition="center"
                    onLoadingComplete={() =>
                      setTimeout(() => {
                        setIsLoaded(true);
                      }, 500)
                    }
                    className={`min-w-full min-h-full grayscale duration-1000 relative `}
                  />
                  <div className="w-full h-full absolute bg-primary/10"></div>
                </div>
                <Image
                  src={player.scrapedPlayerData.clubLogoUrl}
                  alt={player.scrapedPlayerData.clubName}
                  width={70}
                  height={70}
                  className={`absolute inset-5 transition-all duration-1000 z-50 ${
                    gameState == "failed" ? "hidden" : "block"
                  }`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="inset-0 mx-auto text-white absolute bg-blue-900 px-5 rounded-full self-center flex justify-center max-w-fit text-sm">
          VS
        </p>
        {gameState == "in progress" && (
          <div className="absolute w-full h-full items-center flex flex-col justify-center">
            <div className="md:hidden block grow absolute">{gameState}</div>
            {currentQuestion == 1 ? (
              <AgeQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndexOne]}
                playerTwo={players[questionIndexTwo]}
              />
            ) : currentQuestion == 2 ? (
              <ValueQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndexOne]}
                playerTwo={players[questionIndexTwo]}
              />
            ) : (
              <HeightQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndexOne]}
                playerTwo={players[questionIndexTwo]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
