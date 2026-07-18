import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

import { userTable  } from "@/drizzle/schema";
import { jobsTable } from "./job";

export const industryTypesEnum = pgEnum("industry_types", [
  "development",
  "design",
  "infrastructure",
]);

export const companySizesEnum = pgEnum("company_sizes", [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
]);

export const employersTable = pgTable("employers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),

  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => userTable.id, {
      onDelete: "cascade",
    }),

  companyName: varchar("company_name", {
    length: 255,
  }),

  companyWebsiteUrl: varchar("company_website_url", {
    length: 255,
  }),

  companyLogo: varchar("company_logo", {
    length: 500,
  }),

  companyBannerUrl: text("company_banner_url"),

  companyEstablishmentYear: integer("company_establishment_year"),

  companyDescription: text("company_description"),

  industryType: industryTypesEnum("industry_type"),

  companySize: companySizesEnum("company_size"),

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

export const employersRelations = relations(
  employersTable,
  ({ one, many }) => ({
    user: one(userTable, {
      fields: [employersTable.userId],
      references: [userTable.id],
    }),

    jobs: many(jobsTable),
  }),
);
