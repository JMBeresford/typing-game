import { useStore } from "@/state";
import { Button, Modal } from "ui";
import styles from "./GameOverScreen.module.scss";
import { ECS } from "@/ECS";
import { useEntities } from "miniplex-react";
import { useMemo } from "react";
import { msElapsedToTime } from "@/utils";

const isLiveEnemy = ECS.world.with("targetWord").without("destroy");

export function GameOverScreen() {
  const liveEnemies = useEntities(isLiveEnemy);
  const phase = useStore(state => state.wave.phase);
  const finishedWaves = useStore(state => state.wave.finishedWaves);
  const numEnemies = useStore(state => state.wave.numEnemies);
  const curWaveStarted = useStore(state => state.wave.startTime);
  const curWaveEnded = useStore(state => state.wave.endTime);
  const numEnemiesKilled = useMemo(
    () =>
      finishedWaves.reduce((acc, wave) => acc + wave.numEnemies, 0) +
      (numEnemies - liveEnemies.size),
    [finishedWaves, liveEnemies, numEnemies],
  );
  const timeElapsed = useMemo(
    () =>
      msElapsedToTime(
        finishedWaves.reduce((acc, wave) => acc + (wave.endTime - wave.startTime), 0) +
          ((curWaveEnded ?? performance.now()) - curWaveStarted),
      ),
    [finishedWaves, curWaveEnded, curWaveStarted],
  );

  return (
    <Modal open={phase === "game over"}>
      <Modal.Header>Game Over</Modal.Header>

      <Modal.TextContent>
        <table className={styles.statsTable}>
          <tbody>
            <tr>
              <td>Waves Completed</td>
              <td>{finishedWaves.length}</td>
            </tr>
            <tr>
              <td>Time Elapsed</td>
              <td>{`${timeElapsed.mins}m ${timeElapsed.secs}s`}</td>
            </tr>
            <tr>
              <td>Enemies Shot Down</td>
              <td>{numEnemiesKilled}</td>
            </tr>
          </tbody>
        </table>
      </Modal.TextContent>

      <Modal.Footer>
        <Button>
          <Button.Link href="/">Main Menu</Button.Link>
        </Button>

        <Button onClick={() => useStore.getState().wave.reset()}>Play Again</Button>
      </Modal.Footer>
    </Modal>
  );
}
