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

// turns a playerValue string(ex: "$40.00m / $300k") to a full unabbreviated Number
export function convertValueStringToNumber(playerValue: string) {
  const multipliers: { [key: string]: number } = { k: 1000, m: 1000000 };
  const unit = playerValue.slice(-1);
  const value = parseFloat(playerValue.substring(1, playerValue.length - 1));

  return value * multipliers[unit];
}
