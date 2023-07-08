import { useFrame } from "lib/r3f";
import { ECS } from "..";
import { hasComponents } from "miniplex";
import { Player } from "../entities/Player";
import { Entity } from "../entities";

function isPlayer(e: Entity): e is Player {
  return hasComponents(e, "isPlayer");
}

export function PlayerSystem() {
  useFrame(() => {
    const [player] = ECS.world.archetype(isPlayer);

    if (!player) return;
  });
  return null;
}
