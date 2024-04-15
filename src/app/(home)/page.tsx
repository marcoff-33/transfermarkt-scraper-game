import Link from "next/link";
import AccordionFaq from "../_components/AccordionFaq";
import { Button } from "../_components/Buttons";
import InfoCard from "../_components/InfoCard";

export default async function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-start gap-2 z-50 text-text-primary">
      <div className="-z-50">
        <div className="flex justify-between flex-col gap-5 pt-20 container">
          <div className=" ">
            <h1 className="text-4xl font-bold text-text-primary lg:font-extrabold md:tracking-tight tracking-wide text-left py-2 lg:text-center">
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
            <div className="text-lg text-text-secondary font-md py-2 text-text-primary/80">
              Pick Your formation and build the best possible Squad within the
              selected budget limit or test Your football knowledge with the
              Player Comparison 1v1 Quiz.
            </div>
          </div>
          <div className=" gap-5  flex flex-col self-center">
            <div className="gap-5 flex flex-row py-5 self-center">
              <Button variant={"default"} className="font-semibold" asChild>
                <Link href={"/teams"}>Start Building</Link>
              </Button>
              <Button variant={"secondary"} className="">
                <Link href={"/quiz"}>Quiz</Link>
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
