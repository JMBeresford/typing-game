import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLogger } from "logging";
import type { Database } from "@/lib/database.types";
import { RecordedStats } from "@/state/gameStats";

const log = getLogger(__filename);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
    if (!user_id) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }
    const data = (await request.json()) as RecordedStats;

    const dbResponse = await supabase.from("games_played").insert({ ...data, user_id });
    if (dbResponse.error) {
      log.error(dbResponse.error);
      return NextResponse.json({ error: dbResponse.error }, { status: 500 });
    }

    return NextResponse.json({ statusText: "OK" }, { status: 200 });
  } catch (error) {
    log.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
