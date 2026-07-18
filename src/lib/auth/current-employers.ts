import { db } from "@/config/db";
import { getCurrentUser } from "./current-user";
import { eq } from "drizzle-orm";
import { employersTable } from "@/drizzle/schema";

export const getCurrentEmployerDetails = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return null;

  if (currentUser.role !== "employee") return null;

  const [employer] = await db
    .select()
    .from(employersTable)
    .where(eq(employersTable.userId, currentUser.id));

  if (!employer) {
    return {
      ...currentUser,
      employerDetails: null,
      allFieldsRequired: false,
    };
  }

  const allFieldsRequired = [
    employer.companyName,
    employer.companySize,
    // employer.companyWebsiteUrl,
    employer.companyLogo,
    employer.companyDescription,
    employer.companyEstablishmentYear,
    employer.location,
    employer.industryType,
  ].every(Boolean);

  return {
    ...currentUser,
    employerDetails: employer,
    allFieldsRequired,
  };
};
