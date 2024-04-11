import React, { useState } from "react";
import { PlayerData } from "../../types/playerData";
import { Solution } from "../games/ValueGame";
import { Button } from "../Buttons";
import Image from "next/image";
import AnswerButtons from "../AnswerButtons";
import { text } from "stream/consumers";
import { HeightAnswers } from "./HeightQuestion";
import { ValueAnswers } from "./ValueQuestion";

export type AgeAnswers = "Younger" | "Older" | "Equal";

export default function AgeQuestion({
  playerOne,
  playerTwo,
  handleSolution,
  textState,
  answerState,
  setAnswerState,
}: {
  playerOne: PlayerData;
  playerTwo: PlayerData;
  handleSolution: (solution: Solution) => void;
  textState: boolean;
  answerState: Solution;
  setAnswerState: (answerState: Solution) => void;
}) {
  const handleClick = (answer: AgeAnswers | HeightAnswers | ValueAnswers) => {
    const correctAnswer: AgeAnswers =
      playerOne.scrapedPlayerData.playerAgeNumber >=
      playerTwo.scrapedPlayerData.playerAgeNumber
        ? "Younger"
        : "Older";

    if (answer == correctAnswer) {
      setAnswerState("correct");
      setTimeout(() => {
        setAnswerState("pending");
      }, 2000);
      setTimeout(() => {
        handleSolution("correct");
      }, 2000);
    } else {
      setAnswerState("wrong");
      setTimeout(() => {
        setAnswerState("pending");
      }, 2000);
      setTimeout(() => {
        handleSolution("wrong");
      }, 2000);
    }
  };

  const answers: AgeAnswers[] = ["Younger", "Older"];
  const textAnimations = !textState
    ? "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent"
    : "";
  // this component is an overlay to the carousel that displays the 2 current players and renders the relative questions
  return (
    <div className="min-w-full md:right-0 text-lg font-semibold text-text-primary self-center min-h-full flex items-center text-center justify-center flex-col relative gap-10">
      <div className={`w-full flex ${textAnimations}`}>
        {/*this row renders both player's name*/}
        <div className="basis-1/2 flex flex-row self-center items-center justify-center gap-2">
          <p className={`pl-5 transition-all duration-200 ${textAnimations}`}>
            {playerOne.scrapedPlayerData.fullPlayerName}
          </p>
          <Image
            src={playerOne.scrapedPlayerData.clubLogoUrl}
            width={25}
            height={25}
            alt="Player One Club Logo"
            className={`transition-all duration-200 ${
              !textState ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <div className="basis-1/2 flex flex-row self-center items-center justify-center gap-2">
          <p className={`pl-5 transition-all duration-200 ${textAnimations}`}>
            {playerTwo.scrapedPlayerData.fullPlayerName}
          </p>
          <Image
            src={playerTwo.scrapedPlayerData.clubLogoUrl}
            width={25}
            height={25}
            alt="Player Two Club Logo"
            className={`transition-all duration-200 ${
              !textState ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </div>
      <div className="w-full flex">
        {/*this row renders the age of the first player and buttons for the second one*/}
        <div
          className={`basis-1/2 flex flex-col justify-center gap-2 ${textAnimations}`}
        >
          <p
            className={`w-[30%] self-center border-b transition-all duration-500 border-primary ${textAnimations}`}
          >
            Age
          </p>
          <p className="transition-all duration-500">
            {playerOne.scrapedPlayerData.playerAgeNumber}
          </p>
        </div>
        <div className="basis-1/2 flex flex-col gap-2 items-center">
          <AnswerButtons
            answerState={answerState}
            showQuestions={textState}
            answers={answers}
            handleAnswer={handleClick}
            revealText={playerTwo.scrapedPlayerData.playerAgeNumber}
          />
        </div>
      </div>
    </div>
  );
}
