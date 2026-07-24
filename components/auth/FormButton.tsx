"use client";

import { Button } from "@/components/ui/button";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export default function FormButton({
  children,
  isLoading = false,
  loadingText = "Please wait...",
  type = "submit",
  variant,
  className = "w-full bg-blue-600 hover:bg-blue-700 text-white",
  ...props
}: FormButtonProps) {
  return (
    <Button type={type} variant={variant} disabled={isLoading} className={className} {...props}>
      {isLoading ? loadingText : children}
    </Button>
  );
}