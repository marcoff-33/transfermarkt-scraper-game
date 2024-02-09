import { playerGameState } from "../types/playerData";
import { Role } from "../types/playerDb";

// function to update a player state object in a "playerGameState" array by given role.
export const updatePlayerState = (
  role: Role,
  name: string,
  imageURL: string,
  playerState: playerGameState[],
  playerValue: number,
  playerAge: string,
  playerFoot: string,
  clubName: string,
  playerLeague: string,
  playerHeight: string,
  playerCountry: string
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
            playerAge: playerAge,
            playerFoot: playerFoot,
            clubName: clubName,
            playerLeague: playerLeague,
            playerHeight: playerHeight,
            playerCountry: playerCountry,
          }
        : player
  );

  return newPlayers;
};
