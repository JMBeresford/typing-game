import { SharedRootLayout } from "@/components/SharedRootLayout";
import { HomeHeader } from "./HomeHeader";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { FirstLoginModal } from "./_modals/FirstLoginModal";
import { ReactNode } from "react";
import styles from "./layout.module.scss";

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session?.user.id)
    .limit(1)
    .single();

  return (
    <SharedRootLayout>
      <FirstLoginModal session={session} />
      <HomeHeader profile={profile} />

      <main className={styles.main}>{children}</main>
    </SharedRootLayout>
  );
}
