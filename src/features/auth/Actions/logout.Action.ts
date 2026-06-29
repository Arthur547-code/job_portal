"use server";

import { getTokenPayload } from "@/lib/auth/jwt";
import { deleteSessionFromDB } from "@/lib/auth/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logOut = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("sessionToken")?.value;

  if (token) {
    try {
      const { sid } = getTokenPayload(token);

      await deleteSessionFromDB(sid);
    } catch (error) {
      // ignore invalid token
      console.error("Logout session cleanup failed:", error);
    }
  }

  cookieStore.delete("sessionToken");

  redirect("/login");
};
