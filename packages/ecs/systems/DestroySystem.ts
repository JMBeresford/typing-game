import { ECS } from "..";
import { getLogger } from "@lib/logging";
import { Entity } from "../entities";
import { hasComponents } from "miniplex";
import { useEffect } from "react";

const log = getLogger(__filename);

function isDestroyable(entity: Entity): entity is Entity {
  return hasComponents(entity, "destroy");
}

export function DestroySystem() {
  const toDestroy = ECS.world.archetype(isDestroyable);

  useEffect(() => {
    const destroy = (entity: Entity) => {
      ECS.world.remove(entity);
      const type = "isPlayer" in entity ? "player" : "isEnemy" in entity ? "enemy" : "unknown";

      log.debug(`Destroyed ${type} entity: `, entity);
    };

    toDestroy.onEntityAdded.add(destroy);

    return () => toDestroy.onEntityAdded.remove(destroy);
  }, [toDestroy]);

  return null;
}
