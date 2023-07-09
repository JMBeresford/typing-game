"use client";

import { useEntities } from "miniplex/react";
import {} from "miniplex";
import { ECS } from "..";
import { isWave } from "../entities/Wave";
import { isEnemy, spawnEnemy } from "../entities/Enemies";
import { useFrame } from "@lib/r3f";
import { getLogger } from "@lib/logging";

const log = getLogger(__filename);

export function WaveSystem() {
  const wave = useEntities(ECS.world.archetype(isWave)).first;
  const enemies = useEntities(ECS.world.archetype(isEnemy));

  useFrame(() => {
    if (!wave) return;

    if (enemies.size <= 0) {
      const nextWave = wave.wave + 1;
      const newEnemyCount = Math.floor(nextWave * 1.5);

      log.debug("nextWave: ", nextWave, "newEnemyCount: ", newEnemyCount);

      ECS.world.removeComponent(wave, "wave");
      ECS.world.addComponent(wave, "wave", nextWave);

      for (let i = 0; i < newEnemyCount; i++) {
        spawnEnemy({ targetWord: `${Math.floor(Math.random() * 100)}`, index: i });
      }
    }
  });

  return null;
}
