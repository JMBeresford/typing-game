import { ECS } from "../state";
import { PerspectiveCamera } from "@react-three/drei";
import { useLayoutEffect } from "react";
import { getLogger } from "logging";
import { useEntities } from "miniplex-react";
import { RenderPlayer } from "@/components/renderables/RenderPlayer";

const log = getLogger(__filename);

const players = ECS.world.with("shields", "typedCharacters", "targetedEnemy");

export function Player() {
  const player = useEntities(players).first;

  useLayoutEffect(() => {
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
