import React from "react";
import Image from "next/image";
import pitchSvg from "@/app/public/pitch.svg";

//  /<img src={prova} alt="" className="rounded-lg" />
export default function Pitch({ prova }: { prova: string }) {
  return (
    <div className="self-center">
      <div className="relative">
        <Image alt="Pitch" src={pitchSvg} width={500} height={500} />
        {/* defense, RB*/}
        <div className="h-[80px] w-[70px] z-50 absolute top-[31rem] left-[24.5rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* defense, Left CB*/}
        <div className="h-[80px] w-[70px] z-50 absolute top-[33rem] left-[10rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* defense, Right CB*/}
        <div className="h-[80px] w-[70px] z-50 absolute top-[33rem] left-[17rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* defense, LB*/}
        <div className="h-[80px] w-[70px] z-50 absolute top-[31rem] left-10">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* Midfielders, Left CM*/}
        <div className="h-[80px] w-[70px] z-50 absolute top-[20rem] left-[7rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* Midfielders, Right CM*/}
        <div className="h-[80px] w-[70px] bg-white z-50 absolute top-[20rem] left-[20rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* Midfielders, DMF*/}
        <div className="h-[80px] w-[70px] bg-blue-500 z-50 absolute top-[25rem] left-[13.5rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* Attackers, CF*/}
        <div className="h-[80px] w-[70px] bg-black z-50 absolute top-[5rem] left-[13.5rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* Attackers, LWF*/}
        <div className="h-[80px] w-[70px] bg-green-200 z-50 absolute top-[10rem] left-[4rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* Attackers, RWF*/}
        <div className="h-[80px] w-[70px] bg-black z-50 absolute top-[10rem] left-[23rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
        {/* Goalkeeper */}
        <div className="h-[80px] w-[70px] bg-black z-50 absolute top-[41rem] left-[13.5rem]">
          <Image
            alt="test"
            src={prova}
            fill
            className="border border-black rounded-md shadow-xl shadow-zinc-900"
          />
        </div>
      </div>
    </div>
  );
}
