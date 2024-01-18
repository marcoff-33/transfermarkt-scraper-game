import React from "react";
import { PlayerCardProps } from "../types/playerData";
import CardImage from "./CardImage";
import { fetchClubData } from "../utils/fetchClubData";

export default async function PlayerCard({
  searchPlayer, // requires function to get player profile data
  playerId,
}: PlayerCardProps) {
  const data = await searchPlayer(playerId);
  const clubId = parseInt(data.club.id);
  const clubData = await fetchClubData(clubId);

  // playerValue needed to correctly display the full market Value and format it
  const playerValue = data.marketValue;

  return (
    <div className="border border-yellow-400 flex flex-col">
      <CardImage
        playerImageAlt={data.nameInHomeCountry}
        playerImageUrl={data.imageURL}
        playerName={data.nameInHomeCountry}
        clubLogoAlt={clubData.name}
        clubLogoUrl={clubData.image}
      />
      <div className="border-blue-500 border">Value: {playerValue}€</div>
    </div>
  );
}
