import { Player } from "./types/playerData";
import { fetchPlayerData } from "./utils/fetchPlayerData";
import { testFetch } from "./utils/saGetPlayerData";

export default async function Home() {
  const testdata = await testFetch(341092);
  return (
    <div className="bg-red-500 flex flex-row justify-center max-w-fit">
      {testdata.name}
    </div>
  );
}
