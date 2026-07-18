import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { userTable } from "@/drizzle/schema";

export const maritalStatus = pgEnum("marital_status", [
  "single",
  "married",
  "divorced",
]);

export const gender = pgEnum("gender", ["male", "female", "other"]);

export const education = pgEnum("education", [
  "none",
  "high_school",
  "undergraduate",
  "masters",
  "phd",
]);

export const applicantsTable = pgTable("applicants", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),

  biography: text("biography"),

  dateOfBirth: timestamp("date_of_birth", {
    mode: "string",
  }),

  nationality: varchar("nationality", {
    length: 100,
  }),

  maritalStatus: maritalStatus(),

  gender: gender(),

  education: education(),
  experience: text("experience"),

  websiteUrl: varchar("website_url", {
    length: 255,
  }),

  location: varchar("location", {
    length: 255,
  }),

  deletedAt: timestamp("deleted_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const applicantsRelations = relations(applicantsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [applicantsTable.userId],
    references: [userTable.id],
  }),
}));
