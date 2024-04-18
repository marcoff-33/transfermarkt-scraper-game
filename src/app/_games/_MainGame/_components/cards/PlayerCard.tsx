"use client";

import React, { useEffect, useState } from "react";
import { saGetPlayerData } from "../../../../_utils/saGetPlayerData";
import { Role } from "../../../../_types/playerDb";
import Image, { StaticImageData } from "next/image";
import { Player, PlayerData } from "../../../../_types/playerData";

import { GameState } from "../../MainGame";
import { getPlayerColor } from "../../_utils/updatePlayerState";

export default function PlayerCard({
  playerId,
  confirmPlayer,
  role,
  currentBudget,
  isNewGame,
  setIsNewGame,
  allowRerolls,
  setAllowRerolls,
}: {
  playerId: number;
  confirmPlayer: (player: Player) => void;
  role: Role;
  currentBudget: number;
  setGameState: (state: GameState) => void;
  currentRound: number;
  isNewGame: boolean;
  setIsNewGame: (isNewGame: boolean) => void;
  allowRerolls: boolean;
  setAllowRerolls: (rerolls: boolean) => void;
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
      playerAgeNumber: 0,
      playerHeightNumber: 0,
      playerPosition: "",
      playerNationalFlag: "",
      marketValueUpdateDate: "",
    },
  };

  const handleButtonClick = async () => {
    if (open) {
      confirmPlayer(player);
      setAllowRerolls(false);
    } else if (isStored == false) {
      // timeouts are used for animating the card after data is fetched
      setAllowRerolls(true);
      setLoadingImg(true);
      setLoadingText(true);
      // Next server action
      const newData = await saGetPlayerData(playerId);
      setPlayerData(newData);
      localStorage.setItem(`player-${playerId}`, JSON.stringify(newData));
      setOpen(true);
      setTimeout(() => {
        setLoadingText(false);
      }, 500);
      setTimeout(() => {
        setLoadingImg(false);
      }, 2000);
    }
  };

  const [playerData, setPlayerData] = useState<PlayerData>(emptyPlayerData);
  const [open, setOpen] = useState(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [loadingText, setLoadingText] = useState(false);

  const [isStored, setIsStored] = useState(false);

  const handleFreshGame = () => {
    // Clear all locally stored player data
    // to ensure no unveiled cards on new game or restart
    const allKeys = Object.keys(localStorage);
    const playerKeys = allKeys.filter((key) => key.startsWith("player-"));
    playerKeys.forEach((key) => localStorage.removeItem(key));
    setIsNewGame(false);
  };

  useEffect(() => {
    if (isNewGame) {
      handleFreshGame();
    }
  }, [isNewGame]);

  useEffect(() => {
    // Stores player data in local storage
    // Used for preserving previously unveiled cards in earlier rounds
    // Needed to enable round replayability
    const storedItem = localStorage.getItem(`player-${playerId}`);

    if (storedItem) {
      const storedData = JSON.parse(storedItem);

      if (storedData) {
        setPlayerData(storedData);

        setIsStored(true);
        setOpen(true);
      }
    }

    // Clear all cards data in local storage when the page is unloaded
    window.onbeforeunload = () => {
      const allKeys = Object.keys(localStorage);

      const playerKeys = allKeys.filter((key) => key.startsWith("player-"));

      playerKeys.forEach((key) => localStorage.removeItem(key));
    };
  }, [playerId]);

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
    playerNationalFlag: playerData.scrapedPlayerData.playerNationalFlag,
    playerValueDate: playerData.scrapedPlayerData.marketValueUpdateDate,
    playerPosition: playerData.scrapedPlayerData.playerPosition,
    playerClubLogoUrl: playerData.scrapedPlayerData.clubLogoUrl,
    playerId: playerData.playerId,
  };

  return (
    <button
      className={`overflow-hidden grow shadow-[5px_5px_15px_rgba(0,0,0,0.250)] duration-1000 transition-all p-1 w-full h-full bg-background-deep ${
        playerData.scrapedPlayerData.marketValueNumber == 0
          ? "shadow-text-primary"
          : getPlayerColor(
              playerData.scrapedPlayerData.marketValueNumber,
              "shadow"
            )
      } `}
      onClick={handleButtonClick}
      disabled={loadingImg}
    >
      <div className="min-h-full flex flex-col justify-center items-center relative overflow-hidden ">
        <div className="bg-background-deep overflow-hidden flex items-center justify-center flex-col min-h-full min-w-full relative grow ">
          {playerData.playerName !== "" && (
            <Image
              src={playerData.scrapedPlayerData.playerHeroImg}
              alt={"player card"}
              fill
              sizes="400px"
              className={`self-center object-cover object-top rounded-lg transition-all duration-1000 w-full h-full grow sm:block hidden ${
                loadingImg
                  ? "blur-xl animate-pulse backdrop-blur-lg"
                  : "blur-none"
              } ${playerData.playerName == "" ? "hidden" : "block"}`}
            />
          )}
          {playerData.playerName !== "" && (
            <Image
              src={playerData.scrapedPlayerData.playerProfileImgUrl || ""}
              alt={playerData.playerName || ""}
              fill
              sizes="200px"
              className={`z-[50] self-center rounded-lg  object-scale-down transition-all duration-1000 w-full h-full sm:hidden ${
                loadingImg
                  ? "blur-xl animate-pulse backdrop-blur-lg"
                  : "blur-none"
              }

            `}
            />
          )}
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
            className={` left-1/2 transform -translate-x-1/2 absolute md:transform-none top-2 md:top-2 md:bottom-auto md:left-2 z-50 font-extrabold px-1 transition-all duration-100 ${
              loadingText
                ? "blur-3xl rounded-none invisible animate-in"
                : "blur-none rounded-lg block bg-black/50 backdrop-blur-lg"
            }
            ${
              currentBudget < playerData.scrapedPlayerData.marketValueNumber
                ? "text-red-600"
                : "text-green-400"
            }
          `}
          >
            {playerData.scrapedPlayerData.playerValue}
          </p>

          <div
            className={`z-50 left-1/2 transform -translate-x-1/2 sm:rounded-full text-nowrap absolute md:bottom-7 bottom-0 sm:top-auto self-center text-center w-fit transition-colors md:duration-1000 shadow-md md:backdrop-blur-lg px-2 shadow-black bg-background-mid/50 ${
              loadingImg ? "invisible text-zinc-500" : "block text-white"
            }`}
          >
            <p
              className={`hidden md:block whitespace-nowrap sm:animate-none z-50 px-5 ${
                loadingImg ? "text-red-500" : "text-text-primary"
              }`}
            >
              {playerData.scrapedPlayerData.fullPlayerName}
            </p>
            <p className="md:hidden animate-marqueeSlow whitespace-nowrap sm:animate-none z-50 text-text-primary px-5">
              {playerData.scrapedPlayerData.shortPlayerName}
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
