// components/auth/FormButton.tsx
"use client";

import { Button } from "@/components/ui/button";

type FormButtonProps = {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
};

export default function FormButton({
  children,
  isLoading = false,
  loadingText = "Please wait...",
}: FormButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      {isLoading ? loadingText : children}
    </Button>
  );
}