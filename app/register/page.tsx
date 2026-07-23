// app/register/page.tsx
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4">
      <RegisterForm />
    </main>
  );
}