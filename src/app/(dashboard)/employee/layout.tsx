import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

import EmployerSidebar from "@/features/dashboards/employer/Components/EmployerSidebar";

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
    <div className="flex min-h-screen w-full bg-background">
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />

      {/* Sidebar Component */}
      <EmployerSidebar />

      {/* MAIN VIEWPORT WRAPPER: Responsive spacing fixes */}
      {/* lg:pl-64 lagane se desktop par sidebar ki width preserve hogi, aur pt-16 mobile view par content ko top header button ke neeche push karega */}
      <main className="flex-1 lg:pl-64 w-full pt-16 lg:pt-0 flex flex-col">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
