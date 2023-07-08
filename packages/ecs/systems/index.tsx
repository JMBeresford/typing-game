import { CameraSystem } from "./CameraSystem";
import { PlayerSystem } from "./PlayerSystem";
import { ShieldsSystem } from "./ShieldsSystem";

export function Systems() {
  return (
    <>
      <PlayerSystem />
      <ShieldsSystem />
      <CameraSystem />
    </>
  );
}
