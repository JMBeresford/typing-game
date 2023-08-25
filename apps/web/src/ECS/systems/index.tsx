import { ClockSystem } from "./ClockSystem";
import { DestructionSystem } from "./DestructionSystem";
import { EnemyCombatSystem } from "./EnemyCombatSystem";
import { EnemyMovementSystem } from "./EnemyMovementSystem";
import { KeyboardSystem } from "./KeyboardSystem";
import { PlayerSystem } from "./PlayerSystem";
import { ShieldsSystem } from "./ShieldsSystem";
import { WaveSystem } from "./WaveSystem";

export function Systems() {
  return (
    <>
      <ClockSystem />
      <WaveSystem />
      <PlayerSystem />
      <ShieldsSystem />
      <KeyboardSystem />
      <DestructionSystem />
      <EnemyMovementSystem />
      <EnemyCombatSystem />
    </>
  );
}
