import React, { SetStateAction, useState } from "react";
import { Formation, GameState } from "./game/MainGame";

type BudgetSize = "small" | "medium" | "large";

export default function PreGameModal({
  setBudget,
  setGameState,
  setFormation,
}: {
  setBudget: (value: number) => void;
  setGameState: (state: GameState) => void;
  setFormation: (formation: Formation) => void;
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
        {values.map((value, index) => (
          <button
            className={`transition-colors ${
              value == budgetValue ? "bg-red-500" : "bg-transparent"
            }`}
            onClick={() => setBudgetValue(value)}
            key={index}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-5">
        <button onClick={() => setFormation("343")}>3-4-3</button>
        <button onClick={() => setFormation("433")}>4-3-3</button>
        <button onClick={() => setFormation("442")}>4-4-2(diamond)</button>
      </div>
      <button onClick={() => handleClick(budgetValue)}>Start Game</button>
    </div>
  );
}
