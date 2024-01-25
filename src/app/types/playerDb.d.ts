type PlayerId = number;
export type Tier =
  | "t1" // Highest transfer market value of players.
  | "t2" // Mid-range  transfer market value of players.
  | "t3"; // lowest  transfer market value of players.

// each Role has 3 tiers, every tier has a random number of pre-selected players
export type RoleTiers = {
  [T in Tier]: PlayerId[];
};
// All the roles for the team formation.
export type Role =
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

export type PlayersDb = {
  [T in Role]: RoleTiers;
};
