import React, { useState } from "react";
import { Player, PlayerData } from "../types/playerData";
import { Role } from "../types/playerDb";
import { getPlayerColor, swapPlayersByRole } from "../utils/updatePlayerState";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./Buttons";

export default function ({
  players,
  setPlayers,
  tierSets,
  setTierSets,
  setOpenSwap,
}: {
  players: Player[];
  setPlayers: (newPlayerState: Player[]) => void;
  tierSets: number[][];
  setTierSets: (newSet: number[][]) => void;
  setOpenSwap: (swap: boolean) => void;
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
    <div className="min-h-screen min-w-[100vw] bg-background-deep/80 backdrop-blur-lg absolute z-[1000] flex justify-center gap-2 items-center flex-col">
      <div className="container flex justify-center gap-2 items-center flex-col">
        <button
          onClick={() => setOpenSwap(false)}
          className="bg-background-front px-2 py-1 rounded-full"
        >
          X
        </button>
        <div className="flex flex-row gap-5 text-center items-center">
          <p className="text-md font-md text-text-primary">Swap</p>
          {players.map(
            (player) =>
              player.role == firstRole && (
                <div
                  className={`transition-colors duration-200 text-lg font-bold flex flex-row gap-2 ${
                    secondRole == firstRole ? "text-primary/30" : "text-primary"
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
          }}
        >
          <CarouselContent className="md:h-[120px]  h-[150px] ml-1">
            {players.map(
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
            (player) =>
              player.role == secondRole && (
                <div
                  className={`transition-colors duration-200 text-lg font-bold flex flex-row gap-2 ${
                    secondRole == firstRole ? "text-primary/30" : "text-primary"
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
        <Carousel className="w-full md:max-w-sm max-w-[15rem]">
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
          <Button
            onClick={() => handleSwap()}
            className={`${
              firstRole == secondRole
                ? "pointer-events-none bg-primary/10 text-primary-foreground/30"
                : "pointer-events-auto"
            }`}
          >
            Accept
          </Button>{" "}
          <Button onClick={() => setOpenSwap(false)} variant={"secondary"}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
