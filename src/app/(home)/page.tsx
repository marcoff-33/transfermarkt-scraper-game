import Link from "next/link";
import { Button } from "../_components/Buttons";
import InfoCard from "../_components/InfoCard";
import { fetchPlayerFifaStats } from "../_utils/dataScrapeUtils/api-fetches";

export default async function Home() {
  return (
    <div className="w-full h-full justify-start z-50 text-text-primary">
      <div className="">
        <div className="gap-2 min-h-[90vh] min-w-fit flex flex-col justify-center relative bg-background-deep">
          <div className="w-full h-full absolute grainybg"></div>
          <div className="self-center z-50 container">
            <h1 className="md:text-7xl text-4xl font-bold text-text-primary lg:font-extrabold md:tracking-wide tracking-normal md:leading-tight text-left py-2 md:text-center">Football Games with TransferMarkt data</h1>
            <p className="text-lg font-md py-2 text-text-secondary md:text-center md:tracking-wide tracking-tight">Build the best possible formation within the selected budget or try out the Player 1v1 Quiz.</p>
          </div>
          <div className=" gap-5  flex flex-col self-center">
            <div className="gap-5 flex flex-row py-5 self-center ">
              <Button variant={"default"} className="font-semibold z-50" size={"lg"} asChild>
                <Link href={"/teams"} className="text-xl">
                  Team Builder
                </Link>
              </Button>
              <Button variant={"secondary"} className="z-50" size={"lg"} asChild>
                <Link href={"/quiz"} className="text-xl">
                  Quiz
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-8 bg-background-bright"></div>
      <div className=" justify-between gap-10 w-full relative h-full shadow-lg shadow-primary py-20">
        <div className="w-full h-full grainybg -z-50"></div>
        <div className="container">
          <div className="md:text-center flex flex-col gap-24 text-start">
            <div className="text-6xl font-bold flex flex-col gap-5 max-w-[75%] self-center">
              <h2 className="">128 Players</h2>
              <p className="text-lg text-text-secondary font-medium">Hand-picked for the most balanced gameplay experience</p>
            </div>

            <div className="text-6xl font-bold flex flex-col gap-5 max-w-[75%] self-center">
              <h2>Up to Date Transfer Values</h2>
              <p className="text-lg text-text-secondary font-medium">
                Transfer values are taken from each player’s Transfermarkt Page. You can learn how values are calculated and updated{" "}
                <a target="blank" href="https://www.transfermarkt.co.in/transfermarkt-market-value-explained-how-is-it-determined-/view/news/385100" className="text-accent text-lg">
                  here
                </a>
              </p>
            </div>
            <div className="text-6xl font-bold flex flex-col gap-5 max-w-[75%] self-center">
              <h2 className="">FC25 Stats</h2>
              <p className="text-lg text-text-secondary font-medium">Stats and ratings may not update throughout the course of a season from FC25’s API, they only reflect the player’s stats around September of the current season.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
