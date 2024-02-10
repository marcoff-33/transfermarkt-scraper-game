export const getPLayerAge = (document: Document) => {
  const playerAgeElement = document.querySelector(
    ".info-table__content--bold a"
  );
  if (playerAgeElement && playerAgeElement.textContent) {
    return playerAgeElement.textContent.trim();
  }
  return "unknown";
};
