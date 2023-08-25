import { With } from "miniplex";
import { RenderEnemy } from "./renderables/RenderEnemy";
import { Entity } from "./entities";
import { ECS } from ".";
import { getLogger } from "logging";
import { TargetableEnemy } from "./utils";
import { randFloat } from "three/src/math/MathUtils";
import { useStore } from "@/state";

const log = getLogger(__filename);
const STARTING_SHIELDS = 1;

const isPlayer = ECS.world.with("typedCharacters");
const isTargetableEnemy = ECS.world.with("targetWord", "shields").without("destroy");

export function spawnEnemy(components: Partial<Entity>): Entity {
  const high = 15;
  const low = 10;
  const x = randFloat(low, high) * (Math.random() > 0.5 ? 1 : -1);
  const y = randFloat(low, high) * (Math.random() > 0.5 ? 1 : -1);
  const enemy: Entity = ECS.world.add({
    render: <RenderEnemy />,
    shields: { max: STARTING_SHIELDS, current: STARTING_SHIELDS },
    position: [x, y, -5],
    nextAttackAt: null,
    attackSpeed: 5,
    ...components,
  });

  log.debug("Spawned enemy", enemy);

  return enemy;
}

export function shootEntity(entity: With<Entity, "shields">, shooter: Entity) {
  log.debug("Entity shot: ", entity, " by: ", shooter);
  const shields = { ...entity.shields };
  shields.current -= 1;
  ECS.world.removeComponent(entity, "shields");
  ECS.world.addComponent(entity, "shields", shields);
}

export function targetEnemy(enemy: TargetableEnemy | null) {
  const player = isPlayer.first;
  if (player) {
    log.debug("Targeted enemy: ", enemy);
    ECS.world.removeComponent(player, "targetedEnemy");
    ECS.world.addComponent(player, "targetedEnemy", enemy);
  }
}

export function maybeTargetEnemy(chars: string): TargetableEnemy | null {
  const player = isPlayer.first;
  if (!player) return null;

  if (player.targetedEnemy === null && chars.length > 0) {
    for (const enemy of isTargetableEnemy) {
      if (enemy.targetWord.startsWith(chars)) {
        targetEnemy(enemy);
        return enemy;
      }
    }
  } else if (player.targetedEnemy !== null && chars.length === 0) {
    targetEnemy(null);
  }

  return player.targetedEnemy ?? null;
}

export const setTypedCharacters = (typedCharacters: string) => {
  const player = isPlayer.first;

  if (player) {
    const characterWasTyped = useStore.getState().gameStats.characterWasTyped;
    const characterWasMissed = useStore.getState().gameStats.characterWasMissed;
    const targetedEnemy = maybeTargetEnemy(typedCharacters);
    const isBackspacing = typedCharacters.length < player.typedCharacters.length;

    if (!isBackspacing) {
      characterWasTyped();
    }

    if (targetedEnemy) {
      const targetWord = targetedEnemy.targetWord;

      if (!isBackspacing && typedCharacters !== targetWord.slice(0, typedCharacters.length)) {
        characterWasMissed();
      }
    }

    ECS.world.removeComponent(player, "typedCharacters");
    ECS.world.addComponent(player, "typedCharacters", typedCharacters);
  }
};

export function destroyEntity(entity: Entity) {
  ECS.world.remove(entity);

  log.debug(`Destroyed entity: `, entity);
}
