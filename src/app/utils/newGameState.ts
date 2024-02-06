import { playerGameState } from "../types/playerData";
// this is the clean sheet game state used in "MainGame" component.
// the positions are used by the "Pitch.tsx" component when passed as props to map over and
// render each player's icon and name in the correct position on the pitch.
const gameState: playerGameState[] = [
  {
    role: "RB",
    playerRow: 5,
    playerCol: 7,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "RCB",
    playerRow: 5,
    playerCol: 5,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LCB",
    playerRow: 5,
    playerCol: 3,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LB",
    playerRow: 5,
    playerCol: 1,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "RCM",
    playerRow: 3,
    playerCol: 5,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "DMF",
    playerRow: 4,
    playerCol: 4,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LCM",
    playerRow: 3,
    playerCol: 3,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "RWF",
    playerRow: 2,
    playerCol: 6,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "CF",
    playerRow: 2,
    playerCol: 4,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "LWF",
    playerRow: 2,
    playerCol: 2,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
  {
    role: "GK",
    playerRow: 6,
    playerCol: 4,
    playerName: "",
    profileImgUrl: "https://placehold.co/80x70/png?text=?",
    playerValue: 0,
  },
];

export default gameState;
