import React, { useState } from "react";
import { Player, PlayerData } from "../types/playerData";
import { Role } from "../types/playerDb";
import { swapPlayersByRole } from "../utils/updatePlayerState";

export default function ({
  players,
  setPlayers,
  tierSets,
  setTierSets,
}: {
  players: Player[];
  setPlayers: (newPlayerState: Player[]) => void;
  tierSets: number[][];
  setTierSets: (newSet: number[][]) => void;
}) {
  const [firstRole, setFirstRole] = useState<Role>("GK");
  const [secondRole, setSecondRole] = useState<Role>("GK");

  const handleSwap = () => {
    {
      swapPlayersByRole(
        players,
        setPlayers,
        firstRole,
        secondRole,
        tierSets,
        setTierSets
      );
    }
  };

  return (
    <div className="text-white my-20 absolute inset-0 text-center bg-red-500 z-50 flex flex-row gap-10">
      <div className="flex flex-col">
        {players.map(
          (player) =>
            player.playerName !== "" && (
              <button
                className={`${player.role == firstRole ? "bg-black" : ""}`}
                onClick={() => setFirstRole(player.role)}
              >
                {player.playerName}
              </button>
            )
        )}
      </div>
      <div className="flex flex-col">
        {players.map(
          (player) =>
            player.playerName !== "" && (
              <button
                className={`${player.role == secondRole ? "bg-black" : ""}`}
                onClick={() => setSecondRole(player.role)}
              >
                {player.playerName}
              </button>
            )
        )}
      </div>
      <button className="text-white" onClick={() => handleSwap()}>
        SWAP!!
      </button>
    </div>
  );
}
