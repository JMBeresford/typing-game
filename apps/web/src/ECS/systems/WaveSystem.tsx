import { useEntities } from "miniplex-react";
import { ECS } from "../state";
import { spawnEnemy } from "../entities/Enemies";
import { getLogger } from "@lib/logging";
import { useFrame } from "@react-three/fiber";

const log = getLogger(__filename);

const withTargetWord = ECS.world.with("targetWord");
const withWave = ECS.world.with("wave");

export function WaveSystem() {
  const enemies = useEntities(withTargetWord);
  const waveEntity = useEntities(withWave).first;

  useFrame(() => {
    if (enemies.size <= 0) {
      const { wave } = waveEntity;
      const nextWave = wave + 1;
      const newEnemyCount = Math.floor(nextWave * 1.5);

      log.debug(`Wave ${wave} complete`);
      log.debug(`Spawning ${newEnemyCount} enemies for wave ${nextWave}`);

      ECS.world.removeComponent(waveEntity, "wave");
      ECS.world.addComponent(waveEntity, "wave", nextWave);

      for (let i = 0; i < newEnemyCount; i++) {
        spawnEnemy(`${Math.floor(Math.random() * 100)}`);
      }
    }
  });

  return null;
}
