import { Database } from "@/lib/database.types";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { User, users } from "../users";

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

  usersQuery.data.users.forEach(async user => {
    const userData = users.find(u => u.email === user.email);
    if (!userData) return;
    const updateResponse = await updateUsername(supabase, userData, user.id);

    if (updateResponse.error) {
      return NextResponse.json(
        { data: { ...updateResponse.data }, error: updateResponse.error },
        {
          status: 500,
        },
      );
    }
  });

  return NextResponse.json(
    { success: true },
    {
      status: 200,
    },
  );
}

async function updateUsername(
  supabase: SupabaseClient,
  user: User,
  userId: string,
): Promise<Response> {
  const res: Response = { error: null, data: null };

  const { error, statusText } = await supabase
    .from("profiles")
    .update({ username: user.username })
    .eq("id", userId);

  if (error) {
    res.error = `Failed to update username: ${error?.message ?? statusText}`;
    return res;
  }

  res.data = { success: true };
  return res;
}
