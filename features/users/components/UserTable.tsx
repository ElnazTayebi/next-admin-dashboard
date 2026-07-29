"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "../api/useUsers";
import FormButton from "@/components/FormButton";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { User } from "../types";



const LIMIT = 10;

export default function UsersTable() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page")) || 1;
  const q = searchParams.get("q") || "";

  const { data, isLoading, isError, isFetching } = useUsers(page, LIMIT, q);
  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Loading user list...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-destructive">
        Failed to load users.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role / Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.users?.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="flex items-center gap-3 font-medium">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.firstName} />
                    <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                  </Avatar>
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {user.role}{" "}
                    {user.company?.title ? `- ${user.company.title}` : ""}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between border-t p-4">
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages || 1}
            {isFetching && (
              <span className="ml-2 text-xs text-primary animate-pulse">
                (Updating...)
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <FormButton
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 || isFetching}
            >
              Previous
            </FormButton>

            <FormButton
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages || isFetching}
            >
              Next
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );
}
