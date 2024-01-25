import { PlayersDb, Role, Tier } from "../types/playerDb";
// used for generating 1 playerId for each tier in given position

export function drawPlayerFromEachTier(allPlayerIds: PlayersDb, role: Role) {
  const tiers: Tier[] = ["t1", "t2", "t3"];

  return tiers.map((tier) => {
    const IdsInTier = allPlayerIds[role][tier];
    const randomIndex = Math.floor(Math.random() * IdsInTier.length);
    return IdsInTier[randomIndex];
  });
}
