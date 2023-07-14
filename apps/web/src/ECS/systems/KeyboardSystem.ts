import { ECS } from "../state";
import { useEffect } from "react";
import { getLogger } from "@lib/logging";
import { spawnEnemy } from "../entities/Enemies";
import { setTypedCharacters } from "../entities/Player";

const log = getLogger(__filename);

const enemies = ECS.world.with("targetWord");
const players = ECS.world.with("typedCharacters");

function shootEnemy(targetWord?: string) {
  log.trace("Shot at: ", targetWord);
  for (const enemy of enemies) {
    if (enemy.targetWord === targetWord) {
      log.debug("hit enemy: ", enemy);
      const shields = { ...enemy.shields };
      shields.current -= 1;
      ECS.world.removeComponent(enemy, "shields");
      ECS.world.addComponent(enemy, "shields", shields);
    }
  }
}

export function KeyboardSystem() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const player = players.first;
      if (!player) return;
      if (player.typedCharacters === null) player.typedCharacters = "";

      if (e.key.length === 1) {
        setTypedCharacters(player.typedCharacters + e.key);
      } else if (e.key === "Backspace") {
        setTypedCharacters(player.typedCharacters.slice(0, -1));
      } else if (e.key === "Enter") {
        const targetWord = player.typedCharacters;
        setTypedCharacters("");
        shootEnemy(targetWord);
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
