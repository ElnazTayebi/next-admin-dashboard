"use client";

import { useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // ۱. ایمپورت صحیح Button از Shadcn
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormButton from "@/components/auth/FormButton";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  image: string;
  company?: {
    title: string;
  };
}

const LIMIT = 10;

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useUsers(page, LIMIT);
  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;

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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-sm text-muted-foreground">
          List of users retrieved from DummyJSON
        </p>
      </div>

      
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
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1 || isFetching}
            >
              Previous
            </FormButton>

            <FormButton
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => prev + 1)}
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
