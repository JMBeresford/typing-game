import { useEntities } from "miniplex-react";
import { ECS } from "../state";
import { useFrame } from "@react-three/fiber";

const isEnemy = ECS.world.with("targetWord", "transform");
const isPlayer = ECS.world.with("typedCharacters", "transform");
const RADIUS = 2;

export function EnemyMovementSystem() {
  const enemies = useEntities(isEnemy);
  const player = useEntities(isPlayer).first;

  useFrame(({ clock }) => {
    if (!player || enemies.size <= 0) return;
    let idx = 0;
    for (const enemy of enemies) {
      const initialRotation = (idx * 2 * Math.PI) / enemies.size;
      enemy.transform.position.x = Math.sin(clock.elapsedTime + initialRotation) * RADIUS;
      enemy.transform.position.y = Math.cos(clock.elapsedTime + initialRotation) * RADIUS;
      enemy.transform.lookAt(player.transform.position);
      idx += 1;
    }
  });

  return null;
}
