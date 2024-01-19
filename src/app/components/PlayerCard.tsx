"use client";
import React, { useState } from "react";
import { Player, PlayerCardProps, PlayerData } from "../types/playerData";
import { fetchClubData } from "../utils/fetchClubData";
import { fetchPlayerData } from "../utils/fetchPlayerData";

export default function PlayerCard({ playerId }: PlayerCardProps) {
  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState<Player>();
  return (
    <div className="border border-yellow-400 flex flex-row">
      {!open && (
        <button
          onClick={async () => {
            const newData = await fetchPlayerData(playerId);
            console.log(newData);
          }}
          className="w-[50px] h-[50px] bg-black"
        >
          {playerId}
        </button>
      )}
      {playerData?.name}
    </div>
  );
}
