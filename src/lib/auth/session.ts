import { cookies } from "next/headers";
import { db } from "@/config/db";
import { sessionsTable } from "@/drizzle/schema";
import crypto from "crypto";

import { type CreateSessionInDB } from "@/features/auth/types/auth.types";
import { SESSION_TIME } from "@/features/auth.constants";

import { eq } from "drizzle-orm";

export const createSessionInDB = async ({
  sessionId,
  token,
  userId,
  ip,
  userAgent,
  dbClient,
}: CreateSessionInDB) => {
  const expiresAt = new Date(
    Date.now() + SESSION_TIME * 1000,
  );

  const hashToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  await dbClient.insert(sessionsTable).values({
    id: sessionId,
    hashToken,
    userId,
    ip,
    userAgent,
    expiresAt,
  });

  return token;
};

export const setSessionCookie = async (
  token: string,
) => {
  const cookieStore = await cookies();

  cookieStore.set("sessionToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TIME,
    path: "/",
  });
};


export const deleteSessionFromDB = async (sessionId: string) => {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  return null;
};
