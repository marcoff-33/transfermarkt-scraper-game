export const getPlayerProfileImg = (document: Document) => {
  const playerProfileImgElement = document.querySelector(
    ".data-header__profile-image"
  ) as HTMLImageElement;
  const playerProfileImgUrl = playerProfileImgElement.src;
  return playerProfileImgUrl;
};
