export const getClubLogoImgUrl = (document: Document) => {
  const clubLogoElement = document.querySelector(
    ".data-header__box__club-link img"
  ) as HTMLImageElement;
  // clubLogoSources is one long string with one or more links. ex: "  link1, link2   "
  const clubLogoSources = clubLogoElement?.srcset;
  // so we have to trim it and return the first imageUrl
  const clubLogo = clubLogoSources?.split(",")[0].trim().split(" ")[0];
  return clubLogo;
};
