"use server";

import { db } from "@/config/db";
import { userTable } from "@/drizzle/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";
import { LoginSchema, LoginSchemaTypes } from "../schema/auth.schemaValidation";
import { createSessionInDB, setSessionCookie } from "../../../lib/auth/session";
import { genToken } from "@/lib/auth/jwt";
import { getUserInfo } from "@/lib/request";

export const loginAction = async (
  data: LoginSchemaTypes,
): Promise<{
  success: boolean;
  message: string;
  role?: "applicant" | "employee";
}> => {
  const validated = LoginSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.message,
    };
  }

  const { email, password } = validated.data;

  const normalizedEmail = email.toLowerCase().trim();

  try {
    const userResult = await db
      .select({
        id: userTable.id,
        email: userTable.email,
        password: userTable.password,
        role: userTable.role,
      })
      .from(userTable)
      .where(eq(userTable.email, normalizedEmail))
      .limit(1);

    const user = userResult[0];

    if (!user) {
      return {
        success: false,
        message: "Invalid Email or Password",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid Email or Password",
      };
    }

    const { ip, userAgent } = await getUserInfo();
    const sessionId = crypto.randomUUID();

    const token = genToken({
      sid: sessionId,
      sub: user.id,
    });

    await createSessionInDB({
      sessionId,
      token,
      userId: user.id,
      ip,
      userAgent,
      dbClient: db,
    });

    await setSessionCookie(token);

    return {
      success: true,
      role: user?.role,
      message: "Login successful!",
    };
  } catch (err) {
    console.error("Login error:", err);

    return {
      success: false,
      message: "Internal server error",
    };
  }
};
