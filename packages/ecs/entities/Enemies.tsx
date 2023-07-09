"use client";

import { With, hasComponents } from "miniplex";
import { Text } from "@react-three/drei";
import { ECS } from "..";
import { Entity } from ".";
import { useEntities } from "miniplex/react";
import { Ref, forwardRef, useRef } from "react";
import { BufferGeometry, Group, Material, Mesh } from "three";
import { useFrame } from "@lib/r3f";
import { getLogger } from "@lib/logging";

const log = getLogger(__filename);

const STARTING_SHIELDS = 1;
const radius = 2.5;

export type Enemy = With<Entity, "isEnemy" | "shields" | "transform" | "targetWord">;
type EnemyProps = { targetWord: string; index?: number };

export function isEnemy(e: Entity): e is Enemy {
  return hasComponents(e, "isEnemy");
}

const Enemy = forwardRef((props: { entity: Enemy; index: number }, ref: Ref<Group>) => {
  const { entity, index } = props;
  const innerRef = useRef<Mesh<BufferGeometry, Material>>(null);
  const initialAngle = Math.PI * 2 * (index / ECS.world.archetype(isEnemy).entities.length);

  useFrame(({ clock }) => {
    if (!innerRef.current) return;
    innerRef.current.position.x = Math.sin(initialAngle + clock.elapsedTime) * radius;
    innerRef.current.position.y = Math.cos(initialAngle + clock.elapsedTime) * radius;

    const camera = ECS.world.archetype("isCamera", "transform").first;
    if (camera) {
      innerRef.current.lookAt(camera.transform.position);
    }
  });

  return (
    <group ref={ref}>
      <mesh ref={innerRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" />

        <Text position-z={1}>{entity.targetWord}</Text>
      </mesh>
    </group>
  );
});

Enemy.displayName = "Enemy";

export function Enemies() {
  const enemies = useEntities(ECS.world.archetype(isEnemy)).entities;

  return (
    <group>
      {enemies.map((e, i) => (
        <ECS.Entity entity={e} key={i}>
          <ECS.Component name="transform">
            <Enemy entity={e} index={i} />
          </ECS.Component>
        </ECS.Entity>
      ))}
    </group>
  );
}

export function spawnEnemy(props: EnemyProps) {
  const entity = ECS.world.add({
    isEnemy: true,
    shields: { max: STARTING_SHIELDS, current: STARTING_SHIELDS },
    targetWord: props.targetWord,
  });

  log.debug("spawned enemy", entity);

  return entity as Enemy;
}
