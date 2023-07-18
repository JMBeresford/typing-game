import { useEntities } from "miniplex-react";
import { ECS } from "../state";
import { useFrame } from "@react-three/fiber";
import { damp } from "three/src/math/MathUtils";
import { useMaxHeight, useMaxWidth } from "@/hooks";

const isEnemy = ECS.world.with("targetWord", "transform");
const isPlayer = ECS.world.with("typedCharacters", "transform");

export function EnemyMovementSystem() {
  const enemies = useEntities(isEnemy);
  const player = useEntities(isPlayer).first;
  const maxHeight = useMaxHeight();
  const maxWidth = useMaxWidth();

  useFrame(({ clock }, dt) => {
    if (!player || enemies.size <= 0) return;
    let idx = 0;
    for (const enemy of enemies) {
      const initialRotation = (idx * 2 * Math.PI) / enemies.size;
      const lambda = 2;

      const dim = Math.min(maxHeight, maxWidth);
      const radius = (dim / 2) * 0.85;

      const x = Math.sin(clock.elapsedTime + initialRotation) * radius;
      const y = Math.cos(clock.elapsedTime + initialRotation) * radius;
      enemy.transform.position.x = damp(enemy.transform.position.x, x, lambda, dt);
      enemy.transform.position.y = damp(enemy.transform.position.y, y, lambda, dt);
      enemy.transform.position.z = damp(enemy.transform.position.z, 0, lambda, dt);
      enemy.transform.lookAt(player.transform.position);

      idx += 1;
    }
  });

  return null;
}
