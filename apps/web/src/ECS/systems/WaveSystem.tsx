import { useEntities } from "miniplex-react";
import { ECS } from "..";
import { useFrame } from "@react-three/fiber";
import { spawnEnemy } from "../actions";
import { generateWord } from "@/utils";
import { useStore } from "@/state";

const withTargetWord = ECS.world.with("targetWord");

export function WaveSystem() {
  const enemies = useEntities(withTargetWord);
  const startWave = useStore(state => state.wave.startWave);
  const finishWave = useStore(state => state.wave.finishWave);
  const endTime = useStore(state => state.wave.endTime);
  const phase = useStore(state => state.wave.phase);
  const timeBetweenWaves = useStore(state => state.wave.timeBetweenWaves);
  const getNumEnemies = useStore(state => state.wave.getNumEnemies);

  useFrame(() => {
    if (enemies.size <= 0) {
      if (endTime != undefined && phase === "preparing") {
        const timeForNextWave = endTime + timeBetweenWaves - performance.now();
        if (timeForNextWave <= 0) {
          startWave();
          const newEnemyCount = getNumEnemies();

          for (let i = 0; i < newEnemyCount; i++) {
            const word = generateWord();

            spawnEnemy({ targetWord: word, staggerBy: i * 1500, spawnedAt: performance.now() });
          }
        }
      } else if (phase === "wave") {
        finishWave();
      }
    }
  });

  return null;
}
