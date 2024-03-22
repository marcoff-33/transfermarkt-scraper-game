import React from "react";
import ThemeToggler from "../_navbar/ThemeToggler";
import Link from "next/link";
import { GiSoccerKick } from "react-icons/gi";
import { FaGithub } from "react-icons/fa";
import PlayBar from "../_navbar/PlayBar";
import { GrMoney } from "react-icons/gr";

export default function GameNavbar({
  rerolls,
  budget,
}: {
  rerolls: number;
  budget: number;
}) {
  const dots = [1, 2, 3, 4, 5];

  return (
    <div className="w-full bg-background/50 backdrop-blur-md top-0 sticky z-[1000] text-text-950 font-semibold py-3 transition-colors duration-500 border-b border-front">
      <div className="container flex flex-row justify-between">
        <Link
          className="flex flex-row justify-center text-center gap-2"
          href={"/"}
        >
          <GiSoccerKick className="self-center text-accent" size={25} />

          <div className="text-lg hidden md:block self-center text-text-primary">
            Team Builder
          </div>
        </Link>
        <div className="text-center flex items-center gap-2 bg-background-mid px-3 rounded-lg shadow-md">
          <p className="hidden md:block">Rerolls : </p>
          {dots.map((dot, index) => (
            <div
              className={`transition-colors ${
                index < rerolls ? "text-primary" : "text-background-front"
              }`}
            >
              <p
                style={
                  index < rerolls ? { textShadow: "0px 0px 5px orange" } : {}
                }
              >
                •
              </p>
            </div>
          ))}
        </div>

        <div className="text-center items-center flex bg-background-mid px-5 py-[0.12rem] rounded-lg shadow-md">
          <GrMoney className="text-primary mx-2" size={30} /> :{" "}
          {budget / 1000000}m €{" "}
        </div>
        <div className="flex flex-row gap-5 ">
          <a
            target="_blank"
            className="flex flex-row gap-1"
            href={"https://github.com/marcoff-33/transfermarkt-scraper-game"}
          >
            <FaGithub
              className="self-center hidden sm:block text-text-primary"
              size={25}
            />
          </a>
          <ThemeToggler />
        </div>
      </div>
    </div>
  );
}
