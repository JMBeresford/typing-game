import { MeshType, RenderOrder } from "@/utils";
import { useMemo, useRef } from "react";
import { StarsMaterial, key } from "./shader";
import { useFrame } from "@react-three/fiber";
import { damp, randFloat, randInt } from "three/src/math/MathUtils";
import { useStore } from "@/state";
import { usePathname } from "next/navigation";

const RANGE = 20;

export function Stars({ count = 1000 }) {
  const ref = useRef<MeshType<StarsMaterial>>(null);
  const phase = useStore(s => s.wave.phase);
  const path = usePathname();
  const warpSpeed = path.startsWith("/game") && phase === "preparing";

  const positions = useMemo(() => {
    const pos = [];
    for (let i = 0; i < count; i++) {
      const x = randFloat(0.2, RANGE) * (Math.random() < 0.5 ? -1 : 1);
      const y = randFloat(0.2, RANGE) * (Math.random() < 0.5 ? -1 : 1);
      const z = randFloat(0.2, RANGE) * (Math.random() < 0.5 ? -1 : 1);

      for (let j = 0; j < 4; j++) {
        // 4 corners
        pos.push(x, y, z);
      }
    }
    return new Float32Array(pos);
  }, [count]);

  const colors = useMemo(() => {
    const col = [];
    for (let i = 0; i < count; i++) {
      const c = randInt(0, 3);
      col.push(c, c, c, c);
    }
    return new Float32Array(col);
  }, [count]);

  const indices = useMemo(() => {
    const idx = [];
    for (let i = 0; i < count; i++) {
      const quadIdx = 4 * i;
      idx.push(quadIdx, quadIdx + 1, quadIdx + 2, quadIdx + 1, quadIdx + 3, quadIdx + 2);
    }

    return new Uint16Array(idx);
  }, [count]);

  const uvs = useMemo(() => {
    const uv = [];
    for (let i = 0; i < count; i++) {
      uv.push(0, 1, 1, 1, 0, 0, 1, 0);
    }

    return new Float32Array(uv);
  }, [count]);

  const corners = useMemo(() => {
    const corner = [];
    for (let i = 0; i < count; i++) {
      corner.push(0, 1, 2, 3);
    }

    return new Float32Array(corner);
  }, [count]);

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
    <mesh
      ref={ref}
      frustumCulled={false}
      position-z={15 - RANGE / 2}
      renderOrder={RenderOrder.background}
    >
      <bufferGeometry>
        <bufferAttribute attach="index" count={indices.length} array={indices} itemSize={1} />
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute attach="attributes-uv" count={uvs.length / 2} array={uvs} itemSize={2} />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length}
          array={colors}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aCorner"
          count={corners.length / 2}
          array={corners}
          itemSize={1}
        />
      </bufferGeometry>

      <StarsMaterial key={key} />
    </mesh>
  );
}
