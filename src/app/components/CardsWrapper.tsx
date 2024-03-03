import React, { useState } from "react";
import { PlayersDb, Role } from "../types/playerDb";
import { BiRefresh } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";

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
  const [mini, setMini] = useState(false);
  return (
    <div className="container fixed bottom-5 self-center">
      {!mini ? (
        <div className="flex flex-row justify-around w-full sm:py-2 z-50 backdrop-blur-sm bottom-5 self-center h-[150px] sm:h-[200px] md:gap-5 gap-2">
          <button
            onClick={() => rerollPlayers(currentRole, playersDb)}
            className="text-white flex"
          >
            <BiRefresh className="text-purple-800" size={24} />
          </button>
          {children}
          <button
            className="text-white flex flex-col"
            onClick={() => setMini(true)}
          >
            <BiSolidHide className="text-purple-800 mx-3" size={24} />
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-end w-full sm:py-2 z-50 backdrop-blur-sm bottom-5 self-center h-[30px] sm:h-[30px] md:gap-5 gap-2">
          <button
            onClick={() => setMini(false)}
            className="items-center flex justify-end mx-3 animate-pulse"
          >
            <BiSolidShow className="text-purple-800" size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
