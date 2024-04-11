import React from "react";
import { PlayerLeagueDb, QuizGameState } from "./games/ValueGame";
import { ImSpinner3 } from "react-icons/im";

export default function QuizMenu({
  gameState,
  isLoaded,
  showQuestions,
  playersDb,
  setPlayersDb,
}: {
  gameState: QuizGameState;
  isLoaded: boolean;
  showQuestions: boolean;
  playersDb: PlayerLeagueDb;
  setPlayersDb: (league: PlayerLeagueDb) => void;
}) {
  return (
    <div
      className={`absolute z-[1000] inset-0 transition-all duration-500 delay-1000  ${
        gameState !== "in progress"
          ? "bg-background-deep border-primary border-[2px]"
          : "bg-transparent invisible border-transparent"
      }`}
    >
      {gameState == "pending" && (
        <div
          className={`transition-all duration-800 delay-1000 text-center flex flex-col justify-center h-full items-center gap-5 ${
            gameState == "pending"
              ? "text-text-primary"
              : "text-transparent no-highlight"
          }`}
        >
          <ImSpinner3
            className={`duration-3000 transition-colors ${
              isLoaded ? "text-primary animate-spin" : "text-transparent"
            } ${showQuestions ? "hidden" : "block"}`}
            size={50}
          />

          <div className="">Select Players :</div>
          <div className="flex flex-row">
            <button
              onClick={() => setPlayersDb("International")}
              className={`transition-colors duraiton-300 rounded-full px-3 py-1 ${
                playersDb == "International"
                  ? "bg-primary text-primary-foreground"
                  : ""
              }`}
            >
              International
            </button>

            <button
              onClick={() => setPlayersDb("Serie A")}
              className={`transition-colors duraiton-300 ${
                playersDb == "Serie A"
                  ? "bg-primary text-primary-foreground"
                  : ""
              } rounded-full px-5`}
            >
              Serie A
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
