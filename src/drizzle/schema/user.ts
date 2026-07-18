import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import {
  employersTable,
  applicantsTable,
  sessionsTable,
} from "@/drizzle/schema";

export const role = pgEnum("role", ["applicant", "employee"]);

export const userTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  name: varchar("name", { length: 255 }).notNull(),

  username: varchar("username", { length: 255 })
    .notNull()
    .unique("unique_user_username"),

  email: varchar("email", { length: 255 })
    .notNull()
    .unique("unique_user_email"),

  role: role().default("applicant").notNull(),

  password: text("password").notNull(),

  // phoneNo: varchar("phone_no", { length: 20 }).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),

  deletedAt: timestamp("deleted_at"),
});

export const usersRelations = relations(userTable, ({ one, many }) => ({
  applicant: one(applicantsTable, {
    fields: [userTable.id],
    references: [applicantsTable.userId],
  }),
  employer: one(employersTable, {
    fields: [userTable.id],
    references: [employersTable.userId],
  }),
  sessions: many(sessionsTable),
}));
