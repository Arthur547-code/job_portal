"use server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { db } from "@/config/db";
import { employersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import {
  EmployerSchema,
  EmployerSchemaType,
} from "../schema/employer.schemaValidation";

export const updateEmployerProfile = async (
  data: EmployerSchemaType,
): Promise<{ success: boolean; message: string }> => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "employee")
    return {
      success: false,
      message: "Unauthorized access.",
    };

  const validated = EmployerSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      message: validated.error.issues[0]?.message ?? "Invalid Data",
    };
  }

  const {
    companyName,
    companyDescription,
    companyLogo,
    companySize,
    industryType,
    location,
    companyEstablishmentYear,
    companyWebsiteUrl,
    companyBannerUrl,
  } = validated.data;

  try {
    const [companyData] = await db
      .update(employersTable)
      .set({
        companyName,
        companyDescription,
        companyEstablishmentYear,
        companySize,
        companyWebsiteUrl,
        location,
        industryType,
        companyLogo,
        companyBannerUrl,
      })
      .where(eq(employersTable.userId, currentUser.id))
      .returning();

    if (!companyData) {
      return {
        success: false,
        message: "Failed to update company profile.",
      };
    }

    return {
      success: true,
      message: "Company profile updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "An unexpected error occurred while updating your profile.",
    };
  }
};
