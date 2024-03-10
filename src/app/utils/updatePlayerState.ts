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
      ? "shadow-violet-700"
      : playerValue > 25000000
      ? "shadow-red-800"
      : playerValue > 10000000
      ? "shadow-yellow-700"
      : playerValue > 1000000
      ? "shadow-lime-700"
      : playerValue > 1
      ? "shadow-green-700"
      : "shadow-none";
  }
  return playerValue > 50000000
    ? "border-violet-700"
    : playerValue > 25000000
    ? "border-red-800"
    : playerValue > 10000000
    ? "border-yellow-700"
    : playerValue > 1000000
    ? "border-lime-700"
    : playerValue > 1
    ? "shadow-green-700"
    : "border-none";
};

export const swapPlayersByRole = (
  playerState: Player[],
  setPlayerState: (newPlayersState: Player[]) => void,
  firstRole: Role,
  secondRole: Role,
  tierSets: number[][],
  setTierSets: (newSets: number[][]) => void
) => {
  const firstPlayerIndex = playerState.findIndex(
    (player) => player.role === firstRole
  );
  const secondPlayerIndex = playerState.findIndex(
    (player) => player.role === secondRole
  );

  const firstPlayerTiersetId = tierSets.findIndex((tierset) =>
    tierset.includes(playerState[firstPlayerIndex].playerId)
  );
  const secondPlayerTiersetId = tierSets.findIndex((tierset) =>
    tierset.includes(playerState[secondPlayerIndex].playerId)
  );

  const updatedPlayers = [...playerState];
  const updatedTiersets = [...tierSets];

  const tempSet = updatedTiersets[firstPlayerTiersetId];
  const firstPlayerId = playerState[firstPlayerIndex].playerId;
  const secondPlayerId = playerState[secondPlayerIndex].playerId;
  const updatedFirstTierset = tempSet.map((id) =>
    id === firstPlayerId ? secondPlayerId : id
  );
  const updatedSecondTierset = tempSet.map((id) =>
    id === secondPlayerId ? firstPlayerId : id
  );
  updatedTiersets[firstPlayerTiersetId] = updatedFirstTierset;
  updatedTiersets[secondPlayerTiersetId] = updatedSecondTierset;

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
