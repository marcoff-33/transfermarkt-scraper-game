type PlayerId = number;
export type Tier =
  | "t1" // Highest transfer market value of players.
  | "t2" // Mid-range  transfer market value of players.
  | "t3"; // lowest  transfer market value of players.

// each Role has 3 tiers, every tier has a random number of pre-selected players
export type RoleTiers = {
  [T in Tier]: PlayerId[];
};
// Roles for the 4-3-3 formation.
export type RolesFTT =
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

// roles for the 3-4-3 formation.
export type RolesTFT =
  | "GK"
  | "LCB"
  | "MCB"
  | "RCB"
  | "DMF"
  | "RCM"
  | "LCM"
  | "RMF"
  | "LMF"
  | "CF"
  | "SS";

export type Role = RolesFTT | RolesTFT;

export type PlayersDb = {
  [T in Role]: RoleTiers;
};

export type HeroImgData = {
  url: string;
  source: string;
};
