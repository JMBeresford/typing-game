import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLogger } from "logging";

const log = getLogger(__filename);

import type { Database } from "@/lib/database.types";
import { ValidationErrors } from "app/_modals/utils/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const password2 = String(formData.get("confirmPassword"));
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const validationErrors: ValidationErrors = {
    email: null,
    password: null,
    confirmPassword: null,
  };

  if (password !== password2) {
    validationErrors.password = "Passwords do not match";
    validationErrors.confirmPassword = "Passwords do not match";
  }

  if (password.length < 8 || password.length > 64) {
    validationErrors.password = "Password must be between 8-64 characters";
  }

  if (email.match(/.+@.+\..+/) === null) {
    validationErrors.email = "Please enter a valid email address";
  }

  if (Object.values(validationErrors).some(error => error !== null)) {
    return NextResponse.json({ validationErrors }, { status: 400 });
  }

  try {
    const authRes = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
      },
    });

    if (authRes.error) {
      log.error("Error signing up user: ", authRes.error);
      return NextResponse.json({ error: authRes.error }, { status: authRes.error.status });
    }

    const user = authRes.data.user ?? authRes.data.session?.user;
    if (!user) {
      const msg = "Something went wrong during signup: No session or user returned";
      log.error(msg);
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    log.debug("Signed up user: ", user);
  } catch (error) {
    log.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ errors: null, success: true }, { status: 200 });
}
