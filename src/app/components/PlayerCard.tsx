"use client";

import React, { useState } from "react";
import { saGetPlayerData } from "../utils/saGetPlayerData";
import { Role } from "../types/playerDb";
import Image from "next/image";
import { Player, PlayerData } from "../types/playerData";

export default function PlayerCard({
  playerId,
  confirmPlayer,
  role,
  currentBudget,
}: {
  playerId: number;
  confirmPlayer: (player: Player) => void;
  role: Role;
  currentBudget: number;
}) {
  // used to fill the playerData state before fetching any real data
  // to avoid type errors
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
      playerAge: "",
      playerFoot: "",
      playerLeague: "",
      playerCountry: "",
      playerHeight: "",
      fullPlayerName: "",
      shortPlayerName: "",
    },
  };

  const handleButtonClick = async () => {
    if (open) {
      confirmPlayer(player);
    } else {
      // timeouts are used for animating the card after data is fetched
      setLoadingImg(true);
      setLoadingText(true);
      // Next server action
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
    "https://placehold.co/333x186/black/white.png?text=|"
  );

  const player: Player = {
    role: role,
    profileImgUrl: playerData.scrapedPlayerData.playerProfileImgUrl,
    playerName: playerData.playerName,
    playerValue: playerData.scrapedPlayerData.marketValueNumber,
    playerAge: playerData.scrapedPlayerData.playerAge,
    clubName: playerData.scrapedPlayerData.clubName,
    playerCountry: playerData.scrapedPlayerData.playerCountry,
    playerFoot: playerData.scrapedPlayerData.playerFoot,
    playerLeague: playerData.scrapedPlayerData.playerLeague,
    playerHeight: playerData.scrapedPlayerData.playerHeight,
    shortPlayerName: playerData.scrapedPlayerData.shortPlayerName,
    fullPlayerName: playerData.scrapedPlayerData.fullPlayerName,
  };

  return (
    <div className="cardBadgeWrapper overflow-hidden grow shadow-[2px_0px_10px_rgba(0,0,0,0.250)] shadow-green-900">
      <button
        className={`cardBadgeWrapper p-1 sm:bg-black w-full h-full flex justify-center${
          loadingImg ? "animate-pulse" : ""
        } ${
          playerData.scrapedPlayerData.marketValueNumber > 50000000
            ? " bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-400"
            : playerData.scrapedPlayerData.marketValueNumber > 10000000
            ? " bg-gradient-to-r from-red-600 to-red-950"
            : " bg-gradient-to-b from-gray-200 to-transparent"
        }`}
        onClick={handleButtonClick}
      >
        <div className="flex flex-col justify-center items-center relative overflow-hidden cardBadgeWrapper grow min-h-full">
          <div className="bg-transparent overflow-hidden flex items-center justify-center flex-col cardBadgeWrapper min-h-full min-w-full relative grow">
            <Image
              src={imageUrl}
              alt={playerData.playerName || ""}
              fill
              objectFit="cover"
              objectPosition="top"
              className={`self-center rounded-lg transition-all duration-1000 cardBadgeWrapper ${
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
              className={` left-1/2 transform -translate-x-1/2 absolute md:transform-none bottom-10 md:top-2 md:bottom-auto md:left-2 z-50 font-extrabold px-1 transition-all duration-100 ${
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
              className={`z-50 left-1/2 transform -translate-x-1/2 rounded-full text-nowrap absolute md:bottom-7 bottom-0 sm:top-auto self-center text-center w-fit transition-colors md:duration-1000 shadow-md md:backdrop-blur-lg px-2 shadow-black bg-black/50  ${
                loadingImg ? "invisible text-zinc-500" : "block text-white"
              }`}
            >
              <p className="hidden md:block whitespace-nowrap sm:animate-none z-50 text-white px-5">
                {playerData.scrapedPlayerData.fullPlayerName}
              </p>
              <p className="md:hidden animate-marqueeSlow whitespace-nowrap sm:animate-none z-50 text-white px-5">
                {playerData.scrapedPlayerData.shortPlayerName}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
