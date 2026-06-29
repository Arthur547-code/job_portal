"use server";

import { applicantsTable, employersTable, userTable } from "@/drizzle/schema";
import { createSessionInDB, setSessionCookie } from "../../../lib/auth/session";
import { db } from "@/config/db";
import { eq, or } from "drizzle-orm";
import {
  RegistrationSchemaExtends,
  RegistrationSchemaExtendsTypes,
} from "../schema/auth.schemaValidation";
import bcrypt from "bcrypt";
import { getUserInfo } from "@/lib/request";
import { genToken } from "@/lib/auth/jwt";

export const registrationAction = async (
  data: RegistrationSchemaExtendsTypes,
): Promise<{
  success: boolean;
  message: string;
  role?: "applicant" | "employee";
}> => {
  const validated = RegistrationSchemaExtends.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message ?? "Invalid Data",
    };
  }

  const { name, username, email, role, password } = validated.data;

  const normalizedEmail = email.toLowerCase().trim();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await db.transaction(async (tx) => {
      const existingUser = await tx
        .select({
          username: userTable.username,
          email: userTable.email,
        })
        .from(userTable)
        .where(
          or(
            eq(userTable.username, username),
            eq(userTable.email, normalizedEmail),
          ),
        )
        .limit(1);

      const existing = existingUser[0];

      if (existing?.username === username) {
        throw new Error("Username already taken!");
      }

      if (existing?.email === normalizedEmail) {
        throw new Error("Email already registered!");
      }

      const [user] = await tx
        .insert(userTable)
        .values({
          name,
          username,
          email: normalizedEmail,
          role,
          password: hashedPassword,
        })
        .returning({
          insertedId: userTable.id,
          role: userTable.role,
        });

      if (role === "employee") {
        await tx.insert(employersTable).values({
          userId: user.insertedId,
        });
      } else {
        await tx.insert(applicantsTable).values({
          userId: user.insertedId,
        });
      }

      const { ip, userAgent } = await getUserInfo();

      const sessionId = crypto.randomUUID();

      const token = genToken({
        sid: sessionId,
        sub: user.insertedId,
      });

      await createSessionInDB({
        sessionId,
        token,
        userId: user.insertedId,
        ip,
        userAgent,
        dbClient: tx,
      });

      return {
        token,
        role: user.role,
      };
    });

    await setSessionCookie(result.token);

    return {
      success: true,
      role: result.role,
      message: "Registration successful!",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
};
