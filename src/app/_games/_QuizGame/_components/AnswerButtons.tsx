import React from "react";
import { Button } from "../../../_components/Buttons";
import { QuizGameAnswers } from "./Questions";
import { Solution } from "../ValueGame";

export default function AnswerButtons({
  answerState,
  showQuestions,
  answers,
  handleAnswer,
  revealText,
}: {
  answerState: Solution;
  showQuestions: boolean;
  answers: QuizGameAnswers[];
  handleAnswer: (answer: QuizGameAnswers) => void;
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
            : "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent -z-50 pointer-events-none hover:bg-transparent"
        }`}
      >
        <p>
          {answers[0] == "Older"
            ? "Age"
            : answers[0] == "Higher"
            ? "Market Value"
            : "Height"}
        </p>
        <p>{revealText}</p>
      </div>
      {answers.map((answer, index) => (
        <Button
          className={`w-[30%] text-center duration-200 px-10 sm:px-none ${
            !showQuestions
              ? "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent pointer-events-none hover:bg-transparent invisible"
              : ""
          } ${
            answerState !== "pending" && showQuestions
              ? "bg-transparent text-transparent shadow-transparent backdrop-blur-0 border-transparent pointer-events-none hover:bg-transparent invisible"
              : ""
          }`}
          onClick={() => handleAnswer(answer)}
          disabled={answerState !== "pending" || !showQuestions}
          key={index}
        >
          {answer}
        </Button>
      ))}
    </div>
  );
}
