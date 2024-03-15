import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionFaq() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Players</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <p>
            All players available are pre-selected manually to ensure a more
            balanced Game.
          </p>
          <p>
            Most players are selected from the top 3-4 teams per League, with a
            heavy bias towards the Premier League and Serie A.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Data</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <p>
            Most player data is taken directly from the Player's Transfermarkt
            public profile page, some Data is taken from Transfermarkt's
            unlisted API's
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Market Values</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <p>
            Transfermarkt updates the transfer values periodically, often on a
            seasonal basis or following major transfer windows. You can view the
            most recent update and more data by clicking on a player after
            selection on the pitch.
          </p>
          <p>
            More details on how TransferMarkt calculates a Player's Market Value
            can be found{" "}
            <a
              className="underline text-accent-400"
              target="_blank"
              href="https://www.transfermarkt.co.in/transfermarkt-market-value-explained-how-is-it-determined-/view/news/385100"
            >
              here
            </a>
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Scraping Policies</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-2 px-5">
          <p>
            Unfortunately, Transfermarkt doesn't explicitly outline scraping
            policies on their website. However, we use both delays and caching
            between requests to avoid overloading Transfermarkt's servers.
          </p>
          <p>
            All data is scraped only from publicly available pages on
            TransferMarkt
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
