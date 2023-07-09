"use client";

import { useFrame } from "@lib/r3f";
import { ECS } from "..";
import { useEntities } from "miniplex/react";

export function CameraSystem() {
  const camera = useEntities(ECS.world.archetype("isCamera", "transform")).first;

  useFrame(() => {
    if (!camera) return;

    camera.transform.position.set(0, 0, 15);
    camera.transform.lookAt(0, 0, 0);
  });

  return null;
}
