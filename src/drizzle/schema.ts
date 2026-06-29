import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  varchar,
  text,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

export const role = pgEnum("role", ["applicant", "employee"]);

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

export const sessionsRelations = relations(sessionsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [sessionsTable.userId],
    references: [userTable.id],
  }),
}));

export const applicantsRelations = relations(applicantsTable, ({ one }) => ({
  user: one(userTable, {
    fields: [applicantsTable.userId],
    references: [userTable.id],
  }),
}));

export const employersRelations = relations(employersTable, ({ one }) => ({
  user: one(userTable, {
    fields: [employersTable.userId],
    references: [userTable.id],
  }),
}));
