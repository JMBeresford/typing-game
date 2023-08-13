import { useStore } from "@/state";
import { useFrame } from "@react-three/fiber";

export function ClockSystem() {
  const tick = useStore(state => state.clock.tick);

  useFrame((_, dt) => {
    tick(dt);
  });

  return null;
}
