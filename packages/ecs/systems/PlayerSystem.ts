"use client";

import { useFrame } from "@lib/r3f";
import { ECS } from "..";
import { useEntities } from "miniplex/react";

export function PlayerSystem() {
  const player = useEntities(ECS.world.archetype("isPlayer")).first;
  useFrame(() => {
    if (!player) return;
  });

  return null;
}
