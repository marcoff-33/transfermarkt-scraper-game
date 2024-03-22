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
      className="outline outline-1 p-1 px-2 outline-background-front rounded-lg "
    >
      {theme == "light" ? (
        <RxMoon className="text-text-primary" size={20} />
      ) : (
        <MdOutlineWbSunny className="text-text-primary" size={20} />
      )}
    </button>
  );
}
