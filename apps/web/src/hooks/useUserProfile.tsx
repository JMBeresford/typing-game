"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export function useUserProfile(user_id?: string): Profile | null {
  const supabase = createClientComponentClient<Database>();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!user_id) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single()
      .then(({ data }) => setProfile(data));
  }, [user_id, supabase]);

  return profile;
}
