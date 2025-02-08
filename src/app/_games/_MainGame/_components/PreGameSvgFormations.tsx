import React from "react";
import { Formation } from "../MainGame";
import { cp } from "fs";

// currentFormation is the currently selected formation from parent's state
export default function PreGameSvgFormations({ formation, currentFormation }: { formation: Formation; currentFormation: Formation }) {
  const color = formation === currentFormation ? "black" : "white";
  const patternId = `pppixelate-pattern-${formation}`; // unique pattern to avoid caching issues

  return (
    <div className={`md:w-[150px] md:h-[150px] h-[80px] w-[80px] md:rotate-0`}>
      {formation == "352" ? (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.5.1.5" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shapeRendering="crispEdges">
              <rect width="1.5" height="1.5" x="9" y="5" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="11" y="5" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="6" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="8" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="12" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="14" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="10" y="10" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="8" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="10" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="12" y="13" fill={color} rx="5" ry="5"></rect>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`}></rect>
        </svg>
      ) : formation == "433" ? (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.5.1.5" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shapeRendering="crispEdges">
              <rect width="1.5" height="1.5" x="7" y="5" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="10" y="5" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="13" y="5" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="8" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="12" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="10" y="10" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="7" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="9" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="11" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="13" y="13" fill={color} rx="5" ry="5"></rect>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`}></rect>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" version="1.5.1.5" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={patternId} width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="translate(0 0) scale(40) rotate(0)" shapeRendering="crispEdges">
              <rect width="1.5" height="1.5" x="9" y="5" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="11" y="5" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="10" y="8" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="8" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="12" y="9" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="10" y="10" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="7" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="9" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="11" y="13" fill={color} rx="5" ry="5"></rect>
              <rect width="1.5" height="1.5" x="13" y="13" fill={color} rx="5" ry="5"></rect>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`}></rect>
        </svg>
      )}
    </div>
  );
}
