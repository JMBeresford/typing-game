import { useEntities } from "miniplex-react";
import { ECS } from "../state";
import { getLogger } from "lib/logging";
import { useFrame } from "@react-three/fiber";
import { spawnEnemy } from "../actions";
import { generateWord } from "@/utils";
import { useStore } from "@/store";

const log = getLogger(__filename);

const withTargetWord = ECS.world.with("targetWord");

export function WaveSystem() {
  const { waveNumber } = useStore(state => state.wave);
  const enemies = useEntities(withTargetWord);

  useFrame(({ clock }) => {
    if (enemies.size <= 0) {
      const nextWave = waveNumber + 1;
      const newEnemyCount = Math.floor(nextWave * 1.5);

      log.debug(`Wave ${waveNumber} complete`);
      log.debug(`Spawning ${newEnemyCount} enemies for wave ${nextWave}`);

      useStore.setState({
        wave: { waveNumber: nextWave, startTime: clock.elapsedTime, numEnemies: newEnemyCount },
      });

      for (let i = 0; i < newEnemyCount; i++) {
        const word = generateWord();

        spawnEnemy({ targetWord: word, staggerBy: i * 0.5, spawnedAt: clock.elapsedTime });
      }
    }
  });

  return null;
}
