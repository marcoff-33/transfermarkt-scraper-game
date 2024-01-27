import { playerGameState } from "../types/playerData";
import { Role } from "../types/playerDb";

// function to update a player state object in a "playerGameState" array by given key(position).
export const updatePlayerState = (
  role: Role,
  name: string,
  imageURL: string,
  playerState: playerGameState[]
): playerGameState[] => {
  const newPlayers = playerState.map(
    // Forcing return type on map function.
    (player): playerGameState =>
      player.role === role
        ? {
            ...player,
            playerName: name || "",
            url: imageURL || "",
          }
        : player
  );

  return newPlayers;
};
