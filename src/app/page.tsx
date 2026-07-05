import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/auth/current-user";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/employee");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-20 sm:px-8 lg:px-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground shadow-sm">
            Smart hiring for modern teams
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Find the right talent or land your next role faster.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Build a polished hiring experience with a job portal that makes it
            easy for employers and applicants to connect.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Create account
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Streamlined onboarding",
              description: "Set up employer profiles quickly with a guided flow.",
            },
            {
              title: "Clear applicant tracking",
              description: "Monitor applications and keep hiring moving forward.",
            },
            {
              title: "Modern experience",
              description: "Enjoy a clean interface built for day-to-day hiring.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-medium text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
