import React from "react";
import { Button } from "./Buttons";
import { AgeAnswers, AnswerState } from "./_valueGameQuestions/AgeQuestion";
import { HeightAnswers } from "./_valueGameQuestions/HeightQuestion";
import { ValueAnswers } from "./_valueGameQuestions/ValueQuestion";

export default function AnswerButtons({
  answerState,
  showQuestions,
  answers,
  handleAnswer,
  revealText,
}: {
  answerState: AnswerState;
  showQuestions: boolean;
  answers: AgeAnswers[] | HeightAnswers[] | ValueAnswers[];
  handleAnswer: (answer: AgeAnswers | HeightAnswers | ValueAnswers) => void;
  revealText: number | string;
}) {
  const textAnimations = !showQuestions
    ? "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent"
    : "";
  return (
    <div className="w-full flex flex-col items-center gap-2 relative">
      <div
        className={`inset-0  absolute duration-1000 transition-all delay-200 ${
          answerState !== "pending"
            ? ""
            : "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent -z-50"
        }`}
      >
        <p>
          {answers[0] == "Younger"
            ? "Age"
            : answers[0] == "More Expensive"
            ? "Market Value"
            : "Height"}
        </p>
        <p>{revealText}</p>
      </div>
      {answers.map((answer) => (
        <Button
          className={`w-[30%] text-center duration-200 ${
            !showQuestions
              ? "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent"
              : ""
          } ${
            answerState !== "pending" && showQuestions
              ? "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent"
              : ""
          }`}
          onClick={() => handleAnswer(answer)}
          disabled={answerState !== "pending"}
        >
          {answer}
        </Button>
      ))}
    </div>
  );
}
