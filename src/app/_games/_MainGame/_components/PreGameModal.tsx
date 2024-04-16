import React, { SetStateAction, useState } from "react";
import { Button } from "../../../_components/Buttons";
import { Formation, GameState } from "../MainGame";

type BudgetSize = "€ 350m" | "€ 400m" | "€ 500m";

export default function PreGameModal({
  setBudget,
  setGameState,
  setFormation,
}: {
  setBudget: (value: number) => void;
  setGameState: (state: GameState) => void;
  setFormation: (formation: Formation) => void;
}) {
  const [budgetValue, setBudgetValue] = useState<BudgetSize>("€ 400m");
  const [selectedFormation, setSelectedFormation] =
    useState<Formation>("4-3-3");

  const values: BudgetSize[] = ["€ 350m", "€ 400m", "€ 500m"];
  const formations: Formation[] = ["3-1-4-2", "4-3-3", "4-4-2 ( Diamond )"];

  const handleClick = (budget: BudgetSize, formation: Formation) => {
    budget == "€ 350m"
      ? setBudget(350000000)
      : budget == "€ 400m"
      ? setBudget(400000000)
      : setBudget(500000000);
    setGameState("in progress");
    setFormation(formation);
  };
  return (
    <div className="min-w-full self-center justify-center items-center flex flex-col gap-10 shrink-0 min-h-[100vh] bg-background-50 z-50 overflow-hidden relative bg-grid-small-primaryhexlight/[0.4] dark:bg-grid-small-primaryhexdark/[0.3]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gradient-to-b from-background-deep via-transparent to-background-deep -z-20"></div>

      <div className="flex sm:flex-row gap-5 flex-col">
        <div className="text-primary">Team Budget : </div>
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
      <div className="flex sm:flex-row gap-5 flex-col">
        <div className="text-primary">Team Formation : </div>
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
