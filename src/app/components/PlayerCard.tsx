"use client";

import React, { useState } from "react";
import { saGetPlayerData } from "../utils/saGetPlayerData";
import { Role } from "../types/playerDb";
import Image from "next/image";
import { PlayerData } from "../types/playerData";

export default function PlayerCard({
  playerId,
  confirmPlayer,
  role,
  currentBudget,
}: {
  playerId: number;
  confirmPlayer: (
    role: Role,
    name: string,
    url: string,
    playerValue: number
  ) => void;
  role: Role;
  currentBudget: number;
}) {
  // used to fill the playerData state before fetching any real data
  // to avoid type errors, no idea how to do it properly otherwise
  const emptyPlayerData: PlayerData = {
    playerName: "",
    playerId: 0,
    scrapedPlayerData: {
      playerHeroImg: "",
      playerValue: "",
      clubLogoUrl: "",
      clubName: "",
      playerProfileImgUrl: "",
      marketValueNumber: 0,
    },
  };

  const handleButtonClick = async () => {
    if (open) {
      confirmPlayer(
        role,
        playerData.playerName,
        playerData.scrapedPlayerData.playerProfileImgUrl,
        playerData.scrapedPlayerData.marketValueNumber
      );
    } else {
      setLoadingImg(true);
      setLoadingText(true);
      const newData = await saGetPlayerData(playerId);
      setPlayerData(newData);
      setOpen(true);
      setTimeout(() => {
        setImageUrl(newData.scrapedPlayerData.playerHeroImg);
      }, 800);
      setTimeout(() => {
        setLoadingText(false);
      }, 500);
      setTimeout(() => {
        setLoadingImg(false);
      }, 2000);
    }
  };

  const [open, setOpen] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerData>(emptyPlayerData);
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    "https://placehold.co/333x186/black/white.png?text=?"
  );

  return (
    <div className="flex flex-row cardBadgeWrapper overflow-hidden">
      <button
        className={`cardBadgeWrapper p-1 sm:bg-black ${
          loadingImg ? "animate-pulse" : ""
        } ${
          playerData.scrapedPlayerData.marketValueNumber > 50000000
            ? " sm:bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-400"
            : playerData.scrapedPlayerData.marketValueNumber > 10000000
            ? " sm:bg-gradient-to-r from-red-600 to-red-950"
            : " sm:bg-gradient-to-b from-gray-200 to-transparent"
        }`}
        onClick={handleButtonClick}
      >
        <div className="flex flex-col justify-center items-center relative overflow-hidden cardBadgeWrapper">
          <div className="relative bg-transparent overflow-hidden flex items-center justify-center flex-col cardBadgeWrapper">
            <Image
              src={imageUrl}
              alt={playerData.playerName || ""}
              width={300}
              height={100}
              className={`self-center rounded-lg transition-all duration-1000 cardBadgeWrapper hidden sm:block ${
                loadingImg ? "blur-xl" : "blur-none"
              }`}
            />
            {open && (
              <Image
                src={playerData.scrapedPlayerData.clubLogoUrl}
                alt={playerData.scrapedPlayerData.clubName}
                width={50}
                height={50}
                className="self-center bottom-0 right-0 sm:hidden block"
              />
            )}
            <Image
              src={
                playerData.scrapedPlayerData.playerProfileImgUrl ||
                "https://placehold.co/100x200/black/white.png?text=?"
              }
              alt={playerData.playerName || ""}
              width={100}
              height={200}
              className={`self-center rounded-lg transition-all duration-1000 sm:cardBadgeWrapper sm:hidden  ${
                loadingImg ? "blur-xl" : "blur-none"
              }`}
            />
            {open && (
              <Image
                src={playerData.scrapedPlayerData.clubLogoUrl}
                alt={playerData.scrapedPlayerData.clubName}
                width={70}
                height={70}
                className="self-center absolute top-0 right-0 hidden md:block"
              />
            )}
            <p
              className={` left-1/2 transform -translate-x-1/2 absolute sm:transform-none sm:top-2 sm:left-2  top-12 z-50 font-extrabold px-1 transition-all duration-100 ${
                loadingText
                  ? "blur-3xl rounded-none invisible animate-in"
                  : "blur-none rounded-lg block bg-black/50 backdrop-blur-lg"
              }
              ${
                currentBudget < playerData.scrapedPlayerData.marketValueNumber
                  ? "text-red-600"
                  : "text-green-400"
              }`}
            >
              {playerData.scrapedPlayerData.playerValue}
            </p>
            <div
              className={`z-50 left-1/2 transform -translate-x-1/2 rounded-full text-nowrap absolute sm:bottom-7 bottom-0 sm:top-auto self-center text-center w-fit transition-colors sm:duration-1000 shadow-md sm:backdrop-blur-lg px-2 shadow-black bg-black/50  ${
                loadingImg ? "invisible text-zinc-500" : "block text-white"
              }`}
            >
              <p className="animate-marqueeSlow whitespace-nowrap sm:animate-none z-50 text-white px-5">
                {playerData.playerName}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
