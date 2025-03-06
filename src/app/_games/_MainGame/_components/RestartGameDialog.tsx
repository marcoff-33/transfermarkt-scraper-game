import React from "react";
import { LuRefreshCw } from "react-icons/lu";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_ui/alert-dialog";
import { GameState } from "../MainGame";

export default function AlertDialogButton({ restartGame, gameState }: { restartGame: () => void; gameState: GameState }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={`text-danger text-center items-center flex bg-background-mid p-2 rounded-lg shadow-md transition-all duration-1000 delay-1000 ${gameState == "initial" ? "text-transparent bg-transparent shadow-transparent cursor-default" : "shadow-black"} `}>
        <LuRefreshCw className="min-h-full" size={25} />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[90%] p-5">
        <AlertDialogHeader>
          <AlertDialogTitle>Restart the current game?</AlertDialogTitle>
          <AlertDialogDescription>You will be able to select a new formation & budget with a new set of Players.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => restartGame()} className="bg-primary text-primary-foreground">
            Restart
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
