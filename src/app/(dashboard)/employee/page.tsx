import EmployersProfileStatus from "@/features/auth/components/employerComponents/EmployersProfileStatus";
import EmployerStats from "@/features/auth/components/employerComponents/EmployerStats";
import { getCurrentUser } from "@/lib/auth/current-user";
import { redirect } from "next/navigation";

const Empolyee = async () => {
  const user = await getCurrentUser();

  if (!user) return redirect("/login");

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold text-foreground">
        <h1 className="">
          Hello, <span>{user?.name.toLowerCase()}</span>
        </h1>
        <p className="text-muted-foreground">
          Here is your daily activities and applications.
        </p>
      </div>

      <EmployerStats />
      <EmployersProfileStatus/>
    </div>
  );
};

export default Empolyee;
