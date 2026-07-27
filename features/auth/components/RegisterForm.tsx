"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import AuthCard from "./AuthCard";
import InputField from "./InputField";
import FormButton from "./FormButton";
import { useRegister } from "../hook/useAuth";
import { RegisterFormData, registerSchema } from "../schemas/auth.schema";

export default function RegisterForm() {
  const router = useRouter();
  const { mutate: registerUser, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data, {
      onSuccess: () => {
       
        router.push("/login");
      },
    });
  };

  return (
    <AuthCard title="Create an account">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg text-center">
            {error.response?.data?.message || "Registration failed"}
          </div>
        )}

        <InputField
          label="Username"
          registration={register("username")}
          error={errors.username}
          placeholder="Choose a username"
          isRequired
        />

        <InputField
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email}
          placeholder="Enter your email"
          isRequired
        />

        <InputField
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password}
          placeholder="Create a password"
          isRequired
          hasToggle
        />

        <InputField
          label="Confirm Password"
          type="password"
          registration={register("confirmPassword")}
          error={errors.confirmPassword}
          placeholder="Confirm your password"
          isRequired
          hasToggle
        />

        <FormButton isLoading={isPending} type="submit" loadingText="Creating account...">
          Sign Up
        </FormButton>

        <div className="text-center text-sm text-muted-foreground mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}