import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";

import { employersTable } from "@/drizzle/schema";

export const jobsTypeEnum = pgEnum("job_type", [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "temporary",
  "freelance",
]);

export const workTypeEnum = pgEnum("work_type", [
  "on-site",
  "remote",
  "hybrid",
]);

export const jobLevelEnum = pgEnum("job_level", [
  "intern",
  "entry-level",
  "associate",
  "mid-level",
  "senior",
  "lead",
  "manager",
  "director",
  "executive",
]);

export const currencyEnum = pgEnum("currency", [
  "INR",
  "USD",
  "EUR",
  "GBP",
  "CAD",
  "AUD",
  "JPY",
  "SGD",
]);

export const salaryPeriodEnum = pgEnum("salary_period", [
  "hour",
  "day",
  "week",
  "month",
  "year",
]);

export const minimumEducationEnum = pgEnum("minimum_education", [
  "high-school",
  "diploma",
  "associate-degree",
  "bachelor-degree",
  "master-degree",
  "doctorate",
  "not-required",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "draft",
  "published",
  "closed",
  "expired",
]);

export const jobsTable = pgTable("jobs", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  employerId: integer("employer_id")
    .notNull()
    .references(() => employersTable.id, {
      onDelete: "cascade",
    }),

  jobTitle: varchar("job_title", {
    length: 255,
  }).notNull(),

  jobType: jobsTypeEnum("job_type").notNull(),

  workType: workTypeEnum("work_type").notNull(),

  jobLevel: jobLevelEnum("job_level").notNull(),

  minSalary: integer("min_salary"),
  maxSalary: integer("max_salary"),

  currency: currencyEnum("currency").notNull(),

  salaryPeriod: salaryPeriodEnum("salary_period").notNull(),

  minimumEducation: minimumEducationEnum("minimum_education"),

  expiryDate: date("expiry_date", {
    mode: "string",
  }),

  city: varchar("city", { length: 255 }).notNull(),

  state: varchar("state", { length: 255 }).notNull(),

  country: varchar("country", { length: 255 }).notNull(),

  minExperience: integer("min_experience"),

  maxExperience: integer("max_experience"),

  status: jobStatusEnum("status").default("draft").notNull(),

  jobDescription: text("job_description").notNull(),

  deletedAt: timestamp("deleted_at"),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const jobsRelations = relations(jobsTable, ({ one }) => ({
  employer: one(employersTable, {
    fields: [jobsTable.employerId],
    references: [employersTable.id],
  }),
}));
