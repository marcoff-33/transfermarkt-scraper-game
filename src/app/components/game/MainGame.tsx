"use client";

import React, { use, useState } from "react";
import Pitch from "../Pitch";
import { Player } from "@/app/types/playerData";
import { updatePlayerState } from "@/app/utils/updatePlayerState";
import { PlayersDb, Role } from "@/app/types/playerDb";
import starterGameState from "@/app/utils/newGameState";
import db from "../../../../public/players.json";
import { drawPlayerFromEachTier } from "@/app/utils/randomRolePicks";
import PlayerCard from "../PlayerCard";
import PlayerModal from "../PlayerModal";
import PreGameModal from "../PreGameModal";
import CardsWrapper from "../CardsWrapper";

export type GameState = "initial" | "in progress" | "ended";

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
  const [currentBudget, setCurrentBudget] = useState(0);
  const [gameState, setGameState] = useState<GameState>("initial");
  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const [playerModalRole, setPlayerModalRole] = useState<Role>("GK");
  // sets a selection of 1 player from each tier for each role.
  const [rolesTierSets, setRolesTierSets] = useState(
    roles.map((role) => drawPlayerFromEachTier(playersDb, role))
  );

  const [currentPlayers, setCurrentPlayers] =
    useState<Player[]>(starterGameState);

  const [currentRound, setCurrentRound] = useState(0);

  const resetPlayerInRole = (role: Role) => {
    const emptyPlayerTemplate: Player = {
      playerAge: "",
      role: role,
      playerCountry: "",
      playerFoot: "",
      playerHeight: "",
      playerLeague: "",
      playerName: "",
      playerValue: 0,
      profileImgUrl: "https://placehold.co/80x70/png?text=?",
      clubName: "",
      fullPlayerName: "",
      shortPlayerName: "",
    };
    const defaultRoleState = updatePlayerState(
      emptyPlayerTemplate,
      currentPlayers
    );
    setCurrentPlayers(defaultRoleState);
  };

  const handleBudgetAndRoundOnReset = (role: Role) => {
    if (gameState === "ended") {
      // Add back the cost of the player to the budget
      const player = currentPlayers.find((player) => player.role === role);
      if (player && player.playerValue) {
        setCurrentBudget((prevBudget) => prevBudget + player.playerValue);
      }

      // Reset round to the index of the given role
      setCurrentRound(roles.indexOf(role));
    }
  };

  const resetRoundByRole = (role: Role) => {
    resetPlayerInRole(role);
    handleBudgetAndRoundOnReset(role);
  };

  // used by selectPlayer() to return the market value of the player in selected role, so we can add it back to the budget.
  const getPlayerValue = (role: Role) => {
    const player = currentPlayers.find((player) => player.role === role);
    if (player) {
      return player.playerValue;
    }
    return 0;
  };

  // used by <PlayerCard> to update the currentPlayers state with the selected player.
  const addPlayerToPitch = (player: Player) => {
    if (player.playerValue <= currentBudget) {
      const newPlayersState = updatePlayerState(player, currentPlayers);
      setOpenPlayerModal(false);
      setCurrentPlayers(newPlayersState);
      gameState == "ended"
        ? setCurrentRound(11)
        : setCurrentRound((prevRound) => prevRound + 1);
      setGameState(currentRound === 10 ? "ended" : gameState);
      setCurrentBudget(
        gameState == "ended"
          ? (prevBudget) => prevBudget + getPlayerValue(player.role)
          : currentBudget
      );
      setCurrentBudget((prevBudget) => prevBudget - player.playerValue);
    }
  };

  const playerDataByRole: Player = currentPlayers.filter(
    (player) => player.role === playerModalRole
  )[0];

  // used by the <PlayerModal /> what role to render the data from
  const setModalRole = (role: Role) => {
    if (playerDataByRole.role !== role) {
      setPlayerModalRole(role);
    }
    if (gameState == "ended") {
      setCurrentRound(roles.indexOf(role));
    }
  };

  return (
    <div className="min-h-screen flex justify-start flex-col overflow-hidden pt-10 md:pt-0  relative">
      {gameState == "initial" && (
        <PreGameModal
          setBudget={setCurrentBudget}
          setGameState={setGameState}
        />
      )}
      {openPlayerModal && playerDataByRole.playerName !== "" && (
        <PlayerModal
          playerState={playerDataByRole}
          resetPlayer={resetRoundByRole}
          setModalState={setOpenPlayerModal}
        />
      )}

      {gameState !== "initial" && (
        <Pitch
          playerState={currentPlayers}
          resetRoleRound={resetRoundByRole}
          currentRoundRole={roles[currentRound]}
          hasGameEnded={gameState}
          openPlayerModal={setOpenPlayerModal}
          displayPlayerStatsFor={setModalRole}
        />
      )}
      {currentRound < 11 && gameState !== "initial" && (
        <CardsWrapper>
          {rolesTierSets[currentRound].map((playerId) => (
            <PlayerCard
              playerId={playerId}
              key={playerId}
              confirmPlayer={addPlayerToPitch}
              role={roles[currentRound]}
              currentBudget={currentBudget}
            />
          ))}
        </CardsWrapper>
      )}
    </div>
  );
}
