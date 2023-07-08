import { useFrame } from "lib/r3f";
import { ECS } from "..";
import { hasComponents } from "miniplex";
import { Camera } from "../entities/Camera";
import { Entity } from "../entities";

function isCamera(e: Entity): e is Camera {
  return hasComponents(e, "isCamera");
}

export function CameraSystem() {
  useFrame(() => {
    const [camera] = ECS.world.archetype(isCamera);

    if (!camera) return;

    camera.transform.position.set(0, 0, 10);
    camera.transform.lookAt(0, 0, 0);
  });
  return null;
}
