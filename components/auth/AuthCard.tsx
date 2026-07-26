import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AuthCardProps = {
  title: string;
  children: React.ReactNode;
};

export default function AuthCard({ title, children }: AuthCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
