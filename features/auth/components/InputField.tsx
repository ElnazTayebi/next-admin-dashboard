"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/utils";

type InputFieldProps = {
  label?: string; // Optional so standalone inputs (like search) don't crash TypeScript
  type?: string;
  placeholder?: string;
  registration?: Partial<UseFormRegisterReturn>; // Optional for non-form usage
  error?: FieldError;
  isRequired?: boolean;
  hasToggle?: boolean;
  disabled?: boolean;
  className?: string;
  defaultValue?: string; // Added semicolon
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  label,
  type = "text",
  placeholder,
  registration,
  error,
  isRequired,
  hasToggle = false,
  disabled = false,
  className,
  defaultValue,
  onChange,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordInput = hasToggle && type === "password";
  const inputType = isPasswordInput
    ? showPassword
      ? "text"
      : "password"
    : type;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    registration?.onChange?.(e);
    onChange?.(e);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {isRequired && <span className="text-red-500 ml-0.5">*</span>}
        </Label>
      )}

      <div className="relative">
        <Input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          {...registration}
          onChange={handleInputChange}
          className={cn(
            error && "border-red-500 focus-visible:ring-red-500",
            isPasswordInput && "pr-10",
          )}
        />

        {isPasswordInput && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
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
