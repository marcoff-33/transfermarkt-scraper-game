import React from "react";
import Image from "next/image";

export type CardImage = {
  playerImageUrl: string;
  playerImageAlt: string;
  clubLogoUrl: string;
  clubLogoAlt: string;
  playerName: string;
};

export default function CardImage({
  playerImageAlt,
  playerImageUrl,
  clubLogoAlt,
  clubLogoUrl,
  playerName,
}: CardImage) {
  return (
    <div className="relative h-[144px] w-[260px] grow self-center">
      {/* position:relative required for player <Image /> "fill" to work properly */}
      <div className="absolute z-50 text-white bottom-5 text-lg font-bold bg-black/75 w-full text-center shadow-xl shadow-red-500">
        {playerName}
      </div>
      <Image
        alt={clubLogoAlt}
        src={clubLogoUrl}
        width={58}
        height={76}
        className="absolute z-50 bg-black/20 shadow-lg shadow-red-500 rounded-md"
      />
      <Image
        src={playerImageUrl}
        alt={playerImageAlt}
        placeholder="empty"
        fill
        className=""
      />
    </div>
  );
}
