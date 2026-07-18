import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import {
  userTable,
} from "@/drizzle/schema";

export const sessionsTable = pgTable("sessions", {
  id: varchar("id", { length: 255 }).primaryKey(),

  hashToken: varchar("hash_Token", { length: 255 }).notNull(),

  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  userAgent: text("user_agent").notNull(),

  ip: varchar("ip", { length: 45 }).notNull(),

  expiresAt: timestamp("expires_at").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionsTable.userId],
    references: [userTable.id],
  }),
}));
