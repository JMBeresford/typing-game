import { Database } from "@/lib/database.types";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { games } from "../games";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type Response = {
  data: {
    success: boolean;
  } | null;
  error: string | null;
};

export async function GET(_request: NextRequest) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>(
    { cookies: () => cookieStore },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY,
    },
  );

  const usersQuery = await supabase.auth.admin.listUsers();
  const userIds = usersQuery.data.users.map(user => user.id);

  const gamesResponse = await createGames(supabase, userIds);

  if (gamesResponse.error) {
    return NextResponse.json(
      { data: { ...gamesResponse.data }, error: gamesResponse.error },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json(
    { success: true },
    {
      status: 200,
    },
  );
}

async function createGames(supabase: SupabaseClient, userIds: string[]): Promise<Response> {
  const res: Response = { error: null, data: null };

  for (const game of games) {
    const user_id = userIds[Math.floor(Math.random() * userIds.length)];

    const { error, statusText } = await supabase.from("games_played").insert({
      ...game,
      user_id,
    });

    if (error) {
      res.error = `Failed to add game: ${error?.message ?? statusText}`;
      return res;
    }
  }

  res.data = { success: true };
  return res;
}
