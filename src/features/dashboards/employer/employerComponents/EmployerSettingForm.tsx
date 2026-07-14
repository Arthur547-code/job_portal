"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
  Briefcase,
  Building2,
  CalendarDays,
  FileText,
  Globe,
  Loader,
  MapPin,
  User,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import TextEditorSetup from "@/features/textEditor/TextEditorSetup";
import {
  EmployerSchema,
  EmployerSchemaType,
} from "@/features/dashboards/employer/Schema/employer.schemaValidation";

import {
  companySizes,
  industryTypes,
} from "@/features/dashboards/types/employers.types";
import { updateEmployerProfile } from "../Actions/employer.Action";
import ImageUpload from "../../../uploadThings/ImageUpload";
import { useRouter } from "next/navigation";

type EmployerSettingFormProps = {
  initialData?: Partial<EmployerSchemaType>;
};

const EmployerSettingForm: React.FC<EmployerSettingFormProps> = ({
  initialData,
}) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EmployerSchemaType>({
    defaultValues: initialData,
    resolver: zodResolver(EmployerSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<EmployerSchemaType> = async (data) => {
    try {
      const res = await toast.promise(updateEmployerProfile(data), {
        loading: "Updating company profile...",
        success: (res) => {
          if (!res.success) {
            throw new Error(res.message);
          }
          return "Company profile updated successfully!";
        },
        error: (err) => err.message || "Server error",
      });

      if (res.success) {
        // Production Trick: data pass karne se form reset ho jata hai aur isDirty false ho jata hai.
        // Isse button automatically disable ho jayega submit hote hi!
        router.push("/employee");
        reset(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full bg-yellow-500 px-4 py-6 sm:px-6 lg:px-6 flex flex-col gap-6 flex-wrap">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
          <p className="text-muted-foreground mt-2">
            Complete your company information to start posting jobs and attract
            the right candidates.
          </p>
        </div>

        <Card className="border shadow-sm max-w-full">
          <CardContent className="p-6 sm:p-5 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Logos & Banners Row */}
              <div className="flex flex-col gap-5 sm:flex-row">
                {/* Upload Company Logo */}
                <Controller
                  control={control}
                  name="companyLogo"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2 flex-1">
                      <Label>Company Logo</Label>
                      <ImageUpload
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        descriptions={"Upload your company logo"}
                        className={cn(
                          fieldState.error &&
                            "ring-1 ring-destructive/50 rounded-lg",
                          "h-56 w-full sm:w-64",
                        )}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                {/* Upload Banner Image */}
                <Controller
                  control={control}
                  name="companyBannerUrl"
                  render={({ field, fieldState }) => (
                    <div className="space-y-2 flex-2">
                      <Label>Company Banner</Label>
                      <ImageUpload
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        descriptions={"Upload your company banner image"}
                        className={cn(
                          fieldState.error &&
                            "ring-1 ring-destructive/50 rounded-lg",
                          "h-56 w-full sm:w-96",
                        )}
                      />
                      {fieldState.error && (
                        <p className="text-sm text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <div
                  className={cn(
                    "flex items-center rounded-md border px-3 transition-colors focus-within:ring-1 focus-within:ring-primary",
                    errors.companyName ? "border-red-500" : "border-input",
                  )}
                >
                  <Building2 className="text-muted-foreground mr-3 h-4 w-4" />
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Google Inc."
                    className="border-0 shadow-none focus-visible:ring-0"
                    {...register("companyName")}
                  />
                </div>
                {errors.companyName && (
                  <p className="text-destructive text-sm">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Company Description with Tiptap */}
              <div className="space-y-2">
                <Label
                  htmlFor="companyDescription"
                  className="flex items-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Company Description *
                </Label>
                <div className="border-input overflow-hidden rounded-lg border">
                  <Controller
                    control={control}
                    name="companyDescription"
                    render={({ field }) => (
                      <TextEditorSetup
                        content={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
                {errors.companyDescription && (
                  <p className="text-destructive text-sm">
                    {errors.companyDescription.message}
                  </p>
                )}
              </div>

              {/* Industry Type & Company Size */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Industry Type</Label>
                  <Controller
                    name="industryType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          className={cn(
                            "w-full",
                            errors.industryType && "border-red-500",
                          )}
                        >
                          <Briefcase className="text-muted-foreground mr-3 h-4 w-4" />
                          <SelectValue placeholder="Select industry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.industryType && (
                    <p className="text-destructive text-sm">
                      {errors.industryType.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Controller
                    name="companySize"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <User className="text-muted-foreground mr-3 h-4 w-4" />
                          <SelectValue placeholder="Select Company Size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type} Employees
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.companySize && (
                    <p className="text-destructive text-sm">
                      {errors.companySize.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Year, Location & Website */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Establishment Year *</Label>
                  <div
                    className={cn(
                      "flex items-center rounded-md border px-3 focus-within:ring-1 focus-within:ring-primary",
                      errors.companyEstablishmentYear && "border-red-500",
                    )}
                  >
                    <CalendarDays className="text-muted-foreground mr-3 h-4 w-4" />
                    <Input
                      type="number"
                      placeholder="2020"
                      className="border-0 shadow-none focus-visible:ring-0"
                      {...register("companyEstablishmentYear", {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  {errors.companyEstablishmentYear && (
                    <p className="text-destructive text-sm">
                      {errors.companyEstablishmentYear.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div
                    className={cn(
                      "flex items-center rounded-md border px-3 focus-within:ring-1 focus-within:ring-primary",
                      errors.location ? "border-red-500" : "border-input",
                    )}
                  >
                    <MapPin className="text-muted-foreground mr-3 h-4 w-4" />
                    <Input
                      id="location"
                      placeholder="Patna, Bihar"
                      className="border-0 shadow-none focus-visible:ring-0"
                      {...register("location")}
                    />
                  </div>
                  {errors.location && (
                    <p className="text-destructive text-sm">
                      {errors.location.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="companyWebsiteUrl">
                    Company Website (Optional)
                  </Label>
                  <div
                    className={cn(
                      "flex items-center rounded-md border px-3 focus-within:ring-1 focus-within:ring-primary",
                      errors.companyWebsiteUrl
                        ? "border-red-500"
                        : "border-input",
                    )}
                  >
                    <Globe className="text-muted-foreground mr-3 h-4 w-4" />
                    <Input
                      id="companyWebsiteUrl"
                      type="url"
                      placeholder="https://yourcompany.com"
                      className="border-0 shadow-none focus-visible:ring-0"
                      {...register("companyWebsiteUrl")}
                    />
                  </div>
                  {errors.companyWebsiteUrl && (
                    <p className="text-destructive text-sm">
                      {errors.companyWebsiteUrl.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button Section */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isDirty}
                  className="w-full sm:w-auto min-w-30"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>

                {isDirty && !isSubmitting && (
                  <p className="text-sm text-amber-500 font-medium animate-pulse">
                    You have unsaved changes.
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployerSettingForm;
