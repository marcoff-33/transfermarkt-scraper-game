import { HeroImgData, PlayerId } from "@/app/types/playerDb";

export const fetchPlayerHeroImg = async (playerId: PlayerId) => {
  const playerHeroImages = await fetch(
    `https://www.transfermarkt.us/ceapi/player/${playerId}/images`
  );

  const heroImgSrc: HeroImgData[] = await playerHeroImages.json();

  const firstPlayerHeroImgUrl =
    heroImgSrc[0]?.url ||
    "https://placehold.co/333x186.png?text=no%20image%20available";

  return firstPlayerHeroImgUrl;
};
