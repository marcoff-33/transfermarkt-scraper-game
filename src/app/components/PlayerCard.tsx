import React from "react";
import { PlayerCardProps } from "../types/playerData";
import CardImage from "./CardImage";

export default async function PlayerCard({
  searchPlayer, // requires function to get player profile data
  playerId,
  lang, //header for language of data, todo:implement types for all possible localizations.
}: PlayerCardProps) {
  const data = await searchPlayer(playerId, lang);

  // playerValue needed to correctly display the full market Value and format it
  const playerValue = (
    parseInt(data.playerProfile.marketValue) * 100000
  ).toLocaleString();

  return (
    <div className="border border-yellow-400 flex flex-col">
      <CardImage
        playerImageAlt={data.playerProfile.playerName}
        playerImageUrl={data.heroImages[0].url}
        clubLogoAlt={data.playerProfile.club}
        clubLogoUrl={data.playerProfile.clubImage}
        playerName={data.playerProfile.playerName}
      />
      <div className="border-blue-500 border">Value: {playerValue}€</div>
    </div>
  );
}
