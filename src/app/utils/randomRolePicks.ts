import { PlayerTiers, Roles, TeamComp } from "../types/playerDb";
import playerDb from "../../../public/players.json";
const players: TeamComp = playerDb;

export function randomRolePicks(players: TeamComp, position: Roles) {
  const t1 = players[position].t1;
  const t2 = players[position].t2;
  const t3 = players[position].t3;

  const t1i = Math.floor(Math.random() * t1.length);
  const t2i = Math.floor(Math.random() * t2.length);
  const t3i = Math.floor(Math.random() * t3.length);

  return [t1[t1i], t2[t2i], t3[t3i]];
}
