// Supabase will sleep inactive DBs on free tier after ~7days of inactivity
// use this cron to keep the DB active and game the system >:)

import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  const { data, error, status } = await supabase.from("profiles").select().single();

  return NextResponse.json(
    { data, error },
    {
      status,
    },
  );
}
