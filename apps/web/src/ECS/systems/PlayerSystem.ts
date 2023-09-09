import { useFrame, useThree } from "@react-three/fiber";
import { useEntities } from "miniplex-react";
import { ECS } from "..";
import { setTypedCharacters, shootEntity } from "../actions";
import { useStore } from "@/state";
import { useEffect } from "react";

const isPlayer = ECS.world.with("transform", "typedCharacters", "targetedEnemy");

export function PlayerSystem() {
  const players = useEntities(isPlayer);
  const player = players.first;
  const enemyKilled = useStore(state => state.gameStats.enemyKilled);
  const camera = useThree(state => state.camera);

  useEffect(() => {
    if (!player) return;

    camera.add(player.transform);
  }, [player, camera]);

  useFrame(() => {
    if (!player) return;

    if (player.targetedEnemy?.targetWord === player.typedCharacters) {
      shootEntity(player.targetedEnemy, player);
      enemyKilled();
      setTypedCharacters("");
    }
  });

  return null;
}
