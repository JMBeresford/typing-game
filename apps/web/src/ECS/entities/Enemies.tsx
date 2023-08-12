import { ECS } from "..";
import { useEntities } from "miniplex-react";

export const renderableEnemies = ECS.world.with("render", "targetWord");

export function Enemies() {
  const entities = useEntities(renderableEnemies);

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
