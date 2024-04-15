import { CarouselItem } from "@/app/_ui/carousel";
import React from "react";
import Image from "next/image";
import { PlayerData } from "../../../_types/playerData";
import { Solution } from "../ValueGame";

// responsible for rendering each player in the Quiz Game Carousel

export default function CarouselPlayer({
  index,
  playerData,
  answerState,
  secondQuestionIndex,
}: {
  index: number;
  playerData: PlayerData;
  answerState: Solution;
  secondQuestionIndex: number;
}) {
  return (
    <CarouselItem
      className="basis-1/2 h-[500px] w-[50vw] relative mr-[0.8rem] pl-0 border-x-[3px] border-primary"
      key={index}
    >
      <div className="">
        <Image
          alt={playerData.playerName}
          src={playerData.scrapedPlayerData.playerHeroImg}
          fill
          objectFit="cover"
          objectPosition="center"
          className={`min-w-full min-h-full grayscale duration-1000 relative rounded-sm `}
        />
        <div
          className={`w-full h-full absolute transition-all duration-500 rounded-sm delay-200 ${
            answerState == "correct" && secondQuestionIndex == index
              ? "bg-primary/80 backdrop-blur-md"
              : "bg-background-front/80"
          } ${
            answerState == "wrong" && secondQuestionIndex == index
              ? "bg-red-900/80 backdrop-blur-lg"
              : "bg-background-front/90"
          }`}
        ></div>
      </div>
    </CarouselItem>
  );
}
