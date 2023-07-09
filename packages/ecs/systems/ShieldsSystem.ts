"use client";

import { useFrame } from "@lib/r3f";
import { ECS } from "..";
import { useEntities } from "miniplex/react";
import { getLogger } from "@lib/logging";

const log = getLogger(__filename);

export function ShieldsSystem() {
  const hasShields = useEntities(ECS.world.archetype("shields"));

  useFrame(() => {
    for (const entity of hasShields) {
      if (entity.shields.current <= 0) {
        if ("destroy" in entity) continue;
        ECS.world.addComponent(entity, "destroy", true);
        log.debug("Entity marked for destruction: ", entity);
      }
    }
  });

  return null;
}
