import { useFrame } from "@react-three/fiber";
import { ECS } from "../state";
import { useEntities } from "miniplex-react";
import { shootPlayer } from "../actions";
import { Entity } from "../entities";
import { With } from "miniplex";

const isEnemy = ECS.world.with("targetWord", "spawnedAt", "attackSpeed", "nextAttackAt");

export function EnemyCombatSystem() {
  const enemies = useEntities(isEnemy);
  useFrame(({ clock }) => {
    for (const enemy of enemies) {
      const staggerBy = enemy.staggerBy ?? 0;
      const staggeredUntil = enemy.spawnedAt + staggerBy;
      const isStaggered = clock.elapsedTime < staggeredUntil;
      if (!isStaggered) {
        if (enemy.nextAttackAt === null) {
          setNextAttackAt(enemy, clock.elapsedTime + enemy.attackSpeed);
        } else {
          if (clock.elapsedTime >= enemy.nextAttackAt) {
            shootPlayer(enemy);

            setNextAttackAt(enemy, clock.elapsedTime + enemy.attackSpeed);
          }
        }
      }
    }
  });

  return null;
}

function setNextAttackAt(e: With<Entity, "nextAttackAt">, time: number) {
  ECS.world.removeComponent(e, "nextAttackAt");
  ECS.world.addComponent(e, "nextAttackAt", time);
}
