import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./page.module.scss";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { Tables } from "@/lib/tables.types";
import { Leaderboard } from "./Leaderboard";

export default async function LeaderboardPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const profiles: Tables<"profiles">[] =
    (await supabase
      .from("profiles")
      .select()
      .neq("username", null)
      .limit(50)
      .then(res => res.data)) ?? [];

  return (
    <main className={styles.main}>
      <h1>Leaderboard</h1>

      <Leaderboard profiles={profiles} />
    </main>
  );
}
