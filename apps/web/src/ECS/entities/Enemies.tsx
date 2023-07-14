import { Text } from "@react-three/drei";
import { ECS } from "../state";
import { useEntities } from "miniplex-react";
import { getLogger } from "@lib/logging";
import { Entity } from ".";

const log = getLogger(__filename);

const STARTING_SHIELDS = 1;

function RenderEnemy() {
  const entity = ECS.useCurrentEntity();
  return (
    <ECS.Component name="transform">
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" />

        <Text position-z={1}>{entity.targetWord}</Text>
      </mesh>
    </ECS.Component>
  );
}

const enemies = ECS.world.with("targetWord");

export function Enemies() {
  const entities = useEntities(enemies);

  return (
    <group>
      <ECS.Entities in={entities}>{entity => entity.render}</ECS.Entities>
    </group>
  );
}

export function spawnEnemy(targetWord: string) {
  const entity: Entity = ECS.world.add({
    shields: { max: STARTING_SHIELDS, current: STARTING_SHIELDS },
    targetWord: targetWord,
    render: <RenderEnemy />,
  });

  log.debug("Spawned enemy", entity);

  return entity;
}
