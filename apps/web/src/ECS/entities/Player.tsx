import { ECS } from "..";
import { PerspectiveCamera } from "@react-three/drei";
import { useEntities } from "miniplex-react";
import { RenderPlayer } from "@/ECS/renderables/RenderPlayer";

const isPlayer = ECS.world.with("shields", "typedCharacters", "targetedEnemy");

export function Player() {
  const players = useEntities(isPlayer);
  const player = players.first;

  if (!player) return null;

  return (
    <ECS.Entity entity={player}>
      <ECS.Component name="transform">
        <PerspectiveCamera makeDefault>
          <RenderPlayer />
        </PerspectiveCamera>
      </ECS.Component>
    </ECS.Entity>
  );
}
