import React, { SetStateAction, useState } from "react";

type BudgetSize = "small" | "medium" | "large";

export default function PreGameModal({ setBudget, setGameState }: any) {
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
    <div className="min-w-[100vw] justify-center items-center flex flex-col gap-10 shrink-0 min-h-[100vh] bg-blue-500/30 backdrop-blur-md absolute z-50 overflow-hidden">
      <div className="flex flex-row gap-5">
        <div className="">Team Budget: </div>
        {values.map((value) => (
          <button
            className={`${value == budgetValue ? "bg-red-500" : ""}`}
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
