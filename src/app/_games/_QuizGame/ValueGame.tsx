"use client";

import { drawRandomPlayer } from "@/app/_utils/randomRolePicks";
import React, { useState } from "react";
import allPlayerDb from "../../../../public/players.json";
import serieaDb from "../../../../public/seriea.json";

import { PlayerData } from "@/app/_types/playerData";

import { Carousel, CarouselApi, CarouselContent } from "@/app/_ui/carousel";
import QuizMenu from "./_components/QuizMenu";
import CarouselPlayer from "./_components/CarouselPlayer";
import Questions from "./_components/Questions";
import QuizGameBar from "./_components/QuizGameBar";

export type QuizGameState = "pending" | "in progress" | "failed";
export type Solution = "pending" | "correct" | "wrong";
export type PlayerLeagueDb = "Serie A" | "International";
export type QuestionType = "Height" | "Age" | "Market Value";

export default function ValueGame() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [playerDb, setPlayersDb] = useState<PlayerLeagueDb>("International"); // this dictates which local db is used to draw players from
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>("Market Value");
  const [gameState, setGameState] = useState<QuizGameState>("pending");
  const [score, setScore] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState(false); //handles the loading spinner
  const [questionIndex, setQuestionIndex] = useState(0); // used by <Questions /> component to get player data at players state index
  const [newPlayerIndex, setNewPlayerIndex] = useState(3); // used by handleSolution() to get index of the player off-screen to update
  const [showText, setShowText] = useState(false); // handles text animations on carousel slide
  const [highscore, setHighscore] = useState(0);
  const [answerState, setAnswerState] = useState<Solution>("pending"); // handles the animations depending on state of answer

  // the game carousel is structured with 4 players, with only 2 being rendered when an answer is pending (index 0 and 1 at the beginning).
  // when a new player is fetched (after a correct answer), it's inserted at newPlayerIndex (3 at the beginning, off-screen).
  // the newPlayerIndex then gets updated to match the player now off-screen.
  // 4 players are required to ensure that the outgoing player keeps it's data during the carousel animation,
  // and the next incoming player is already fetched before it animates.

  const CurrentDbType = playerDb == "International" ? allPlayerDb : serieaDb;
  const gameQuestions: QuestionType[] = ["Age", "Height", "Market Value"];

  const playersArray = [0, 1, 2, 3];
  const drawFourPlayers = playersArray.map(() => drawRandomPlayer(CurrentDbType));

  // used by <Questions /> to get data from players state index
  const secondQuestionIndex = questionIndex < 3 ? questionIndex + 1 : 0;

  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  const handleStart = async () => {
    setIsLoaded(true);
    carouselApi?.scrollTo(0);
    const playerPromises = drawFourPlayers.map(async (player) => {
      const res = await fetch(`/api/getPlayer/${player}`);
      const playerData = await res.json();
      return playerData;
    });
    const allPlayersData = await Promise.all(playerPromises);
    setPlayers(allPlayersData);
    setQuestionIndex(0);
    setGameState("in progress");
    setIsLoaded(false);
    setScore(0);
    setTimeout(() => {
      setShowText(true);
    }, 2000);
    setNewPlayerIndex(3);
  };

  const handleSolution = async (solution: Solution) => {
    setShowText(false);
    const res = await fetch(`/api/getPlayer/${drawRandomPlayer(CurrentDbType)}`);
    const newPlayer = await res.json();

    if (solution === "correct") {
      setGameState("in progress");
      setCurrentQuestion(gameQuestions[Math.floor(Math.random() * 3)]);
      setTimeout(() => {
        carouselApi?.scrollNext();
      }, 1000);
      setTimeout(() => {
        setShowText(true);
      }, 2000);
      const updatedPlayers = [...players];
      updatedPlayers[newPlayerIndex] = newPlayer;
      setScore((prevState) => prevState + 1);
      setHighscore((prevState) => (score == highscore ? prevState + 1 : highscore));
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
      <QuizGameBar gameState={gameState} handleStart={handleStart} highscore={highscore} isLoaded={isLoaded} score={score} />
      <div className={`text-center self-center relative flex flex-row gap-1 justify-center transition-all duration-1000 min-w-full }`}>
        <Carousel
          className="min-w-full min-h-full relative"
          setApi={setCarouselApi}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          {/*QuizMenu visible only at "pending" or "failed" game states */}
          <QuizMenu gameState={gameState} isLoaded={isLoaded} showQuestions={showText} playersDb={playerDb} setPlayersDb={setPlayersDb} />
          <CarouselContent className="min-h-full min-w-full h-[500px]">
            {players.map((player, index) => (
              <CarouselPlayer answerState={answerState} index={index} playerData={player} secondQuestionIndex={secondQuestionIndex} key={index} />
            ))}
          </CarouselContent>
        </Carousel>
        <div className={`font-bold top-[50%] min-w-full absolute  self-center flex justify-center max-w-full max-h-fit text-sm`}>
          <p className="px-2 rounded-full border-primary bg-background-deep text-text-primary border self-start">VS</p>
        </div>
        {gameState == "in progress" && (
          <div className="absolute w-full h-full items-center flex flex-col justify-center">
            <Questions answerState={answerState} handleSolution={handleSolution} playerOne={players[questionIndex]} playerTwo={players[secondQuestionIndex]} questionType={currentQuestion} setAnswerState={setAnswerState} showText={showText} />
          </div>
        )}
      </div>
    </div>
  );
}
