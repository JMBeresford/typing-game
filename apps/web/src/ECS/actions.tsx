import { With } from "miniplex";
import { RenderEnemy } from "../components/renderables/RenderEnemy";
import { Entity } from "./entities";
import { ECS } from "./state";
import { getLogger } from "lib/logging";
import { TargetableEnemy } from "@/utils";
import { randFloat } from "three/src/math/MathUtils";

const log = getLogger(__filename);
const STARTING_SHIELDS = 1;

export function spawnEnemy(components: Partial<Entity>): Entity {
  const high = 15;
  const low = 10;
  const x = randFloat(low, high) * (Math.random() > 0.5 ? 1 : -1);
  const y = randFloat(low, high) * (Math.random() > 0.5 ? 1 : -1);
  const enemy: Entity = ECS.world.add({
    render: <RenderEnemy />,
    shields: { max: STARTING_SHIELDS, current: STARTING_SHIELDS },
    position: [x, y, -5],
    ...components,
  });

  log.debug("Spawned enemy", enemy);

  return enemy;
}

export function shootEnemy(enemy: With<Entity, "shields">) {
  log.debug("Shot enemy: ", enemy);
  const shields = { ...enemy.shields };
  shields.current -= 1;
  ECS.world.removeComponent(enemy, "shields");
  ECS.world.addComponent(enemy, "shields", shields);
}

export function targetEnemy(enemy: TargetableEnemy | null) {
  const player = ECS.world.with("shields", "typedCharacters", "targetedEnemy").first;
  if (player) {
    log.debug("Targeted enemy: ", enemy);
    ECS.world.removeComponent(player, "targetedEnemy");
    ECS.world.addComponent(player, "targetedEnemy", enemy);
  }
}
