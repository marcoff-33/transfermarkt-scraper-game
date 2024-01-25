"use client";

import React, { useState } from "react";
import { saGetPlayerData } from "../utils/saGetPlayerData";
import { Role } from "../types/playerDb";

export default function PlayerCard({
  playerId,
  confirmPlayer,
  role,
}: {
  playerId: number;
  confirmPlayer: (role: Role, name: string, url: string) => void;
  role: Role;
}) {
  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState(["?"]);

  return (
    <div className="border border-yellow-400 flex flex-row">
      {!open && (
        <button
          onClick={async () => {
            // server action
            const newData = await saGetPlayerData(playerId);
            setPlayerData(newData);
            setOpen(true);
          }}
          className="w-[50px] h-[50px] "
        >
          {playerData[0]}
        </button>
      )}
      {open && (
        <button
          className="bg-red-500"
          onClick={() =>
            confirmPlayer(
              role,
              playerData[0],
              "https://img.a.transfermarkt.technology/portrait/header/3333-1662621121.jpg?lm=1"
            )
          }
        >
          {playerData[0]}, {role}
        </button>
      )}
    </div>
  );
}
