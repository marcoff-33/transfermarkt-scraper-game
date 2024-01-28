import { playerGameState } from "../types/playerData";
// this is the clean sheet game state used in "MainGame" component.
// the positions are used by the "Pitch.tsx" component when passed as props to map over and
// render each player's icon and name on the pitch.
const gameState: playerGameState[] = [
  {
    role: "RB",
    position: "top-[31rem] left-[24.5rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "LCB",
    position: "top-[33rem] left-[10rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "RCB",
    position: "top-[33rem] left-[17rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "LB",
    position: "top-[31rem] left-10",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "LCM",
    position: "top-[20rem] left-[7rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "RCM",
    position: "top-[20rem] left-[20rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "DMF",
    position: "top-[25rem] left-[13.5rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "CF",
    position: "top-[5rem] left-[13.5rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "LWF",
    position: "top-[10rem] left-[4rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "RWF",
    position: "top-[10rem] left-[23rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
  {
    role: "GK",
    position: "top-[41rem] left-[13.5rem]",
    playerName: "",
    url: "https://placehold.co/80x70/png?text=?",
  },
];

export default gameState;
