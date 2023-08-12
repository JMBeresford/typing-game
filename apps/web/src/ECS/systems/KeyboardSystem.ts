import { ECS } from "..";
import { useEffect } from "react";
import { getLogger } from "logging";
import { setTypedCharacters, spawnEnemy } from "../actions";
import { useEntities } from "miniplex-react";

const log = getLogger(__filename);

const isPlayer = ECS.world.with("typedCharacters");

export function KeyboardSystem() {
  const players = useEntities(isPlayer);
  const player = players.first;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
  }, [player]);

  return null;
}

function handleCommand(cmd: string) {
  switch (cmd) {
    case "/spawn": {
      spawnEnemy({ targetWord: "magoo" });
      break;
    }

    default: {
      log.warn("Unknown command: ", cmd);
    }
  }
}
