import EmployerSettingForm from "@/features/dashboards/employer/employerComponents/EmployerSettingForm";
import { getCurrentEmployerDetails } from "@/lib/auth/current-employers";

const employerSetting = async () => {
  const employer = await getCurrentEmployerDetails();

  return (
    <div className="space-y-6">
      <EmployerSettingForm
        initialData={{
          companyName: employer?.employerDetails?.companyName ?? "",

          companyWebsiteUrl: employer?.employerDetails?.companyWebsiteUrl ?? "",

          companyLogo: employer?.employerDetails?.companyLogo ?? "",

          companyBannerUrl: employer?.employerDetails?.companyBannerUrl ?? "",

          companyEstablishmentYear:
            employer?.employerDetails?.companyEstablishmentYear ?? undefined,

          companyDescription:
            employer?.employerDetails?.companyDescription ?? "",

          industryType: employer?.employerDetails?.industryType ?? undefined,

          companySize: employer?.employerDetails?.companySize ?? undefined,

          location: employer?.employerDetails?.location ?? "",
        }}
      />
    </div>
  );
};

export default employerSetting;
