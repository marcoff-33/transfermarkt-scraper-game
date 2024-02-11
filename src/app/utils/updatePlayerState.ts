import { Player } from "../types/playerData";
import { Role } from "../types/playerDb";

// function to update a player state object in a "playerGameState" array by given role.
export const updatePlayerState = (
  newPlayer: Player,
  playerState: Player[]
): Player[] => {
  const newPlayers = playerState.map(
    // Declaring return type on map function.
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
          }
        : player
  );

  return newPlayers;
};
