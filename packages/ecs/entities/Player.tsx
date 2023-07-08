import { With } from "miniplex";
import { ECS } from "..";
import { Entity } from ".";

export type Player = With<Entity, "isPlayer" | "shields" | "typedCharacters" | "transform">;

export function Player() {
  return (
    <ECS.Entity>
      <ECS.Component name="isPlayer" data={true} />
      <ECS.Component name="shields" data={{ max: 5, current: 5 }} />
      <ECS.Component name="typedCharacters" data={""} />
      {/* <ECS.Component name="transform">
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="red" />
        </mesh>
      </ECS.Component> */}
    </ECS.Entity>
  );
}
