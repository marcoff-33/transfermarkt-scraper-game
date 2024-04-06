import AccordionFaq from "../components/AccordionFaq";
import { Button } from "../components/Buttons";
import InfoCard from "../components/InfoCard";

export default async function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-start gap-2 z-50 text-text-primary">
      <div className="-z-50">
        <div className="flex justify-between flex-col gap-5 pt-20 container">
          <div className=" ">
            <h1 className="text-4xl font-bold text-text-primary lg:font-extrabold md:tracking-tight tracking-wide text-left py-2 lg:text-center">
              Team Builder / Quiz games built with{" "}
              <a
                className="text-primary hover:text-primary/90 transition-colors duration-200"
                target="_blank"
                href={"https://www.transfermarkt.com/"}
              >
                TransferMarkt{" "}
              </a>
              <p>
                data <span className="text-primary">.</span>
              </p>
            </h1>
            <div className="text-lg text-text-secondary font-md py-2 text-text-primary/80">
              Pick Your formation and build the best possible Squad within the
              selected budget limit or test Your football knowledge with the
              Player Comparison 1v1 Quiz.
            </div>
          </div>
          <div className=" gap-5  flex flex-col self-center">
            <div className="gap-5 flex flex-row py-5 self-center">
              <Button variant={"default"} className="font-semibold">
                Start Building
              </Button>
              <Button variant={"secondary"} className="">
                Quiz Game
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:flex-row flex-col justify-between gap-10 container bg-background">
        <div className="grow pb-2 order-2 lg:order-2">
          <AccordionFaq />
        </div>
        <div className="block order-1 lg:order-2 self-center">
          <InfoCard />
        </div>
      </div>
    </div>
  );
}
