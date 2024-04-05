"use client";

import { drawRandomPlayer } from "@/app/utils/randomRolePicks";
import React, { useEffect, useRef, useState } from "react";
import allPlayerDb from "../../../../public/players.json";
import serieaDb from "../../../../public/seriea.json";
import { saGetPlayerData } from "@/app/utils/saGetPlayerData";
import { PlayerData } from "@/app/types/playerData";
import Image from "next/image";
import ValueQuestion from "../_valueGameQuestions/ValueQuestion";
import AgeQuestion, { AnswerState } from "../_valueGameQuestions/AgeQuestion";
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
import { Button } from "../Buttons";

type GameState = "pending" | "in progress" | "failed";
export type Solution = "pending" | "correct" | "wrong";
type QuestionIndex = 1 | 2;

export default function ValueGame() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [playerDb, setPlayersDb] = useState(allPlayerDb);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionIndex>(1);
  const [gameState, setGameState] = useState<GameState>("pending");
  const [score, setScore] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questionIndexOne, setQuestionIndexOne] = useState(0);
  const [questionIndexTwo, setQuestionIndexTwo] = useState(1);
  const [newPlayerIndex, setNewPlayerIndex] = useState(3);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isFirstRender, setIsfirstRender] = useState(true);
  const [highscore, setHighscore] = useState(0);
  const [answerState, setAnswerState] = useState<AnswerState>("pending");

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
    setTimeout(() => {
      setShowQuestions(true);
      setIsfirstRender(false);
    }, 2000);

    setNewPlayerIndex(3);
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
    setShowQuestions(false);
    const currentPlayers = [...players];
    const newPlayer = await saGetPlayerData(drawRandomPlayer(playerDb));

    if (solution === "correct") {
      setGameState("in progress");
      setCurrentQuestion((Math.floor(Math.random() * 3) + 1) as QuestionIndex);
      setTimeout(() => {
        api?.scrollNext();
      }, 1000);
      setTimeout(() => {
        setShowQuestions(true);
      }, 2000);
      const updatedPlayers = [...currentPlayers];
      updatedPlayers[newPlayerIndex] = newPlayer;
      setIsfirstRender(false);
      setScore((prevState) => prevState + 1);
      setHighscore((prevState) =>
        score == highscore ? prevState + 1 : highscore
      );
      setQuestionIndexOne((prevState) => (prevState < 3 ? prevState + 1 : 0));
      setQuestionIndexTwo((prevState) => (prevState < 3 ? prevState + 1 : 0));
      setNewPlayerIndex((prevState) => (prevState < 3 ? prevState + 1 : 0));

      setPlayers(updatedPlayers);
    } else {
      setGameState("failed");
      setIsfirstRender(true);
      setScore(0);
      setGameState("pending");
    }
  };

  return (
    <div className="justify-center bg-background-deep md:container gap-2 relative py-10 max-w-full">
      <div className="w-full self-center flex justify-around  bg-background-front shadow-lg rounded-lg py-2 gap-5 my-5">
        <p className="text-lg font-bold bg-background-mid self-center px-3 rounded-lg text-text-primary">
          Score :{" "}
          <span className="text-primary font-bold self-center">{score}</span>
        </p>
        <Button
          className={`self-center md:absolute md:left-[50%] md:translate-x-[-50%] order-4 ${
            gameState == "in progress"
              ? "pointer-events-none bg-primary/10 text-primary-foreground/50"
              : ""
          } `}
          onClick={() => handleClick()}
        >
          Start
        </Button>
        <p className="text-lg font-bold bg-background-mid self-center px-3 rounded-lg text-text-primary order-1">
          Highscore :{" "}
          <span className="text-primary text-lg font-bold self-center">
            {highscore}
          </span>
        </p>
      </div>
      <div
        className={`text-center self-center relative flex flex-row gap-1 justify-center transition-all duration-1000 min-w-full }`}
      >
        <Carousel
          className="min-w-full min-h-full relative"
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <div
            className={`absolute z-[1000] inset-0 transition-all duration-500 delay-1000 ${
              gameState !== "in progress"
                ? "bg-background-front"
                : "bg-transparent invisible"
            }`}
          >
            {gameState == "pending" && (
              <div
                className={`transition-all duration-800 delay-1000 text-center flex flex-col justify-center h-full items-center gap-5 ${
                  gameState == "pending"
                    ? "text-primary-foreground"
                    : "text-transparent no-highlight"
                }`}
              >
                <div className="">Select Players :</div>
                <div className="flex flex-row">
                  <button
                    onClick={() => setPlayersDb(allPlayerDb)}
                    className={`transition-colors duraiton-300 rounded-full px-5 ${
                      playerDb == allPlayerDb ? "bg-primary" : ""
                    }`}
                  >
                    Global
                  </button>
                  <button
                    onClick={() => setPlayersDb(serieaDb)}
                    className={`transition-colors duraiton-300 ${
                      playerDb == serieaDb ? "bg-primary" : ""
                    } rounded-full px-5`}
                  >
                    Serie A
                  </button>
                </div>
              </div>
            )}
          </div>
          <CarouselContent className="min-h-full min-w-full h-[500px]">
            {players.map((player, index) => (
              <CarouselItem
                className="basis-1/2 h-[500px] w-[50vw] relative mr-5 pl-0 "
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
                    className={`min-w-full min-h-full grayscale duration-1000 relative rounded-xl ${
                      isLoaded && gameState == "in progress" ? "" : ""
                    }`}
                  />

                  <div
                    className={`w-full h-full absolute transition-all duration-500 rounded-xl delay-200 ${
                      answerState == "correct" && questionIndexTwo == index
                        ? "bg-green-900/80 backdrop-blur-md"
                        : "bg-background-front/90"
                    } ${
                      answerState == "wrong" && questionIndexTwo == index
                        ? "bg-red-800/80 backdrop-blur-md"
                        : "bg-background-front/90"
                    }`}
                  ></div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <p
          className={`font-bold inset-0 mx-auto absolute border border-primary bg-background-deep text-text-primary px-5 rounded-full self-center flex justify-center max-w-fit text-sm`}
        >
          VS
        </p>
        {gameState == "in progress" && (
          <div className="absolute w-full h-full items-center flex flex-col justify-center">
            {currentQuestion == 1 ? (
              <AgeQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndexOne]}
                playerTwo={players[questionIndexTwo]}
                textState={showQuestions}
                answerState={answerState}
                setAnswerState={setAnswerState}
              />
            ) : currentQuestion == 2 ? (
              <ValueQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndexOne]}
                playerTwo={players[questionIndexTwo]}
                textState={showQuestions}
                answerState={answerState}
                setAnswerState={setAnswerState}
              />
            ) : (
              <HeightQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndexOne]}
                playerTwo={players[questionIndexTwo]}
                textState={showQuestions}
                answerState={answerState}
                setAnswerState={setAnswerState}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
