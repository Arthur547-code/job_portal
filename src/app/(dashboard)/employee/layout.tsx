import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

import EmployerSidebar from "@/features/dashboards/employer/employerComponents/EmployerSidebar";

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
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      <EmployerSidebar />

      <main className="container mx-auto mt-5 ml-72 mr-5">{children}</main>
    </div>
  );
}
