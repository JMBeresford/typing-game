import { Tables } from "@/lib/tables.types";
import styles from "./Profile.module.scss";

function average(arr: number[]) {
  if (arr.length === 0) return 0;
  return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

export function ProfileStats({
  profile,
  games,
}: {
  profile: Tables<"profiles"> | null;
  games: Tables<"games_played">[];
}) {
  if (!profile) return <></>;

  const kills = games.reduce((acc, game) => acc + game.enemies_killed, 0);
  const waves = games.reduce((acc, game) => acc + game.waves_completed, 0);
  const wpm = average(games.map(game => game.words_per_minute)).toFixed(2);
  const accuracy = Math.floor(average(games.map(game => game.accuracy)) * 100);

  return (
    <aside className={styles.stats}>
      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Confirmed Kills</h3>
        <h5 className={styles.statValue}>{kills}</h5>
      </div>

      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Waves Completed</h3>
        <h5 className={styles.statValue}>{waves}</h5>
      </div>

      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Avg Words / Minute</h3>
        <h5 className={styles.statValue}>{wpm}</h5>
      </div>
      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Accuracy</h3>
        <h5 className={styles.statValue}>{accuracy}%</h5>
      </div>
    </aside>
  );
}
