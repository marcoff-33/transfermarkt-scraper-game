import React from "react";
import { Player } from "../../../../_types/playerData";
import Image from "next/image";
import { Role } from "../../../../_types/playerDb";
import { TbUserFilled } from "react-icons/tb";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/app/_ui/alert-dialog";
import { GameState } from "../../MainGame";
import { getPlayerColor } from "../../_utils/updatePlayerState";
import { FifaPlayerStats } from "@/app/_types/FifaApiData";
// this component renders the players on the pitch
// and is also responsible for opening the player modal
export default function PitchPlayer({ player, currentRoundRole, resetPlayer, gameState }: { player: Player; displayPlayerStatsFor: (role: Role) => void; currentRoundRole: Role; resetPlayer: (role: Role) => void; gameState: GameState }) {
  const blockModal = player.playerName === "" && gameState == "ended";
  const playerFifaStats: FifaPlayerStats = player.playerFifaStats;
  const overallRating = playerFifaStats.overallRating || 0;
  const minRating = 50;
  const maxRating = 95;
  const progress = Math.max(0, Math.min(100, ((overallRating - minRating) / (maxRating - minRating)) * 100));
  const powerBarColor = overallRating < 77 ? "grey" : overallRating < 80 ? "red" : overallRating < 85 ? "orange" : overallRating < 90 ? "teal" : "cyan";
  // the blockModal conditional is to prevent a certain case at the end of the game
  // where if 2 players are missing/sold, the player modal will open with an empty player.
  // instead, a button replacement is rendered which sets the current round to the missing player's role
  return (
    <AlertDialog>
      {!blockModal ? (
        <AlertDialogTrigger
          key={player.playerName}
          className={`max-h-[70%] min-h-fit md:max-h-[75%] rounded-md sm:-rotate-90 outline-offset-4 z-50 ${currentRoundRole == player.role ? "animate-pulse border-primary border-[3px]" : ""} ${player.playerName == "" && gameState !== "ended" ? "pointer-events-none" : ""}`}
          style={{
            gridRow: player.playerRow,
            gridColumn: player.playerCol,
          }}
          disabled={player.playerName === "" && gameState !== "ended"}
          onClick={() => {
            if (player.playerName == "" && gameState == "ended") resetPlayer(player.role);
          }}
        >
          <div
            className={`border-b-[2px] border-background-front md:border-none`}
            style={{
              borderImage: `linear-gradient(to right, ${powerBarColor} ${progress}%, black ${progress}% ) 1`,
            }}
          >
            <div className={`top-0 flex border-t border-x border-background-front justify-evenly rounded-t-md gap-1 ${player.playerId ? "" : "hidden"}`}>
              <p className={`hidden md:block rounded-t-md md:text-sm text-[9px] font-semibold bg-primary text-black grow`}>{overallRating}</p>

              <p className="md:block md:text-sm text-[10px] font-semibold grow basis-1/2 bg-background-mid">€{formatNumber(player.playerValue)}</p>
            </div>
            <div className="relative h-full w-full">
              {player.playerName !== "" ? (
                // @ts-ignore
                <Image alt={player.role} src={player.profileImgUrl} width={100} height={150} className={`rounded-b-md h-full w-full border border-background-front relative z-[1000] `} style={{ objectFit: "cover", objectPosition: "center" }} />
              ) : (
                <div className="absolute border border-background-front w-full bg-background-mid min-h-full inset-0 rounded-xl text-center flex justify-center items-center">
                  <TbUserFilled size={30} className="text-background-front" />
                </div>
              )}
            </div>
          </div>
          <div className="text-sm font-semibold overflow-x-hidden sm:overflow-x-visible ">
            <p className={`whitespace-nowrap text-text-primary min-w-fit -z-50 font-light sm:animate-none ${player.fullPlayerName.length > 5 ? "animate-marquee" : ""}`}>{player.shortPlayerName} </p>
          </div>
        </AlertDialogTrigger>
      ) : (
        <button
          key={player.playerName}
          className={`max-h-[70%] z-50 rounded-full md:-rotate-90 outline-offset-4  ${currentRoundRole == player.role ? "animate-pulse border-primary border-[5px] " : "shadow-[0px_0px_65px_rgba(0,0,0,0)] border-primary  " + getPlayerColor(player.playerValue, "shadow") + " "} ${player.playerName == "" && gameState !== "ended" ? "pointer-events-none " : ""}`}
          style={{
            gridRow: player.playerRow,
            gridColumn: player.playerCol,
          }}
          disabled={player.playerName === "" && gameState !== "ended"}
          onClick={() => {
            if (player.playerName == "" && gameState == "ended") resetPlayer(player.role);
          }}
        >
          <div className="relative h-full w-full">{player.playerName !== "" ? <Image alt={player.role} src={player.profileImgUrl} width={100} height={150} className={`rounded-full h-full w-full relative z-[1000]  ${getPlayerColor(player.playerValue, "border")}`} style={{ objectFit: "cover", objectPosition: "center" }} /> : <div className="absolute w-full bg-background-mid min-h-full inset-0 rounded-full text-center flex justify-center items-center">?</div>}</div>
          <div className=" text-sm font-semibold overflow-x-hidden">
            <p className={`whitespace-nowrap text-text-primary sm:animate-none animate-marquee ${player.fullPlayerName.length > 10 ? "sm:animate-marquee" : ""}`}>{player.shortPlayerName}</p>
          </div>
        </button>
      )}
      <AlertDialogContent className="z-[5000] flex justify-center flex-col items-center">
        <AlertDialogHeader className="w-full">
          <div className="z-50 text-text-primary text-center flex flex-col gap-2 min-w-full">
            <div className="text-text-primary text-xl font-bold flex flex-row justify-center items-center w-full">
              <p className="self-center grow">{player.fullPlayerName}</p>
            </div>
            <Image src={player.profileImgUrl} alt={player.playerName} height={130} width={100} className="self-center rounded-full outline outline-primary shadow-lg shadow-black" />
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">Date of Birth: </p>
              <p className="text-start basis-1/2">{player.playerAge}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">Club: </p>
              <div className="basis-1/2 text-start gap-2 flex flex-row">
                {player.clubName}
                <Image src={player.playerClubLogoUrl} alt="National Flag" width={20} height={20} className="h-[20px] w-[20px] items-center self-center" />
              </div>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">League: </p>
              <p className="basis-1/2 text-start">{player.playerLeague}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">Height: </p>
              <p className="basis-1/2 text-start">{player.playerHeight}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">National Team: </p>
              <div className="basis-1/2 text-start gap-2 flex flex-row">
                {player.playerCountry}
                <Image src={player.playerNationalFlag} alt="National Flag" width={18} height={10} className="h-[10px] w-[17px] items-center self-center" />
              </div>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">Dominant Foot: </p>
              <p className="basis-1/2 text-start">{player.playerFoot}</p>
            </div>
            <div className="flex flex-row self-center gap-5 items-center w-full border-b border-primary pb-2">
              <p className="text-text-primary text-lg font-bold basis-1/2 text-end">Market Value: </p>
              <p className="basis-1/2 text-start ">{formatNumber(player.playerValue)}</p>
            </div>
            <p className="basis-1/2 text-center py-2">{player.playerValueDate}</p>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-5 justify-between">
          <div className=""></div>
          <AlertDialogCancel className="md:self-start self-center">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => resetPlayer(player.role)} className={`${gameState !== "ended" ? "bg-primary/10 pointer-events-none text-primary-foreground/20" : ""}`} disabled={gameState !== "ended"}>
            Sell Player
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function formatNumber(num: number): string {
  if (num >= 1_000_000) {
    const millions = num / 1_000_000;
    // If the result is an integer, don't show decimals
    return Number.isInteger(millions) ? `${millions}m` : `${millions.toFixed(1)}m`;
  } else if (num >= 1_000) {
    const thousands = num / 1_000;
    return Number.isInteger(thousands) ? `${thousands}k` : `${thousands.toFixed(1)}k`;
  } else {
    return num.toString();
  }
}
