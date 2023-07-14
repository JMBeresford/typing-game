import { useFrame } from "@react-three/fiber";
import { useEntities } from "miniplex-react";
import { ECS } from "../state";

export function PlayerSystem() {
  const player = useEntities(ECS.world.with("transform", "typedCharacters")).first;

  useFrame(() => {
    if (!player) return;

    player.transform.position.set(0, 0, 15);
    player.transform.lookAt(0, 0, 0);
  });

  return null;
}
