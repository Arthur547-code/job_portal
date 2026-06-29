"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Apna sahi path de dena

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

// Components

import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import {
  RegistrationSchemaExtends,
  type RegistrationSchemaExtendsTypes,
} from "@/features/auth/schema/auth.schemaValidation";
import { registrationAction } from "@/features/auth/Actions/register.Action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@base-ui/react/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegistrationSchemaExtendsTypes>({
    resolver: zodResolver(RegistrationSchemaExtends),
    defaultValues: {
      role: "applicant",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: RegistrationSchemaExtendsTypes) => {
    setIsPending(true);

    try {
      const result = await toast.promise(registrationAction(values), {
        loading: "Creating your account...",
        success: (res) => {
          if (!res.success) {
            throw new Error(res.message);
          }

          reset();

          return "Account successfully created!";
        },
        error: (err) => err.message || "Server error",
      });

      if (result.success && result.role === "employee") {
        router.replace("/employee");
      }

      if (result.success && result.role === "applicant") {
        router.replace("/applicant");
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-sm shadow-lg rounded-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-black text-white p-3 rounded-full">
              <UserCheck />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold">
            Join Our Job Portal
          </CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 p-4">
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            {/* Full Name */}
            <div className="space-y-1">
              <Label>Full Name *</Label>
              <div className="flex items-center border rounded-md px-3">
                <User className="w-4 h-4 text-gray-400 mr-2" />
                <Input
                  {...register("name")} // RHF Connection
                  className="border-none focus-visible:ring-0 py-2"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <Label>Username *</Label>
              <div className="flex items-center border rounded-md px-3">
                <User className="w-4 h-4 text-gray-400 mr-2" />
                <Input
                  {...register("username")}
                  className="border-none focus-visible:ring-0 py-2"
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && (
                <p className="text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label>Email Address *</Label>
              <div className="flex items-center border rounded-md px-3">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <Input
                  {...register("email")}
                  type="email"
                  className="border-none focus-visible:ring-0 py-2"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Role (Using Controller for UI libraries like Shadcn) */}
            <div className="space-y-1">
              <Label>I am a *</Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="applicant">Applicant</SelectItem>
                      <SelectItem value="employee">Employee</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.role && (
                <p className="text-xs text-red-500">{errors.role.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password *</Label>
              <div className="flex items-center border rounded-md px-3">
                <Lock className="w-4 h-4 text-gray-400 mr-2" />
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="flex-1 border-none focus-visible:ring-0 py-2"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label>Confirm Password *</Label>
              <div className="flex items-center border rounded-md px-3">
                <Lock className="w-4 h-4 text-gray-400 mr-2" />
                <Input
                  {...register("confirmpassword")} // dhyan rakhna confirmpassword small hai schema mein
                  type={showConfirmPassword ? "text" : "password"}
                  className="flex-1 border-none focus-visible:ring-0 py-2"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye className="w-4 h-4 text-gray-400" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.confirmpassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>

            <Button disabled={isPending} type="submit" className="w-full mt-2">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" /> Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-black font-medium">
              Login here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
