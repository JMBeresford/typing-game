import { Tables } from "@/lib/tables.types";
import styles from "./Profile.module.scss";

export function ProfileStats({ profile }: { profile: Tables<"profiles"> | null }) {
  if (!profile) return <></>;

  return (
    <aside className={styles.stats}>
      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Confirmed Kills</h3>
        <h5 className={styles.statValue}>{profile.enemies_killed_total}</h5>
      </div>

      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Waves Completed</h3>
        <h5 className={styles.statValue}>{profile.waves_completed_total}</h5>
      </div>

      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Avg Words / Minute</h3>
        <h5 className={styles.statValue}>{profile.words_per_minute_avg.toFixed(2)}</h5>
      </div>
      <div className={styles.stat}>
        <h3 className={styles.statLabel}>Accuracy</h3>
        <h5 className={styles.statValue}>{Math.floor(profile.accuracy_avg * 100)}%</h5>
      </div>
    </aside>
  );
}
