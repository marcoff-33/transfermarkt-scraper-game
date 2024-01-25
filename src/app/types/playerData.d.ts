import { Roles } from "./playerDb";

export interface playerGameState {
  role: Roles;
  position: string;
  url: string;
  playerName: string;
}
