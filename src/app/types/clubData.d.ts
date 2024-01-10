export interface Club {
  id: string;
  url: string;
  name: string;
  officialName: string;
  image: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  tel: string;
  fax: string;
  website: string;
  foundedOn: string;
  colors: string[];
  stadiumName: string;
  stadiumSeats: string;
  currentTransferRecord: string;
  currentMarketValue: string;
  squad: {
    size: string;
    averageAge: string;
    foreigners: string;
    nationalTeamPlayers: string;
  };
  league: {
    id: string;
    name: string;
    countryID: string;
    countryName: string;
    tier: string;
  };
  historicalCrests: string[];
  updatedAt: string;
}
