import { PlayerId, PlayersDb, Role, Tier } from "../_types/playerDb";
// used for generating 1 playerId for each tier in given role by the <MainGame />
export function drawPlayerFromEachTier(playerDb: PlayersDb, role: Role) {
  const tiers: Tier[] = ["t1", "t2", "t3"];

  return tiers.map((tier) => {
    const IdsInTier = playerDb[role][tier];

    return getRandomItemInArray(IdsInTier);
  });
}

export function drawRandomPlayer(playerDb: PlayersDb): PlayerId {
  const tiers: Tier[] = ["t1", "t2", "t3"];
  const roles = Object.keys(playerDb);

  const randomRole = getRandomItemInArray(roles) as Role;
  const randomTier = getRandomItemInArray(tiers);

  const playersInRoleTier = playerDb[randomRole][randomTier];
  const randomPlayerId = getRandomItemInArray(playersInRoleTier);

  return randomPlayerId;
}

function getRandomItemInArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
