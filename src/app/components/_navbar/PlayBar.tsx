"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import imageOne from "@/app/public/menuImage1.jpg";
import imageTwo from "@/app/public/menuImage3.jpg";
import Link from "next/link";
import { PopoverClose } from "@radix-ui/react-popover";
export default function Play() {
  const pathname = usePathname();
  const [pressed, setPressed] = useState(false);

  return (
    <div className="">
      <Popover>
        <PopoverTrigger
          className={`outline outline-1 rounded-full transition-all duration-200 px-8 relative py-1 border-[1px] shadow-background-500  ${
            pressed
              ? "border-background-200 outline-background-50 bg-background-50 shadow-[0_0px_3px_0px_rgba(250,250,250,0.3)] shadow-background-200 text-text-500 "
              : "border-background-50 outline-background-50 bg-background-100 shadow-[0_3px_8px_1px_rgba(250,250,250,0.3)] shadow-background-400 text-text-900 "
          }`}
          onClick={() => setPressed(!pressed)}
        >
          Play
        </PopoverTrigger>
        <PopoverContent
          className="z-[1000] bg-background-100 min-h-[25rem] relative flex p-1 sm:w-[50vw] w-[80vw] max-h-[70vh]"
          onCloseAutoFocus={() => setPressed(false)}
        >
          <div className="bg-background-100 grow flex flex-row gap-1 justify-between">
            <PopoverClose asChild onClick={() => setPressed(false)}>
              <Link
                className="grow bg-blue-500 basis-1/2 relative grayscale hover:grayscale-0 transition-all duration-500 group "
                href={"/play"}
              >
                <Image
                  alt="Team Builder"
                  src={imageTwo}
                  fill
                  objectFit="cover"
                  objectPosition="center"
                  className=""
                />
                <div className="w-full h-full text-center absolute flex justify-center items-center">
                  <div className="bg-black/60 backdrop-blur-sm px-5 font-semibold rounded-full shadow-md shadow-black text-zinc-400 group-hover:text-white transition-colors duration-200">
                    Team Builder
                  </div>
                </div>
              </Link>
            </PopoverClose>
            <PopoverClose asChild>
              <Link
                href={"/valuegame"}
                className="grow bg-blue-500 basis-1/2 relative grayscale hover:grayscale-0 transition-all duration-500 group"
              >
                <Image
                  alt="Team Builder"
                  src={imageOne}
                  fill
                  objectFit="cover"
                  objectPosition="end"
                  className=""
                />
                <div className="w-full h-full text-center absolute flex justify-center items-center">
                  <div className="bg-black/60 backdrop-blur-sm px-5 font-semibold rounded-full shadow-md shadow-black text-zinc-400 group-hover:text-white transition-colors duration-200">
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
