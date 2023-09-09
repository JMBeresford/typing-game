import { ECS } from "..";
import { useEntities } from "miniplex-react";
import { RenderPlayer } from "@/ECS/renderables/RenderPlayer";

const isPlayer = ECS.world.with("shields", "typedCharacters", "targetedEnemy");

export function Player() {
  const players = useEntities(isPlayer);
  const player = players.first;

  return (
    <ECS.Entity entity={player}>
      <ECS.Component name="transform">
        <RenderPlayer />
      </ECS.Component>
    </ECS.Entity>
  );
}
