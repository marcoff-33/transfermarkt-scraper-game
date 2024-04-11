"use client";

import { drawRandomPlayer } from "@/app/utils/randomRolePicks";
import React, { useState } from "react";
import allPlayerDb from "../../../../public/players.json";
import serieaDb from "../../../../public/seriea.json";
import { saGetPlayerData } from "@/app/utils/saGetPlayerData";
import { PlayerData } from "@/app/types/playerData";

import ValueQuestion from "../_valueGameQuestions/ValueQuestion";
import AgeQuestion from "../_valueGameQuestions/AgeQuestion";
import HeightQuestion from "../_valueGameQuestions/HeightQuestion";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import QuizMenu from "../QuizMenu";
import QuizGameBar from "../QuizGameBar";
import CarouselPlayer from "../CarouselPlayer";

export type QuizGameState = "pending" | "in progress" | "failed";
export type Solution = "pending" | "correct" | "wrong";
export type PlayerLeagueDb = "Serie A" | "International";
type QuestionIndex = 1 | 2;

export default function ValueGame() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [playerDb, setPlayersDb] = useState<PlayerLeagueDb>("International"); // this dictates which local db is used to draw players from
  const [currentQuestion, setCurrentQuestion] = useState<QuestionIndex>(1);
  const [gameState, setGameState] = useState<QuizGameState>("pending");
  const [score, setScore] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false); //handles the loading spinner
  const [questionIndex, setQuestionIndex] = useState(0); // used by question components to get player data at players state index
  const [newPlayerIndex, setNewPlayerIndex] = useState(3); // used by handleSolution() to get index of the player off-screen to update
  const [showQuestions, setShowQuestions] = useState(false); // handles question animations
  const [highscore, setHighscore] = useState(0);
  const [answerState, setAnswerState] = useState<Solution>("pending"); // handles the animations depending on state of answer

  // the game carousel is structured with 4 players, with only 2 being rendered when an answer is pending (index 0 and 1 at the beginning).
  // when a new player is fetched (after a correct answer), it's inserted at newPlayerIndex (3 at the beginning, off-screen).
  // the newPlayerIndex then gets updated to match the player now off-screen.
  // 4 players are required to ensure that the outgoing player keeps it's data during the carousel animation,
  // and the next incoming player is already fetched before it animates.

  const CurrentDbType = playerDb == "International" ? allPlayerDb : serieaDb;

  const playersArray = [0, 1, 2, 3];
  const drawFourPlayers = playersArray.map(() =>
    drawRandomPlayer(CurrentDbType)
  );

  const secondQuestionIndex = questionIndex < 3 ? questionIndex + 1 : 0;

  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  const handleStart = async () => {
    setIsLoaded(true);
    carouselApi?.scrollTo(0);
    const playerPromises = drawFourPlayers.map(async (player) => {
      const playerData = await saGetPlayerData(player);
      return playerData;
    });
    const allPlayersData = await Promise.all(playerPromises);
    setPlayers(allPlayersData);
    setQuestionIndex(0);
    setGameState("in progress");
    setIsLoaded(false);
    setScore(0);
    setTimeout(() => {
      setShowQuestions(true);
    }, 2000);
    setNewPlayerIndex(3);
  };

  const handleSolution = async (solution: Solution) => {
    setShowQuestions(false);
    const newPlayer = await saGetPlayerData(drawRandomPlayer(CurrentDbType));

    if (solution === "correct") {
      setGameState("in progress");
      setCurrentQuestion((Math.floor(Math.random() * 3) + 1) as QuestionIndex);
      setTimeout(() => {
        carouselApi?.scrollNext();
      }, 1000);
      setTimeout(() => {
        setShowQuestions(true);
      }, 2000);
      const updatedPlayers = [...players];
      updatedPlayers[newPlayerIndex] = newPlayer;
      setScore((prevState) => prevState + 1);
      setHighscore((prevState) =>
        score == highscore ? prevState + 1 : highscore
      );
      setQuestionIndex((prevState) => (prevState < 3 ? prevState + 1 : 0));
      setNewPlayerIndex((prevState) => (prevState < 3 ? prevState + 1 : 0));
      setPlayers(updatedPlayers);
    } else {
      setGameState("failed");
      setScore(0);
      setGameState("pending");
    }
  };

  return (
    <div className="justify-center bg-background-deep 2xl container gap-2 relative max-w-full">
      <QuizGameBar
        gameState={gameState}
        handleStart={handleStart}
        highscore={highscore}
        isLoaded={isLoaded}
        score={score}
      />
      <div
        className={`text-center self-center relative flex flex-row gap-1 justify-center transition-all duration-1000 min-w-full }`}
      >
        <Carousel
          className="min-w-full min-h-full relative"
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          {/*QuizMenu visible only at "pending" or "failed" game states */}
          <QuizMenu
            gameState={gameState}
            isLoaded={isLoaded}
            showQuestions={showQuestions}
            playersDb={playerDb}
            setPlayersDb={setPlayersDb}
          />
          <CarouselContent className="min-h-full min-w-full h-[500px]">
            {players.map((player, index) => (
              <CarouselPlayer
                answerState={answerState}
                index={index}
                playerData={player}
                secondQuestionIndex={secondQuestionIndex}
              />
            ))}
          </CarouselContent>
        </Carousel>
        <div
          className={`font-bold inset-0 min-w-full absolute  self-center flex justify-center max-w-fit text-sm`}
        >
          <p className="px-2 rounded-full border-primary bg-background-deep text-text-primary border">
            VS
          </p>
        </div>
        {gameState == "in progress" && (
          <div className="absolute w-full h-full items-center flex flex-col justify-center">
            {currentQuestion == 1 ? (
              <AgeQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndex]}
                playerTwo={players[secondQuestionIndex]}
                textState={showQuestions}
                answerState={answerState}
                setAnswerState={setAnswerState}
              />
            ) : currentQuestion == 2 ? (
              <ValueQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndex]}
                playerTwo={players[secondQuestionIndex]}
                textState={showQuestions}
                answerState={answerState}
                setAnswerState={setAnswerState}
              />
            ) : (
              <HeightQuestion
                handleSolution={handleSolution}
                playerOne={players[questionIndex]}
                playerTwo={players[secondQuestionIndex]}
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
