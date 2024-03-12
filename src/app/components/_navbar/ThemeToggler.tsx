"use client";

import React from "react";
import { RxMoon } from "react-icons/rx";
import { MdOutlineWbSunny } from "react-icons/md";
import { useTheme } from "next-themes";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="outline outline-1 p-1 px-2 outline-background-20 rounded-lg hidden sm:block"
    >
      {theme == "light" ? (
        <RxMoon className="" size={20} />
      ) : (
        <MdOutlineWbSunny className="" size={20} />
      )}
    </button>
  );
}
