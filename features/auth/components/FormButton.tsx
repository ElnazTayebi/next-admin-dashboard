"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export default function FormButton({
  children,
  isLoading = false,
  loadingText = "Please wait...",
  type = "button",
  size = "default",
  variant,
  className,
  ...props
}: FormButtonProps) {
  return (
    <Button
      type={type}
      size={size}
      variant={variant}
      disabled={isLoading}
      className={cn(
        variant === "default" && "bg-blue-600 hover:bg-blue-700 text-white",
        className,
      )}
      {...props}
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}
