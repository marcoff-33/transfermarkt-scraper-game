import React from "react";
import { Player } from "../types/playerData";
import Image from "next/image";
import { Role } from "../types/playerDb";

type ColorType = "border" | "shadow";

export default function PitchPlayer({
  player,
  openPlayerModal,
  displayPlayerStatsFor,
  currentRoundRole,
}: {
  player: Player;
  openPlayerModal: (open: boolean) => void;
  displayPlayerStatsFor: (role: Role) => void;
  currentRoundRole: Role;
}) {
  const playerColor = (playerValue: number, type: ColorType) => {
    if (type == "shadow") {
      return playerValue > 50000000
        ? "shadow-violet-700"
        : playerValue > 25000000
        ? "shadow-red-800"
        : playerValue > 10000000
        ? "shadow-yellow-700"
        : playerValue > 1000000
        ? "shadow-lime-700"
        : playerValue > 1
        ? "shadow-green-700"
        : "shadow-none";
    }
    return playerValue > 50000000
      ? "border-violet-700"
      : playerValue > 25000000
      ? "border-red-800"
      : playerValue > 10000000
      ? "border-yellow-700"
      : playerValue > 1000000
      ? "border-lime-700"
      : playerValue > 1
      ? "shadow-green-700"
      : "border-none";
  };

  return (
    <button
      key={player.role}
      className={`z-50 max-h-[70%] rounded-md md:-rotate-90  ${
        currentRoundRole == player.role
          ? "animate-pulse border-black border-[5px]"
          : "shadow-[0px_0px_100px_rgba(0,0,0,0)] " +
            playerColor(player.playerValue, "shadow") +
            " " +
            playerColor(player.playerValue, "border")
      }`}
      style={{
        gridRow: player.playerRow,
        gridColumn: player.playerCol,
      }}
      onClick={() => {
        openPlayerModal(true), displayPlayerStatsFor(player.role);
      }}
    >
      <Image
        alt={player.role}
        src={player.profileImgUrl}
        width={300}
        height={500}
        objectFit="scale-down"
        className="rounded-md h-full w-full"
      />
      <div className="z-50 text-sm font-semibold overflow-x-hidden">
        <p
          className={`whitespace-nowrap text-white ${
            player.fullPlayerName.length > 11 ? "animate-marquee" : ""
          }`}
        >
          {player.shortPlayerName}
        </p>
      </div>
    </button>
  );
}
