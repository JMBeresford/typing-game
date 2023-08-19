import { Button } from "ui";
import styles from "./page.module.scss";
import { HomeHeader } from "./HomeHeader";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";

export const dynamic = "force-dynamic";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <div className={styles.wrapper}>
        <HomeHeader session={session} />

        <main className={styles.mainMenu}>
          <Button>
            <Button.Link href="/game">Play Game</Button.Link>
          </Button>
          <Button disabled>
            <Button.Link href="/settings">Settings</Button.Link>
          </Button>
        </main>
      </div>
    </>
  );
}
