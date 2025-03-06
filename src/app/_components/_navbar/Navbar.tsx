import React from "react";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";
import { GiSoccerKick } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import PlayBar from "./PlayBar";

export default function Navbar() {
  return (
    <div className="w-full bg-background-deep/10 backdrop-blur-lg top-0 sticky z-[1000] text-text-950 font-semibold py-4 transition-colors duration-500 border-b border-background-deep ">
      <div className="container flex flex-row justify-between relative">
        <Link className="flex flex-row justify-center text-center gap-2" href={"/"}>
          <GiSoccerKick className="self-center text-text-primary" size={25} />

          <div className="text-lg hidden md:block self-center text-text-primary">Team Builder</div>
        </Link>
        <div className="flex flex-row gap-5">
          <div className="absolute -translate-y-1 left-[50%] translate-x-[-50%]">
            <PlayBar />
          </div>
        </div>
        <div className="flex flex-row gap-5 ">
          <a target="_blank" className="flex flex-row gap-1" href={"https://github.com/marcoff-33/transfermarkt-scraper-game"}>
            <FaGithub className="self-center hidden sm:block text-text-primary" size={25} />
          </a>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
