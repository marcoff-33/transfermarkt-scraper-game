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
    <div className="justify-center flex flex-col">
      <div className="relative h-[181px] w-[139px] grow self-center">
        {/* position:relative required for player <Image /> "fill" to work properly */}
        <Image
          alt={clubLogoAlt}
          src={clubLogoUrl}
          width={29}
          height={38}
          className="absolute z-50 bg-black/20 shadow-lg shadow-black rounded-full"
        />
        <Image
          src={playerImageUrl}
          alt={playerImageAlt}
          placeholder="empty"
          fill
          className=""
        />
      </div>
      <div className="px-2 z-50 text-white bottom-5 text-lg font-bold bg-black/75 w-full text-center shadow-xl shadow-red-500">
        {playerName}
      </div>
    </div>
  );
}
