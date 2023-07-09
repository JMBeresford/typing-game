"use client";

import { With, hasComponents } from "miniplex";
import { ECS } from "..";
import { Entity } from ".";
import { Text } from "@react-three/drei";
import { useEntities } from "miniplex/react";

export type Wave = With<Entity, "wave" | "transform">;

export function isWave(e: Entity): e is Wave {
  return hasComponents(e, "wave");
}

export function Wave() {
  const wave = useEntities(ECS.world.archetype(isWave)).first;

  return (
    <ECS.Entity entity={wave}>
      <ECS.Component name="transform">
        {wave && <Text fillOpacity={0.25}>Wave {wave.wave || 0}</Text>}
      </ECS.Component>
    </ECS.Entity>
  );
}
