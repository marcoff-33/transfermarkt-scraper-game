"use client";

import React from "react";
import Image from "next/image";
import { PlayerData, Player, scrapedData } from "../types/playerData";
import { Role } from "../types/playerDb";
import { Button } from "./Buttons";

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
    <div className="min-w-[100vw] justify-center items-center flex bg-background-deep/90 backdrop-blur-md z-[1000] overflow-hidden absolute min-h-full">
      <div className="z-50 w-[50%] h-full text-text-primary text-center flex flex-col gap-2">
        <div className="text-text-primary text-xl font-bold flex flex-row justify-center items-center w-full">
          <p className="self-center grow">{playerState.fullPlayerName}</p>
          <button
            className="self-end p-1 px-2 bg-background-front rounded-full"
            onClick={() => setModalState(false)}
          >
            X
          </button>
        </div>

        <Image
          src={playerState.profileImgUrl}
          alt={playerState.playerName}
          height={100}
          width={100}
          className="self-center rounded-full outline outline-primary shadow-lg shadow-black"
        />

        <div className="flex flex-row self-center gap-5 items-center">
          <p className="text-text-primary text-lg font-bold">Date of Birth: </p>
          <p className="text-center">{playerState.playerAge}</p>
        </div>
        <div className="flex flex-row self-center gap-5 items-center">
          <p className="text-text-primary text-lg font-bold">Club: </p>
          <p className="text-center">{playerState.clubName}</p>
        </div>
        <div className="flex flex-row self-center gap-5 items-center">
          <p className="text-text-primary text-lg font-bold">League: </p>
          <p className="text-center">{playerState.playerLeague}</p>
        </div>
        <div className="flex flex-row self-center gap-5 items-center">
          <p className="text-text-primary text-lg font-bold">Height: </p>
          <p className="text-center">{playerState.playerHeight}</p>
        </div>
        <div className="flex flex-row self-center gap-5 items-center">
          <p className="text-text-primary text-lg font-bold">National Team: </p>
          <p className="text-center">{playerState.playerCountry}</p>
        </div>
        <div className="flex flex-row self-center gap-5 items-center">
          <p className="text-text-primary text-lg font-bold">Dominant Foot: </p>
          <p className="text-center">{playerState.playerFoot}</p>
        </div>
        <div className="flex flex-row self-center gap-5 items-center">
          <p className="text-text-primary text-lg font-bold">Market Value: </p>
          <p className="text-center">{playerState.playerValue / 1000000}m €</p>
        </div>
        <div className="flex flex-row self-end gap-5 max-w-fit justify-between py-10">
          <Button
            className="self-start"
            variant={"secondary"}
            onClick={() => setModalState(false)}
          >
            Close
          </Button>
          <Button
            variant={"destructive"}
            className="text-primary-foreground"
            onClick={() => {
              resetPlayer(playerState.role), setModalState(false);
            }}
          >
            Sell Player
          </Button>
        </div>
      </div>
    </div>
  );
}
