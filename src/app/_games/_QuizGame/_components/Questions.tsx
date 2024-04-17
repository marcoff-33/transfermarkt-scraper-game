import React, { useState } from "react";
import { PlayerData } from "../../../_types/playerData";
import Image from "next/image";
import AnswerButtons from "./AnswerButtons";
import { QuestionType, Solution } from "../ValueGame";

export type HeightAnswers = "Taller" | "Shorter";
export type AgeAnswers = "Younger" | "Older" | "Equal";
export type ValueAnswers = "Higher" | "Lower";

export type QuizGameAnswers = HeightAnswers | AgeAnswers | ValueAnswers;

export default function AgeQuestion({
  playerOne,
  playerTwo,
  handleSolution,
  showText,
  answerState,
  setAnswerState,
  questionType,
}: {
  playerOne: PlayerData;
  playerTwo: PlayerData;
  handleSolution: (solution: Solution) => void;
  showText: boolean;
  answerState: Solution;
  setAnswerState: (answerState: Solution) => void;
  questionType: QuestionType;
}) {
  const answers: QuizGameAnswers[] =
    questionType == "Age"
      ? ["Older", "Younger"]
      : questionType == "Height"
      ? ["Taller", "Shorter"]
      : ["Higher", "Lower"];

  // index 0 is the number value, index 1 is the pre-formatted string for the text elements.
  const playerOneData =
    questionType == "Age"
      ? [
          playerOne.scrapedPlayerData.playerAgeNumber,
          playerOne.scrapedPlayerData.playerAgeNumber,
        ]
      : questionType == "Height"
      ? [
          playerOne.scrapedPlayerData.playerHeightNumber,
          playerOne.scrapedPlayerData.playerHeight,
        ]
      : [
          playerOne.scrapedPlayerData.marketValueNumber,
          playerOne.scrapedPlayerData.playerValue,
        ];

  const playerTwoData =
    questionType == "Age"
      ? [
          playerTwo.scrapedPlayerData.playerAgeNumber,
          playerTwo.scrapedPlayerData.playerAgeNumber,
        ]
      : questionType == "Height"
      ? [
          playerTwo.scrapedPlayerData.playerHeightNumber,
          playerTwo.scrapedPlayerData.playerHeight,
        ]
      : [
          playerTwo.scrapedPlayerData.marketValueNumber,
          playerTwo.scrapedPlayerData.playerValue,
        ];

  const handleClick = (answer: QuizGameAnswers) => {
    const correctAnswer: QuizGameAnswers =
      playerTwoData[0] >= playerOneData[0] ? answers[0] : answers[1];

    // both answers are correct if same age/height/value
    if (answer == correctAnswer || playerOneData[0] == playerTwoData[0]) {
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

  const textAnimations = !showText
    ? "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent"
    : "";
  // this component is an overlay to the carousel that displays the relative questions for the 2 rendered active players
  return (
    <div className="min-w-full md:right-0 text-lg font-semibold text-text-primary self-center min-h-full flex items-center text-center justify-center flex-col relative gap-10">
      <div className={`w-full flex ${textAnimations}`}>
        {/*this row renders both player's name*/}
        <div className="basis-1/2 flex sm:flex-row flex-col self-center items-center justify-center gap-2">
          <p
            className={`md:pl-5 px-5 md:px-0 transition-all duration-200 text-sm md:text-lg ${textAnimations}`}
          >
            {playerOne.scrapedPlayerData.fullPlayerName}
          </p>
          <Image
            src={playerOne.scrapedPlayerData.clubLogoUrl}
            width={25}
            height={25}
            alt="Player One Club Logo"
            className={`transition-all duration-200 ${
              !showText ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
        <div className="basis-1/2 flex sm:flex-row self-center items-center justify-center gap-2 flex-col">
          <p
            className={`md:pl-5 px-5 md:px-0 transition-all duration-200 text-sm md:text-lg ${textAnimations}`}
          >
            {playerTwo.scrapedPlayerData.fullPlayerName}
          </p>
          <Image
            src={playerTwo.scrapedPlayerData.clubLogoUrl}
            width={25}
            height={25}
            alt="Player Two Club Logo"
            className={`transition-all duration-200 ${
              !showText ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </div>
      <div className="w-full flex">
        {/*this row renders the Data of the first player and buttons for the second one*/}
        <div
          className={`basis-1/2 flex flex-col justify-center gap-2 ${textAnimations}`}
        >
          <p
            className={`w-[30%] self-center border-b transition-all duration-500  text-sm md:text-lg  ${textAnimations}`}
          >
            {questionType}
          </p>
          <p className="transition-all duration-500  text-sm md:text-lg ">
            {playerOneData[1]}
          </p>
        </div>
        <div className="basis-1/2 flex flex-col gap-2 items-center">
          {/* this component renders the answer buttons, and also reveals player 2 data on correct answer */}
          <AnswerButtons
            answerState={answerState}
            showQuestions={showText}
            answers={answers}
            handleAnswer={handleClick}
            revealText={playerTwoData[1]}
          />
        </div>
      </div>
    </div>
  );
}
