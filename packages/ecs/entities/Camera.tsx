import { With } from "miniplex";
import { ECS } from "..";
import { Entity } from ".";
import { PerspectiveCamera } from "@react-three/drei";

export type Camera = With<Entity, "isCamera" | "transform">;

export function Camera() {
  return (
    <ECS.Entity>
      <ECS.Component name="isCamera" data={true} />
      <ECS.Component name="transform">
        <PerspectiveCamera makeDefault />
      </ECS.Component>
    </ECS.Entity>
  );
}
