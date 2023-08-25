import { useStore } from "@/state";
import { Button, Modal, Table } from "ui";
import { msElapsedToTime } from "@/utils";
import { RecordedStats } from "@/state/gameStats";
import { ReactNode } from "react";

const displayNames: Record<keyof RecordedStats, string> = {
  accuracy: "Accuracy",
  enemies_killed: "Enemies Shot Down",
  score: "Score",
  time_elapsed_ms: "Time Elapsed",
  waves_completed: "Waves Completed",
  words_per_minute: "Words Per Minute",
} as const;

function getDisplayValue(_key: string, stats?: RecordedStats): ReactNode {
  if (!stats) return null;
  const key = _key as keyof RecordedStats;
  const value = stats[key];

  if (key === "time_elapsed_ms") {
    const t = msElapsedToTime(value ?? 0);
    return `${Math.floor(t.mins)}:${Math.floor(t.secs)}`;
  }

  if (key === "words_per_minute") return value.toFixed(2);
  if (key === "accuracy") return `${Math.floor(value * 100)}%`;

  return value;
}

export function GameOverScreen() {
  const phase = useStore(state => state.wave.phase);
  const recordedStats = useStore(state => state.gameStats.recordedStats);

  return (
    <Modal open={phase === "game over"}>
      <Modal.Header>Game Over</Modal.Header>

      <Modal.TextContent>
        <Table>
          <Table.Body>
            {Object.entries(displayNames).map(([key, displayName]) => (
              <Table.Row key={key}>
                <Table.Data>{displayName}</Table.Data>
                <Table.Data>{getDisplayValue(key, recordedStats)}</Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Modal.TextContent>

      <Modal.Footer>
        <Button>
          <Button.Link href="/">Main Menu</Button.Link>
        </Button>

        <Button
          onClick={() => {
            useStore.getState().wave.reset();
            useStore.getState().gameStats.reset();
          }}
        >
          Play Again
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
