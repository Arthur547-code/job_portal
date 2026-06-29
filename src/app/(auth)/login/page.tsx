"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { loginAction } from "../../../features/auth/Actions/login.Action";

import { Input } from "@base-ui/react/input";
import { Eye, EyeOff, Loader2, Lock, Mail, UserCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { LoginSchemaTypes } from "@/features/auth/schema/auth.schemaValidation";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaTypes>();

  const router = useRouter();

  const onSubmit = async (values: LoginSchemaTypes) => {
    // async banayein

    setIsPending(true);

    try {
      // Await karein taaki loading state sahi chale
      const result = await toast.promise(loginAction(values), {
        loading: "Logging in...",
        success: (res: any) => {
          if (!res.success) throw new Error(res.message);

          return "Login successfully!";
        },
        error: (err) => err.message || "Server error",
      });

      // Yahan Redirect ka logic aayega: router.push('/dashboard')

      if (result.success && result.role === "employee") {
        router.replace("/employee");
      }

      if (result.success && result.role === "applicant") {
        router.replace("/applicant");
      }
    } catch (err: any) {
      // Toast handles error, but you can log it here
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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

          <CardDescription>Login your account to get started</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3 p-4">
          <form
            className="space-y-3"
            method="post"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email */}
            <div className="space-y-1">
              <Label>Email Address *</Label>
              <div className="flex items-center border rounded-md px-3">
                <Mail className="w-4 h-4 text-gray-400 mr-2" />
                <Input
                  required
                  {...register("email")}
                  type="email"
                  className="border-none focus-visible:ring-0 py-2"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password *</Label>
              <div className="flex items-center border rounded-md px-3">
                <Lock className="w-4 h-4 text-gray-400 mr-2" />

                <Input
                  required
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className="flex-1 border-none focus-visible:ring-0 py-2"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="ml-2 cursor-pointer"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <Button
              disabled={isPending}
              type="submit"
              className="w-full h-9 bg-black text-white hover:bg-gray-800 mt-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging Account...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href={"/register"}
              className="text-black font-medium cursor-pointer"
            >
              Register here
            </Link>
          </p>
          <Link
            href="/forgot-password"
            className="block text-center text-sm text-gray-700 hover:text-gray-600 font-semibold"
          >
            Forgot password?
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
