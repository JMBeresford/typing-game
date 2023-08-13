import { useStore } from "@/state";
import { Button, Modal, Table } from "ui";
import { ECS } from "@/ECS";
import { useEntities } from "miniplex-react";
import { useMemo } from "react";
import { secElapsedToTime } from "@/utils";

const isLiveEnemy = ECS.world.with("targetWord").without("destroy");

export function GameOverScreen() {
  const liveEnemies = useEntities(isLiveEnemy);
  const phase = useStore(state => state.wave.phase);
  const finishedWaves = useStore(state => state.wave.finishedWaves);
  const numEnemies = useStore(state => state.wave.numEnemies);
  const curWaveStarted = useStore(state => state.wave.startTime);
  const curWaveEnded = useStore(state => state.wave.endTime);
  const getElapsedTime = useStore(state => state.wave.getElapsedTime);
  const numEnemiesKilled = useMemo(
    () =>
      finishedWaves.reduce((acc, wave) => acc + wave.numEnemies, 0) +
      (numEnemies - liveEnemies.size),
    [finishedWaves, liveEnemies, numEnemies],
  );
  const timeElapsed = useMemo(
    () =>
      secElapsedToTime(
        finishedWaves.reduce((acc, wave) => acc + (wave.endTime - wave.startTime), 0) +
          ((curWaveEnded ?? getElapsedTime()) - curWaveStarted),
      ),
    [finishedWaves, curWaveEnded, curWaveStarted, getElapsedTime],
  );

  return (
    <Modal open={phase === "game over"}>
      <Modal.Header>Game Over</Modal.Header>

      <Modal.TextContent>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.Data>Waves Completed</Table.Data>
              <Table.Data>{finishedWaves.length}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Data>Time Elapsed</Table.Data>
              <Table.Data>{`${timeElapsed.mins}m ${timeElapsed.secs}s`}</Table.Data>
            </Table.Row>
            <Table.Row>
              <Table.Data>Enemies Shot Down</Table.Data>
              <Table.Data>{numEnemiesKilled}</Table.Data>
            </Table.Row>
          </Table.Body>
        </Table>
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
