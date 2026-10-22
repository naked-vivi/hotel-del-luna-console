import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";
import { SUPABASE_ERROR_CODES, USERS_PAGE_SIZE } from "@/lib/constants";

function friendlyError(error: PostgrestError, fallback: string): Error {
  if (SUPABASE_ERROR_CODES.missingFunction.includes(error.code)) {
    return new Error("This action isn't set up yet. Run the Staff page script in Supabase (see supabase/README.md).");
  }
  if (error.code === SUPABASE_ERROR_CODES.forbidden) return new Error("Only administrators can do this.");
  if (SUPABASE_ERROR_CODES.readable.includes(error.code)) return new Error(error.message);
  return new Error(fallback);
}

export async function getUserAccounts({ page, search, role }: UserAccountsQuery): Promise<UserAccountsPage> {
  const { data, error } = await supabase.rpc("list_user_accounts", {
    p_page: page,
    p_page_size: USERS_PAGE_SIZE,
    p_search: search || null,
    p_role: role,
  });

  if (error) throw friendlyError(error, "Staff accounts could not be loaded. Please try again.");

  if (!data || !Array.isArray(data.users) || typeof data.count !== "number" || typeof data.page !== "number") {
    throw new Error("Staff accounts could not be loaded. Please try again.");
  }
  return data as UserAccountsPage;
}

export async function updateUserAccount({ id, fullName, role }: UpdateUserAccountArgs): Promise<UserAccount> {
  const { data, error } = await supabase.rpc("update_user_account", {
    p_user_id: id,
    p_full_name: fullName,
    p_role: role,
  });

  if (error) throw friendlyError(error, "The changes could not be saved. Please try again.");
  return data as UserAccount;
}

export async function deleteUserAccount(id: string): Promise<void> {
  const { error } = await supabase.rpc("delete_user_account", { p_user_id: id });
  if (error) throw friendlyError(error, "The account could not be deleted. Please try again.");
}
