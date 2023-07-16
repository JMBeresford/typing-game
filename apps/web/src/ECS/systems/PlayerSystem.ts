import { useFrame } from "@react-three/fiber";
import { useEntities } from "miniplex-react";
import { ECS } from "../state";
import { shootEnemy } from "../actions";
import { setTypedCharacters } from "../entities/Player";

const players = ECS.world.with("transform", "typedCharacters", "targetedEnemy");

export function PlayerSystem() {
  const player = useEntities(players).first;

  useFrame(() => {
    if (!player) return;

    player.transform.position.set(0, 0, 15);
    player.transform.lookAt(0, 0, 0);

    if (player.targetedEnemy !== null) {
      if (player.targetedEnemy.targetWord === player.typedCharacters) {
        shootEnemy(player.targetedEnemy);
        setTypedCharacters("");
      }
    }
  });

  return null;
}
