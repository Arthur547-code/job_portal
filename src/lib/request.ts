import { type GetUserInfo } from "@/features/auth/types/auth.types";
import { headers } from "next/headers";

export const getUserInfo = async (): Promise<GetUserInfo> => {
  const headersList = await headers();

  const userAgent = headersList.get("user-agent") || "unknown";

  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    "unknown";

  return {
    ip,
    userAgent,
  };
};
