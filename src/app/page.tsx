import { Player } from "./types/playerData";
import { fetchPlayerData } from "./utils/fetchPlayerData";

export default async function Home() {
  const testdata: Player = await fetchPlayerData(182906);
  return (
    <div className="bg-red-500 flex flex-row justify-center max-w-fit">
      {testdata.name}
    </div>
  );
}
