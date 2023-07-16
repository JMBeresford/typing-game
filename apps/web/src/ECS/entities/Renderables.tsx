import { ECS } from "../state";
import { useEntities } from "miniplex-react";

export const withRenderMethod = ECS.world.with("render");

export function Renderables() {
  const entities = useEntities(withRenderMethod);

  return (
    <group>
      <ECS.Entities in={entities}>
        {entity => (
          <ECS.Component name="transform">
            <group position={entity.position} rotation={entity.rotation} scale={entity.scale}>
              {entity.render}
            </group>
          </ECS.Component>
        )}
      </ECS.Entities>
    </group>
  );
}
