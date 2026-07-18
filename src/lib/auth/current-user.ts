"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { getTokenPayload } from "./jwt";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { deleteSessionFromDB } from "./session";
import { SESSION_TIME, SESSION_TIME_HALF } from "@/features/auth/auth.constants";
import { sessionsTable, userTable } from "@/drizzle/schema";

export const getCurrentUser = cache(async () => {
  const cookie = await cookies();

  const sessionToken = cookie.get("sessionToken")?.value;

  if (!sessionToken) return null;

  const user = await validateSessionAndGetUser(sessionToken);

  return user;
});

export const validateSessionAndGetUser = async (token: string) => {
  const payload = getTokenPayload(token);
  const date = Date.now();

  const [user] = await db
    .select({
      id: userTable.id,
      session: {
        id: sessionsTable.id,
        userAgent: sessionsTable.userAgent,
        ip: sessionsTable.ip,
        expireDate: sessionsTable.expiresAt,
      },
      name: userTable.name,
      username: userTable.username,
      email: userTable.email,
      role: userTable.role,
    })
    .from(sessionsTable)
    .where(eq(sessionsTable.id, payload.sid))
    .innerJoin(userTable, eq(userTable.id, sessionsTable.userId));

  if (!user) {
    return null;
  }

  if (date >= user.session.expireDate.getTime())
    return deleteSessionFromDB(user.session.id);

  if (date >= user.session.expireDate.getTime() - SESSION_TIME_HALF * 1000) {
    await db
      .update(sessionsTable)
      .set({
        expiresAt: new Date(date + SESSION_TIME * 1000),
      })
      .where(eq(sessionsTable.id, user.session.id));
  }

  return {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role,
    session: {
      id: user.session.id,
      userAgent: user.session.userAgent,
      ip: user.session.ip,
      expiresAt: user.session.expireDate,
    },
  };
};


