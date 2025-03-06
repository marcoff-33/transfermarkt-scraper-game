import React, { use, useState } from "react";
import { PlayersDb, Role } from "../../../../_types/playerDb";

import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { GiRollingDices } from "react-icons/gi";
import { Carousel, CarouselContent } from "@/app/_ui/carousel";

export default function CardsWrapper({ children, rerollPlayers, currentRole, availableRerolls, playersDb, allowRerolls }: { children: React.ReactNode; rerollPlayers: (role: Role, playersDb: PlayersDb) => void; currentRole: Role; availableRerolls: number; playersDb: PlayersDb; allowRerolls: boolean }) {
  const [minimized, setMinimized] = useState(false);

  return (
    <div className="px-2 fixed bottom-2 self-center container mb-2">
      {!minimized ? (
        <div className={`flex flex-row justify-around min-w-fit sm:py-2 z-50 bottom-5 self-center h-[150px] md:h-[200px] md:gap-5 gap-2`}>
          <button onClick={() => rerollPlayers(currentRole, playersDb)} className="text-white flex" disabled={!allowRerolls}>
            <GiRollingDices className={`absolute top-0 -translate-y-[120%] translate-x-5 bg-background-mid shadow-md rounded-md transition-colors duration-500 delay-200 ${allowRerolls ? "text-primary" : "text-danger"}`} size={35} />
          </button>

          {children}

          <button className="text-white flex flex-col" onClick={() => setMinimized(true)}>
            <BiSolidHide className="text-primary md:mx-3 bg-background-mid shadow-md rounded-md absolute top-0 right-0 -translate-y-[120%] -translate-x-5" size={35} />
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-end w-full sm:py-2 z-50 bottom-5 self-center h-[30px] sm:h-[30px] md:gap-5 gap-2 relative">
          <button onClick={() => setMinimized(false)} className="items-center flex justify-end mx-3 animate-pulse">
            <BiSolidShow className="text-primary bg-background-mid rounded-md absolute top-0 -translate-y-[120%] -translate-x-5" size={35} />
          </button>
        </div>
      )}
    </div>
  );
}
