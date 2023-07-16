import { useEntities } from "miniplex-react";
import { ECS } from "../state";
import { getLogger } from "lib/logging";
import { useFrame } from "@react-three/fiber";
import { spawnEnemy } from "../actions";
import { generateWord } from "@/utils";

const log = getLogger(__filename);

const withTargetWord = ECS.world.with("targetWord");
const withWave = ECS.world.with("wave");

export function WaveSystem() {
  const enemies = useEntities(withTargetWord);
  const waveEntity = useEntities(withWave).first;

  useFrame(() => {
    if (!waveEntity) return;
    if (enemies.size <= 0) {
      const { wave } = waveEntity;
      const nextWave = wave + 1;
      const newEnemyCount = Math.floor(nextWave * 1.5);

      log.debug(`Wave ${wave} complete`);
      log.debug(`Spawning ${newEnemyCount} enemies for wave ${nextWave}`);

      ECS.world.removeComponent(waveEntity, "wave");
      ECS.world.addComponent(waveEntity, "wave", nextWave);

      for (let i = 0; i < newEnemyCount; i++) {
        const word = generateWord();
        spawnEnemy(word);
      }
    }
  });

  return null;
}
