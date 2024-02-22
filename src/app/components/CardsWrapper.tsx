import React from "react";
import { PlayersDb, Role } from "../types/playerDb";

export default function CardsWrapper({
  children,
  rerollPlayers,
  currentRole,
  availableRerolls,
  playersDb,
}: {
  children: React.ReactNode;
  rerollPlayers: (role: Role, playersDb: PlayersDb) => void;
  currentRole: Role;
  availableRerolls: number;
  playersDb: PlayersDb;
}) {
  return (
    <div className="flex flex-row justify-around w-full sm:py-2 z-50 backdrop-blur-sm bottom-5 self-center fixed container h-[200px] md:h-[200px] md:gap-20 gap-2">
      <button
        onClick={() => rerollPlayers(currentRole, playersDb)}
        className="text-white flex"
      >
        r
      </button>
      {children}
      <div className="text-white flex flex-col">X</div>
    </div>
  );
}
