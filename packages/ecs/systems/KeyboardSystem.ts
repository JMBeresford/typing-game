"use client";

import { ECS } from "..";
import { useEffect } from "react";
import { useEntities } from "miniplex/react";
import { getLogger } from "@lib/logging";
import { spawnEnemy } from "../entities/Enemies";

const log = getLogger(__filename);

export function KeyboardSystem() {
  const player = useEntities(ECS.world.archetype("isPlayer", "typedCharacters")).first;

  function shootEnemy(targetWord?: string) {
    const enemies = ECS.world.archetype("isEnemy", "targetWord", "shields");

    for (const enemy of enemies) {
      if (enemy.targetWord === targetWord) {
        log.debug("hit enemy: ", enemy);
        enemy.shields.current -= 1;
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!player) return;
      if (player.typedCharacters === null) player.typedCharacters = "";

      if (e.key.length === 1) {
        player.typedCharacters += e.key;
      } else if (e.key === "Backspace") {
        player.typedCharacters = player.typedCharacters.slice(0, -1);
      } else if (e.key === "Enter") {
        const targetWord = player.typedCharacters;
        player.typedCharacters = "";
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
