import { useMatcapTexture } from "@react-three/drei";
import { Shield } from "./Shield";
import { TargetText } from "./TargetText";
import { ECS } from "@/ECS";
import { WeaponTimer } from "./WeaponTimer";
import { RenderOrder } from "@/utils";
import { ForwardedRef, forwardRef } from "react";
import { Group } from "three";

function RenderEnemyImpl(_: undefined, ref: ForwardedRef<Group>) {
  const entity = ECS.useCurrentEntity();
  const [texture] = useMatcapTexture("27222B_677491_484F6A_5D657A");

  return (
    <group ref={ref} renderOrder={RenderOrder.foreground}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshMatcapMaterial matcap={texture} transparent />
      </mesh>

      <TargetText position-z={1.1} />
      <WeaponTimer position-z={1.15} />

      {Number(entity.shields?.max) > 1 && <Shield />}
    </group>
  );
}

export const RenderEnemy = forwardRef(RenderEnemyImpl);
