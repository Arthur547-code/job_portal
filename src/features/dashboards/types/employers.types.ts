import { LucideIcon } from "lucide-react";

export type NavItem = {
  name: string;
  icon: LucideIcon;
  href: string;
};

export const industryTypes = [
  "development",
  "design",
  "infrastructure",
] as const;

export type INDUSTRY_TYPES = (typeof industryTypes)[number];

export const companySizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "500+",
] as const;

export type COMPANY_SIZES = (typeof companySizes)[number];

// export interface EmployerCustomType {
//   companyName: string | null;
//   companyWebsiteUrl: string | null;
//   companyLogo: string | null;
//   companyBannerUrl: string | null;
//   companyEstablishmentYear: number | null;
//   companyDescription: string | null;
//   industryType: INDUSTRY_TYPES;
//   companySize: COMPANY_SIZES;
//   location: string | null;
// }
