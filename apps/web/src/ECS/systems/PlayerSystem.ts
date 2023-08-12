import { useFrame } from "@react-three/fiber";
import { useEntities } from "miniplex-react";
import { ECS } from "..";
import { setTypedCharacters, shootEntity } from "../actions";

const isPlayer = ECS.world.with("transform", "typedCharacters", "targetedEnemy");

export function PlayerSystem() {
  const players = useEntities(isPlayer);
  const player = players.first;

  useFrame(() => {
    if (!player) return;

    player.transform.position.set(0, 0, 15);
    player.transform.lookAt(0, 0, 0);

    if (player.targetedEnemy?.targetWord === player.typedCharacters) {
      shootEntity(player.targetedEnemy, player);
      setTypedCharacters("");
    }
  });

  return null;
}
