import { playerGameState } from "../types/playerData";
// this is the clean sheet game state used in "MainGame" component.
// the positions are used by the "Pitch.tsx" component when passed as props to map over and
// render each player's icon and name in the correct position on the pitch.
const gameState: playerGameState[] = [
  {
    role: "RB",
    position: "top-[31rem] left-[24.5rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LCB",
    position: "top-[33rem] left-[10rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "RCB",
    position: "top-[33rem] left-[17rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LB",
    position: "top-[31rem] left-10",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LCM",
    position: "top-[20rem] left-[7rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "RCM",
    position: "top-[20rem] left-[20rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "DMF",
    position: "top-[25rem] left-[13.5rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "CF",
    position: "top-[5rem] left-[13.5rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LWF",
    position: "top-[10rem] left-[4rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "RWF",
    position: "top-[10rem] left-[23rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "GK",
    position: "top-[41rem] left-[13.5rem]",
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
];

export default gameState;
