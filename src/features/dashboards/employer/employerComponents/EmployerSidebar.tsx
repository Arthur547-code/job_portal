"use client";

import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {type NavItem } from "@/features/dashboards/types/employers.types";
import LogoutButton from "@/features/auth/components/LogoutButton";

const EmployerSidebar = () => {
  const pathname = usePathname();

  const navigationItems: NavItem[] = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      href: "/employee",
    },
    {
      name: "Employers Profile",
      icon: User,
      href: "/employee/profile",
    },
    {
      name: "Post a Job",
      icon: Briefcase,
      href: "/employee/jobs",
    },
    {
      name: "Save Candidate",
      icon: Bookmark,
      href: "/employee/candidates",
    },
    {
      name: "Plans & Billing",
      icon: CreditCard,
      href: "/employee/billing",
    },
    {
      name: "All Companies",
      icon: Building,
      href: "/employee/companies",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/employee/settings",
    },
  ];

  return (
    <div className="bg-card border-border fixed top-0 bottom-0 w-64 border-r">
      <div className="p-6">
        <h2 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Employers Dashboard
        </h2>
      </div>

      <nav className="space-y-1 px-3">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/employee"
              ? pathname === item.href
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <LogoutButton />
    </div>
  );
};

export default EmployerSidebar;