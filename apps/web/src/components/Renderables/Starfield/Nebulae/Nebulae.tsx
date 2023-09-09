import { useRef } from "react";
import { NebulaeMaterial, key } from "./shader";
import { MeshType, RenderOrder, styleStringToHex } from "@/utils";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useTexture } from "@react-three/drei";
import { RepeatWrapping, Texture } from "three";
import { damp } from "three/src/math/MathUtils";
import { useStore } from "@/state";
import { usePathname } from "next/navigation";

function prepareTexture(texture: Texture | Texture[]) {
  if (Array.isArray(texture)) {
    texture.forEach(t => {
      t.repeat.set(1, 1);
      t.wrapS = t.wrapT = RepeatWrapping;
    });
  } else {
    texture.repeat.set(1, 1);
    texture.wrapS = texture.wrapT = RepeatWrapping;
  }
}

export function Nebulae() {
  const ref = useRef<MeshType<NebulaeMaterial>>(null);
  const phase = useStore(s => s.wave.phase);
  const path = usePathname();
  const warpSpeed = path.startsWith("/game") && phase === "preparing";
  const size = useThree(s => s.size);

  const texture1 = useTexture("/images/super_perlin_clouds.png", prepareTexture);
  const texture2 = useTexture("/images/super_perlin_smoky.png", prepareTexture);
  const textureWarp1 = useTexture("/images/spokes.png", prepareTexture);

  const { color1, color2, color3, color4 } = useControls("nebulae", {
    color1: "#1f0042",
    color2: "#2e00ff",
    color3: "#ff00cc",
    color4: "#ff8700",
  });

  useFrame((_, dt) => {
    if (!ref.current) return;
    const curVelocity = ref.current.material.uVelocity;
    if (curVelocity == undefined) return;

    if (warpSpeed) {
      ref.current.material.uVelocity = damp(curVelocity, 1, 2, dt);
    } else {
      ref.current.material.uVelocity = damp(curVelocity, 0, 8, dt);
    }

    const curTime = ref.current.material.uTime;
    const step = dt + dt * 500.0 * curVelocity;
    ref.current.material.uTime = curTime == undefined ? step : curTime + step;
  });

  return (
    <mesh ref={ref} renderOrder={RenderOrder.background}>
      <sphereGeometry args={[50, 32, 32]} />
      <NebulaeMaterial
        key={key}
        uColor1={styleStringToHex(color1)}
        uColor2={styleStringToHex(color2)}
        uColor3={styleStringToHex(color3)}
        uColor4={styleStringToHex(color4)}
        uTexture1={texture1}
        uTexture2={texture2}
        uTextureWarp1={textureWarp1}
        uResolution={[size.width, size.height]}
      />
    </mesh>
  );
}
