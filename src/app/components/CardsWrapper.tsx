import React from "react";

export default function CardsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row justify-around w-full sm:py-2 z-50 backdrop-blur-sm bottom-5 self-center fixed container h-[200px] md:h-[200px] md:gap-20 gap-5">
      <div className="text-white">R(3)</div>
      {children}
      <div className="text-white">X</div>
    </div>
  );
}
