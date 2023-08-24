import { Tables } from "@/lib/tables.types";
import styles from "./Profile.module.scss";

export function ProfileBanner({ profile }: { profile: Tables<"profiles"> | null }) {
  if (!profile) return <></>;

  return (
    <div className={styles.banner}>
      <div className={styles.avatar}>
        <img src={"https://placehold.co/5"} alt="avatar" />
      </div>
      <h1>{profile.username ?? profile.email}</h1>
    </div>
  );
}
