import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { ProfileBanner } from "../ProfileBanner";
import styles from "../Profile.module.scss";
import { ProfileStats } from "../ProfileStats";
import { GamesPlayed } from "../GamesPlayed";
import { redirect } from "next/navigation";

export default async function Profile({ params }: { params: { id: string } }) {
  let { id } = params;
  id = decodeURI(id);

  const supabase = createServerComponentClient<Database>({ cookies });
  const profileById = await supabase
    .from("profiles")
    .select()
    .eq("id", id)
    .limit(1)
    .single()
    .then(res => res.data);

  const profile =
    profileById ??
    (await supabase
      .from("profiles")
      .select()
      .ilike("username", id)
      .limit(1)
      .single()
      .then(res => res.data));

  const profileId = profile?.id ?? null;
  if (!profileId) redirect("/404");

  const games =
    (await supabase
      .from("games_played")
      .select()
      .eq("user_id", profileId)
      .then(res => res.data)) ?? [];

  return (
    <div className={styles.profile}>
      <ProfileBanner profile={profile} />
      <ProfileStats profile={profile} games={games} />
      <GamesPlayed games={games} />
    </div>
  );
}
