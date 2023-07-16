import { ECS } from "../state";
import { useEffect } from "react";
import { getLogger } from "lib/logging";
import { setTypedCharacters } from "../entities/Player";
import { spawnEnemy } from "../actions";

const log = getLogger(__filename);

const players = ECS.world.with("typedCharacters");

export function KeyboardSystem() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const player = players.first;
      if (!player) return;
      const currentChars = player.typedCharacters;

      if (e.key.length === 1) {
        setTypedCharacters(currentChars + e.key);
      } else if (e.key === "Backspace") {
        setTypedCharacters(currentChars.slice(0, -1));
      } else if (e.key === "Enter") {
        const targetWord = currentChars;
        setTypedCharacters("");

        if (targetWord[0] === "/") {
          handleCommand(targetWord);
        }

        return;
      }

      log.trace("typedCharacters: ", player.typedCharacters);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null;
}

function handleCommand(cmd: string) {
  switch (cmd) {
    case "/spawn": {
      spawnEnemy("magoo");
      break;
    }

    default: {
      log.warn("Unknown command: ", cmd);
    }
  }
}
