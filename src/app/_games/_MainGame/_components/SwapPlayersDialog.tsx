import React, { useState } from "react";
import { Player, PlayerData } from "../../../_types/playerData";
import { Role } from "../../../_types/playerDb";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_ui/carousel";
import { Button } from "../../../_components/Buttons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/app/_ui/alert-dialog";

import { GiPlayerNext } from "react-icons/gi";
import { swapPlayersByRole } from "../_utils/updatePlayerState";
import { GameState } from "../MainGame";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

export default function SwapModalDialog({
  players,
  setPlayers,
  tierSets,
  setTierSets,
  gameState,
  currentPlayers,
}: {
  players: Player[];
  setPlayers: (newPlayerState: Player[]) => void;
  tierSets: number[][];
  setTierSets: (newSet: number[][]) => void;
  gameState: GameState;
  currentPlayers: Player[];
}) {
  const [firstRole, setFirstRole] = useState<Role>("GK");
  const [secondRole, setSecondRole] = useState<Role>("GK");

  const handleSwap = () => {
    swapPlayersByRole(
      players,
      setPlayers,
      firstRole,
      secondRole,
      tierSets,
      setTierSets
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`text-primary  text-center items-center flex bg-background-mid p-2 rounded-lg shadow-md transition-all duration-1000 delay-1000 ${
          gameState == "initial"
            ? "text-transparent bg-transparent shadow-transparent cursor-default pointer-events-none"
            : ""
        } ${
          gameState == "in progress" &&
          "shadow-transparent text-primary/20 pointer-events-none"
        } ${gameState == "ended" && "text-primary shadow-primary"}`}
        disabled={gameState !== "ended"}
      >
        <GiPlayerNext className="min-h-full" size={25} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="container flex justify-center gap-2 items-center flex-col">
          <div className="flex flex-row gap-5 text-center items-center">
            <p className="text-md font-md text-text-primary">Swap</p>
            {players.map(
              (player, index) =>
                player.role == firstRole && (
                  <div
                    key={index}
                    className={`transition-colors duration-200 text-lg font-bold flex flex-row gap-2 ${
                      secondRole == firstRole
                        ? "text-primary/30"
                        : "text-primary"
                    }`}
                  >
                    <p
                      className={`border-b ${
                        firstRole == secondRole
                          ? "border-primary/10"
                          : "border-primary"
                      }`}
                    >
                      {player.fullPlayerName}
                    </p>
                    <p className="text-text-primary">({player.role})</p>
                  </div>
                )
            )}
          </div>
          <Carousel
            className="w-full md:max-w-sm max-w-[15rem]"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="md:h-[120px]  h-[150px] ml-1">
              {currentPlayers.map(
                (player, index) =>
                  player.playerName !== "" && (
                    <CarouselItem
                      key={index}
                      className={`relative md:basis-1/3 basis-1/2 flex justify-center no-highlight pl-20 ${
                        secondRole == player.role
                          ? "pointer-events-none"
                          : "pointer-events-auto"
                      }`}
                      onClick={() => setFirstRole(player.role)}
                    >
                      <Image
                        src={player.profileImgUrl}
                        alt={player.fullPlayerName}
                        fill
                        className={`self-center min-h-full md:max-w-fit rounded-xl border-[3px] transition-colors duration-300 ${
                          player.role == firstRole
                            ? "border-primary"
                            : "border-transparent"
                        } ${
                          secondRole == player.role
                            ? "opacity-30 grayscale blur-[1px]"
                            : "grayscale-0"
                        }`}
                      />
                    </CarouselItem>
                  )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex flex-row gap-5 text-center items-center">
            <p className="text-md font-md">With</p>
            {players.map(
              (player, index) =>
                player.role == secondRole && (
                  <div
                    key={index}
                    className={`transition-colors duration-200 text-lg font-bold flex flex-row gap-2 ${
                      secondRole == firstRole
                        ? "text-primary/30"
                        : "text-primary"
                    }`}
                  >
                    <p
                      className={`border-b ${
                        firstRole == secondRole
                          ? "border-primary/10"
                          : "border-primary"
                      }`}
                    >
                      {player.fullPlayerName}
                    </p>
                    <p className="text-text-primary">({player.role}) ?</p>
                  </div>
                )
            )}
          </div>
          <Carousel
            className="w-full md:max-w-sm max-w-[15rem]"
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
          >
            <CarouselContent className="md:h-[120px] h-[150px] ml-1">
              {players.map(
                (player, index) =>
                  player.playerName !== "" && (
                    <CarouselItem
                      key={index}
                      className={`relative md:basis-1/3 basis-1/2 flex justify-center no-highlight pl-20 ${
                        firstRole == player.role
                          ? "pointer-events-none"
                          : "pointer-events-auto"
                      }`}
                      onClick={() => setSecondRole(player.role)}
                    >
                      <Image
                        src={player.profileImgUrl}
                        alt={player.fullPlayerName}
                        fill
                        sizes="200px"
                        className={`self-center min-h-full md:max-w-fit rounded-xl border-[3px] transition-all duration-300 ${
                          player.role == secondRole
                            ? "border-primary"
                            : "border-transparent"
                        } ${
                          firstRole == player.role
                            ? "opacity-30 grayscale blur-[1px]"
                            : "grayscale-0"
                        }`}
                      />
                    </CarouselItem>
                  )
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="flex justify-between gap-10 py-10">
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                onClick={() => handleSwap()}
                className={`${
                  firstRole == secondRole
                    ? "pointer-events-none bg-primary/10 text-primary-foreground/30"
                    : "pointer-events-auto"
                }`}
              >
                Accept
              </Button>
            </AlertDialogAction>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
