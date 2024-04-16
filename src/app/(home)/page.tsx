import Link from "next/link";
import { Button } from "../_components/Buttons";
import InfoCard from "../_components/InfoCard";

export default async function Home() {
  return (
    <div className="w-full h-screen justify-start z-50 text-text-primary">
      <div className="">
        <div className="gap-2 min-h-[90vh] min-w-fit flex flex-col justify-center relative dark:bg-dot-primaryhexdark/[0.2] bg-dot-primaryhexlight/[0.5]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gradient-to-b from-background-deep via-transparent to-background-mid"></div>
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-gradient-to-l from-background-deep via-transparent to-background-deep"></div>
          <div className="self-center z-50 container">
            <h1 className="text-4xl font-bold text-text-primary lg:font-extrabold md:tracking-tight tracking-wide text-left py-2 md:text-center">
              Team Builder / Quiz games built with{" "}
              <Button
                variant={"link"}
                asChild
                className="text-4xl font-bold px-0"
              >
                <a
                  className=""
                  target="_blank"
                  href={"https://www.transfermarkt.com/"}
                >
                  TransferMarkt{" "}
                </a>
              </Button>
              <p>
                data <span className="text-primary">.</span>
              </p>
            </h1>
            <p className="text-lg font-md py-2 text-text-primary/80 md:text-center">
              Choose a formation and build the best possible Squad within the
              selected budget limit or test Your football player knowledge with
              the Player 1v1 Quiz.
            </p>
          </div>
          <div className=" gap-5  flex flex-col self-center">
            <div className="gap-5 flex flex-row py-5 self-center ">
              <Button
                variant={"default"}
                className="font-semibold z-50"
                asChild
              >
                <Link href={"/teams"}>Start Building</Link>
              </Button>
              <Button variant={"secondary"} className="z-50">
                <Link href={"/quiz"}>Quiz</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" justify-between gap-10 w-full relative bg-background-mid bg-gradient-to-r from-background-deep via-background-mid to-background-deep shadow-lg shadow-primary">
        <div className="container py-10 flex justify-center flex-col">
          <h1 className=" border-b border-primary py-1 relative text-3xl font-semibold md:self-center text-text-primary z-50 md:text-center tracking-tighter">
            The Players & The Stats.
          </h1>
          <div className="flex flex-row md:justify-evenly py-10 gap-2">
            <div className="grow md:grow-0 text-text-primary/80 font-light items-center md:basis-1/2 flex flex-col gap-5 justify-center ">
              <p className="">
                The pool of players is pre-selected to ensure a more balanced
                Game, most of the Data is taken directly from the Player's
                Transfermarkt page.
              </p>{" "}
              Some Data, for example the Player's Hero and Profile Images, Is
              fetched using Transfermarkt unlisted API's
            </div>

            <div className="md:block hidden">
              <InfoCard />
            </div>
          </div>
        </div>
      </div>
      <div className=" justify-between gap-10 w-full relative bg-background-deep shadow-lg shadow-primary">
        <div className="container py-10 flex justify-center flex-col ">
          <h1 className=" border-b border-primary py-1 relative text-3xl font-semibold md:self-center text-text-primary z-50 md:text-center tracking-tighter">
            Transfer Market Values.
          </h1>
          <div className="grow md:grow-0 text-text-primary/80 font-light items-center md:basis-1/2 flex flex-col gap-10 justify-center py-10 ">
            <div className="flex flex-col gap-2">
              <p className="py-5 text-lg font-semibold">
                Transfermarkt updates player market values twice a season for
                most leagues:
              </p>
              <ul className="list-disc px-10">
                <li className="">
                  <strong className="text-lg text-primary">
                    At the end of the season:
                  </strong>{" "}
                  This is a major update that reflects the entire season's
                  performance.
                </li>
                <li className="">
                  <strong className="text-lg text-primary">
                    During the season:
                  </strong>{" "}
                  An update happens when there's been enough games played to
                  justify adjustments in the market.
                </li>
              </ul>
              <p className=" py-5 text-lg font-semibold">
                They also conduct intermediary updates throughout the season,
                especially for:
              </p>
              <ul className="list-disc px-10">
                <li className="">
                  <strong className="text-lg text-primary">
                    Young players:
                  </strong>{" "}
                  To account for increased playing time or breakouts.
                </li>
                <li className="">
                  <strong className="text-lg text-primary">
                    New signings:
                  </strong>{" "}
                  To reflect the transfer fee paid and adjust for the new
                  league.
                </li>
              </ul>
            </div>
            <p className="border-t border-primary py-10">
              More details on how TransferMarkt calculates a Player's Market
              Value can be found{" "}
              <a
                className="underline text-primary"
                target="_blank"
                href="https://www.transfermarkt.co.in/transfermarkt-market-value-explained-how-is-it-determined-/view/news/385100"
              >
                here.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
