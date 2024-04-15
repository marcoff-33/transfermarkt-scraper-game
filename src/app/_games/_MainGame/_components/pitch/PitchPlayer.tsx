import React from "react";
import { Player } from "../../../../_types/playerData";
import Image from "next/image";
import { Role } from "../../../../_types/playerDb";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/app/_ui/alert-dialog";
import { GameState } from "../../MainGame";
import { getPlayerColor } from "../../_utils/updatePlayerState";

export default function PitchPlayer({
  player,

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
  const blockModal = player.playerName === "" && gameState == "ended";
  // the blockModal conditional is to prevent a certain case at the end of the game
  // where if 2 players are missing/sold, the player modal will open with an empty player.
  // instead, a button replacement is rendered which sets the current round to the missing player's role
  return (
    <AlertDialog>
      {!blockModal ? (
        <AlertDialogTrigger
          key={player.playerName}
          className={`max-h-[70%] rounded-full md:-rotate-90 outline-offset-4 z-50 ${
            currentRoundRole == player.role
              ? "animate-pulse border-primary border-[5px]"
              : "shadow-[0px_0px_65px_rgba(0,0,0,0)] border-primary " +
                getPlayerColor(player.playerValue, "shadow") +
                " " +
                getPlayerColor(player.playerValue, "border")
          } ${
            player.playerName == "" && gameState !== "ended"
              ? "pointer-events-none -z-[100]"
              : ""
          }`}
          style={{
            gridRow: player.playerRow,
            gridColumn: player.playerCol,
          }}
          disabled={player.playerName === "" && gameState !== "ended"}
          onClick={() => {
            if (player.playerName == "" && gameState == "ended")
              resetPlayer(player.role);
          }}
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
          <div className="text-sm font-semibold overflow-x-hidden sm:overflow-x-visible">
            <p
              className={`whitespace-nowrap text-text-primary font-bold sm:animate-none animate-marquee ${
                player.fullPlayerName.length > 10 ? "animate-marquee" : ""
              }`}
            >
              {player.shortPlayerName}
            </p>
          </div>
        </AlertDialogTrigger>
      ) : (
        <button
          key={player.playerName}
          className={`max-h-[70%] rounded-full md:-rotate-90 outline-offset-4  ${
            currentRoundRole == player.role
              ? "animate-pulse border-primary border-[5px] "
              : "shadow-[0px_0px_65px_rgba(0,0,0,0)] border-primary  " +
                getPlayerColor(player.playerValue, "shadow") +
                " " +
                getPlayerColor(player.playerValue, "border")
          } ${
            player.playerName == "" && gameState !== "ended"
              ? "pointer-events-none "
              : ""
          }`}
          style={{
            gridRow: player.playerRow,
            gridColumn: player.playerCol,
          }}
          disabled={player.playerName === "" && gameState !== "ended"}
          onClick={() => {
            if (player.playerName == "" && gameState == "ended")
              resetPlayer(player.role);
          }}
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
          <div className=" text-sm font-semibold overflow-x-hidden">
            <p
              className={`whitespace-nowrap text-text-primary sm:animate-none animate-marquee ${
                player.fullPlayerName.length > 10 ? "sm:animate-marquee" : ""
              }`}
            >
              {player.shortPlayerName}
            </p>
          </div>
        </button>
      )}
      <AlertDialogContent className="z-[1000] flex justify-center flex-col items-center">
        <AlertDialogHeader>
          <div className="z-50 w-[50%] text-text-primary text-center flex flex-col gap-2 w-full">
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
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">
                Date of Birth:{" "}
              </p>
              <p className="text-start basis-1/2">{player.playerAge}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">
                Club:{" "}
              </p>
              <p className="basis-1/2 text-start">{player.clubName}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">
                League:{" "}
              </p>
              <p className="basis-1/2 text-start">{player.playerLeague}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">
                Height:{" "}
              </p>
              <p className="basis-1/2 text-start">{player.playerHeight}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">
                National Team:{" "}
              </p>
              <p className="basis-1/2 text-start">{player.playerCountry}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">
                Dominant Foot:{" "}
              </p>
              <p className="basis-1/2 text-start">{player.playerFoot}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">
                Market Value:{" "}
              </p>
              <p className="basis-1/2 text-start">
                {player.playerValue / 1000000}m €
              </p>
            </div>
            <div className="flex flex-row self-end gap-5 max-w-fit justify-between py-5"></div>
          </div>
        </AlertDialogHeader>
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
