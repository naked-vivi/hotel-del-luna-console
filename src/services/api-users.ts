import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "./supabase";

export const USERS_PAGE_SIZE = 10;

export type StaffRole = "admin" | "staff";

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  emailConfirmed: boolean;
  /** Present once the 202610220001 migration has been applied. */
  avatar?: string;
  role?: StaffRole;
  lastSignInAt?: string | null;
}

export interface UserAccountsPage {
  users: UserAccount[];
  count: number;
  page: number;
}

/** Turn a database error into a sentence staff can act on. */
function friendlyError(error: PostgrestError, fallback: string): Error {
  if (error.code === "PGRST202" || error.code === "42883") {
    return new Error("This action isn't set up yet. Run the Staff page script in Supabase (see supabase/README.md).");
  }
  if (error.code === "42501") return new Error("Only administrators can do this.");
  // Messages we raise ourselves in SQL are already written for people.
  if (error.code === "22023" || error.code === "P0002") return new Error(error.message);
  return new Error(fallback);
}

export async function getUserAccounts(page: number): Promise<UserAccountsPage> {
  const { data, error } = await supabase.rpc("list_user_accounts", {
    p_page: page,
    p_page_size: USERS_PAGE_SIZE,
  });

  if (error) throw friendlyError(error, "Staff accounts could not be loaded. Please try again.");

  if (!data || !Array.isArray(data.users) || typeof data.count !== "number" || typeof data.page !== "number") {
    throw new Error("Staff accounts could not be loaded. Please try again.");
  }
  return data as UserAccountsPage;
}

export async function updateUserAccount({ id, fullName, role }: { id: string; fullName: string; role: StaffRole }): Promise<UserAccount> {
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
