import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";
import EmployerSidebar from "@/features/auth/components/employerComponents/EmployerSidebar";

export const metadata: Metadata = {
  title: "Employee Dashboard",
  description:
    "Access your employee dashboard to manage job listings, review applications, and streamline hiring workflows.",
};

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user?.role !== "employee") {
    redirect("/unauthorized");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <EmployerSidebar />

      <main className="container mx-auto mt-5 ml-72 mr-5">{children}</main>
    </div>
  );
}
