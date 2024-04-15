import React from "react";
import { Button } from "../../../_components/Buttons";
import { QuizGameState } from "@/app/games/ValueGame";

export default function QuizGameBar({
  gameState,
  isLoaded,
  score,
  highscore,
  handleStart,
}: {
  gameState: QuizGameState;
  isLoaded: boolean;
  score: number;
  highscore: number;
  handleStart: () => void;
}) {
  return (
    <div className="w-full self-center flex justify-around  rounded-lg py-4 gap-5 rounded-b-none">
      <p className="text-lg font-bold self-center bg-background-mid text-text-primary px-3 rounded-lg  shadow-md">
        Score :{" "}
        <span className="text-primary font-bold self-center">{score}</span>
      </p>
      <Button
        className={`self-center md:absolute md:left-[50%] md:translate-x-[-50%] order-4 ${
          gameState == "in progress"
            ? "pointer-events-none bg-primary/10 text-primary-foreground/50"
            : ""
        } `}
        onClick={() => {
          !isLoaded && handleStart();
        }}
      >
        Start
      </Button>
      <p className="text-lg font-bold bg-background-mid self-center px-3 rounded-lg text-text-primary order-1 shadow-md">
        Highscore :{" "}
        <span className="text-primary text-lg font-bold self-center">
          {highscore}
        </span>
      </p>
    </div>
  );
}
