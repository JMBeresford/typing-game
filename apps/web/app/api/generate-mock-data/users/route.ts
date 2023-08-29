import { Database } from "@/lib/database.types";
import { SupabaseClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { users } from "../users";

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

  const usersResponse = await createUsers(supabase);

  if (usersResponse.error) {
    return NextResponse.json(
      { data: { ...usersResponse.data }, error: usersResponse.error },
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

async function createUsers(supabase: SupabaseClient): Promise<Response> {
  const res: Response = { error: null, data: null };

  for (const user of users) {
    const createResponse = await supabase.auth.admin.createUser({
      email: user.email,
      email_confirm: true,
    });

    if (createResponse.error) {
      res.error = `Failed to create user: ${createResponse.error.message}`;
    }
  }

  res.data = { success: true };
  return res;
}
