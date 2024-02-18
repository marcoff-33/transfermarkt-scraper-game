"use client";

import React from "react";
import Image from "next/image";
import { PlayerData, Player, scrapedData } from "../types/playerData";
import { Role } from "../types/playerDb";

export default function PlayerModal({
  playerState,
  setModalState,
  resetPlayer,
}: {
  playerState: Player;
  setModalState: (state: boolean) => void;
  resetPlayer: (role: Role) => void;
}) {
  return (
    <div className="min-w-[100vw] justify-center items-center flex shrink-0 min-h-[100vh] bg-blue-500/30 backdrop-blur-md absolute z-50 overflow-hidden">
      <div className="bg-black z-50 w-[50%] h-full text-white text-center flex flex-col">
        <Image
          src={playerState.profileImgUrl}
          alt={playerState.playerName}
          height={100}
          width={100}
          className="self-center"
        />
        <p>Name: {playerState.fullPlayerName}</p>
        <p>Date of Birth: {playerState.playerAge}</p>
        <p>Club: {playerState.clubName}</p>
        <p>League: {playerState.playerLeague}</p>
        <p>Height: {playerState.playerHeight}</p>
        <p>Citizenship: {playerState.playerCountry}</p>
        <p>Foot: {playerState.playerFoot}</p>
        <p>Value: {playerState.playerValue.toLocaleString()}€</p>
        <div className="flex flex-row self-end gap-5">
          <button onClick={() => setModalState(false)}>Close</button>
          <button
            onClick={() => {
              resetPlayer(playerState.role), setModalState(false);
            }}
          >
            Sell Player
          </button>
        </div>
      </div>
    </div>
  );
}
