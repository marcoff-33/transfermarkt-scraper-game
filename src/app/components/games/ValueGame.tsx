"use client";

import { drawRandomPlayer } from "@/app/utils/randomRolePicks";
import React, { useEffect, useState } from "react";
import playerDb from "../../../../public/players.json";
import { saGetPlayerData } from "@/app/utils/saGetPlayerData";
import { PlayerData } from "@/app/types/playerData";
import Image from "next/image";

type gameState = "pending" | "in progress" | "failed";

export default function ValueGame() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const playersArray = [1, 2, 3];
  const drawThreePlayers = playersArray.map((player) =>
    drawRandomPlayer(playerDb)
  );

  const handleClick = async () => {
    const playerPromises = drawThreePlayers.map(async (player) => {
      const playerData = await saGetPlayerData(player);
      return playerData;
    });
    const allPlayersData = await Promise.all(playerPromises);
    setPlayers(allPlayersData);
  };

  const updatePlayers = async () => {
    const [playerOne, playerTwo, playerThree] = [...players];
    const newPlayer = await saGetPlayerData(drawRandomPlayer(playerDb));
    setPlayers([playerTwo, playerThree, newPlayer]);
  };

  return (
    <div className="container flex justify-center">
      <button onClick={() => handleClick()}>ValueGame</button>
      <div className="text-center border relative flex flex-col md:flex-row gap-1 bg-zinc-900 border-blue-500 w-screen h-screen py-20">
        {players.slice(0, 2).map((player) => (
          <div className="relative grow">
            <Image
              alt={player.playerName}
              src={player.scrapedPlayerData.playerHeroImg}
              fill
              objectFit="cover"
              objectPosition="center"
              className="min-w-full min-h-full animate-in"
            />
            <div className="bg-white/30 absolute h-full w-full">
              <p className="absolute bottom-0 self-center text-center inset-0 text-black font-bold">
                {player.scrapedPlayerData.fullPlayerName}
              </p>
            </div>
          </div>
        ))}
        <p className="inset-0 mx-auto text-white absolute bg-blue-900 px-5 rounded-full self-center flex justify-center max-w-fit text-sm">
          VS
        </p>
      </div>

      <button onClickCapture={() => updatePlayers()}>players</button>
    </div>
  );
}
