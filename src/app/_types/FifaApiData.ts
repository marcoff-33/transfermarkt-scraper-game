export interface EAApiResponse {
  items: FifaPlayerStats[];
}

export interface FifaPlayerStats {
  overallRating: number;
  stats: StatItem[];
  birthdate: string;
}

interface StatItem {
  value: number;
  diff: number;
}
