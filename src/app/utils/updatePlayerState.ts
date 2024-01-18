import { playerGameState } from "../types/playerData";
import { Roles } from "../types/playerDb";

// function to update a player state object in a "playerGameState" array by given key(position).
export const updatePlayerState = (
  key: Roles,
  name: string,
  url: string,
  playerState: playerGameState[]
): playerGameState[] => {
  const newPlayers = playerState.map(
    // Forcing return type on map function.
    (player): playerGameState =>
      player.key === key
        ? {
            ...player,
            playerName: name || "",
            url: url || "",
          }
        : player
  );

  return newPlayers;
};
