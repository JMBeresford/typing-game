import { With, hasComponents } from "miniplex";
import { Text } from "@react-three/drei";
import { ECS } from "..";
import { Entity } from ".";

const STARTING_SHIELDS = 3;
export type Enemy = With<Entity, "isEnemy" | "shields" | "transform" | "targetWord">;
type EnemyProps = JSX.IntrinsicElements["group"] & { targetWord?: string };

function isEnemy(e: Entity): e is Enemy {
  return hasComponents(e, "isEnemy");
}

spawnEnemy({ position: [-2, -2, 0], targetWord: "hello" });
spawnEnemy({ position: [2, -2, 0], targetWord: "world" });
spawnEnemy({ position: [0, 2, 0], targetWord: "foo" });

function Enemy(props: EnemyProps) {
  return (
    <group {...props}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="red" />
      </mesh>

      <Text position-z={1}>{props.targetWord}</Text>
    </group>
  );
}

export function Enemies() {
  const enemies = ECS.world.archetype(isEnemy);

  return (
    <>
      <ECS.Entities in={enemies} children={e => e.render} />
    </>
  );
}

export function spawnEnemy(props?: EnemyProps) {
  const entity = ECS.world.add({
    isEnemy: true,
    shields: { max: STARTING_SHIELDS, current: STARTING_SHIELDS },
    targetWord: props?.targetWord,

    render: <Enemy {...props} />,
  });

  return entity as Enemy;
}
