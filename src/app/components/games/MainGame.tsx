"use client";

import React, { useEffect, useState } from "react";
import Pitch from "../Pitch";
import { Player } from "@/app/types/playerData";
import { updatePlayerState } from "@/app/utils/updatePlayerState";
import { PlayersDb, Role, RolesTFT } from "@/app/types/playerDb";
import emptyGameStates from "@/app/utils/newGameState";
import db from "../../../../public/players.json";
import { drawPlayerFromEachTier } from "@/app/utils/randomRolePicks";
import PlayerCard from "../PlayerCard";
import PlayerModal from "../PlayerModal";
import PreGameModal from "../PreGameModal";
import CardsWrapper from "../CardsWrapper";
import SwapModal from "../SwapModal";
import { useTheme } from "next-themes";

export type GameState = "initial" | "in progress" | "ended";
export type Formation = "3-4-3" | "4-3-3" | "4-4-2 ( Diamond )";

export default function MainGame() {
  const playersDb: PlayersDb = db;

  // empty player states for each formation
  // selected by <PreGameModal /> at game start
  // also containing grid position data for <Pitch />
  const { gameStateTFT, gameStateFTT, gameStateFFTDia } = emptyGameStates;

  const formationFTT: Role[] = [
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
  const formationFFTDia: Role[] = [
    "GK",
    "LCB",
    "RCB",
    "RB",
    "LB",
    "DMF",
    "RCM",
    "LCM",
    "AMF",
    "SS",
    "CF",
  ];

  const formationTFT: Role[] = [
    "GK",
    "LCB",
    "MCB",
    "RCB",
    "DMF",
    "RCM",
    "LCM",
    "RMF",
    "LMF",
    "CF",
    "SS",
  ];

  const [roles, setRoles] = useState(formationTFT);
  const [openSwap, setOpenSwap] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [gameState, setGameState] = useState<GameState>("initial");
  const [openPlayerModal, setOpenPlayerModal] = useState(false);
  const [playerModalRole, setPlayerModalRole] = useState<Role>("GK");
  const [availableRerolls, setAvailableRerolls] = useState(5);
  // sets a selection of 1 player from each tier for each role.
  const [rolesTierSets, setRolesTierSets] = useState(
    roles.map((role) => drawPlayerFromEachTier(playersDb, role))
  );
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>(gameStateTFT);
  const [currentRound, setCurrentRound] = useState(0);
  console.log(rolesTierSets);
  useEffect(() => {
    if (roles) {
      setRolesTierSets(
        roles.map((role) => drawPlayerFromEachTier(playersDb, role))
      );
    }
  }, [roles]);

  // used by <PreGameModal /> to set the game formation
  const setFormation = (formation: Formation) => {
    if (formation == "3-4-3") {
      setRoles(formationTFT);
      setCurrentPlayers(gameStateTFT);
    } else if (formation == "4-3-3") {
      setRoles(formationFTT);
      setCurrentPlayers(gameStateFTT);
    } else if (formation == "4-4-2 ( Diamond )") {
      setRoles(formationFFTDia);
      setCurrentPlayers(gameStateFFTDia);
    }
  };

  const { setTheme } = useTheme();

  // used by <CardsWrapper /> to reroll the selection of players for the current round
  const newTierSet = (role: Role, playersDb: PlayersDb) => {
    if (availableRerolls !== 0) {
      const roleIndex = roles.indexOf(role);

      setRolesTierSets((prevSets) => {
        const currentSet = prevSets[roleIndex];
        let newSet = drawPlayerFromEachTier(playersDb, role);

        // to make sure the new set doesn't contain any players from the current set
        while (newSet.some((player) => currentSet.includes(player))) {
          newSet = drawPlayerFromEachTier(playersDb, role);
        }

        currentSet.forEach((playerId) => {
          localStorage.removeItem(`player-${playerId}`);
        });

        return prevSets.map((set, index) =>
          index == roleIndex ? newSet : set
        );
      });

      setAvailableRerolls((rerolls) => rerolls - 1);
    }
  };

  const resetPlayerInRole = (role: Role) => {
    if (gameState == "ended") {
      const emptyPlayerTemplate: Player = {
        playerId: 0,
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
    }
  };

  const handleBudgetAndRoundOnReset = (role: Role) => {
    if (gameState === "ended") {
      // Add back the cost of the player to the budget
      const player = currentPlayers.find((player) => player.role === role);
      if (player && player.playerValue !== 0) {
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

  console.log(currentPlayers, "currentplayers");

  // used by <PlayerCard> to update the currentPlayers state with the selected player.
  const addPlayerToPitch = (player: Player) => {
    if (currentPlayers.some((p) => p.playerId === player.playerId)) {
      return;
    }
    if (player.playerValue <= currentBudget) {
      const newPlayersState = updatePlayerState(player, currentPlayers);
      setOpenPlayerModal(false);
      setCurrentPlayers(newPlayersState);
      gameState == "ended"
        ? setCurrentRound(12)
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
      <div className="text-white bg-purple-900 flex justify-center flex-row fixed w-screen z-[1000]">
        {currentBudget.toLocaleString()}, Rerolls left: {availableRerolls}{" "}
        {playerModalRole} {playerDataByRole.playerName}
        round: {currentRound} {gameState} {playerModalRole}
        <button
          onClick={() => setOpenSwap(!openSwap)}
          className="text-white z-50 mx-20"
        >
          Open Swap
        </button>
        <button
          onClick={() => setTheme("dark")}
          className="text-white z-50 mx-20"
        >
          dark
        </button>
        <button
          onClick={() => setTheme("light")}
          className="text-white z-50 mx-20"
        >
          light
        </button>
      </div>

      {openSwap && (
        <SwapModal
          players={currentPlayers}
          setPlayers={setCurrentPlayers}
          tierSets={rolesTierSets}
          setTierSets={setRolesTierSets}
        />
      )}
      {gameState == "initial" && (
        <PreGameModal
          setBudget={setCurrentBudget}
          setGameState={setGameState}
          setFormation={setFormation}
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
        <CardsWrapper
          rerollPlayers={newTierSet}
          availableRerolls={availableRerolls}
          currentRole={roles[currentRound]}
          playersDb={playersDb}
        >
          {rolesTierSets[currentRound].map((playerId) => (
            <PlayerCard
              playerId={playerId}
              key={playerId}
              confirmPlayer={addPlayerToPitch}
              role={roles[currentRound]}
              currentBudget={currentBudget}
              setGameState={setGameState}
              currentRound={currentRound}
            />
          ))}
          <button
            onClick={() => console.log(currentPlayers)}
            className="text-white"
          >
            log
          </button>
        </CardsWrapper>
      )}
    </div>
  );
}
