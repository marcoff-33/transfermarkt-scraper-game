import React, { use, useState } from "react";
import { PlayersDb, Role } from "../../../../_types/playerDb";

import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { GiRollingDices } from "react-icons/gi";

export default function CardsWrapper({
  children,
  rerollPlayers,
  currentRole,
  availableRerolls,
  playersDb,
  allowRerolls,
}: {
  children: React.ReactNode;
  rerollPlayers: (role: Role, playersDb: PlayersDb) => void;
  currentRole: Role;
  availableRerolls: number;
  playersDb: PlayersDb;
  allowRerolls: boolean;
}) {
  const [mini, setMini] = useState(false);

  return (
    <div className="px-2 fixed bottom-5 self-center w-full container">
      {!mini ? (
        <div
          className={`flex flex-row justify-around w-full sm:py-2 z-50 backdrop-blur-sm bottom-5 self-center h-[150px] sm:h-[200px] md:gap-5 gap-2`}
        >
          <button
            onClick={() => rerollPlayers(currentRole, playersDb)}
            className="text-white flex"
            disabled={!allowRerolls}
          >
            <GiRollingDices
              className={`bg-background-mid shadow-md rounded-md transition-colors duration-500 delay-200 ${
                allowRerolls ? "text-primary" : "text-danger"
              }`}
              size={30}
            />
          </button>
          {children}
          <button
            className="text-white flex flex-col"
            onClick={() => setMini(true)}
          >
            <BiSolidHide
              className="text-primary md:mx-3 bg-background-mid shadow-md rounded-md"
              size={30}
            />
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-end w-full sm:py-2 z-50 bottom-5 self-center h-[30px] sm:h-[30px] md:gap-5 gap-2">
          <button
            onClick={() => setMini(false)}
            className="items-center flex justify-end mx-3 animate-pulse"
          >
            <BiSolidShow
              className="text-primary bg-background-mid rounded-md"
              size={34}
            />
          </button>
        </div>
      )}
    </div>
  );
}
