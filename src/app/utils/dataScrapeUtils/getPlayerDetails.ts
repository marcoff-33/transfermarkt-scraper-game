export type playerDetails = {
  playerFoot: string;
  playerHeight: string;
  playerCitizenship: string;
};

export const getPlayerDetails = (document: Document): playerDetails => {
  // function to scrape some details from the player data table on transfermarkt
  // the TableTitles variable is to select the various titles of each table row ex: "Height:"
  const allTableTitles = document.querySelectorAll(
    ".info-table__content.info-table__content--regular"
  );
  // the bold is the data in each title ex: "1.89m"
  const allTableData = document.querySelectorAll(
    ".info-table__content.info-table__content--bold"
  );

  const targetTitles = ["Foot:", "Height:", "Citizenship:"];

  let playerFoot = "";
  let playerHeight = "";
  let playerCitizenship = "";

  targetTitles.forEach((label) => {
    const index = Array.from(allTableTitles).findIndex(
      (element) => element.textContent === label
    );

    if (index !== -1 && allTableData[index].textContent) {
      let content = allTableData[index].textContent;
      if (label === "Citizenship:" && content) {
        content = content
          .split(",")
          .map((country) => country.trim())
          .join(", ");
      }

      switch (label) {
        case "Foot:":
          playerFoot = content || "";
          break;
        case "Height:":
          playerHeight = content || "";
          break;
        case "Citizenship:":
          playerCitizenship = content || "";
          break;
      }
    }
  });
  return {
    playerFoot: playerFoot,
    playerHeight: playerHeight,
    playerCitizenship: playerCitizenship,
  };
};
