"use client";

import { useState } from "react"; // 1. State import karein
import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  LayoutDashboard,
  Menu,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { type NavItem } from "@/features/dashboards/types/employers.types";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const EmployerSidebar = () => {
  const pathname = usePathname();
  // 2. Control Sheet open/close state manually
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems: NavItem[] = [
    { name: "Overview", icon: LayoutDashboard, href: "/employee" },
    { name: "Employers Profile", icon: User, href: "/employee/profile" },
    { name: "Post a Job", icon: Briefcase, href: "/employee/jobs" },
    { name: "Save Candidate", icon: Bookmark, href: "/employee/candidates" },
    { name: "Plans & Billing", icon: CreditCard, href: "/employee/billing" },
    { name: "All Companies", icon: Building, href: "/employee/companies" },
    { name: "Settings", icon: Settings, href: "/employee/settings" },
  ];

  const NavLinks = () => (
    <>
      <div className="p-6">
        <h2 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          Employers Dashboard
        </h2>
      </div>

      <nav className="space-y-1 px-3 flex-1">
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
              // Mobile view me link par click karte hi sidebar auto-close ho jaye uske liye
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <LogoutButton />
      </div>
    </>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="bg-card hidden lg:flex flex-col border-border fixed top-0 bottom-0 left-0 w-64 border-r h-screen z-30">
        <NavLinks />
      </aside>

      {/* 2. MOBILE HAMBURGER & DRAWER (NO HYDRATION ERROR VERSION) */}
      <div className="lg:hidden fixed top-4 left-4 z-40">
        {/* Normal HTML Button Trigger */}
        <Button
          variant="outline"
          size="icon"
          className="shadow-xs"
          onClick={() => setIsOpen(true)} // Button click par state true
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Sheet control via open & onOpenChange props */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent
            side="left"
            className="p-0 w-64 bg-card border-r flex flex-col h-full"
          >
            <SheetTitle className="sr-only">Navigation Sidebar</SheetTitle>
            <SheetDescription className="sr-only">
              Manage listings, candidates, profile, and billing configurations.
            </SheetDescription>
            <NavLinks />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default EmployerSidebar;
