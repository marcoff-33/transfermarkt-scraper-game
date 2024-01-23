import { Roles, TeamComp } from "../types/playerDb";
// first arg takes in all player ids from local db, second arg takes the position, returns
// one player id for each tier of given role.
export function generateRoleTiers(players: TeamComp, position: Roles) {
  const t1 = players[position].t1;
  const t2 = players[position].t2;
  const t3 = players[position].t3;

  const t1i = Math.floor(Math.random() * t1.length);
  const t2i = Math.floor(Math.random() * t2.length);
  const t3i = Math.floor(Math.random() * t3.length);

  return [t1[t1i], t2[t2i], t3[t3i]];
}
