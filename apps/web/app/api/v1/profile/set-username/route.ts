import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLogger } from "logging";
import type { Database } from "@/lib/database.types";

const log = getLogger(__filename);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const user_id = await supabase.auth.getUser().then(({ data }) => data.user?.id);
  const username = String(formData.get("username"));

  try {
    const { error, status, statusText } = await supabase
      .from("profiles")
      .update({ username })
      .eq("id", user_id);
    if (error) {
      log.error("Error setting username: ", error);
      return NextResponse.json({ error: error }, { status });
    }

    return NextResponse.json({ statusText }, { status: 200 });
  } catch (error) {
    log.error("Error setting username: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
