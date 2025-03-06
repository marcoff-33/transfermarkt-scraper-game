import React, { SetStateAction, useState } from "react";
import { Button } from "../../../_components/Buttons";
import { Formation, GameState } from "../MainGame";
import PreGameSvgFormations from "./PreGameSvgFormations";

type BudgetSize = "€ 350m" | "€ 400m" | "€ 500m";

export default function PreGameModal({ setBudget, setGameState, setFormation }: { setBudget: (value: number) => void; setGameState: (state: GameState) => void; setFormation: (formation: Formation) => void }) {
  const [budgetValue, setBudgetValue] = useState<BudgetSize>("€ 400m");
  const [selectedFormation, setSelectedFormation] = useState<Formation>("433");

  const values: BudgetSize[] = ["€ 350m", "€ 400m", "€ 500m"];
  const formations: Formation[] = ["352", "433", "442Diamond"];

  const handleClick = (budget: BudgetSize, formation: Formation) => {
    budget == "€ 350m" ? setBudget(350000000) : budget == "€ 400m" ? setBudget(400000000) : setBudget(500000000);
    setGameState("in progress");
    setFormation(formation);
  };

  return (
    <div className="min-w-full self-center justify-start py-20 items-center flex flex-col gap-10 shrink-0 min-h-[100vh] bg-background-mid z-50 overflow-hidden relative">
      <div className="w-full h-full absolute grainybg -z-50"></div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-transparent -z-20"></div>
      <div className="text-text-primary text-4xl py-5 font-bold">Budget & Formation</div>
      <div className="flex flex-col gap-20">
        <div className="flex md:flex-row gap-2 flex-col justify-center mx-auto min-w-full h-[50px]">
          {values.map((value, index) => (
            <button className={`grow border border-text-primary text-4xl rounded-md px-3 ${value == budgetValue ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg shadow-black" : "bg-transparent"}`} onClick={() => setBudgetValue(value)} key={index}>
              {value}
            </button>
          ))}
        </div>

        <div className="flex gap-5 flex-col">
          <div className="flex md:flex-row gap-2">
            {formations.map((formation, index) => (
              <button onClick={() => setSelectedFormation(formation)} key={index} className={`border border-text-primary max-h-fit py-3 self-center transition-colors rounded-md px-3 ${selectedFormation == formation ? "bg-gradient-to-br from-primary to-secondary shadow-lg shadow-black" : ""}`}>
                <PreGameSvgFormations formation={formation} currentFormation={selectedFormation} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button className="bg-primary text-4xl p-4" variant={"default"} onClick={() => handleClick(budgetValue, selectedFormation)}>
        START
      </Button>
    </div>
  );
}
