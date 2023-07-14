import { ECS } from "../state";
import { getLogger } from "@lib/logging";
import { Entity } from "../entities";
import { useEntities, useOnEntityAdded } from "miniplex-react";

const log = getLogger(__filename);

export function DestroySystem() {
  const toDestroy = useEntities(ECS.world.with("destroy"));

  useOnEntityAdded(toDestroy, (entity: Entity) => {
    ECS.world.remove(entity);
    const type = "isPlayer" in entity ? "player" : "isEnemy" in entity ? "enemy" : "unknown";

    log.debug(`Destroyed ${type} entity: `, entity);
  });

  return null;
}
