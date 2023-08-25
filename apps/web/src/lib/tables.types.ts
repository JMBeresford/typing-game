import { PostgrestError } from "@supabase/supabase-js";
import { Database } from "./database.types";

export type TableNames = keyof Database["public"]["Tables"];
export type EnumNames = keyof Database["public"]["Enums"];
export type Tables<T extends TableNames> = Database["public"]["Tables"][T]["Row"];
export type TableColumns<T extends TableNames> = Database["public"]["Tables"][T]["Row"];
export type TableColumnNames<T extends TableNames> = keyof Database["public"]["Tables"][T]["Row"];
export type Enums<T extends EnumNames> = Database["public"]["Enums"][T];

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type DbResultErr = PostgrestError;
