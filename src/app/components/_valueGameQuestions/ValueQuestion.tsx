import React from "react";
import { PlayerData } from "../../types/playerData";
import { Solution } from "../games/ValueGame";

type Answer = "yes" | "no";

export default function ValueQuestion({
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
      playerOne.scrapedPlayerData.marketValueNumber >
      playerTwo.scrapedPlayerData.marketValueNumber
        ? "yes"
        : "no";

    answer == correctAnswer
      ? handleSolution("correct")
      : handleSolution("wrong");
  };
  return (
    <div className="w-full md:right-0 text-lg font-semibold text-black self-center h-full flex items-center text-center justify-around flex-col md:flex-row">
      <div className="grow basis-1/2 flex flex-col gap-8 justify-center">
        <div className="basis-1/2 grow items-end md:items-center flex md:flex-none self-center">
          {playerOne.playerName}
        </div>
        <div className="basis-1/2 grow flex flex-col ">
          <p>Market Value</p>
          {playerOne.scrapedPlayerData.playerValue}
        </div>
      </div>
      <div className="grow flex flex-col rounded-full gap-5 basis-1/2 justify-center">
        <div className="flex-none bg-black/20 rounded-md mx-5 px-2">
          is <span className="text-purple-900"> {playerOne.playerName} </span>
          worth more than
          <span className="text-purple-900"> {playerTwo.playerName}</span> ?
        </div>
        <div className="flex flex-row self-center gap-5">
          <button
            onClick={() => handleClick("yes")}
            className="bg-green-500 rounded-xl p-2"
          >
            Yes
          </button>
          <button
            onClick={() => handleClick("no")}
            className="bg-red-500 rounded-xl p-2"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
