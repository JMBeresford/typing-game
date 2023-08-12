import { useEntities } from "miniplex-react";
import { ECS } from "..";
import { useFrame } from "@react-three/fiber";
import { targetEnemy } from "../actions";

const players = ECS.world.with("typedCharacters", "targetedEnemy");
const liveEnemies = ECS.world.with("targetWord", "shields").without("destroy");

export function PlayerTargetingSystem() {
  const player = useEntities(players).first;
  const enemies = useEntities(liveEnemies);

  useFrame(() => {
    if (!player) return;

    if (player.targetedEnemy === null && player.typedCharacters.length > 0) {
      for (const enemy of enemies) {
        if (enemy.targetWord.startsWith(player.typedCharacters)) {
          targetEnemy(enemy);
          break;
        }
      }
    } else if (player.targetedEnemy !== null && player.typedCharacters.length === 0) {
      targetEnemy(null);
    }
  });

  return null;
}
