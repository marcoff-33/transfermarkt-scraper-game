"use client";
import { TeamComp } from "@/app/types/playerDb";
import React from "react";
import PlayerCard from "../PlayerCard";

export default function SelectPlayer({
  ids,
  round,
}: {
  ids: number[];
  round: number;
}) {
  return (
    <div className="flex flex-row">
      {ids.map((id) => (
        <PlayerCard playerId={id} />
      ))}
    </div>
  );
}
