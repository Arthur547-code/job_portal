import { z } from "zod";
import { industryTypes, companySizes } from "../types/employers.types";

const createOptionalUrlField = (customMessage: string) =>
  z
    .union([z.string().url(customMessage), z.literal("")])
    .nullable()
    .optional(); // Added .nullable() in case your database or API passes null

export const EmployerSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters.")
    .max(255, "Company name is too long."),

  companyDescription: z
    .string()
    .trim()
    .min(20, "Company description must be at least 20 characters.")
    .max(2000, "Company description is too long."),

  companyEstablishmentYear: z
    .number({
      error: "Establishment year is required.",
    })
    .int()
    .min(1800, "Please enter a valid establishment year.")
    .refine((year) => year <= new Date().getFullYear(), {
      message: "Establishment year cannot be in the future.",
    }),

  location: z.string().trim().min(2, "Location is required.").max(255),

  industryType: z.enum(industryTypes, {
    error: "Please select an industry type.",
  }),

  companySize: z.enum(companySizes, {
    error: "Please select a company size.",
  }),

  companyWebsiteUrl: createOptionalUrlField(
    "Please enter a valid website URL.",
  ),
  companyLogo: createOptionalUrlField("Please enter a valid logo URL."),
  companyBannerUrl: createOptionalUrlField("Please enter a valid banner URL."),
});

export type EmployerSchemaType = z.infer<typeof EmployerSchema>;
