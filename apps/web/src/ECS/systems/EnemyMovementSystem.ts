import { useEntities } from "miniplex-react";
import { ECS } from "..";
import { useFrame } from "@react-three/fiber";
import { damp } from "three/src/math/MathUtils";
import { useMaxHeight } from "@/hooks/useMaxHeight";
import { useMaxWidth } from "@/hooks/useMaxWidth";
import { useStore } from "@/state";
import { useMemoComparison } from "@/hooks/useMemoComparison";

const isEnemy = ECS.world.with("targetWord", "transform", "spawnedAt");
const isPlayer = ECS.world.with("typedCharacters", "transform");

export function EnemyMovementSystem() {
  const enemies = useEntities(isEnemy);
  const player = useEntities(isPlayer).first;
  const { numEnemies } = useStore(state => state.wave);
  const maxHeight = useMaxHeight();
  const maxWidth = useMaxWidth();
  const lookAt = useMemoComparison(
    () => player?.transform.position,
    [player],
    (a, b) => b != undefined && a !== b,
  );

  useFrame(({ clock }, dt) => {
    if (enemies.size <= 0) return;
    let idx = 0;
    for (const enemy of enemies) {
      const staggerBy = enemy.staggerBy ?? 0;
      const isStaggered = clock.elapsedTime < enemy.spawnedAt + staggerBy;
      if (!isStaggered) {
        const initialRotation = (idx * 2 * Math.PI) / numEnemies;
        const lambda = 2;

        const dim = Math.min(maxHeight, maxWidth);
        const radius = (dim / 2) * 0.85;

        const x = Math.sin(clock.elapsedTime + initialRotation) * radius;
        const y = Math.cos(clock.elapsedTime + initialRotation) * radius;
        enemy.transform.position.x = damp(enemy.transform.position.x, x, lambda, dt);
        enemy.transform.position.y = damp(enemy.transform.position.y, y, lambda, dt);
        enemy.transform.position.z = damp(enemy.transform.position.z, 0, lambda, dt);

        if (lookAt) {
          enemy.transform.lookAt(lookAt.x, lookAt.y, lookAt.z);
        }
      }

      idx += 1;
    }
  });

  return null;
}
