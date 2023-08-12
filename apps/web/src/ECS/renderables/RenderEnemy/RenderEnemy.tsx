import { useMatcapTexture } from "@react-three/drei";
import { Shield } from "./Shield";
import { TargetText } from "./TargetText";
import { ECS } from "@/ECS";
import { WeaponTimer } from "./WeaponTimer";

export function RenderEnemy() {
  const entity = ECS.useCurrentEntity();
  const [texture] = useMatcapTexture("27222B_677491_484F6A_5D657A");

  return (
    <>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshMatcapMaterial matcap={texture} />
      </mesh>

      <TargetText position-z={1.1} />
      <WeaponTimer position-z={1.1} />

      {Number(entity.shields?.max) > 1 && <Shield />}
    </>
  );
}
