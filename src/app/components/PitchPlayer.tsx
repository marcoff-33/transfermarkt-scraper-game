import React from "react";
import { Player } from "../types/playerData";
import Image from "next/image";
import { Role } from "../types/playerDb";
import { getPlayerColor } from "../utils/updatePlayerState";

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
  return (
    <button
      key={player.playerName}
      className={`z-50 max-h-[70%] rounded-full md:-rotate-90   ${
        currentRoundRole == player.role
          ? "animate-pulse border-black border-[5px]"
          : "shadow-[0px_0px_100px_rgba(0,0,0,0)] " +
            getPlayerColor(player.playerValue, "shadow") +
            " " +
            getPlayerColor(player.playerValue, "border")
      }`}
      style={{
        gridRow: player.playerRow,
        gridColumn: player.playerCol,
      }}
      onClick={() => {
        openPlayerModal(true);
        displayPlayerStatsFor(player.role);
      }}
    >
      <Image
        alt={player.role}
        src={player.profileImgUrl}
        width={150}
        height={300}
        className="rounded-full h-full w-full"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      <div className="z-50 text-sm font-semibold overflow-x-hidden">
        <p
          className={`whitespace-nowrap text-white sm:animate-none animate-marquee ${
            player.fullPlayerName.length > 10 ? "sm:animate-marquee" : ""
          }`}
        >
          {player.shortPlayerName}
        </p>
      </div>
    </button>
  );
}
