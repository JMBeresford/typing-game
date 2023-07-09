import { CameraSystem } from "./CameraSystem";
import { DestroySystem } from "./DestroySystem";
import { KeyboardSystem } from "./KeyboardSystem";
import { PlayerSystem } from "./PlayerSystem";
import { ShieldsSystem } from "./ShieldsSystem";
import { WaveSystem } from "./WaveSystem";

export function Systems() {
  return (
    <>
      <PlayerSystem />
      <ShieldsSystem />
      <CameraSystem />
      <KeyboardSystem />
      <DestroySystem />
      <WaveSystem />
    </>
  );
}
