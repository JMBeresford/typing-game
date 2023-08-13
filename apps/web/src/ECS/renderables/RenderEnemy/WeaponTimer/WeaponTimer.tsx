import { ECS } from "@/ECS";
import { useStore } from "@/state";
import { MeshType } from "@/utils";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { MeshBasicMaterial } from "three";

export function WeaponTimer(props: JSX.IntrinsicElements["mesh"]) {
  const entity = ECS.useCurrentEntity();
  const ref = useRef<MeshType<MeshBasicMaterial>>(null);
  const phase = useStore(state => state.wave.phase);

  useFrame(({ clock }) => {
    if (!entity || !ref.current || phase === "game over") return;
    const { attackSpeed, nextAttackAt } = entity;
    if (!attackSpeed || !nextAttackAt) return;

    const timeUntilNextAttack = nextAttackAt - clock.elapsedTime;
    ref.current.scale.x = timeUntilNextAttack / attackSpeed;
  });

  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[1, 0.2]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
}
