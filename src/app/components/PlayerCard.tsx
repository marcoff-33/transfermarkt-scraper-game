import React from "react";
import { PlayerCardProps, PlayerData } from "../types/playerData";
import Image from "next/image";
export default async function PlayerCard({
  searchPlayer,
  playerId,
  lang,
}: PlayerCardProps) {
  const data = await searchPlayer(playerId, lang);
  return (
    <div className="flex flex-col">
      <Image
        src={data.playerProfile.playerImage}
        alt={data.playerProfile.playerName}
        width={300}
        height={300}
      />
      {data.playerProfile.playerName}, Value: {data.playerProfile.marketValue}
      0,000 $
    </div>
  );
}
