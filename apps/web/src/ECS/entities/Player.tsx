import { ECS } from "../state";
import { PerspectiveCamera } from "@react-three/drei";
import { useEffect } from "react";
import { getLogger } from "lib/logging";
import { useEntities } from "miniplex-react";
import { RenderPlayer } from "@/components/renderables/RenderPlayer";

const log = getLogger(__filename);

const players = ECS.world.with("shields", "typedCharacters", "targetedEnemy");

export function Player() {
  useEffect(() => {
    log.debug("Init player");
    const p = ECS.world.add({
      shields: { max: 3, current: 3 },
      typedCharacters: "",
      targetedEnemy: null,
    });

    return () => {
      ECS.world.remove(p);
    };
  }, []);

  const player = useEntities(players).first;

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

export const setTypedCharacters = (typedCharacters: string) => {
  const player = players.first;

  if (player) {
    ECS.world.removeComponent(player, "typedCharacters");
    ECS.world.addComponent(player, "typedCharacters", typedCharacters);
  }
};
