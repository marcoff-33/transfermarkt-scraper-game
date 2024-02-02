import { playerGameState } from "../types/playerData";
import { Role } from "../types/playerDb";

// function to update a player state object in a "playerGameState" array by given role.
export const updatePlayerState = (
  role: Role,
  name: string,
  imageURL: string,
  playerState: playerGameState[],
  playerValue: number
): playerGameState[] => {
  const newPlayers = playerState.map(
    // Declaring return type on map function.
    (player): playerGameState =>
      player.role === role
        ? {
            ...player,
            playerName: name || "",
            profileImgUrl: imageURL || "",
            playerValue: playerValue,
          }
        : player
  );

  return newPlayers;
};
