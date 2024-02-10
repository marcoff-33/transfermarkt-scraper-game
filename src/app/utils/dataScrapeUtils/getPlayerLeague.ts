export const getPlayerLeague = (document: Document) => {
  const leagueElement = document.querySelector(".data-header__league-link");
  let playerLeague = "";
  if (leagueElement && leagueElement.textContent) {
    playerLeague = leagueElement.textContent.trim();
  }
  return playerLeague;
};
