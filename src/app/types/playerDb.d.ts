export type Tier = number[];

export interface PlayerTiers {
  t1: Tier;
  t2: Tier;
  t3: Tier;
}

export type Roles =
  | "CF"
  | "RWF"
  | "LWF"
  | "CM"
  | "DMF"
  | "LB"
  | "RB"
  | "CB"
  | "GK";

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
}
