import React from "react";
import { LuRefreshCw } from "react-icons/lu";
import { GameState } from "./games/MainGame";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AlertDialogButton({
  restartGame,
  gameState,
}: {
  restartGame: () => void;
  gameState: GameState;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`text-primary  text-center items-center flex bg-background-mid p-2 rounded-lg shadow-md transition-all duration-1000 delay-1000 ${
          gameState == "initial"
            ? "text-transparent bg-transparent shadow-transparent cursor-default"
            : "shadow-primary"
        } `}
      >
        <LuRefreshCw className="min-h-full" size={25} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will start a new game with none of the currently drawn or
            selected players
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => restartGame()}
            className="bg-danger hover:bg-danger/80"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
