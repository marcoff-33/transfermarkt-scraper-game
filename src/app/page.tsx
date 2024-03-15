import AccordionFaq from "./components/AccordionFaq";
import { Button } from "./components/Buttons";
import InfoCard from "./components/InfoCard";

export default async function Home() {
  return (
    <div className="w-full h-screen container flex flex-col justify-start py-10 gap-20">
      <div className="flex lg:flex-row justify-between flex-col gap-10 border-b border-background-300 py-10">
        <div className="">
          <h1 className="text-4xl font-bold text-text-900 lg:font-extrabold md:tracking-tight tracking-wide text-left py-2">
            Team Builder / Quiz games built with{" "}
            <a
              className="text-accent-600"
              target="_blank"
              href={"https://www.transfermarkt.com/"}
            >
              TransferMarkt{" "}
            </a>
            data.
          </h1>
          <div className="text-lg text-text-700 font-light py-2">
            Pick Your formation and build the best possible Squad within the
            selected budget limit or test Your football knowledge with the
            Player Comparison 1v1 Quiz.
          </div>
          <div className="gap-5 flex flex-row py-5">
            <Button variant={"default"} className="font-semibold">
              Start Building
            </Button>
            <Button variant={"secondary"} className="">
              Quiz Game
            </Button>
          </div>
        </div>
        <div className=" gap-5  flex flex-row md:flex-col self-center">
          <InfoCard />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-10">
        <div className=" hidden lg:block self-start">
          <InfoCard />
        </div>

        <div className="lg:basis-1/2 grow ">
          <AccordionFaq />
        </div>
      </div>
    </div>
  );
}
