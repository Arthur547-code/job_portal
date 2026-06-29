import { Button } from "@/components/ui/button";
import { logOut } from "@/features/auth/Actions/logout.Action";

function LogoutButton() {
  return (
    <form action={logOut} className="absolute bottom-6 left-3 right-3">
      <Button type="submit">Log Out</Button>
    </form>
  );
}

export default LogoutButton;
