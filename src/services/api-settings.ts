import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
import { DEFAULT_HOUSE_RULES, HOUSE_RULES_SCRIPT, SETTINGS_ROW_ID, SUPABASE_ERROR_CODES } from "@/lib/constants";

function settingsError(error: PostgrestError) {
  if (error.code === SUPABASE_ERROR_CODES.missingColumn) return new Error(`The new house rules aren't set up yet. Run ${HOUSE_RULES_SCRIPT} in the Supabase SQL Editor.`);
  if (error.code === SUPABASE_ERROR_CODES.forbidden) return new Error("Only administrators can change the house rules.");
  if (SUPABASE_ERROR_CODES.readable.includes(error.code)) return new Error(error.message);
  return new Error("Settings could not be updated");
}

export async function getSettings(): Promise<Settings> {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return { ...DEFAULT_HOUSE_RULES, ...data };
}

export async function updateSetting(newSetting: Partial<SettingsFormValues>) {
  const { data, error } = await supabase.from("settings").update(newSetting).eq("id", SETTINGS_ROW_ID).select().single();

  if (error) {
    console.error(error);
    throw settingsError(error);
  }
  return data;
}
