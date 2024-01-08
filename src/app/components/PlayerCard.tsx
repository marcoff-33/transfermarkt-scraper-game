import React from "react";
import { PlayerCardProps, PlayerData } from "../types/playerData";

export default async function PlayerCard({
  searchPlayer,
  playerId,
  lang,
}: PlayerCardProps) {
  const data = await searchPlayer(playerId, lang);
  return (
    <div className="flex flex-col">
      <img src={data.playerProfile.playerImage} alt="" />
      {data.playerProfile.playerName}, Value: {data.playerProfile.marketValue}
      0,000 $
    </div>
  );
}
