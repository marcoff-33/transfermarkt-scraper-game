import React, { useEffect } from "react";
import { GoDotFill } from "react-icons/go";
export default function CarouselPaginationDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex flex-row items-center justify-center h-1">
      {Array.from({ length: total }).map((dot, index) => (
        <GoDotFill className="transition-all pb-2 bg-background-deep rounded-full" size={current == index + 1 ? 20 : 12} key={index} />
      ))}
    </div>
  );
}
