export const getPlayerValue = (document: Document) => {
  // getting the market value. ex: "€50.00m Last update: Dec 20, 2023"
  const MarketValueString = document
    .querySelector(".data-header__market-value-wrapper")
    ?.textContent?.replace(/\s+/g, " ");
  // trimmed example : "€90.00m"
  const playerValue = trimMarketValueString(MarketValueString || "000");
  return playerValue;
};

function trimMarketValueString(MarketValueString: string) {
  const parts = MarketValueString.split("Last update: ");

  return parts[0].trim();
}
