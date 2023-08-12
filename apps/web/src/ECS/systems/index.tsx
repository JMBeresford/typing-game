import { DestructionSystem } from "./DestructionSystem";
import { EnemyCombatSystem } from "./EnemyCombatSystem";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { KeyboardSystem } from "./KeyboardSystem";
import { PlayerSystem } from "./PlayerSystem";
import { PlayerTargetingSystem } from "./PlayerTargetingSystem";
import { ShieldsSystem } from "./ShieldsSystem";
import { WaveSystem } from "./WaveSystem";

export function Systems() {
  return (
    <>
      <WaveSystem />
      <PlayerSystem />
      <ShieldsSystem />
      <KeyboardSystem />
      <DestructionSystem />
      <EnemyMovementSystem />
      <EnemyCombatSystem />
      <PlayerTargetingSystem />
    </>
  );
}
