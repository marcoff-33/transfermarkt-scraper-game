import React from "react";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import { GiSoccerKick } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import PlayBar from "./PlayBar";

export default function Navbar() {
  return (
    <div className="w-full bg-background-50/50 backdrop-blur-md top-0 sticky z-[1000] text-text-950 font-semibold py-3 transition-colors duration-500 border-b border-background-200">
      <div className="container flex flex-row justify-between">
        <Link
          className="flex flex-row justify-center text-center gap-2"
          href={"/"}
        >
          <GiSoccerKick className="self-center" size={25} />

          <div className="text-lg hidden md:block self-center">
            Team Builder
          </div>
        </Link>
        <div className="flex flex-row gap-5">
          <div className="">
            <PlayBar />
          </div>
        </div>
        <div className="flex flex-row gap-5 ">
          <div className="hidden md:block self-center">About</div>
          <a
            target="_blank"
            className="flex flex-row gap-1"
            href={"https://github.com/marcoff-33/transfermarkt-scraper-game"}
          >
            <FaGithub className="self-center hidden sm:block" size={25} />
          </a>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
