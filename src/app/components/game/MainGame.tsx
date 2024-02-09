"use client";

import React, { useState } from "react";
import Pitch from "../Pitch";
import { playerGameState, scrapedData } from "@/app/types/playerData";
import { updatePlayerState } from "@/app/utils/updatePlayerState";
import { PlayersDb, Role } from "@/app/types/playerDb";
import starterGameState from "@/app/utils/newGameState";
import db from "../../../../public/players.json";
import { drawPlayerFromEachTier } from "@/app/utils/randomRolePicks";
import PlayerCard from "../PlayerCard";
import Image from "next/image";

export default function MainGame() {
  const playersDb: PlayersDb = db;

  const roles: Role[] = [
    "GK",
    "LCB",
    "RCB",
    "RB",
    "LB",
    "DMF",
    "CF",
    "RCM",
    "LCM",
    "LWF",
    "RWF",
  ];
  const [currentBudget, setCurrentBudget] = useState(300000000);
  const [hasGameEnded, setHasGameEnded] = useState(false);
  const [playerStatsModal, setPlayerStatsModal] = useState(false);
  const [playerStats, setPlayerStats] = useState<Role>("GK");
  // sets a selection of 1 player from each tier for each role.
  const [rolesTierSets, setRolesTierSets] = useState(
    roles.map((role) => drawPlayerFromEachTier(playersDb, role))
  );

  const [currentPlayers, setCurrentPlayers] =
    useState<playerGameState[]>(starterGameState);

  const [currentRound, setCurrentRound] = useState(0);

  const resetRoundByRole = (role: Role) => {
    // used by pitch component
    // reset the round when a position/role is clicked.
    if (hasGameEnded) {
      const player = currentPlayers.find((player) => player.role === role);

      if (player && player.playerValue) {
        setCurrentBudget((prevBudget) => prevBudget + player.playerValue);
      }
      setCurrentRound(roles.indexOf(role));
      // reset the given role in currentPlayers state to default
      const defaultRoleState = updatePlayerState(
        role,
        "",
        "https://placehold.co/80x70/png?text=?",
        currentPlayers,
        0,
        "",
        "",
        "",
        "",
        "",
        ""
      );
      setCurrentPlayers(defaultRoleState);
    }
  };
  const checkForPickedPlayer = (role: Role) => {
    const oldPlayer = currentPlayers.find((player) => player.role === role);
    return oldPlayer?.playerValue;
  };
  // used by <PlayerCard> to update the currentPlayers state with the selected player.
  const selectPlayer = (
    role: Role,
    name: string,
    imageURL: string,
    playerValue: number,
    playerFoot: string,
    playerAge: string,
    clubName: string,
    leagueName: string,
    playerCountry: string,
    playerHeight: string
  ) => {
    if (playerValue <= currentBudget) {
      const newPlayersState = updatePlayerState(
        role,
        name,
        imageURL,
        currentPlayers,
        playerValue,
        playerAge,
        playerFoot,
        clubName,
        leagueName,
        playerCountry,
        playerHeight
      );
      setCurrentPlayers(newPlayersState);
      setCurrentRound(currentRound < 10 ? (prevRound) => prevRound + 1 : 0);
      setHasGameEnded(currentRound === 10 ? true : hasGameEnded);
      setCurrentBudget(
        hasGameEnded
          ? (prevBudget) => prevBudget + checkForPickedPlayer(role)
          : currentBudget
      );
      setCurrentBudget((prevBudget) => prevBudget - playerValue);
    } else return;
  };

  const openPlayerInfo = () => {
    setPlayerStatsModal(true);
  };

  const player: playerGameState = currentPlayers.filter(
    (player) => player.role === playerStats
  )[0];

  const setStatsForRole = (role: Role) => {
    if (player.role !== role) {
      setPlayerStats(role);
      console.log(player);
    }
    if (hasGameEnded) {
      setCurrentRound(roles.indexOf(role));
    }
  };

  return (
    <div className="flex justify-center min-h-screen flex-col overflow-hidden">
      {playerStatsModal && player.playerName !== "" && (
        <div className="min-w-[100vw] justify-center items-center flex shrink-0 min-h-[100vh] bg-blue-500/30 backdrop-blur-md absolute z-50 overflow-hidden">
          <div className="bg-black z-50 w-[50%] h-full text-white text-center flex flex-col">
            <Image
              src={player.profileImgUrl}
              alt={player.playerName}
              height={100}
              width={100}
              className="self-center"
            />
            <p>Name: {player.playerName}</p>
            <p>Date of Birth: {player.playerAge}</p>
            <p>Club: {player.clubName}</p>
            <p>League: {player.playerLeague}</p>
            <p>Height: {player.playerHeight}</p>
            <p>Citizenship: {player.playerCountry}</p>
            <p>Foot: {player.playerFoot}</p>
            <p>Value: {player.playerValue.toLocaleString()}€</p>
            <div className="flex flex-row self-end gap-5">
              <button onClick={() => setPlayerStatsModal(false)}>Close</button>
              <button
                onClick={() => {
                  resetRoundByRole(player.role), setPlayerStatsModal(false);
                }}
              >
                Sell Player
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-screen fixed   gap-5 z-50 top-0 backdrop-blur-sm bg-zinc-500/50 justify-center flex">
        <p>Budget: {currentBudget.toLocaleString()}</p>
        {currentRound}
      </div>
      <Pitch
        playerState={currentPlayers}
        resetRoleRound={resetRoundByRole}
        currentRoundRole={roles[currentRound]}
        hasGameEnded={hasGameEnded}
        openPlayerModal={openPlayerInfo}
        displayPlayerStatsFor={setStatsForRole}
      />
      <div className="flex flex-row w-screen px-5 justify-around fixed bottom-0 sm:py-2 bg-zinc-700/50 z-50 backdrop-blur-sm">
        {rolesTierSets[currentRound].map((playerId) => (
          <PlayerCard
            playerId={playerId}
            key={playerId}
            confirmPlayer={selectPlayer}
            role={roles[currentRound]}
            currentBudget={currentBudget}
          />
        ))}
      </div>
    </div>
  );
}
