"use client";

import { Button } from "@/components/ui/button";

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

export default function FormButton({
  children,
  isLoading = false,
  loadingText = "Please wait...",
  type = "submit",
  className = "w-full bg-blue-600 hover:bg-blue-700 text-white",
  ...props
}: FormButtonProps) {
  return (
    <Button type={type} disabled={isLoading} className={className} {...props}>
      {isLoading ? loadingText : children}
    </Button>
  );
}
