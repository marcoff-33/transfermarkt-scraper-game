import React, { SetStateAction, useState } from "react";
import { GameState } from "./game/MainGame";

type BudgetSize = "small" | "medium" | "large";

export default function PreGameModal({
  setBudget,
  setGameState,
}: {
  setBudget: (value: number) => void;
  setGameState: (state: GameState) => void;
}) {
  const [budgetValue, setBudgetValue] = useState<BudgetSize>("medium");
  const values: BudgetSize[] = ["small", "medium", "large"];

  const handleClick = (budget: BudgetSize) => {
    budget == "small"
      ? setBudget(100000000)
      : budget == "medium"
      ? setBudget(250000000)
      : setBudget(350000000);
    setGameState("in progress");
  };
  return (
    <div className="min-w-full self-center justify-center items-center flex flex-col gap-10 shrink-0 min-h-[100vh] bg-zinc-500 z-50 overflow-hidden">
      <div className="flex flex-row gap-5">
        <div className="">Team Budget: </div>
        {values.map((value) => (
          <button
            className={`transition-colors ${
              value == budgetValue ? "bg-red-500" : "bg-transparent"
            }`}
            onClick={() => setBudgetValue(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <button onClick={() => handleClick(budgetValue)}>Start Game</button>
    </div>
  );
}
