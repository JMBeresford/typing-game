import { ECS } from "../state";
import { useEntities } from "miniplex-react";
import { getLogger } from "@lib/logging";
import { useFrame } from "@react-three/fiber";

const log = getLogger(__filename);

const hasShields = ECS.world.with("shields");

export function ShieldsSystem() {
  const entities = useEntities(hasShields);

  useFrame(() => {
    for (const entity of entities) {
      if (entity.shields.current <= 0) {
        if ("destroy" in entity) continue;
        ECS.world.addComponent(entity, "destroy", true);
        log.debug("Entity marked for destruction: ", entity);
      }
    }
  });

  return null;
}
