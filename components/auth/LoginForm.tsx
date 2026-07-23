"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/app/schemas/auth.schema"; 
import { useLogin } from "@/app/hooks/useAuth";
import AuthCard from "./AuthCard";
import InputField from "./InputField";
import FormButton from "./FormButton";


export default function LoginForm() {
    const { mutate: login, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(data)
  };

  return (
    <AuthCard title="Sign in to your account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg text-center">
            {error.response?.data?.message || "Invalid username or password"}
          </div>
        )}
        <InputField
          label="Username"
          registration={register("username")}
          error={errors.username}
          placeholder="Enter your username"
          isRequired
        />

        <InputField
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password}
          placeholder="Enter your password"
          isRequired
          hasToggle
        />

        <FormButton isLoading={isPending} loadingText="Signing in...">
          Sign In
        </FormButton>

        <div className="text-center text-sm text-muted-foreground mt-2">
          Dont have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}