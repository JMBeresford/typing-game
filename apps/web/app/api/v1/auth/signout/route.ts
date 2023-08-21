import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLogger } from "logging";
import type { Database } from "@/lib/database.types";

const log = getLogger(__filename);

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient<Database>({ cookies });

  try {
    const res = await supabase.auth.signOut();
    if (res.error) {
      log.error("Error logging out: ", res.error);
      return NextResponse.error();
    }
  } catch (error) {
    log.error("Error logging out: ", error);
    return NextResponse.error();
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
