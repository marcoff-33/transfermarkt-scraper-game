import React from "react";
import { PlayerData } from "../../types/playerData";
import { Solution } from "../games/ValueGame";
import { Button } from "../Buttons";

type Answer = "yes" | "no";

export default function AgeQuestion({
  playerOne,
  playerTwo,
  handleSolution,
  textState,
}: {
  playerOne: PlayerData;
  playerTwo: PlayerData;
  handleSolution: (solution: Solution) => void;
  textState: boolean;
}) {
  const handleClick = (answer: Answer) => {
    const correctAnswer: Answer =
      playerOne.scrapedPlayerData.playerAgeNumber >
      playerTwo.scrapedPlayerData.playerAgeNumber
        ? "yes"
        : "no";

    answer == correctAnswer
      ? handleSolution("correct")
      : handleSolution("wrong");
  };
  return (
    <div className="w-full md:right-0 text-lg font-semibold text-text-primary self-center h-full flex items-center text-center justify-around flex-row">
      <div className="grow basis-1/2 flex flex-col gap-8 justify-center">
        <div
          className={`basis-1/2 grow items-center flex flex-none self-center text-text-primary px-3 rounded-lg md:px-10 text-xl transition-all duration-500 ${
            textState ? "" : "text-transparent"
          }`}
        >
          {playerOne.scrapedPlayerData.fullPlayerName}
        </div>
        <div className="basis-1/2 grow flex flex-col">
          <p
            className={`text-text-primary max-w-fit self-center px-5 rounded-lg font-light transition-all duration-500 ${
              textState ? "" : "text-transparent"
            }`}
          >
            Age
          </p>
          <p
            className={`max-w-fit self-center px-5 rounded-lg text-text-primary font-bold transition-all duration-500 ${
              textState ? "" : "text-transparent"
            }`}
          >
            {playerOne.scrapedPlayerData.playerAgeNumber}{" "}
          </p>
        </div>
      </div>
      <div
        className={`grow flex flex-col rounded-full gap-5 basis-1/2 justify-center mt-8 transition-all duration-500 ${
          textState ? "" : ""
        }`}
      >
        <div className="text-text-primary block md:hidden">
          <p
            className={`text-text-primary font-bold underline transition-all duration-500 ${
              textState ? "" : "text-transparent"
            }`}
          >
            {playerTwo.scrapedPlayerData.fullPlayerName}
          </p>
          <p
            className={`transition-all duration-500 text-text-primary block md:hidden ${
              textState ? "" : "text-transparent"
            }`}
          >
            Is ...
          </p>
        </div>
        <div
          className={`flex-none bg-background-deep/60 backdrop-blur-lg rounded-md mx-5 px-2 hidden md:block transition-all duration-500 ${
            textState ? "" : "bg-transparent backdrop-blur-none"
          }`}
        >
          <span
            className={`font-light transition-all duration-500 ${
              textState
                ? ""
                : "bg-transparent backdrop-blur-none text-transparent"
            }`}
          >
            is
          </span>
          <span
            className={`text-text-primary font-bold transition-all duration-500 ${
              textState ? "" : "text-transparent"
            }`}
          >
            {" "}
            {playerOne.scrapedPlayerData.fullPlayerName}{" "}
          </span>
          <span
            className={`text-primary transition-all duration-500 ${
              textState ? "" : "text-transparent"
            }`}
          >
            Older{" "}
          </span>
          <span
            className={`text-primary transition-all duration-500 ${
              textState ? "" : "text-transparent"
            }`}
          >
            Than
          </span>
          <span
            className={`text-text-primary font-bold transition-all duration-500 ${
              textState ? "" : "text-transparent"
            }`}
          >
            {" "}
            {playerTwo.scrapedPlayerData.fullPlayerName} ?
          </span>{" "}
        </div>
        <div className="flex flex-col self-center gap-2">
          <Button
            onClick={() => handleClick("yes")}
            className={`bg-primary text-primary-foreground font-light hidden md:block transition-all duration-500 ${
              textState
                ? ""
                : "text-transparent bg-transparent border-transparent hover:bg-transparent"
            }`}
          >
            Yes
          </Button>
          <Button
            onClick={() => handleClick("yes")}
            className={`bg-primary text-primary-foreground font-light block md:hidden transition-all duration-500 ${
              textState
                ? ""
                : "text-transparent bg-transparent border-transparent hover:bg-transparent"
            }`}
          >
            Younger
          </Button>
          <Button
            onClick={() => handleClick("no")}
            className={`backdrop-blur-lg hidden md:block transition-all duration-500 ${
              textState
                ? ""
                : "text-transparent bg-transparent border-transparent backdrop-blur-none hover:bg-transparent"
            }`}
            variant={"secondary"}
          >
            No
          </Button>
          <Button
            onClick={() => handleClick("no")}
            variant={"secondary"}
            className={`font-light block md:hidden transition-all duration-500 ${
              textState
                ? ""
                : "text-transparent bg-transparent border-transparent hover:bg-transparent backdrop-blur-none"
            }`}
          >
            Older
          </Button>
        </div>
      </div>
    </div>
  );
}
