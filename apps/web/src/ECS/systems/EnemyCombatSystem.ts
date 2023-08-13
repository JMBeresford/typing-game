import { useFrame } from "@react-three/fiber";
import { ECS } from "..";
import { useEntities } from "miniplex-react";
import { shootEntity } from "../actions";
import { Entity } from "../entities";
import { With } from "miniplex";

const isPlayer = ECS.world.with("shields", "typedCharacters");
const isEnemy = ECS.world.with("targetWord", "spawnedAt", "attackSpeed", "nextAttackAt");

export function EnemyCombatSystem() {
  const enemies = useEntities(isEnemy);
  const players = useEntities(isPlayer);
  const player = players.first;

  useFrame(({ clock }) => {
    for (const enemy of enemies) {
      const staggerBy = enemy.staggerBy ?? 0;
      const staggeredUntil = enemy.spawnedAt + staggerBy;
      const isStaggered = clock.elapsedTime < staggeredUntil;
      if (!isStaggered) {
        if (enemy.nextAttackAt === null) {
          setNextAttackAt(enemy, clock.elapsedTime + enemy.attackSpeed);
        } else {
          if (clock.elapsedTime >= enemy.nextAttackAt && player) {
            shootEntity(player, enemy);

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
