import { db } from "@/config/db";

export type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];
export type DBClient =
  typeof db | Tx;

export type GetUserInfo = {
  ip: string;
  userAgent: string;
};

export type User = {
  id: number;
};

export type SessionTokenPayload = {
  sid: string;
  sub: number;
};

export type CreateSessionInDB = {
  sessionId: string;
  token: string;
  userId: number;
  ip: string;
  userAgent: string;
  dbClient: DBClient
};

