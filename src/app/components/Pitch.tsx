import React from "react";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";

export default function Pitch() {
  return (
    <div>
      <Image alt="Pitch" src={pitchSvg} width={500} height={500} />
    </div>
  );
}
