"use client";

import React, { useEffect, useState } from "react";
import db from "../../../../public/players.json";
import { Player } from "@/app/_types/playerData";
import { PlayersDb, Role, RolesTFT } from "@/app/_types/playerDb";
import emptyGameStates from "@/app/_games/_MainGame/_utils/emptyFormations";
import { drawPlayerFromEachTier } from "@/app/_utils/randomRolePicks";
import GameNavbar from "./_components/GameNav";
import placeholderImage from "@/app/_public/blkplaceholder.png";
import { updatePlayerState } from "./_utils/updatePlayerState";
import PreGameModal from "@/app/_games/_MainGame/_components/PreGameModal";
import Pitch from "@/app/_games/_MainGame/_components/pitch/Pitch";
import PlayerCard from "@/app/_games/_MainGame/_components/cards/PlayerCard";
import CardsWrapper from "@/app/_games/_MainGame/_components/cards/CardsWrapper";
import { Carousel, CarouselContent, CarouselItem } from "@/app/_ui/carousel";
import { type CarouselApi } from "@/app/_ui/carousel";

import CarouselPaginationDots from "./_components/cards/CarouselPaginationDots";

export type GameState = "initial" | "in progress" | "ended";
export type Formation = "3-1-4-2" | "4-3-3" | "4-4-2 ( Diamond )";

export default function MainGame() {
  const playersDb: PlayersDb = db;

  // empty player states for each formation
  // selected by <PreGameModal /> at game start
  // also contains grid position data for <Pitch /> to create the team formation
  const { gameState3142, gameState433, gameState442Diamond } = emptyGameStates;

  const formationFTT: Role[] = ["GK", "LCB", "RCB", "RB", "LB", "DMF", "CF", "RCM", "LCM", "LWF", "RWF"];
  const formationFFTDia: Role[] = ["GK", "LCB", "RCB", "RB", "LB", "DMF", "RCM", "LCM", "AMF", "SS", "CF"];

  const formation3142: Role[] = ["GK", "LCB", "MCB", "RCB", "DMF", "RCM", "LCM", "RMF", "LMF", "CF", "SS"];
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();

  const [roles, setRoles] = useState<Role[]>(formation3142);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [gameState, setGameState] = useState<GameState>("initial");
  const [playerModalRole, setPlayerModalRole] = useState<Role>("GK");
  const [availableRerolls, setAvailableRerolls] = useState(5);
  const [isNewGame, setIsNewGame] = useState(true);
  const [allowRerolls, setAllowRerolls] = useState(false);
  // sets a selection of 1 player from each tier for each role.
  const [rolesTierSets, setRolesTierSets] = useState(roles.map((role) => drawPlayerFromEachTier(playersDb, role)));
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>(gameState3142);
  const [currentRound, setCurrentRound] = useState(0);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!carouselApi) {
      return;
    }

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  const restartGame = () => {
    setIsNewGame(true);
    setCurrentBudget(0);
    setGameState("initial");
    setAvailableRerolls(5);
    setCurrentRound(0);
  };

  useEffect(() => {
    if (roles) {
      setRolesTierSets(roles.map((role) => drawPlayerFromEachTier(playersDb, role)));
    }
  }, [roles, playersDb, isNewGame]);

  // used by <PreGameModal /> to set the game formation
  const setFormation = (formation: Formation) => {
    if (formation == "3-1-4-2") {
      setRoles(formation3142);
      setCurrentPlayers(gameState3142);
    } else if (formation == "4-3-3") {
      setRoles(formationFTT);
      setCurrentPlayers(gameState433);
    } else if (formation == "4-4-2 ( Diamond )") {
      setRoles(formationFFTDia);
      setCurrentPlayers(gameState442Diamond);
    }
  };

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

        return prevSets.map((set, index) => (index == roleIndex ? newSet : set));
      });

      setAvailableRerolls((rerolls) => rerolls - 1);
      setAllowRerolls(false);
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
        profileImgUrl: placeholderImage,
        clubName: "",
        fullPlayerName: "",
        shortPlayerName: "",
        playerNationalFlag: "",
        playerValueDate: "",
        playerPosition: "",
        playerClubLogoUrl: "",
      };
      const defaultRoleState = updatePlayerState(emptyPlayerTemplate, currentPlayers);
      setCurrentPlayers(defaultRoleState);
      if (availableRerolls >= 1) {
        setAllowRerolls(true);
      }
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

  // used by <PlayerCard> to update the currentPlayers state with the selected player.
  const addPlayerToPitch = (player: Player) => {
    if (currentPlayers.some((p) => p.playerId === player.playerId)) {
      return;
    }
    if (player.playerValue <= currentBudget) {
      const newPlayersState = updatePlayerState(player, currentPlayers);
      setCurrentPlayers(newPlayersState);
      gameState == "ended" ? setCurrentRound(12) : setCurrentRound((prevRound) => prevRound + 1);
      setGameState(currentRound === 10 ? "ended" : gameState);
      setCurrentBudget(gameState == "ended" ? (prevBudget) => prevBudget + getPlayerValue(player.role) : currentBudget);
      setCurrentBudget((prevBudget) => prevBudget - player.playerValue);
    }
  };

  const playerDataByRole: Player = currentPlayers.filter((player) => player.role === playerModalRole)[0];

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
    <div className="min-h-screen flex justify-start flex-col  md:pt-0 relative">
      {/* this is a copy of the global Navbar with added stats and buttons for this game specifically */}
      <GameNavbar rerolls={availableRerolls} budget={currentBudget} gameState={gameState} restartGame={restartGame} players={currentPlayers} setPlayers={setCurrentPlayers} tierSets={rolesTierSets} setTierSets={setRolesTierSets} />
      {gameState == "initial" && <PreGameModal setBudget={setCurrentBudget} setGameState={setGameState} setFormation={setFormation} />}

      {gameState !== "initial" && <Pitch playerState={currentPlayers} resetRoleRound={resetRoundByRole} currentRoundRole={roles[currentRound]} gameState={gameState} displayPlayerStatsFor={setModalRole} resetPlayer={resetRoundByRole} setAllowRerolls={setAllowRerolls} />}

      {currentRound < 11 && gameState !== "initial" && (
        <div className="">
          {/* will render as a carousel at lower viewports depending on tailwind classes conditionals */}
          <div className="md:hidden block">
            <CardsWrapper rerollPlayers={newTierSet} availableRerolls={availableRerolls} currentRole={roles[currentRound]} playersDb={playersDb} allowRerolls={allowRerolls}>
              <Carousel className="w-full h-[150px]" setApi={setCarouselApi}>
                <CarouselPaginationDots current={current} total={count} />
                <CarouselContent>
                  {rolesTierSets[currentRound].map((playerId, index) => (
                    <CarouselItem key={index} className="h-[150px]">
                      <PlayerCard playerId={playerId} key={playerId} confirmPlayer={addPlayerToPitch} role={roles[currentRound]} currentBudget={currentBudget} setGameState={setGameState} currentRound={currentRound} isNewGame={isNewGame} setIsNewGame={setIsNewGame} allowRerolls={allowRerolls} setAllowRerolls={setAllowRerolls} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </CardsWrapper>
          </div>
          <div className="hidden md:block">
            <CardsWrapper rerollPlayers={newTierSet} availableRerolls={availableRerolls} currentRole={roles[currentRound]} playersDb={playersDb} allowRerolls={allowRerolls}>
              {rolesTierSets[currentRound].map((playerId, index) => (
                <PlayerCard playerId={playerId} key={playerId} confirmPlayer={addPlayerToPitch} role={roles[currentRound]} currentBudget={currentBudget} setGameState={setGameState} currentRound={currentRound} isNewGame={isNewGame} setIsNewGame={setIsNewGame} allowRerolls={allowRerolls} setAllowRerolls={setAllowRerolls} />
              ))}
            </CardsWrapper>
          </div>
        </div>
      )}
    </div>
  );
}
