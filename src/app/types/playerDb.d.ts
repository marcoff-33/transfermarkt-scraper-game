export type Tier = number[];
// each Role has 3 tiers, every tier has a random number of pre-selected players
// ranging from highster market value(t1) to lowest (t3).
export interface PlayerTiers {
  t1: Tier;
  t2: Tier;
  t3: Tier;
}
// All the roles for the team formation.
export type Roles =
  | "CF"
  | "RWF"
  | "LWF"
  | "DMF"
  | "LB"
  | "RB"
  | "LCB"
  | "RCB"
  | "GK"
  | "RCM"
  | "LCM";

export interface TeamComp {
  GK: PlayerTiers;
  RB: PlayerTiers;
  CB: PlayerTiers;
  LB: PlayerTiers;
  DMF: PlayerTiers;
  CM: PlayerTiers;
  CF: PlayerTiers;
  LWF: PlayerTiers;
  RWF: PlayerTiers;
  RCM?: PlayerTiers;
  LCM?: PlayerTiers;
  LCB?: PlayerTiers;
  RCB?: PlayerTiers;
}
