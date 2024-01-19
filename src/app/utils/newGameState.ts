import { playerGameState } from "../types/playerData";
// this is the clean sheet game state used in "MainGame" component.
// the positions are used by the "Pitch.tsx" component when passed as props to map over and
// render each player's icon and name on the pitch.
const gameState: playerGameState[] = [
  {
    key: "RB",
    position: "top-[31rem] left-[24.5rem]",
    playerName: "",
    url: "",
  },
  {
    key: "LCB",
    position: "top-[33rem] left-[10rem]",
    playerName: "",
    url: "",
  },
  {
    key: "RCB",
    position: "top-[33rem] left-[17rem]",
    playerName: "",
    url: "",
  },
  { key: "LB", position: "top-[31rem] left-10", playerName: "", url: "" },
  {
    key: "LCM",
    position: "top-[20rem] left-[7rem]",
    playerName: "",
    url: "",
  },
  {
    key: "RCM",
    position: "top-[20rem] left-[20rem]",
    playerName: "",
    url: "",
  },
  {
    key: "DMF",
    position: "top-[25rem] left-[13.5rem]",
    playerName: "",
    url: "",
  },
  {
    key: "CF",
    position: "top-[5rem] left-[13.5rem]",
    playerName: "",
    url: "",
  },
  {
    key: "LWF",
    position: "top-[10rem] left-[4rem]",
    playerName: "",
    url: "",
  },
  {
    key: "RWF",
    position: "top-[10rem] left-[23rem]",
    playerName: "",
    url: "",
  },
  {
    key: "GK",
    position: "top-[41rem] left-[13.5rem]",
    playerName: "",
    url: "",
  },
];

export default gameState;
