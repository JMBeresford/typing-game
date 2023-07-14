import { DestroySystem } from "./DestroySystem";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { KeyboardSystem } from "./KeyboardSystem";
import { PlayerSystem } from "./PlayerSystem";
import { ShieldsSystem } from "./ShieldsSystem";
import { WaveSystem } from "./WaveSystem";

export function Systems() {
  return (
    <>
      <WaveSystem />
      <PlayerSystem />
      <ShieldsSystem />
      <KeyboardSystem />
      <DestroySystem />
      <EnemyMovementSystem />
    </>
  );
}
