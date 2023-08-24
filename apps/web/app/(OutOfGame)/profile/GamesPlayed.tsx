import { TableColumns, Tables } from "@/lib/tables.types";
import { Table } from "ui";
import styles from "./Profile.module.scss";

type DataPoint = TableColumns<"games_played">;
type IgnoredColumns = "id" | "user_id" | "times_hit";

const displayNames: Omit<Record<DataPoint, string>, IgnoredColumns> = {
  created_at: "Date",
  enemies_killed: "Kills",
  waves_completed: "Waves",
  time_elapsed_ms: "Time",
  accuracy: "Accuracy",
  words_per_minute: "WPM",
  score: "Score",
} as const;

function getDataPoint(game: Tables<"games_played">, dataPoint: DataPoint) {
  if (dataPoint === "created_at") {
    return new Date(game[dataPoint]).toLocaleDateString();
  }

  return game[dataPoint];
}

export function GamesPlayed({ games }: { games: Tables<"games_played">[] }) {
  if (games.length > 0)
    return (
      <main className={styles.games}>
        <h1 style={{ textAlign: "center", opacity: 0.5, margin: "1rem 0" }}>
          It&apos;s empty here...
        </h1>
      </main>
    );

  return (
    <main className={styles.games}>
      <Table style={{ textAlign: "left" }}>
        <Table.Header>
          <Table.Row>
            {Object.values(displayNames).map(value => (
              <Table.HeaderData key={value}>{value}</Table.HeaderData>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {games.map(game => (
            <Table.Row key={game.id}>
              {Object.keys(displayNames).map(dataPoint => (
                <Table.Data key={dataPoint}>
                  {getDataPoint(game, dataPoint as DataPoint)}
                </Table.Data>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </main>
  );
}
