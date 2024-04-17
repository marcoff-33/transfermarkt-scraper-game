"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_ui/popover";
import Link from "next/link";
import { PopoverClose } from "@radix-ui/react-popover";
export default function Play() {
  const pathname = usePathname();
  const [pressed, setPressed] = useState(false);

  return (
    <div className="">
      <Popover>
        <PopoverTrigger
          className={`outline outline-1 rounded-full transition-all duration-200 px-8 relative py-1 border-[1px]     ${
            pressed
              ? "border-black/50 shadow-[0_0px_3px_0px_rgba(250,250,250,0.3)] shadow-black bg-primary/80 outline-primary text-primary-foreground/80"
              : "border-primary/10 shadow-[0_0px_5px_1px_rgba(250,250,250,0.3)] shadow-black bg-primary outline-primary/10 text-primary-foreground"
          }`}
          onClick={() => setPressed(!pressed)}
        >
          Play
        </PopoverTrigger>
        <PopoverContent
          className="z-[1000] bg-background-front backdrop-blur-md relative flex p-1 w-[400px] border-background-front h-[100px]"
          onCloseAutoFocus={() => setPressed(false)}
        >
          <div className="bg-background-front grow flex flex-row gap-1 justify-between">
            <PopoverClose asChild onClick={() => setPressed(false)}>
              <Link
                className={`no-highlight grow basis-1/2 relative grayscale transition-all duration-500 group border border-primary rounded-lg ${
                  pathname == "/teams"
                    ? "opacity-20 pointer-events-none"
                    : "hover:grayscale-0"
                }`}
                href={"/teams"}
              >
                <div className="w-full h-full text-center absolute flex justify-center items-center flex-col gap-5 ">
                  <div className="backdrop-blur-sm px-5 font-semibold rounded-full text-text-primary group-hover:text-primary transition-colors duration-200 flex">
                    Team Builder
                  </div>
                </div>
              </Link>
            </PopoverClose>
            <PopoverClose asChild>
              <Link
                href={"/quiz"}
                className={`no-highlight grow basis-1/2 relative grayscale transition-all duration-500 group border border-primary rounded-lg ${
                  pathname == "/quiz"
                    ? "opacity-20 pointer-events-none"
                    : "hover:grayscale-0"
                }`}
              >
                <div className="w-full h-full text-center absolute flex justify-center items-center flex-col gap-5 ">
                  <div className="backdrop-blur-sm px-5 font-semibold rounded-full text-text-primary group-hover:text-primary transition-colors duration-200 flex">
                    Quiz
                  </div>
                </div>
              </Link>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
