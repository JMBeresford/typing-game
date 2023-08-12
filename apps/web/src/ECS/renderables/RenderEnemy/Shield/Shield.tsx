import { useFrame } from "@react-three/fiber";
import { ECS } from "@/ECS";
import { MeshType } from "@/utils";
import { useRef } from "react";
import { Color, MeshBasicMaterial } from "three";
import { damp, lerp } from "three/src/math/MathUtils";

const INITIAL_OPACITY = 0.15;
const MAX_SHIELDS_COLOR = new Color("blue");
const MIN_SHIELDS_COLOR = new Color("red");

export function Shield() {
  const ref = useRef<MeshType<MeshBasicMaterial>>(null);
  const entity = ECS.useCurrentEntity();

  useFrame((_, dt) => {
    const shields = entity.shields;
    if (!ref.current || !shields) return;

    const shieldState = Math.pow(shields.current / shields.max, 3.0);
    const lambda = 4;
    const { r, g, b } = ref.current.material.color;
    const [r2, g2, b2] = [
      lerp(MIN_SHIELDS_COLOR.r, MAX_SHIELDS_COLOR.r, shieldState),
      lerp(MIN_SHIELDS_COLOR.g, MAX_SHIELDS_COLOR.g, shieldState),
      lerp(MIN_SHIELDS_COLOR.b, MAX_SHIELDS_COLOR.b, shieldState),
    ];

    ref.current.material.color.r = damp(r, r2, lambda, dt);
    ref.current.material.color.g = damp(g, g2, lambda, dt);
    ref.current.material.color.b = damp(b, b2, lambda, dt);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshBasicMaterial color="blue" transparent opacity={INITIAL_OPACITY} />
    </mesh>
  );
}
