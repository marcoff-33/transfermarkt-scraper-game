import React from "react";
import { PlayerData } from "../../types/playerData";
import { Solution } from "../games/ValueGame";
import { Button } from "../Buttons";

type Answer = "yes" | "no";

export default function AgeQuestion({
  playerOne,
  playerTwo,
  handleSolution,
}: {
  playerOne: PlayerData;
  playerTwo: PlayerData;
  handleSolution: (solution: Solution) => void;
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
        <div className="basis-1/2 grow items-center flex flex-none self-center text-text-primary px-3 rounded-lg md:px-10 text-xl">
          {playerOne.scrapedPlayerData.fullPlayerName}
        </div>
        <div className="basis-1/2 grow flex flex-col">
          <p className="text-text-primary max-w-fit self-center px-5 rounded-lg font-light">
            Age
          </p>
          <p className="max-w-fit self-center px-5 rounded-lg text-text-primary font-bold">
            {playerOne.scrapedPlayerData.playerAgeNumber}{" "}
          </p>
        </div>
      </div>
      <div className="grow flex flex-col rounded-full gap-5 basis-1/2 justify-center mt-8">
        <div className="text-text-primary block md:hidden">
          <p className="text-text-primary font-bold underline">
            {playerTwo.scrapedPlayerData.fullPlayerName}
          </p>
          is ...
        </div>
        <div className="flex-none bg-background-deep/60 backdrop-blur-lg rounded-md mx-5 px-2 hidden md:block">
          <span className="font-light">is</span>
          <span className="text-text-primary font-bold">
            {" "}
            {playerOne.scrapedPlayerData.fullPlayerName}{" "}
          </span>
          <span className="text-primary">Older </span>
          <span className="text-primary">Than</span>
          <span className="text-text-primary font-bold">
            {" "}
            {playerTwo.scrapedPlayerData.fullPlayerName}
          </span>{" "}
          ?
        </div>
        <div className="flex flex-col self-center gap-2">
          <Button
            onClick={() => handleClick("yes")}
            className="bg-primary text-primary-foreground font-light hidden md:block"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleClick("yes")}
            className="bg-primary text-primary-foreground font-light block md:hidden"
          >
            Younger
          </Button>
          <Button
            onClick={() => handleClick("no")}
            className="backdrop-blur-lg hidden md:block"
            variant={"secondary"}
          >
            No
          </Button>
          <Button
            onClick={() => handleClick("no")}
            variant={"secondary"}
            className="font-light block md:hidden"
          >
            Older
          </Button>
        </div>
      </div>
    </div>
  );
}
