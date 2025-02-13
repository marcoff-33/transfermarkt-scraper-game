import { Player } from "@/app/_types/playerData";
import { Role } from "@/app/_types/playerDb";

// function used in the <MainGame /> to add or update a player in the "currentPlayers" state.
export const updatePlayerState = (newPlayer: Player, playerState: Player[]): Player[] => {
  const updatedState = playerState.map(
    (player): Player =>
      player.role === newPlayer.role
        ? {
            ...player,
            playerName: newPlayer.playerName || "",
            profileImgUrl: newPlayer.profileImgUrl || "",
            playerValue: newPlayer.playerValue,
            playerAge: newPlayer.playerAge,
            playerFoot: newPlayer.playerFoot,
            clubName: newPlayer.clubName,
            playerLeague: newPlayer.playerLeague,
            playerHeight: newPlayer.playerHeight,
            playerCountry: newPlayer.playerCountry,
            fullPlayerName: newPlayer.fullPlayerName,
            shortPlayerName: newPlayer.shortPlayerName,
            playerNationalFlag: newPlayer.playerNationalFlag,
            playerPosition: newPlayer.playerPosition,
            playerValueDate: newPlayer.playerValueDate,
            playerClubLogoUrl: newPlayer.playerClubLogoUrl,
            playerId: newPlayer.playerId,
            playerFifaStats: newPlayer.playerFifaStats,
          }
        : player
  );

  return updatedState;
};

type ColorType = "border" | "shadow";

export const getPlayerColor = (playerValue: number, type: ColorType) => {
  if (type == "shadow") {
    return playerValue > 50000000 ? "shadow-primary" : playerValue > 25000000 ? "shadow-accent/50" : playerValue > 10000000 ? "shadow-green-950" : playerValue > 1000000 ? "shadow-gray-800" : playerValue > 1 ? "shadow-gray-800" : "shadow-none";
  }
  return playerValue > 50000000 ? "border-primary" : playerValue > 25000000 ? "border-indigo-950" : playerValue > 10000000 ? "border-green-950" : playerValue > 1000000 ? "border-gray-800" : playerValue > 1 ? "border-gray-800" : "border-none";
};

// used by the <SwapModal /> to swap 2 players on the pitch.
// this swaps the data between 2 players without changing their grid position.
// also responsible for swapping the player's slot on the 3 "cards" selection for the role/round in the tier sets.
// "tier sets" are a selection of 3 players for a given role, generated at the start of a game.
// each set has 1 player for each tier by role.
// this is way too complicated and will be refactored later, but does it's job.
export const swapPlayersByRole = (playersState: Player[], setPlayerState: (newPlayersState: Player[]) => void, firstRole: Role, secondRole: Role, tierSets: number[][], setTierSets: (newSets: number[][]) => void) => {
  const findPlayerIndexInState = (role: Role) => playersState.findIndex((player) => player.role === role);

  const findSetId = (playerIndex: number) => tierSets.findIndex((tierset) => tierset.includes(playersState[playerIndex].playerId));
  const swapIdsInTierset = (tiersetId: number, oldId: number, newId: number) => tierSets[tiersetId].map((id) => (id === oldId ? newId : id));

  const firstPlayerIndex = findPlayerIndexInState(firstRole);
  const secondPlayerIndex = findPlayerIndexInState(secondRole);

  const firstPlayerTiersetId = findSetId(firstPlayerIndex);
  const secondPlayerTiersetId = findSetId(secondPlayerIndex);

  const updatedPlayers = [...playersState];
  const updatedTiersets = [...tierSets];

  const firstPlayerId = playersState[firstPlayerIndex].playerId;
  const secondPlayerId = playersState[secondPlayerIndex].playerId;

  updatedTiersets[firstPlayerTiersetId] = swapIdsInTierset(firstPlayerTiersetId, firstPlayerId, secondPlayerId);
  updatedTiersets[secondPlayerTiersetId] = swapIdsInTierset(secondPlayerTiersetId, secondPlayerId, firstPlayerId);

  const temp = updatedPlayers[firstPlayerIndex];

  updatedPlayers[firstPlayerIndex] = {
    ...updatedPlayers[secondPlayerIndex],
    role: firstRole,
    playerRow: updatedPlayers[firstPlayerIndex].playerRow,
    playerCol: updatedPlayers[firstPlayerIndex].playerCol,
  };
  updatedPlayers[secondPlayerIndex] = {
    ...temp,
    role: secondRole,
    playerRow: updatedPlayers[secondPlayerIndex].playerRow,
    playerCol: updatedPlayers[secondPlayerIndex].playerCol,
  };

  setPlayerState(updatedPlayers);
  setTierSets(updatedTiersets);
};
