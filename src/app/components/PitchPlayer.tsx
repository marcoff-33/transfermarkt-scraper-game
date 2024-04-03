import React from "react";
import { Player } from "../types/playerData";
import Image from "next/image";
import { Role } from "../types/playerDb";
import { getPlayerColor } from "../utils/updatePlayerState";
import placeholderImage from "@/app/public/blkplaceholder.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./Buttons";
import PlayerCard from "./PlayerCard";
import { GameState } from "./games/MainGame";

export default function PitchPlayer({
  player,
  openPlayerModal,
  displayPlayerStatsFor,
  currentRoundRole,
  resetPlayer,
  gameState,
}: {
  player: Player;
  openPlayerModal: (open: boolean) => void;
  displayPlayerStatsFor: (role: Role) => void;
  currentRoundRole: Role;
  resetPlayer: (role: Role) => void;
  gameState: GameState;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        key={player.playerName}
        className={`z-[1000] max-h-[70%] rounded-full md:-rotate-90 outline-offset-4  ${
          currentRoundRole == player.role
            ? "animate-pulse border-primary border-[5px]"
            : "shadow-[0px_0px_65px_rgba(0,0,0,0)] " +
              getPlayerColor(player.playerValue, "shadow") +
              " " +
              getPlayerColor(player.playerValue, "border")
        } ${player.playerName == "" ? "pointer-events-none" : ""}`}
        style={{
          gridRow: player.playerRow,
          gridColumn: player.playerCol,
        }}
        disabled={player.playerName === ""}
      >
        <Image
          alt={player.role}
          src={player.profileImgUrl}
          width={150}
          height={300}
          className={`rounded-full h-full w-full border ${getPlayerColor(
            player.playerValue,
            "border"
          )}`}
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
      </AlertDialogTrigger>
      <AlertDialogContent className="z-[2000] flex justify-center flex-col items-center">
        <div className="z-50 w-[50%] text-text-primary text-center flex flex-col gap-2">
          <div className="text-text-primary text-xl font-bold flex flex-row justify-center items-center w-full">
            <p className="self-center grow">{player.fullPlayerName}</p>
          </div>

          <Image
            src={player.profileImgUrl}
            alt={player.playerName}
            height={100}
            width={100}
            className="self-center rounded-full outline outline-primary shadow-lg shadow-black"
          />

          <div className="flex flex-row self-center gap-5 items-center">
            <p className="text-text-primary text-lg font-bold">
              Date of Birth:{" "}
            </p>
            <p className="text-center">{player.playerAge}</p>
          </div>
          <div className="flex flex-row self-center gap-5 items-center">
            <p className="text-text-primary text-lg font-bold">Club: </p>
            <p className="text-center">{player.clubName}</p>
          </div>
          <div className="flex flex-row self-center gap-5 items-center">
            <p className="text-text-primary text-lg font-bold">League: </p>
            <p className="text-center">{player.playerLeague}</p>
          </div>
          <div className="flex flex-row self-center gap-5 items-center">
            <p className="text-text-primary text-lg font-bold">Height: </p>
            <p className="text-center">{player.playerHeight}</p>
          </div>
          <div className="flex flex-row self-center gap-5 items-center">
            <p className="text-text-primary text-lg font-bold">
              National Team:{" "}
            </p>
            <p className="text-center">{player.playerCountry}</p>
          </div>
          <div className="flex flex-row self-center gap-5 items-center">
            <p className="text-text-primary text-lg font-bold">
              Dominant Foot:{" "}
            </p>
            <p className="text-center">{player.playerFoot}</p>
          </div>
          <div className="flex flex-row self-center gap-5 items-center">
            <p className="text-text-primary text-lg font-bold">
              Market Value:{" "}
            </p>
            <p className="text-center">{player.playerValue / 1000000}m €</p>
          </div>
          <div className="flex flex-row self-end gap-5 max-w-fit justify-between py-5"></div>
        </div>
        <AlertDialogFooter className="flex gap-5 justify-between">
          <div className=""></div>
          <AlertDialogCancel className="self-start">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => resetPlayer(player.role)}
            className={`${
              gameState !== "ended"
                ? "bg-primary/10 pointer-events-none text-primary-foreground/20"
                : ""
            }`}
            disabled={gameState !== "ended"}
          >
            Sell Player
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
