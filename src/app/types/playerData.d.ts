export interface Share {
  title: string;
  url: string;
  description: string;
}

export interface Loan {
  loan: string;
  loanStart: string;
  loanUntil: string;
  contractOptions: string;
  ownerName: string;
  ownerID: string;
  ownerImage: string;
  ownerContractUntil: string;
}

export interface Injury {
  id: string;
  title: string;
  until: string;
  rehabilitationFlag: string;
}

export interface Absence {
  id: string;
  title: string;
  until: string;
  competitionID: string;
  matches: string;
}

export interface HeroImages {
  id: string;
  url: string;
  source: string;
}

export interface PerformanceSeasons {
  key: string;
  title: string;
}

export interface PlayerProfile {
  playerID: string;
  playerImage: string;
  playerName: string;
  playerFullName: string;
  birthplace: string;
  dateOfBirth: string;
  dateOfDeath: string | null;
  playerShirtNumber: string;
  birthplaceCountry: string;
  birthplaceCountryImage: string;
  age: string;
  height: string;
  foot: string;
  internationalTeam: string;
  internationalTeamImage: string;
  internationalTeamStatus: string;
  internationalGames: string;
  internationalGoals: string;
  internationalTeamShortTag: string;
  internationalShirtNumber: string;
  internationalWmMember: boolean;
  internationalValueRank: number;
  country: string;
  countryImage: string;
  countryShortName: string;
  secondCountry: string;
  secondCountryImage: string;
  league: string;
  leagueLogo: string;
  clubImage: string;
  club: string;
  clubID: string;
  loan: Loan;
  contractExpiryDate: string;
  agent: string;
  agentId: string;
  agentVerificationStatus: string;
  agentVerificationDate: boolean;
  outfitter: string;
  positionGroup: string;
  playerMainPosition: string;
  playerSecondPosition: string;
  playerThirdPosition: string;
  marketValue: string;
  marketValueCurrency: string;
  marketValueNumeral: string;
  marketValueLastChange: string;
  relatedness: any[];
  injury: Injury;
  absence: Absence;
  allSuspensions: any[];
}

export interface PlayerData {
  share: Share;
  playerProfile: PlayerProfile;
  performanceSeasons: PerformanceSeasons[];
  heroImages: HeroImages[];
}

export interface PlayerCardProps {
  searchPlayer: (playerId: number, lang: string) => Promise<PlayerData>;
  playerId: number;
  lang: string;
}
