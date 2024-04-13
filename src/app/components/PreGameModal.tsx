import React, { SetStateAction, useState } from "react";
import { Formation, GameState } from "./games/MainGame";
import { Button } from "./Buttons";

type BudgetSize = "Small" | "Medium" | "Large";

export default function PreGameModal({
  setBudget,
  setGameState,
  setFormation,
}: {
  setBudget: (value: number) => void;
  setGameState: (state: GameState) => void;
  setFormation: (formation: Formation) => void;
}) {
  const [budgetValue, setBudgetValue] = useState<BudgetSize>("Medium");
  const [selectedFormation, setSelectedFormation] =
    useState<Formation>("4-3-3");

  const values: BudgetSize[] = ["Small", "Medium", "Large"];
  const formations: Formation[] = ["3-5-2", "4-3-3", "4-4-2 ( Diamond )"];

  const handleClick = (budget: BudgetSize, formation: Formation) => {
    budget == "Small"
      ? setBudget(450000000)
      : budget == "Medium"
      ? setBudget(500000000)
      : setBudget(600000000);
    setGameState("in progress");
    setFormation(formation);
  };
  return (
    <div className="min-w-full self-center justify-center items-center flex flex-col gap-10 shrink-0 min-h-[100vh] bg-background-50 z-50 overflow-hidden">
      <div className="flex flex-row gap-5">
        <div className="">Team Budget: </div>
        {values.map((value, index) => (
          <button
            className={`transition-colors rounded-full px-3 ${
              value == budgetValue
                ? "bg-primary text-primary-foreground"
                : "bg-transparent"
            }`}
            onClick={() => setBudgetValue(value)}
            key={index}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="flex flex-row gap-5">
        <div className="">Team Formation: </div>
        {formations.map((formation, index) => (
          <button
            onClick={() => setSelectedFormation(formation)}
            key={index}
            className={`transition-colors rounded-full px-3 ${
              selectedFormation == formation
                ? "bg-primary text-primary-foreground"
                : ""
            }`}
          >
            {formation}
          </button>
        ))}
      </div>
      <Button
        className="bg-primary"
        variant={"default"}
        onClick={() => handleClick(budgetValue, selectedFormation)}
      >
        Start Game
      </Button>
    </div>
  );
}
