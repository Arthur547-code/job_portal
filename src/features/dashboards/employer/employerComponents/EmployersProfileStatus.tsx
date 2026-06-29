import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { getCurrentEmployerDetails } from "@/lib/auth/current-employers";
import { ShieldAlertIcon } from "lucide-react";
import Link from "next/link";

const EmployersProfileStatus = async () => {
  const employersDetails = await getCurrentEmployerDetails();

  if (!employersDetails) {
    return null;
  }

  if (employersDetails.allFieldsRequired) {
    return null;
  }
  return (
    <div className="flex flex-col gap-6">
      <Item variant="destructive">
        <ItemMedia variant="image" className="bg-destructive text-white">
          <ShieldAlertIcon className="size-5" />
        </ItemMedia>

        <ItemContent>
          <ItemTitle>Complete Your Company Profile</ItemTitle>

          <ItemDescription className="text-white/80">
            Your employer profile is incomplete. Complete it to post jobs,
            manage candidates, and unlock all employer features.
          </ItemDescription>
        </ItemContent>

        <ItemActions>
          <Link href="/employee/settings">
            <Button size="sm" variant="secondary">
              Complete Profile
            </Button>
          </Link>
        </ItemActions>
      </Item>
    </div>
  );
};

export default EmployersProfileStatus;
