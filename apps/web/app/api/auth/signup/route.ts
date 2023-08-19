import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLogger } from "logging";

const log = getLogger(__filename);

import type { Database } from "@/lib/database.types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const password2 = String(formData.get("confirmPassword"));
  const supabase = createRouteHandlerClient<Database>({ cookies });

  if (password !== password2) {
    return NextResponse.error()
  }

  try {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    });

    if (res.error) {
      log.error("Error signing up user: ", res.error);
      return NextResponse.redirect("/500", {
        status: 500,
        statusText: res.error.message,
      });
    }

    const user = res.data.user ?? res.data.session?.user;
    if (!user) {
      const msg = "No session or user returned";
      log.error("Something went wrong during signup, please try again: ", msg);
      return NextResponse.redirect("/500", {
        status: 500,
        statusText: msg,
      });
    }

    log.debug("Signed up user: ", user);
  } catch (error) {
    log.error(error);
    return NextResponse.redirect(requestUrl.origin, {
      status: 500,
    });
  }

  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
