import { Player } from "../types/playerData";
import { Role } from "../types/playerDb";

// function to update a player state object in a "playerGameState" array by given role.
export const updatePlayerState = (
  newPlayer: Player,
  playerState: Player[]
): Player[] => {
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
            playerId: newPlayer.playerId,
          }
        : player
  );

  return updatedState;
};

type ColorType = "border" | "shadow";

export const getPlayerColor = (playerValue: number, type: ColorType) => {
  if (type == "shadow") {
    return playerValue > 50000000
      ? "shadow-orange-400"
      : playerValue > 25000000
      ? "shadow-indigo-950"
      : playerValue > 10000000
      ? "shadow-green-950"
      : playerValue > 1000000
      ? "shadow-gray-800"
      : playerValue > 1
      ? "shadow-gray-800"
      : "shadow-none";
  }
  return playerValue > 50000000
    ? "border-orange-400"
    : playerValue > 25000000
    ? "border-indigo-950"
    : playerValue > 10000000
    ? "border-green-950"
    : playerValue > 1000000
    ? "border-gray-800"
    : playerValue > 1
    ? "border-gray-800"
    : "border-none";
};

// used by the <SwapModal /> to swap 2 players on the pitch.
export const swapPlayersByRole = (
  playersState: Player[],
  setPlayerState: (newPlayersState: Player[]) => void,
  firstRole: Role,
  secondRole: Role,
  tierSets: number[][],
  setTierSets: (newSets: number[][]) => void
) => {
  const findPlayerIndexInState = (role: Role) =>
    playersState.findIndex((player) => player.role === role);

  const findSetId = (playerIndex: number) =>
    tierSets.findIndex((tierset) =>
      tierset.includes(playersState[playerIndex].playerId)
    );
  const swapIdsInTierset = (tiersetId: number, oldId: number, newId: number) =>
    tierSets[tiersetId].map((id) => (id === oldId ? newId : id));

  const firstPlayerIndex = findPlayerIndexInState(firstRole);
  const secondPlayerIndex = findPlayerIndexInState(secondRole);

  const firstPlayerTiersetId = findSetId(firstPlayerIndex);
  const secondPlayerTiersetId = findSetId(secondPlayerIndex);

  const updatedPlayers = [...playersState];
  const updatedTiersets = [...tierSets];

  const firstPlayerId = playersState[firstPlayerIndex].playerId;
  const secondPlayerId = playersState[secondPlayerIndex].playerId;

  updatedTiersets[firstPlayerTiersetId] = swapIdsInTierset(
    firstPlayerTiersetId,
    firstPlayerId,
    secondPlayerId
  );
  updatedTiersets[secondPlayerTiersetId] = swapIdsInTierset(
    secondPlayerTiersetId,
    secondPlayerId,
    firstPlayerId
  );

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
