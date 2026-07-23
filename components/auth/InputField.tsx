// components/auth/InputField.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  isRequired?: boolean;
  hasToggle?: boolean;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  registration,
  error,
  isRequired,
  hasToggle = false,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    hasToggle && type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {isRequired && <span className="text-red-500 ml-0.5">*</span>}
      </Label>

      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          {...registration}
          className={
            error
              ? "border-red-500 focus-visible:ring-red-500 pr-10"
              : "pr-10"
          }
        />

        {hasToggle && type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-500 font-medium">{error.message}</p>
      )}
    </div>
  );
}