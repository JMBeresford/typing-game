import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLogger } from "logging";
import type { Database } from "@/lib/database.types";

const log = getLogger(__filename);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (res.error) {
      log.error("Error logging in: ", res.error.message);
      return NextResponse.json({ error: res.error }, { status: res.error.status });
    }

    const user = res.data.user;
    log.debug("User logged in: ", user);
  } catch (error) {
    log.error("Error logging in: ", error);
    return NextResponse.json({ error: `${error}` }, { status: 500 });
  }

  return NextResponse.json({ error: null }, { status: 200 });
}
