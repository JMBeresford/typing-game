import { ECS } from "../state";
import { getLogger } from "logging";
import { Entity } from "../entities";
import { useEntities, useOnEntityAdded } from "miniplex-react";

const log = getLogger(__filename);

function destroy(entity: Entity) {
  ECS.world.remove(entity);

  log.debug(`Destroyed entity: `, entity);
}

export function DestroySystem() {
  const toDestroy = useEntities(ECS.world.with("destroy"));

  useOnEntityAdded(toDestroy, (entity: Entity) => {
    if ("typedCharacters" in entity) {
      log.debug("Game over!");
    }
    destroy(entity);
  });

  return null;
}
