import { RootState, useFrame } from "lib/r3f";

function tick(state: RootState, delta: number) {}

export function ShieldsSystem() {
  useFrame(tick);
  return null;
}
